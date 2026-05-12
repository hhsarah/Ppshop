// PILPOIL — Product, Reviews, FAQ, Footer
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

function Product({ qty, setQty, color, setColor, onAdd, productRef }) {
  const [thumb, setThumb] = useState2(0);
  const price = 69;
  const old = 99;
  const swatches = [
    { id:"sage", label:"Sauge" },
    { id:"cream", label:"Crème" },
    { id:"charcoal", label:"Charbon" },
  ];

  return (
    <section className="section" id="produit" ref={productRef} style={{background:"var(--warm-white)"}}>
      <div className="container product-grid">
        <div className="product-gallery">
          <div className="gallery-main">
            <div className="ph">
              <div className="product-mark"/>
            </div>
            <span style={{position:"absolute",top:16,left:16}} className="tag"><Ic.Leaf/> Édition 2026</span>
          </div>
          <div className="gallery-thumbs">
            {[0,1,2,3].map((i)=>(
              <div key={i} className={`thumb t${i+1} ${thumb===i?"active":""}`} onClick={()=>setThumb(i)}/>
            ))}
          </div>
        </div>

        <div className="product-info">
          <span className="small">PILPOIL · Édition originale</span>
          <h2 className="display">La brosse vapeur.</h2>
          <div className="product-rating">
            <div className="star-row" style={{display:"flex",color:"#D9A441",gap:1}}>
              {Array.from({length:5}).map((_,i)=><Ic.Star key={i}/>)}
            </div>
            <span><b>4,9</b> · 2 134 avis vérifiés</span>
          </div>

          <p style={{color:"var(--ink-2)",fontSize:16,margin:"6px 0 0",maxWidth:"46ch"}}>
            Une brosse en alliage doux, un réservoir d'eau de 30ml, et une vapeur
            tiède qui capture les poils morts avant qu'ils ne tombent partout.
          </p>

          <div className="price-row">
            <span className="price">{price}€</span>
            <span className="price-old">{old}€</span>
            <span className="price-save">-30%</span>
          </div>

          <div className="color-select">
            <div style={{fontSize:13.5,fontWeight:600,color:"var(--ink-2)"}}>Couleur : <span style={{color:"var(--ink)"}}>{swatches.find(s=>s.id===color)?.label}</span></div>
            <div className="color-swatches">
              {swatches.map(s=>(
                <button key={s.id} className={`swatch ${s.id} ${color===s.id?"active":""}`} onClick={()=>setColor(s.id)} aria-label={s.label}>
                  {color===s.id && <Ic.Check style={{color:s.id==="charcoal"?"#FAF7F0":"#1F1E1B"}}/>}
                </button>
              ))}
            </div>
          </div>

          <div className="qty-row">
            <div style={{fontSize:13.5,fontWeight:600,color:"var(--ink-2)"}}>Quantité</div>
            <div className="qty">
              <button onClick={()=>setQty(Math.max(1,qty-1))}>−</button>
              <span className="n">{qty}</span>
              <button onClick={()=>setQty(qty+1)}>+</button>
            </div>
          </div>

          <div className="add-row">
            <button className="btn btn-primary" onClick={onAdd}>
              Ajouter au panier · {price*qty}€ <Ic.ArrowRight/>
            </button>
            <button className="icon-btn" aria-label="Favori" style={{width:54,height:54}}><Ic.Heart/></button>
          </div>

          <div className="product-mini-revs">
            <div className="mini-rev-avatars">
              <span>JL</span><span>MR</span><span>AC</span><span>+</span>
            </div>
            <span style={{fontSize:13,color:"var(--ink-2)"}}>Rejoignez <b style={{color:"var(--ink)"}}>12 480 foyers</b> qui ont dit adieu aux poils.</span>
          </div>

          <ul className="assurance-list">
            <li><Ic.Truck/> Livraison offerte en 2–4 jours ouvrés</li>
            <li><Ic.Shield/> 30 jours pour l'essayer, sinon remboursé</li>
            <li><Ic.Recycle/> Garantie 2 ans, pièces détachées disponibles</li>
            <li><Ic.Leaf/> Conçu en France · assemblé au Portugal</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------------- Reviews ----------------
function Reviews() {
  const revs = [
    { name:"Marie L.", pet:"avec Tigrou", text:"Mon chat ronronne pendant le brossage, et plus de poils sur le canapé noir. Magique.", stars:5, type:1, video:false },
    { name:"Julien R.", pet:"avec Mochi", text:"J'étais sceptique. 3 semaines plus tard, le rouleau collant a disparu de ma vie.", stars:5, type:2, video:true },
    { name:"Camille D.", pet:"avec Nuage", text:"La vapeur est douce, vraiment. Mon chat très peureux se laisse faire.", stars:5, type:3, video:false },
    { name:"Antoine B.", pet:"avec Luna & Mia", text:"Deux chats, un labrador. La maison respire à nouveau.", stars:5, type:4, video:true },
  ];
  return (
    <section className="section" id="avis" style={{background:"var(--warm-white)"}}>
      <div className="container">
        <div className="reviews-head">
          <div className="left">
            <span className="eyebrow">Ils ont essayé</span>
            <h2 className="display">2 134 avis.<br/>Une seule réaction.</h2>
          </div>
          <div className="summary">
            <div>
              <div className="big-rating display">4,9<span style={{color:"var(--mute)",fontSize:18}}>/5</span></div>
              <div className="star-row" style={{display:"flex",color:"#D9A441",gap:1,marginTop:4}}>
                {Array.from({length:5}).map((_,i)=><Ic.Star key={i}/>)}
              </div>
              <small>Sur 2 134 avis vérifiés</small>
            </div>
          </div>
        </div>

        <div className="reviews-grid">
          {revs.map((r,i)=>(
            <div className="rev-card" key={i}>
              <div className={`rev-media r${r.type} ${r.video?"video":""}`}>
                <div className="ph">photo {r.pet.replace("avec ","")}</div>
              </div>
              <div className="rev-body">
                <div className="rev-stars">{Array.from({length:r.stars}).map((_,j)=><Ic.Star key={j}/>)}</div>
                <p className="rev-text">“{r.text}”</p>
                <div className="rev-name"><span>{r.name}</span><small>{r.pet}</small></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- FAQ ----------------
function FAQ() {
  const [open, setOpen] = useState2(0);
  const items = [
    { q:"Est-ce que ça fonctionne sur les chats ?", a:"Oui — testée sur poils courts et poils longs. La plupart des chats trouvent le brossage apaisant (notre support déborde de vidéos de ronrons)." },
    { q:"Et sur les chiens ?", a:"Du chihuahua au berger australien, oui. Pour les poils très longs ou très épais, brossez par sections de 20 secondes pour laisser la vapeur agir." },
    { q:"La vapeur est-elle chaude ?", a:"Non. La vapeur sort à environ 38°C — tiède comme l'eau du bain. Un thermostat coupe la chauffe en cas de dépassement." },
    { q:"Quand serai-je livré·e ?", a:"Livraison offerte en 2 à 4 jours ouvrés en France métropolitaine via Colissimo. Suivi par email à chaque étape." },
    { q:"Comment nettoyer la brosse ?", a:"Le tiroir à poils se vide en un geste. Le réservoir et la brosse se rincent à l'eau tiède. Pas de pièces fragiles, pas de filtres à racheter." },
    { q:"Et si je n'aime pas ?", a:"Vous avez 30 jours pour la tester chez vous. Si elle ne vous convient pas, on la reprend et on vous rembourse — pas de questions." },
  ];
  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">On vous dit tout</span>
          <h2 className="display">Vos questions, nos réponses.</h2>
        </div>
        <div className="faq-list">
          {items.map((it,i)=>(
            <div key={i} className={`faq-item ${open===i?"open":""}`}>
              <div className="faq-q" onClick={()=>setOpen(open===i?-1:i)}>
                <span>{it.q}</span>
                <span className="plus"><Ic.Plus/></span>
              </div>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:36}}>
          <span style={{color:"var(--ink-2)",fontSize:15}}>Une autre question ? </span>
          <a href="#" style={{color:"var(--moss)",fontWeight:600}}>Écrivez-nous →</a>
        </div>
      </div>
    </section>
  );
}

// ---------------- Footer ----------------
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand"><span className="brand-mark"><Ic.Paw/></span><span>PILPOIL</span></div>
            <p className="footer-tag">La brosse vapeur qui rend les maisons douces et les animaux heureux. Conçue à Paris, aimée partout.</p>
            <div className="foot-social">
              <a href="#" aria-label="Instagram"><Ic.Insta/></a>
              <a href="#" aria-label="TikTok"><Ic.Tiktok/></a>
              <a href="#" aria-label="Email"><Ic.Mail/></a>
            </div>
          </div>
          <div>
            <h5>Boutique</h5>
            <a href="#">La brosse vapeur</a>
            <a href="#">Accessoires</a>
            <a href="#">Cartes cadeaux</a>
            <a href="#">Recharges (gratuit)</a>
          </div>
          <div>
            <h5>Aide</h5>
            <a href="#">Suivre ma commande</a>
            <a href="#">Livraison</a>
            <a href="#">Retours &amp; remboursement</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h5>La marque</h5>
            <a href="#">Notre histoire</a>
            <a href="#">Avis vérifiés</a>
            <a href="#">Affiliation</a>
            <a href="#">Vétérinaires partenaires</a>
          </div>
        </div>
        <div className="footer-bar">
          <span>© 2026 PILPOIL — Tous droits réservés</span>
          <span style={{display:"flex",gap:18}}>
            <a href="#" style={{padding:0}}>CGV</a>
            <a href="#" style={{padding:0}}>Mentions légales</a>
            <a href="#" style={{padding:0}}>Politique de retour</a>
            <a href="#" style={{padding:0}}>Cookies</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

window.Sections2 = { Product, Reviews, FAQ, Footer };