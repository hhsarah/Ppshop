// PILPOIL — Site sections
const { useState, useEffect, useRef } = React;

// ---------------- Hero ----------------
function Announce() {
  const items = [
    "Livraison offerte dès 49€",
    "Satisfait ou remboursé 30 jours",
    "+12 000 maisons sans poils",
    "Garantie 2 ans",
  ];
  return (
    <div className="announce">
      <div className="container announce-track">
        {items.map((t, i) => (
          <React.Fragment key={i}>
            <span>{t}</span>
            {i < items.length - 1 && <span className="dot"/>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Nav({ onCart, cartCount }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#" className="brand" style={{textDecoration:"none",color:"inherit"}}>
          <span className="brand-mark"><Ic.Paw/></span>
          <span>PILPOIL</span>
        </a>
        <nav className="nav-links">
          <a href="#produit">La brosse</a>
          <a href="#fonctionne">Comment ça marche</a>
          <a href="#avis">Avis clients</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Recherche"><Ic.Search/></button>
          <button className="icon-btn" aria-label="Compte"><Ic.User/></button>
          <button className="cart-pill" onClick={onCart}>
            <Ic.Bag/> Panier <span className="badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onCTA }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="tag"><Ic.Paw/> Pour chats &amp; chiens</span>
          <h1 className="display">
            Enfin une<br/> maison <em>sans poils.</em>
          </h1>
          <p className="sub">
            La brosse vapeur qui retire les poils <em>avant</em> qu'ils tombent partout.
            Douce pour votre animal, redoutable contre les poils.
          </p>
          <div className="hero-cta-row">
            <button className="btn btn-primary" onClick={onCTA}>
              Découvrir PILPOIL <Ic.ArrowRight/>
            </button>
            <div className="stars">
              <div className="star-row">
                {Array.from({length:5}).map((_,i)=><Ic.Star key={i}/>)}
              </div>
              <span><b>4,9/5</b> · 2 134 avis</span>
            </div>
          </div>
          <div className="trust">
            <div className="trust-item"><span className="b"><Ic.Truck/></span>Livraison offerte<br/><small style={{color:"var(--mute)"}}>en 2-4 jours</small></div>
            <div className="trust-item"><span className="b"><Ic.Shield/></span>30 jours d'essai<br/><small style={{color:"var(--mute)"}}>satisfait ou remboursé</small></div>
            <div className="trust-item"><span className="b"><Ic.Leaf/></span>Réutilisable<br/><small style={{color:"var(--mute)"}}>zéro recharge</small></div>
            <div className="trust-item"><span className="b"><Ic.Heart/></span>Vétérinaires<br/><small style={{color:"var(--mute)"}}>recommandé par 9/10</small></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="placeholder">
            <span className="placeholder-tag">photo lifestyle — femme + chat + brosse</span>
          </div>
          <div className="steam s1"/>
          <div className="steam s2"/>
          <div className="float-card fc-1">
            <span className="ico"><Ic.Sparkles/></span>
            <div>-87% de poils<br/><small>en 2 minutes</small></div>
          </div>
          <div className="float-card fc-2">
            <span className="ico"><Ic.Heart/></span>
            <div>Anissa &amp; Mochi<br/><small>“On adore!”</small></div>
          </div>
          <div className="float-card fc-3">
            <span className="ico"><Ic.Steam/></span>
            <div>Vapeur tiède<br/><small>douce pour le pelage</small></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Problem / Solution ----------------
function ProblemSolution() {
  const items = [
    { title:"Le canapé", note:"avant / après" },
    { title:"Les vêtements", note:"avant / après" },
    { title:"La voiture", note:"avant / après" },
  ];
  return (
    <section className="section problem">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Le quotidien sans PILPOIL</span>
          <h2 className="display">Les poils, partout.<br/>Sauf chez vous.</h2>
          <p>Glissez le curseur — voyez la différence sur les surfaces où les poils s'accumulent le plus.</p>
        </div>

        <div className="compare-grid">
          {items.map((it,i) => (
            <div key={i} className="compare-card">
              <BeforeAfter idx={i}/>
              <div className="compare-meta">
                <h4>{it.title}</h4>
                <span>{it.note}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="affirm-row">
          <div className="affirm display">Moins de <em>poils.</em></div>
          <div className="affirm display">Moins de <em>stress.</em></div>
          <div className="affirm display">Plus de <em>câlins.</em></div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ idx }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const drag = useRef(false);
  function onMove(e){
    if(!drag.current||!ref.current)return;
    const r=ref.current.getBoundingClientRect();
    const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;
    setPos(Math.max(4,Math.min(96,(x/r.width)*100)));
  }
  useEffect(()=>{
    const up=()=>drag.current=false;
    window.addEventListener("mouseup",up);window.addEventListener("touchend",up);
    window.addEventListener("mousemove",onMove);window.addEventListener("touchmove",onMove);
    return ()=>{
      window.removeEventListener("mouseup",up);window.removeEventListener("touchend",up);
      window.removeEventListener("mousemove",onMove);window.removeEventListener("touchmove",onMove);
    };
  },[]);
  return (
    <div className="ba" ref={ref}
      onMouseDown={()=>drag.current=true}
      onTouchStart={()=>drag.current=true}>
      <div className="half before"><span style={{position:"absolute",top:14,left:14,background:"rgba(31,30,27,.7)",color:"#FAF7F0",borderRadius:999,padding:"4px 10px",fontSize:11,letterSpacing:".06em"}}>AVANT</span></div>
      <div className="half after" style={{clipPath:`polygon(${pos}% 0,100% 0,100% 100%,${pos}% 100%)`}}>
        <span style={{position:"absolute",top:14,right:14,background:"var(--sage)",color:"#FAF7F0",borderRadius:999,padding:"4px 10px",fontSize:11,letterSpacing:".06em"}}>APRÈS</span>
      </div>
      <div className="divider" style={{left:`${pos}%`}}/>
      <div className="handle" style={{left:`${pos}%`}}><Ic.SliderH/></div>
    </div>
  );
}

// ---------------- How it works ----------------
function HowItWorks() {
  const steps = [
    { n:"01", t:"Activez la vapeur", d:"Un bouton, deux secondes. La vapeur tiède s'active doucement, sans bruit qui effraie.", ico:<Ic.Steam/> },
    { n:"02", t:"Brossez votre animal", d:"Glissez la brosse comme une caresse. La vapeur capture les poils morts avant qu'ils ne tombent.", ico:<Ic.Brush/> },
    { n:"03", t:"Retirez les poils en 1 clic", d:"Le tiroir s'ouvre d'une pression, se vide d'un geste, se rince à l'eau. C'est tout.", ico:<Ic.Sparkles/> },
  ];
  return (
    <section className="section" id="fonctionne">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Comment ça marche</span>
          <h2 className="display">Trois gestes, zéro effort.</h2>
          <p>Pas d'aspirateur, pas de rouleau collant, pas d'huile de coude. Juste vous et votre animal.</p>
        </div>
        <div className="steps">
          {steps.map((s,i)=>(
            <div className="step" key={i}>
              <div className="ico-art">{s.ico}</div>
              <div className="num display">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- Benefits ----------------
function Benefits() {
  const items = [
    { t:"Retire les poils à la source", ico:<Ic.Brush/>, k:"sage" },
    { t:"Réduit les poils dans la maison", ico:<Ic.Home/> },
    { t:"Convient chats & chiens", ico:<Ic.Cat/> },
    { t:"Nettoyage facile au robinet", ico:<Ic.Sparkles/> },
    { t:"Animal détendu", ico:<Ic.Heart/>, k:"dark" },
    { t:"Réutilisable à l'infini", ico:<Ic.Recycle/> },
    { t:"Sans recharge collante", ico:<Ic.Leaf/> },
    { t:"Vapeur tiède, jamais chaude", ico:<Ic.Steam/> },
  ];
  return (
    <section className="section benefits">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pourquoi PILPOIL</span>
          <h2 className="display">Pensée pour vous,<br/>aimée par eux.</h2>
        </div>
        <div className="bens-grid">
          {items.map((b,i)=>(
            <div className={`ben ${b.k||""}`} key={i}>
              <span className="ico">{b.ico}</span>
              <h4>{b.t}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Sections1 = { Announce, Nav, Hero, ProblemSolution, HowItWorks, Benefits };