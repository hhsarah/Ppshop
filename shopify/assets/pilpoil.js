/* PILPOIL — vanilla JS interactions, scoped to #pilpoil */
(function () {
  function init(root) {
    if (!root || root.dataset.pilpoilReady) return;
    root.dataset.pilpoilReady = "1";

    var price = parseInt(root.dataset.price || "69", 10);
    var variantId = root.dataset.variantId || "";
    var state = { qty: 1, color: "sage", cartCount: 0 };

    // ---- Smooth scroll to product ----
    function scrollToProduct() {
      var el = root.querySelector("#produit");
      if (!el) return;
      var top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
    root.querySelectorAll("[data-pp-cta-product]").forEach(function (b) {
      b.addEventListener("click", scrollToProduct);
    });

    // ---- Cart pill ----
    var cartBadge = root.querySelector("[data-pp-cart-count]");
    function updateCart(n) {
      state.cartCount += n;
      if (cartBadge) cartBadge.textContent = state.cartCount;
    }

    // ---- Toast ----
    var toast = root.querySelector("[data-pp-toast]");
    var toastTimer = null;
    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("shown");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove("shown"); }, 2400);
    }

    // ---- Quantity stepper ----
    var qtyEl = root.querySelector("[data-pp-qty]");
    function setQty(n) {
      state.qty = Math.max(1, n);
      if (qtyEl) qtyEl.textContent = state.qty;
      updatePriceLabels();
    }
    root.querySelectorAll("[data-pp-qty-dec]").forEach(function (b) {
      b.addEventListener("click", function () { setQty(state.qty - 1); });
    });
    root.querySelectorAll("[data-pp-qty-inc]").forEach(function (b) {
      b.addEventListener("click", function () { setQty(state.qty + 1); });
    });

    function updatePriceLabels() {
      root.querySelectorAll("[data-pp-total]").forEach(function (n) {
        n.textContent = (price * state.qty) + "€";
      });
    }

    // ---- Color swatches ----
    var swatches = root.querySelectorAll("[data-pp-swatch]");
    var colorLabel = root.querySelector("[data-pp-color-label]");
    swatches.forEach(function (sw) {
      sw.addEventListener("click", function () {
        swatches.forEach(function (s) { s.classList.remove("active"); });
        sw.classList.add("active");
        state.color = sw.dataset.ppSwatch;
        if (colorLabel) colorLabel.textContent = sw.dataset.ppLabel || state.color;
      });
    });

    // ---- Add to cart ----
    function addToCart() {
      updateCart(state.qty);
      var msg = state.qty + " brosse" + (state.qty > 1 ? "s" : "") +
                " ajoutée" + (state.qty > 1 ? "s" : "") + " au panier";
      showToast(msg);
      // If a Shopify variant id is wired in, push to /cart/add.js
      if (variantId && window.fetch) {
        fetch("/cart/add.js", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ id: variantId, quantity: state.qty })
        }).catch(function () { /* silent — local toast is shown anyway */ });
      }
    }
    root.querySelectorAll("[data-pp-add]").forEach(function (b) {
      b.addEventListener("click", addToCart);
    });

    // ---- Product thumbs ----
    var thumbs = root.querySelectorAll("[data-pp-thumb]");
    thumbs.forEach(function (t) {
      t.addEventListener("click", function () {
        thumbs.forEach(function (tt) { tt.classList.remove("active"); });
        t.classList.add("active");
      });
    });

    // ---- FAQ accordion ----
    root.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      if (!q) return;
      q.addEventListener("click", function () {
        var wasOpen = item.classList.contains("open");
        root.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("open"); });
        if (!wasOpen) item.classList.add("open");
      });
    });

    // ---- Before / after slider ----
    root.querySelectorAll(".ba").forEach(function (ba) {
      var after = ba.querySelector(".half.after");
      var divider = ba.querySelector(".divider");
      var handle = ba.querySelector(".handle");
      var dragging = false;
      function setPos(pct) {
        var p = Math.max(4, Math.min(96, pct));
        if (after) after.style.clipPath = "polygon(" + p + "% 0,100% 0,100% 100%," + p + "% 100%)";
        if (divider) divider.style.left = p + "%";
        if (handle) handle.style.left = p + "%";
      }
      setPos(50);
      function move(e) {
        if (!dragging) return;
        var r = ba.getBoundingClientRect();
        var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
        setPos((x / r.width) * 100);
      }
      ba.addEventListener("mousedown", function () { dragging = true; });
      ba.addEventListener("touchstart", function () { dragging = true; }, { passive: true });
      window.addEventListener("mouseup", function () { dragging = false; });
      window.addEventListener("touchend", function () { dragging = false; });
      window.addEventListener("mousemove", move);
      window.addEventListener("touchmove", move, { passive: true });
    });

    // ---- Sticky add-to-cart ----
    var sticky = root.querySelector(".sticky-atc");
    var productSec = root.querySelector("#produit");
    function onScroll() {
      if (!sticky || !productSec) return;
      var r = productSec.getBoundingClientRect();
      var passedBelow = r.bottom < window.innerHeight * 0.4;
      var beforeProduct = r.top > window.innerHeight;
      var show = (passedBelow || beforeProduct) && window.scrollY > 600;
      sticky.classList.toggle("shown", show);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    updatePriceLabels();
  }

  function ready() {
    document.querySelectorAll("#pilpoil").forEach(init);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
