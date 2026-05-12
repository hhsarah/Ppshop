# PILPOIL — Intégration Shopify

Trois manières d'installer la landing page, du plus simple au plus propre.

---

## Option A — La plus rapide : bloc "Custom Liquid"

Idéal pour tester sans toucher au code du thème.

1. Dans l'admin Shopify : **Online Store → Pages → Ajouter une page** (ou ouvrir une page existante).
2. Donnez un titre (ex. "PILPOIL"), puis dans le **Modèle de page**, choisissez un template avec une zone de contenu libre (souvent `page.contact` ou `page` selon votre thème).
3. Ouvrez **Online Store → Themes → Customize** sur le thème actif, sélectionnez cette page dans le menu déroulant en haut.
4. Cliquez **Add section → Custom Liquid**.
5. Ouvrez le fichier **`shopify/snippets/pilpoil-landing.html`** de ce dépôt, **copiez tout son contenu** et **collez-le** dans le champ "Custom Liquid".
6. Sauvegardez. La page est en ligne.

> Le fichier est **autonome** : CSS + JS + SVG inline, scopés sous `#pilpoil` pour ne rien casser dans votre thème.

**Pour brancher le bouton "Ajouter au panier" sur un vrai produit Shopify :**
Ouvrez le snippet, cherchez `data-variant-id=""` au début et mettez l'ID de variante de votre produit (ex. `data-variant-id="45678901234567"`).

---

## Option B — Recommandée : section de thème dédiée

Plus propre, modifiable depuis le Customizer Shopify (prix, images, etc.).

### Fichiers à copier dans votre thème

| Fichier de ce dépôt                                | Destination dans le thème Shopify  |
| -------------------------------------------------- | ---------------------------------- |
| `shopify/sections/pilpoil-landing.liquid`          | `sections/pilpoil-landing.liquid`  |
| `shopify/snippets/pilpoil-icon.liquid`             | `snippets/pilpoil-icon.liquid`     |
| `shopify/assets/pilpoil.css`                       | `assets/pilpoil.css`               |
| `shopify/assets/pilpoil.js`                        | `assets/pilpoil.js`                |
| `shopify/templates/page.pilpoil.json`              | `templates/page.pilpoil.json`      |

### Étapes (méthode "Code éditeur en ligne")

1. **Sauvegardez d'abord votre thème** : Online Store → Themes → menu "…" → **Duplicate**. Travaillez sur la copie.
2. Ouvrez la copie : menu "…" → **Edit code**.
3. Dans la barre latérale, pour chaque fichier ci-dessus :
   - Cliquez **Add a new section / snippet / asset / template** selon le dossier cible.
   - Nommez-le **exactement** comme dans la colonne de droite du tableau.
   - Collez le contenu du fichier correspondant de ce dépôt.
4. Sauvegardez.
5. Dans l'admin : **Online Store → Pages → Ajouter une page** :
   - Titre : `PILPOIL`
   - Dans **Modèle de page** (panneau latéral), choisissez **`pilpoil`** (apparaît grâce à `page.pilpoil.json`).
   - Cliquez **Save**.
6. **Online Store → Themes → Customize** (sur la copie), sélectionnez la page PILPOIL en haut. Vous voyez la section "PILPOIL Landing" avec :
   - Prix actuel / prix barré
   - **Variant ID Shopify** — collez l'ID de variante du produit à vendre (Products → produit → onglet "..." → ID dans l'URL, ou GraphQL)
   - 3 image pickers pour les visuels avant/après
   - Toggle barre d'annonce + sticky add-to-cart
7. **Save**, puis publiez le thème (Themes → "…" → **Publish**) **uniquement quand vous êtes satisfait·e**.

### Méthode "Shopify CLI" (alternative pour dev)

```bash
# depuis la racine du repo
shopify theme dev --store=votre-boutique.myshopify.com
# uploadera /shopify/* dans le thème de dev
```

Note : la CLI attend une **structure de thème complète** à la racine. Pour utiliser cette méthode, déplacez les fichiers de `shopify/` à la racine d'un dossier thème ou utilisez `shopify theme push --only` avec les chemins.

---

## Option C — Page entièrement libre via un App "Page Builder"

Si vous utilisez **GemPages**, **PageFly**, **Shogun** : ils proposent tous un bloc HTML/Liquid. Collez-y le contenu de `shopify/snippets/pilpoil-landing.html` (option A).

---

## FAQ

**Le bouton "Ajouter au panier" ne fait rien quand je clique.**
Vérifiez que vous avez renseigné un `variant_id` valide (admin Shopify : produit → cliquer sur la variante → l'URL contient l'ID). Sans ID, seul le toast s'affiche (mode démo).

**Le design "casse" le reste de mon thème.**
Tous les styles sont scopés sous `#pilpoil`. Si malgré tout quelque chose déborde, votre thème applique probablement des styles à `body`, `*` ou aux balises HTML directement. Encapsulez la zone d'insertion (par ex. ajoutez `overflow:hidden` au conteneur parent dans le customizer).

**Les polices Google ne se chargent pas.**
La section utilise `Instrument Serif` et `Plus Jakarta Sans` via Google Fonts (déclarés en tête de la section). Si votre thème désactive les fontes externes via une CSP, importez-les via votre `theme.liquid` ou utilisez les polices Shopify (`font_picker`).

**Comment changer les textes / les avis / la FAQ ?**
- Option A : éditez directement le HTML dans le bloc Custom Liquid.
- Option B : éditez `sections/pilpoil-landing.liquid` dans le thème.

**Comment ajouter une analytics / pixel Meta sur le clic "Ajouter au panier" ?**
Dans `assets/pilpoil.js`, fonction `addToCart()` : ajoutez `window.dataLayer && dataLayer.push({...})` ou `fbq('track','AddToCart',...)`.

---

## Sécurité / pas-à-pas pour ne rien casser

1. **Toujours dupliquer le thème avant de modifier**.
2. **Tester sur le thème dupliqué non publié** : utilisez l'URL de prévisualisation (Themes → "…" → **Preview**).
3. Publier seulement après validation visuelle complète (desktop + mobile).
4. Garder le thème original en backup ; en cas de souci, **Themes → "…" → Publish** sur l'ancien.
