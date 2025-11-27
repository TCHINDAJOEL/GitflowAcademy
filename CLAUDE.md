# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gitflow Academy is an educational React application for learning and practicing the Gitflow branching model. The application is written in French and provides interactive visualizers to simulate git workflows. It's designed for deployment on GitHub Pages.

**Key Technologies:**
- React 19 with JSX
- Vite 7 (build tool)
- Tailwind CSS for styling
- Lucide React for icons
- Deployed via GitHub Pages (gh-pages package)

## Common Development Commands

### Development
```bash
npm run dev        # Start development server at http://localhost:5173
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

### Deployment
```bash
npm run deploy     # Build and deploy to GitHub Pages (runs predeploy automatically)
```

**Important:** Before deploying, ensure the `homepage` field in package.json has the correct GitHub username.

## Architecture

### Application Structure

The app follows a component-based architecture with a single-page layout:

**Main Entry Point:** `src/App.jsx` assembles all sections in sequence:
1. Navbar (navigation)
2. Hero (landing section)
3. ConceptSection (educational cards)
4. TutorialSection (step-by-step tutorials)
5. LabSection (Standard Lab simulator)
6. ExpertLabSection (Advanced Lab simulator)
7. CICDSection (CI/CD pipeline explanation)
8. GitflowVsTrunkComparison (Strategy comparison)
9. AdvancedCICDConcepts (Feature Flags, IaC, GitOps, etc.)
10. Footer

### Core Components

**Gitflow Visualizers (Interactive Simulators):**
- `StandardGitflowVisualizer.jsx` - Guided simulator with safety guardrails that prevents invalid Gitflow operations
- `AdvancedGitflowVisualizer.jsx` - Expert mode allowing parallel branches, conflicts, and cherry-picking

Both visualizers:
- Render interactive SVG-based git graphs
- Maintain commit history state with branch relationships
- Simulate version tagging (semantic versioning)
- Provide command-line-style feedback
- Auto-scroll horizontally as commits are added

**CI/CD Educational Components (New in 2025):**
- `CICDSection.jsx` - Interactive CI/CD pipeline visualizer with 3-stage simulation (Build → Test → Deploy)
- `GitflowVsTrunkComparison.jsx` - Interactive comparison of Gitflow vs Trunk-Based Development strategies
- `AdvancedCICDConcepts.jsx` - Deep-dive into modern DevOps practices (Feature Flags, IaC, GitOps, Progressive Delivery, etc.)

CI/CD components features:
- Tab-based navigation for exploring different concepts
- Real-time pipeline simulation with visual state transitions
- Code examples for each concept (React, Terraform, GitHub Actions, etc.)
- Industry statistics and market trends (DevOps market growth, success metrics)
- Tool recommendations for each practice

**State Management in Visualizers:**

Standard Lab:
- Uses fixed branch positions (y-coordinates defined in `BRANCHES_STD`)
- Enforces workflow rules (e.g., can't start release while feature is active)
- Automatically updates version numbers on release/hotfix merges
- Provides contextual guides based on active workflow state

Expert Lab:
- Dynamic branch creation with automatic y-position calculation
- Simulates merge conflicts (60% chance on feature→develop merges)
- Supports multiple simultaneous branches of the same type
- Allows cross-branch operations (cherry-pick, manual merges)

### SVG Rendering Logic

Both visualizers use a commit-based graph system:
- Each commit has: `id`, `x` (time position), `y` (branch position), `branch`, `type`, `parentId`, optionally `secondaryParentId` (for merges)
- Lines connect commits to parents using cubic Bézier curves for cross-branch connections
- Straight lines for same-branch connections
- Secondary parent lines (merge sources) are dashed

### Styling Approach

- Dark theme by default (`bg-slate-950`, `text-slate-200`)
- Consistent color coding:
  - Main: Red (`#ef4444`)
  - Hotfix: Orange (`#f97316`)
  - Release: Green (`#22c55e`)
  - Develop: Blue (`#3b82f6`)
  - Feature: Purple (`#d8b4fe`)
- Custom Tailwind utilities in `index.css` for buttons, cards, and animations

## Vite Configuration

The app uses a base path for GitHub Pages deployment:
```js
base: '/GitflowAcademy/'  // Must match repository name
```

This allows assets to load correctly when deployed to `https://<username>.github.io/GitflowAcademy/`.

## ESLint Configuration

Flat config format with:
- React Hooks plugin (enforces Hook rules)
- React Refresh plugin (HMR support)
- Custom rule: allows unused variables matching `^[A-Z_]` (constants pattern)

## Working with the Visualizers

When modifying visualizer logic:

1. **Commit Creation:** Always use the `createCommit` helper which:
   - Increments time counter
   - Sets up parent relationships
   - Returns the new commit for chaining

2. **State Recalculation:** `recalculateState()` in Standard Lab rebuilds active branch state from commit history (enables undo functionality)

3. **Branch Relationships:** Merges require both `parentId` (target branch head) and `secondaryParentId` (source branch head)

4. **Versioning:** Uses semantic versioning (major.minor.patch):
   - Releases increment minor version
   - Hotfixes increment patch version
   - Parse with `parseVersion()`, format with `formatVersion()`

## CI/CD Integration Knowledge

The application now includes comprehensive CI/CD education:

**Key Topics Covered:**
- CI/CD pipeline stages and automation
- Gitflow integration with modern DevOps practices
- Comparison of branching strategies (Gitflow vs Trunk-Based Development)
- Advanced concepts: Feature Flags, Infrastructure as Code, GitOps, Progressive Delivery
- Real-world tools and market statistics

**When to Use Which Strategy:**
- Gitflow: Structured releases, monolithic projects, complex dependencies, regulated environments
- Trunk-Based: Continuous deployment, microservices, rapid iteration, mature CI/CD

## Content Language

All user-facing content is in **French**. When adding features:
- Use French for UI labels, messages, and guides
- Follow existing terminology (e.g., "Lab" not "Laboratoire", "Hotfix" not "Correction urgente")
- Maintain informal "vous" form in explanatory text
- Technical terms (CI/CD, Feature Flags, GitOps) remain in English as industry standard

## Testing Considerations

No test framework is currently configured. When adding tests:
- Consider Vitest (Vite-native testing)
- Focus on visualizer state transitions and commit graph rendering logic
- Mock SVG rendering for unit tests
