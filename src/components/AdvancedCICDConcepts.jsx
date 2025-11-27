import React, { useState } from 'react';
import { Flag, Code2, Server, Target, Shield, GitMerge, Container, Database } from 'lucide-react';

const AdvancedCICDConcepts = () => {
    const [activeConcept, setActiveConcept] = useState(0);

    const concepts = [
        {
            title: 'Feature Flags (Feature Toggles)',
            icon: Flag,
            color: 'purple',
            tagline: 'Déployer sans Activer',
            description: 'Les feature flags permettent de déployer du code en production sans l\'activer immédiatement. Le code est "caché" derrière un flag qui peut être activé/désactivé dynamiquement.',

            benefits: [
                'Déploiement progressif (10% utilisateurs → 50% → 100%)',
                'A/B testing pour tester différentes versions',
                'Rollback instantané sans redéploiement',
                'Développement de features longues sans bloquer le trunk',
                'Activation ciblée par segment d\'utilisateurs'
            ],

            example: `// React avec Feature Flag
import { useFeatureFlag } from 'flags-sdk';

function Dashboard() {
  const newDashboard = useFeatureFlag('new-dashboard-v2');

  return newDashboard
    ? <NewDashboardV2 />
    : <OldDashboard />;
}`,

            tools: ['LaunchDarkly', 'Unleash', 'Flagsmith', 'Split.io'],
            useCase: 'Essentiel pour Trunk-Based Development et déploiement continu'
        },

        {
            title: 'Infrastructure as Code (IaC)',
            icon: Code2,
            color: 'blue',
            tagline: 'Infrastructure = Code Versionné',
            description: 'L\'IaC consiste à définir votre infrastructure (serveurs, réseaux, bases de données) sous forme de code versionné, permettant automation et reproductibilité.',

            benefits: [
                'Infrastructure versionnée dans Git comme le code',
                'Environnements reproductibles identiques',
                'Automatisation complète du provisionnement',
                'Documentation vivante de l\'infrastructure',
                'Réduction des erreurs manuelles'
            ],

            example: `# Terraform - Définition d'un cluster Kubernetes
resource "aws_eks_cluster" "main" {
  name     = "gitflow-academy-cluster"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.27"

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
  }
}`,

            tools: ['Terraform', 'Pulumi', 'AWS CloudFormation', 'Ansible'],
            useCase: 'Créer/détruire environnements de test automatiquement pour chaque PR'
        },

        {
            title: 'Progressive Delivery',
            icon: Target,
            color: 'green',
            tagline: 'Déploiement Graduel et Sécurisé',
            description: 'Stratégie de déploiement qui déploie progressivement les nouvelles versions, en surveillant les métriques pour détecter les problèmes avant un rollout complet.',

            benefits: [
                'Risque minimisé par déploiement graduel',
                'Canary releases (1% → 5% → 25% → 100%)',
                'Blue/Green deployment (basculement instantané)',
                'Rollback automatique si métriques dégradées',
                'Impact limité en cas de bug critique'
            ],

            example: `# GitHub Actions - Canary Deployment
- name: Deploy Canary
  run: |
    kubectl set image deployment/app \\
      app=myapp:$\{{ github.sha }} \\
      --namespace=canary

- name: Monitor Metrics (5 min)
  run: ./scripts/check-error-rate.sh

- name: Promote to Production
  if: success()
  run: kubectl rollout promote deployment/app`,

            tools: ['Argo Rollouts', 'Flagger', 'Spinnaker', 'Harness'],
            useCase: 'Réduire le blast radius lors des déploiements en production'
        },

        {
            title: 'Environnements Dynamiques',
            icon: Container,
            color: 'orange',
            tagline: 'Un Env par Feature Branch',
            description: 'Créer automatiquement un environnement de test isolé pour chaque Pull Request, permettant de tester les changements dans un contexte réel avant le merge.',

            benefits: [
                'Test en conditions réelles avant merge',
                'Review visuel pour stakeholders non-techniques',
                'Tests E2E sur environnement dédié',
                'Isolation complète entre features',
                'Nettoyage automatique après merge'
            ],

            example: `# GitHub Actions - Env Dynamique avec Terraform
name: Preview Environment
on: pull_request

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Ephemeral Env
        run: |
          terraform workspace new pr-$\{{ github.event.number }}
          terraform apply -auto-approve

      - name: Comment PR with URL
        run: |
          echo "Preview: https://pr-$\{{ github.event.number }}.app.dev"`,

            tools: ['Terraform', 'Kubernetes Namespaces', 'Vercel', 'Netlify'],
            useCase: 'Valider visuellement chaque PR dans un environnement isolé'
        },

        {
            title: 'GitOps',
            icon: GitMerge,
            color: 'indigo',
            tagline: 'Git comme Source de Vérité',
            description: 'Paradigme où l\'état désiré de l\'infrastructure et des applications est déclaré dans Git. Des outils surveillent Git et synchronisent automatiquement l\'état réel.',

            benefits: [
                'Git devient la source unique de vérité',
                'Déploiement déclaratif (état désiré vs impératif)',
                'Audit trail complet via historique Git',
                'Rollback = git revert puis sync automatique',
                'Sécurité : cluster pull depuis Git (pas de push)'
            ],

            example: `# ArgoCD - Application GitOps
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: gitflow-academy
spec:
  source:
    repoURL: https://github.com/user/repo
    path: k8s/production
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,

            tools: ['ArgoCD', 'Flux', 'Jenkins X', 'Weave GitOps'],
            useCase: 'Gérer des déploiements Kubernetes de façon déclarative et auditable'
        },

        {
            title: 'Monitoring & Observabilité',
            icon: Database,
            color: 'yellow',
            tagline: 'Surveiller, Comprendre, Réagir',
            description: 'Collecter métriques, logs et traces pour comprendre le comportement des applications en production et détecter les problèmes rapidement.',

            benefits: [
                'Détection proactive des anomalies',
                'Dashboards temps réel (latence, erreurs, trafic)',
                'Alertes automatiques sur seuils critiques',
                'Traçabilité des requêtes (distributed tracing)',
                'Post-mortem basé sur données objectives'
            ],

            example: `# Prometheus - Alerting Rule
groups:
- name: app-alerts
  rules:
  - alert: HighErrorRate
    expr: |
      rate(http_requests_total{status=~"5.."}[5m]) > 0.05
    for: 2m
    annotations:
      summary: "Error rate > 5% for 2 minutes"
    labels:
      severity: critical`,

            tools: ['Prometheus', 'Grafana', 'Datadog', 'New Relic', 'Elastic Stack'],
            useCase: 'Détecter et diagnostiquer les incidents en production rapidement'
        }
    ];

    const currentConcept = concepts[activeConcept];
    const CurrentIcon = currentConcept.icon;

    return (
        <div id="advanced-cicd" className="py-24 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <Shield className="text-cyan-400" size={36} />
                        Concepts Avancés CI/CD
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                        Techniques modernes pour déployer plus rapidement, plus sûrement, et avec moins de risques.
                        Ces pratiques sont devenues essentielles dans l'industrie en 2025.
                    </p>
                </div>

                {/* Concept Navigation */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
                    {concepts.map((concept, index) => {
                        const Icon = concept.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveConcept(index)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all
                                    ${activeConcept === index
                                        ? `bg-${concept.color}-600 text-white shadow-xl scale-105`
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                <Icon size={24} />
                                <span className="text-xs font-semibold text-center leading-tight">
                                    {concept.title.split(' ')[0]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Concept Details */}
                <div className={`bg-gradient-to-br from-${currentConcept.color}-500/10 to-${currentConcept.color}-600/5
                    border-2 border-${currentConcept.color}-500/30 rounded-2xl p-8 transition-all duration-500`}>

                    {/* Header */}
                    <div className="flex items-start gap-6 mb-8">
                        <div className={`p-5 bg-${currentConcept.color}-500/20 rounded-2xl shrink-0`}>
                            <CurrentIcon size={56} className={`text-${currentConcept.color}-400`} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold text-white mb-2">
                                {currentConcept.title}
                            </h3>
                            <p className={`text-${currentConcept.color}-400 text-xl font-semibold mb-4`}>
                                {currentConcept.tagline}
                            </p>
                            <p className="text-slate-300 text-lg">
                                {currentConcept.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Benefits */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Server size={20} className={`text-${currentConcept.color}-400`} />
                                Avantages Clés
                            </h4>
                            <ul className="space-y-3">
                                {currentConcept.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3 text-slate-300">
                                        <div className={`w-6 h-6 rounded-full bg-${currentConcept.color}-500/20
                                            flex items-center justify-center shrink-0 mt-0.5`}>
                                            <span className={`text-${currentConcept.color}-400 text-xs font-bold`}>
                                                {index + 1}
                                            </span>
                                        </div>
                                        <span className="text-sm">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Code Example */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Code2 size={20} className={`text-${currentConcept.color}-400`} />
                                Exemple de Code
                            </h4>
                            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800">
                                    <span className="text-slate-500 text-xs font-mono">example.yaml</span>
                                </div>
                                <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed">
                                    {currentConcept.example}
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Tools & Use Case */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                            <h4 className="text-lg font-bold text-white mb-3">🛠️ Outils Populaires</h4>
                            <div className="flex flex-wrap gap-2">
                                {currentConcept.tools.map((tool, index) => (
                                    <span
                                        key={index}
                                        className={`px-3 py-1.5 bg-${currentConcept.color}-500/20
                                            text-${currentConcept.color}-300 rounded-lg text-sm font-semibold
                                            border border-${currentConcept.color}-500/30`}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                            <h4 className="text-lg font-bold text-white mb-3">💡 Cas d'Usage Typique</h4>
                            <p className="text-slate-300 text-sm">
                                {currentConcept.useCase}
                            </p>
                        </div>
                    </div>
                </div>

                {/* DevOps Market Stats */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <Server size={32} className="text-cyan-400 shrink-0" />
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">
                                    Marché DevOps en Croissance
                                </h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    Le marché DevOps devrait atteindre <strong className="text-cyan-400">$25.5 milliards d'ici 2028</strong>,
                                    avec une croissance annuelle de 19.7%.
                                </p>
                                <p className="text-slate-400 text-xs">
                                    Les concepts avancés CI/CD ne sont plus optionnels mais essentiels pour rester compétitif.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <Shield size={32} className="text-green-400 shrink-0" />
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">
                                    Progressive Delivery : Pratique Clé 2025
                                </h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    Le déploiement progressif avec feature flags est devenu une pratique standard pour
                                    <strong className="text-green-400"> minimiser les risques</strong> et garantir une expérience utilisateur fluide.
                                </p>
                                <p className="text-slate-400 text-xs">
                                    Combiner Feature Flags + Canary Deployment = Stratégie moderne ultime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedCICDConcepts;
