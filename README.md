# 🎓 Gitflow Academy

> **Maîtrisez le workflow Gitflow grâce à un simulateur interactif.**

Gitflow Academy est une application éducative conçue pour apprendre et pratiquer le modèle de branchement Gitflow. Elle combine théorie, tutoriels étape par étape et environnements de simulation (Lab) pour visualiser les interactions entre les branches.

![Gitflow Academy Hero](https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80)

## ✨ Fonctionnalités

- **📚 Tutoriels Complets** : Apprenez les concepts théoriques (Main, Develop, Feature, Release, Hotfix).
- **🧪 Lab Standard** : Un simulateur guidé pour pratiquer les commandes de base sans risque d'erreur.
- **🛡️ Lab Expert** : Un environnement libre pour gérer des scénarios complexes (conflits de fusion, cherry-picking, branches multiples).
- **🎨 Interface Moderne** : Une UI soignée avec Tailwind CSS, des animations fluides et un mode sombre par défaut.

## 🛠️ Stack Technique

- **Framework** : [React 18](https://react.dev/)
- **Build Tool** : [Vite](https://vitejs.dev/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Icons** : [Lucide React](https://lucide.dev/)

## 🚀 Installation et Démarrage

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

1. **Cloner le projet** (si ce n'est pas déjà fait) :
   ```bash
   git clone <votre-repo-url>
   cd GitflowAcademy
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   L'application sera accessible à l'adresse `http://localhost:5173`.

4. **Construire pour la production** :
   ```bash
   npm run build
   ```

## 🌍 Déploiement sur GitHub Pages

Le projet est pré-configuré pour être déployé sur GitHub Pages.

1. **Créer un dépôt sur GitHub** nommé `GitflowAcademy`.
2. **Lier le dépôt local au distant** :
   ```bash
   git remote add origin https://github.com/<VOTRE_USERNAME>/GitflowAcademy.git
   ```
3. **Mettre à jour `package.json`** :
   Remplacez `<USERNAME>` par votre nom d'utilisateur GitHub dans la ligne `"homepage"`.
4. **Déployer** :
   ```bash
   npm run deploy
   ```
   Cette commande va construire le projet et le pousser sur la branche `gh-pages`.

## 📂 Structure du Projet

```
src/
├── components/           # Composants React modulaires
│   ├── StandardGitflowVisualizer.jsx  # Logique du Lab Standard
│   ├── AdvancedGitflowVisualizer.jsx  # Logique du Lab Expert
│   ├── TutorialSection.jsx            # Contenu éducatif
│   ├── ConceptSection.jsx             # Cartes des concepts
│   └── ... (UI components: Navbar, Hero, Footer)
├── App.jsx              # Composant racine assemblant les sections
├── main.jsx             # Point d'entrée React
└── index.css            # Styles globaux et configuration Tailwind
```

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une Pull Request pour suggérer des améliorations.

---

*Conçu pour les développeurs, par des développeurs.*
