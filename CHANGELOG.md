# 🧾 CHANGELOG – CAF-Aides

Historique des versions et évolutions du projet Angular `CAF-Aides`, développé par **Crea2Code**.  
Projet open source déployé sur GitHub Pages → [Voir la démo](https://crea2code.github.io/caf-aides/)

---

## 🟢 Version v0.3.0 – 10 octobre 2025

### ✨ Nouveautés
- Ajout du **module Rendez-vous (`/rdv`)** avec stockage local (`localStorage`) et validation de formulaires.
- **Migration vers Angular 20.3.4** (CLI, Core) pour alignement sur les dernières versions stables.
- Suppression complète du **SSR** et passage à une architecture **CSR optimisée**.
- Déploiement automatisé via **GitHub Actions** → Workflow `deploy-pages.yml`.
- Amélioration des composants partagés :
  - `ButtonComponent` : prise en charge des états désactivés et des variantes.
  - `CardComponent` : refonte visuelle et responsive.
- Nettoyage du code (`app.routes.ts`, `app.component.ts`, `main.ts`) et harmonisation des modules standalone.

### ✅ Tests et validation

| Test                            | Résultat | Description                                                   |
|---------------------------------|-----------|----------------------------------------------------------------|
| `futureDateTimeValidator`       | 🟢        | Refuse week-ends, dates passées et horaires hors limites.      |
| **Unités (Karma/Jasmine)**      | 🟢        | Tous les tests unitaires passés avec succès.                   |
| **Routes** `/dashboard`, `/simulateur`, `/dossiers`, `/rdv` | 🟢 | Vérifiées manuellement sur l’application.                     |
| **Déploiement GH Pages**        | 🟢        | En ligne et fonctionnel → [Voir la démo](https://crea2code.github.io/caf-aides/) |
| **🧱 Architecture et maintenance** | 🟢 | Code refactorisé, SSR retiré, structure CSR optimisée.         |

---

## 🚀 Prochaine version – v0.4.0 (en préparation)

### 🎨 Améliorations UX/UI
- Refonte légère du **design du tableau de bord** pour une meilleure lisibilité.  
- Ajout de **messages d’erreur et de confirmation animés** (Angular animations).  
- Uniformisation des composants `Button` et `Card` avec une palette cohérente.

### 🧩 Fonctionnalités prévues
- **Module “Contact & Assistance”** : formulaire interactif avec envoi simulé (mock API).  
- **Extension du module “Rendez-vous”** :
  - Sélecteur de date/heure amélioré avec calendrier visuel.
  - Ajout d’un **filtre par canal** (téléphone / visio / agence).  
- **Export PDF** des rendez-vous validés (prototype).

### ⚙️ Optimisations techniques
- Mise à jour vers Angular **21.x (quand disponible)**.  
- Passage à une configuration **Vite + Jest** pour les tests unitaires plus rapides.  
- Intégration d’une **vérification de performances Lighthouse CI** sur GitHub Actions.

### 📅 Objectif de livraison
> **Fin octobre 2025** — publication de la version stable `v0.4.0`  
> _(avec démo publique mise à jour sur GitHub Pages)_

---

📦 **Projet GitHub :** [Crea2Code / caf-aides](https://github.com/Crea2Code/caf-aides)  
💻 **Démo en ligne :** [https://crea2code.github.io/caf-aides/](https://crea2code.github.io/caf-aides/)

---
