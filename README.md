# PILPOIL

Landing page Shopify pour une brosse vapeur anti-poils pour chats et chiens.

## Designs

- `PILPOIL.html` — design principal (apothicaire moderne, palette sauge/crème)
- `PILPOIL - Maison de campagne.html` — variante chaleureuse artisanale
- `PILPOIL - Lab clinique.html` — variante data-driven clinique
- `PILPOIL - Pastel pop.html` — variante pop friendly avec bundle countdown

Les fichiers `styles.css`, `icons.jsx`, `sections1.jsx`, `sections2.jsx` et `tweaks-panel.jsx` sont les ressources partagées par `PILPOIL.html`.

## Prévisualiser le site en local

⚠️ **Ne pas double-cliquer sur `PILPOIL.html`** : les fichiers `.jsx` sont chargés via fetch, ce qui ne fonctionne pas en `file://`. Il faut servir le dossier en HTTP.

**Option 1 — Python (déjà installé sur Mac/Linux) :**
```bash
cd /chemin/vers/Ppshop
python3 -m http.server 8000
```
Ouvrir : http://localhost:8000/PILPOIL.html
(ou les variantes : `/PILPOIL%20-%20Maison%20de%20campagne.html`, etc.)

**Option 2 — Node :**
```bash
npx serve .
```

**Option 3 — VS Code** : extension "Live Server" → clic droit sur `PILPOIL.html` → "Open with Live Server".

## Intégration Shopify

Le dossier [`shopify/`](./shopify/) contient une version prête pour Shopify (section Liquid, JS vanilla, CSS scopée, et un snippet autonome pour bloc "Custom Liquid"). Voir [`shopify/README.md`](./shopify/README.md) pour les étapes d'installation.
