# Assurium Intelligence

Cockpit décisionnel nouvelle génération pour les professionnels de l'assurance : suivi de portefeuille, contrats, sinistres et échéances, enrichi d'un assistant IA et d'analyses visuelles avancées.

## Lancer le projet

```bash
npm install
npm run dev
```

L'application est servie sur [http://localhost:5173](http://localhost:5173).

Autres commandes utiles :

```bash
npm run build     # build de production (TypeScript + Vite)
npm run preview   # sert le build de production en local
npm run lint       # lint (oxlint)
```

## Stack technique

- **React 19 + TypeScript** — Vite comme bundler/dev server
- **Tailwind CSS** (mode `class` pour le dark mode) — design system custom (tokens de couleur, typographie, ombres, glassmorphism) dans `tailwind.config.js`
- **react-router-dom** — navigation entre les pages
- **recharts** — graphiques (courbes, barres, donuts, bubble chart)
- **lucide-react** — icônes
- **Context API** — thème clair/sombre (`ThemeContext`) et sélecteur de période global (`PeriodContext`)

## Fonctionnalités clés

- **Cockpit d'accueil** — message personnalisé, score de santé du portefeuille animé (`RadialScore`), résumé en langage naturel, bouton "Analyser mon portefeuille" avec animation puis insights.
- **Alya, l'assistante IA** — panneau flottant accessible partout dans l'app, suggestions dynamiques générées depuis les données réelles (échéances, sinistres à risque, opportunités), mini-chat avec réponses simulées par mots-clés (`src/utils/alya.ts`).
- **Vue portefeuille** — cartographie interactive des contrats (bulles : taille = prime, couleur = risque, position = couverture/statut), avec filtres et tooltip riche.
- **Sinistres immersifs** — fiche dédiée par sinistre (`/sinistres/:id`) avec timeline visuelle, délai de résolution estimé, prochaines étapes et carte "Prédiction IA" (probabilité de résolution, risque de fraude).
- **Opportunités** — détection automatique de cross-sell/fidélisation/conversion à partir du portefeuille (`src/utils/opportunities.ts`), avec modale de simulation de campagne.
- **Finitions** — dark mode complet, nombres animés (`AnimatedNumber`), sélecteur de période global, tooltips, transitions de page, états vides/chargement soignés.

## Structure du projet

```
src/
  components/
    layout/         Sidebar, Topbar, AppShell, centre de notifications (popover)
    ui/              Composants réutilisables (Card, StatusPill, StatCard, RadialScore,
                      AnimatedNumber, Tooltip, Modal, PeriodSelector, Skeleton...)
    charts/          Graphiques recharts (primes, sinistres, portefeuille, bubble chart)
    alya/            Assistant IA flottant
    opportunities/   Modale de simulation de campagne
  context/           ThemeContext (dark mode), PeriodContext (période globale)
  pages/             Une page par route (Dashboard, Clients, ClientDetail, Contracts, Claims,
                      ClaimDetail, Portfolio, Opportunities, Notifications, Analytics)
  data/              Données mockées réalistes (clients, contrats, sinistres, notifications)
  types/             Types TypeScript partagés (Client, Contract, Claim, AppNotification...)
  utils/             Formatage, métriques, détection d'opportunités, prédictions IA, classnames
```

## Données

Toutes les données sont mockées localement dans `src/data/` (24 clients, ~54 contrats, 18 sinistres, 14 notifications), avec des dates cohérentes autour de la date du jour pour illustrer des échéances et sinistres réalistes.

Les fonctions d'accès (`getClientById`, `getContractsByClient`, etc.) et de calcul (`src/utils/metrics.ts`, `src/utils/opportunities.ts`, `src/utils/claimPrediction.ts`) sont isolées des composants : brancher une vraie API ou un vrai moteur IA revient à remplacer ces fonctions par des appels réseau, sans toucher aux pages ou composants.

## Notes de design

- Palette : bleu nuit (`ink`), blanc cassé légèrement teinté (`paper`), gris clair (`mist`), turquoise électrique (`signal`), violet/bleu électrique (`iris`) — définie dans `tailwind.config.js`.
- Typographie : **Manrope** (titres, chiffres clés), **Inter** (texte courant), **IBM Plex Mono** en chiffres tabulaires pour tous les montants et références de contrats/sinistres.
- Glassmorphism utilisé avec parcimonie (hero, panneau Alya, modales) ; dégradés subtils (`bg-aurora`) en arrière-plan des cartes signature.
- Dark mode complet piloté par la classe `dark` sur `<html>`, persisté en `localStorage`, avec un jeu de couleurs dédié pour graphiques et surfaces.
- États couverts : chargement (`Skeleton`), vide (`EmptyState`), erreur (client/sinistre introuvable), survol, sélection et transitions de page.
