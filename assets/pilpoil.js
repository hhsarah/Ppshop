/* PILPOIL — Shopify section interactions */
(function () {
  'use strict';

  function init(root) {
    if (!root || root.dataset.ppInitialized === 'true') return;
    root.dataset.ppInitialized = 'true';

    var moneyFormat = root.dataset.moneyFormat || '{{amount}} €';
    var product = parseJSON(root.querySelector('[data-pp-product-json]'));
    var state = {
      qty: 1,
      variantId: product && product.variants && product.variants[0] ? product.variants[0].id : null,
      variants: (product && product.variants) || [],
    };

    bindFAQ(root);
    bindQty(root, state);
    bindVariants(root, state, product);
    bindThumbs(root);
    bindBeforeAfter(root);
    bindAddToCart(root, state);
    bindStickyATC(root, state);
    bindCartCount(root);
    refreshCartCount(root);
  }

  function parseJSON(el) {
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { return null; }
  }

  function formatMoney(cents, format) {
    var amount = (cents / 100).toFixed(2).replace('.', ',');
    return (format || '{{amount}} €').replace('{{amount}}', amount);
  }

  function bindFAQ(root) {
    root.querySelectorAll('.pp-faq-item').forEach(function (item) {
      var q = item.querySelector('.pp-faq-q');
      if (!q) return;
      q.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        root.querySelectorAll('.pp-faq-item.open').forEach(function (o) { o.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  function bindQty(root, state) {
    var display = root.querySelector('[data-pp-qty]');
    var minus = root.querySelector('[data-pp-qty-minus]');
    var plus = root.querySelector('[data-pp-qty-plus]');
    function render() {
      if (display) display.textContent = state.qty;
      updateAddBtn(root, state);
    }
    if (minus) minus.addEventListener('click', function () { state.qty = Math.max(1, state.qty - 1); render(); });
    if (plus) plus.addEventListener('click', function () { state.qty += 1; render(); });
    render();
  }

  function bindVariants(root, state, product) {
    var btns = root.querySelectorAll('[data-pp-variant]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(btn.dataset.ppVariant, 10);
        var v = state.variants.find(function (x) { return x.id === id; });
        if (!v || v.available === false) return;
        state.variantId = id;
        btns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        updateAddBtn(root, state);
      });
    });
  }

  function bindThumbs(root) {
    var main = root.querySelector('[data-pp-main-image]');
    root.querySelectorAll('[data-pp-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        root.querySelectorAll('[data-pp-thumb]').forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');
        var src = thumb.dataset.ppThumb;
        if (main && src) main.setAttribute('src', src);
      });
    });
  }

  function bindBeforeAfter(root) {
    root.querySelectorAll('.pp-ba').forEach(function (ba) {
      var after = ba.querySelector('.after');
      var divider = ba.querySelector('.divider');
      var handle = ba.querySelector('.handle');
      var dragging = false;

      function setPos(pct) {
        pct = Math.max(4, Math.min(96, pct));
        if (after) after.style.clipPath = 'polygon(' + pct + '% 0,100% 0,100% 100%,' + pct + '% 100%)';
        if (divider) divider.style.left = pct + '%';
        if (handle) handle.style.left = pct + '%';
      }
      function move(e) {
        if (!dragging) return;
        var r = ba.getBoundingClientRect();
        var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
        setPos((x / r.width) * 100);
      }
      function down(e) { dragging = true; move(e); e.preventDefault(); }
      function up() { dragging = false; }

      ba.addEventListener('mousedown', down);
      ba.addEventListener('touchstart', down, { passive: false });
      window.addEventListener('mousemove', move);
      window.addEventListener('touchmove', move, { passive: false });
      window.addEventListener('mouseup', up);
      window.addEventListener('touchend', up);
    });
  }

  function updateAddBtn(root, state) {
    var btn = root.querySelector('[data-pp-add]');
    var stickyBtn = root.querySelector('[data-pp-sticky-add]');
    var v = state.variants.find(function (x) { return x.id === state.variantId; });
    var price = v ? v.price : 0;
    var format = root.dataset.moneyFormat || '{{amount}} €';
    var total = formatMoney(price * state.qty, format);
    if (btn) {
      var label = btn.querySelector('[data-pp-add-label]');
      if (label) label.textContent = 'Ajouter au panier · ' + total;
      btn.disabled = !v || v.available === false;
      btn.textContent = '';
      if (label) btn.appendChild(label);
      var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    }
    if (stickyBtn) {
      stickyBtn.textContent = 'Ajouter — ' + total;
      stickyBtn.disabled = !v || v.available === false;
    }
  }

  function bindAddToCart(root, state) {
    function add() {
      if (!state.variantId) return showToast(root, 'Sélectionnez une variante');
      var btns = root.querySelectorAll('[data-pp-add],[data-pp-sticky-add]');
      btns.forEach(function (b) { b.disabled = true; });
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: state.variantId, quantity: state.qty }),
      })
        .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
        .then(function (res) {
          btns.forEach(function (b) { b.disabled = false; });
          if (!res.ok) {
            showToast(root, res.data && res.data.description ? res.data.description : 'Erreur lors de l’ajout');
            return;
          }
          var n = state.qty;
          showToast(root, n + ' brosse' + (n > 1 ? 's' : '') + ' ajoutée' + (n > 1 ? 's' : '') + ' au panier');
          refreshCartCount(root);
          document.dispatchEvent(new CustomEvent('pilpoil:cart:added', { detail: res.data }));
        })
        .catch(function () {
          btns.forEach(function (b) { b.disabled = false; });
          showToast(root, 'Erreur réseau');
        });
    }
    root.querySelectorAll('[data-pp-add],[data-pp-sticky-add]').forEach(function (b) {
      b.addEventListener('click', add);
    });
  }

  function bindStickyATC(root, state) {
    var sticky = root.querySelector('.pp-sticky-atc');
    var anchor = root.querySelector('[data-pp-product]');
    if (!sticky || !anchor) return;
    if (root.dataset.stickyAtc !== 'true') return;
    function onScroll() {
      var r = anchor.getBoundingClientRect();
      var passedBelow = r.bottom < window.innerHeight * 0.4;
      var beforeProduct = r.top > window.innerHeight;
      var show = (passedBelow || beforeProduct) && window.scrollY > 600;
      sticky.classList.toggle('shown', show);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function bindCartCount(root) {
    root.querySelectorAll('[data-pp-scroll-product]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var target = root.querySelector('[data-pp-product]');
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  function refreshCartCount(root) {
    fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        root.querySelectorAll('[data-pp-cart-count]').forEach(function (el) {
          el.textContent = cart.item_count;
        });
      })
      .catch(function () {});
  }

  function showToast(root, msg) {
    var toast = root.querySelector('.pp-toast');
    if (!toast) return;
    var msgEl = toast.querySelector('[data-pp-toast-msg]');
    if (msgEl) msgEl.textContent = msg;
    toast.classList.add('shown');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () { toast.classList.remove('shown'); }, 2400);
  }

  function boot() {
    document.querySelectorAll('.pilpoil').forEach(init);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Shopify theme editor support
  document.addEventListener('shopify:section:load', function (e) {
    var section = e.target.querySelector('.pilpoil');
    if (section) init(section);
  });
})();
