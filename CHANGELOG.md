🧾 CHANGELOG — Version v0.3.0

Date de publication : 10 octobre 2025
Type de release : Stable
Démo en ligne : 🌐 https://crea2code.github.io/caf-aides/

🚀 Résumé de la version

Cette mise à jour marque une étape importante pour Caf-Aides, avec :

🔧 Migration vers Angular 20.3.4

🧩 Ajout du module Rendez-vous (RDV) complet et fonctionnel

💡 Stabilisation du déploiement GitHub Pages

🧱 Migration totale vers une architecture Client-Side (CSR) pour des performances accrues

🧩 Nouveautés fonctionnelles
🔹 Module Rendez-vous (/rdv)

Formulaire réactif complet : nom, email, motif, date, heure, canal, commentaire, consentement

Validations avancées :

🚫 Week-ends interdits

📅 Date et heure obligatoires

⏰ Vérification des horaires ouvrés (08 h 30 – 17 h 30)

🕓 Date future uniquement

💾 Sauvegarde automatique des rendez-vous via localStorage

❌ Suppression dynamique d’un RDV depuis la liste

🎨 Design cohérent avec les composants globaux (CardComponent, ButtonComponent)

🔧 Améliorations techniques

✅ Mise à jour des dépendances :

@angular/cli@20.3.4

@angular/core@20.3.4

@angular-devkit/build-angular@20.3.5

🧹 Nettoyage complet du SSR (main.server.ts supprimé)

⚙️ Configuration optimisée pour GitHub Pages (prerender=false, base-href=/caf-aides/)

🧩 CI/CD corrigé et fiabilisé (.github/workflows/deploy-pages.yml)

🧪 Ajout de Karma + Jasmine pour les tests unitaires

## ✅ Tests et validation

| Test                            | Résultat | Description                                                   |
|---------------------------------|-----------|----------------------------------------------------------------|
| `futureDateTimeValidator`       | 🟢        | Refuse week-ends, dates passées et horaires hors limites.      |
| **Unités (Karma/Jasmine)**      | 🟢        | Tous les tests unitaires passés avec succès.                   |
| **Routes** `/dashboard`, `/simulateur`, `/dossiers`, `/rdv` | 🟢 | Vérifiées manuellement sur l’application.                     |
| **Déploiement GH Pages**        | 🟢        | En ligne et fonctionnel → [Voir la démo](https://crea2code.github.io/caf-aides/) |
| **🧱 Architecture et maintenance** | 🟢 | Code refactorisé, SSR retiré, structure CSR optimisée.         |


💡 Adoption complète des Standalone Components Angular

🧭 Refactorisation du routing (app.routes.ts)

📁 Organisation par “features”

🧹 Nettoyage des fichiers obsolètes (app.html, app.scss)

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
> **Fin octobre 2025** — publication de la version stable v0.4.0  
> _(avec démo publique mise à jour sur GitHub Pages)_

---
