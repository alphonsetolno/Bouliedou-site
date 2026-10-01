# Bouliedou Global Business — Mise en place du tableau de bord

Ce dossier contient votre site, prêt à être géré depuis un tableau de bord gratuit
(**Pages CMS**), via votre compte **GitHub** et votre hébergement **Netlify**.

On fait les 3 phases **ensemble, pas à pas**. Ce guide est juste un aide-mémoire.

---

## Les fichiers de ce dossier (à ne pas renommer)

- `index.html` — la page d'accueil (le design, ne change jamais)
- `page.html` — le modèle pour vos pages supplémentaires
- `content.json` — **tout votre contenu** (textes, photos, sections, pages)
- `.pages.yml` — la configuration du tableau de bord (formulaires en français)
- `_redirects` — règle technique pour les pages supplémentaires
- `images/` — le dossier où iront vos photos

---

## PHASE 1 — Mettre le site sur GitHub

1. Sur **github.com**, bouton **New** (nouveau dépôt).
2. Nom du dépôt : `bouliedou-site`. Laissez-le **Public**. Cliquez **Create repository**.
3. Cliquez **uploading an existing file**, puis glissez TOUS les fichiers de ce dossier.
   - ⚠️ Le fichier `.pages.yml` commence par un point : s'il n'apparaît pas, on le
     créera à la main ensemble (très simple).
4. Bouton vert **Commit changes**.

## PHASE 2 — Relier Netlify à GitHub

1. Sur **app.netlify.com**, ouvrez votre site **bouliedou**.
2. **Site configuration → Build & deploy → Continuous deployment → Link repository**.
3. Choisissez **GitHub**, autorisez, sélectionnez `bouliedou-site`.
4. Laissez les réglages par défaut (pas de build command) → **Deploy**.
   → Votre domaine bouliedou.com et le cadenas 🔒 restent identiques.

## PHASE 3 — Activer le tableau de bord (Pages CMS)

1. Allez sur **pagescms.org**, bouton **Sign in / Get started**.
2. Connectez-vous **avec GitHub**, autorisez l'accès au dépôt `bouliedou-site`.
3. Ouvrez le projet → vous voyez vos formulaires en français. 🎉

---

## Au quotidien — comment ça marche

1. Vous ouvrez **pagescms.org**, vous vous connectez avec GitHub.
2. Vous modifiez un texte ou ajoutez une photo / une section / une page.
3. Vous cliquez **Save**.
4. En ~1 minute, le site **bouliedou.com** se met à jour tout seul. ✅

Aucune manipulation technique, aucun fichier à télécharger.
