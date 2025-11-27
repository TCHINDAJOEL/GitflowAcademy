import React, { useState } from 'react';
import { GitBranch, Zap, Building2, Rocket, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const GitflowVsTrunkComparison = () => {
    const [selectedStrategy, setSelectedStrategy] = useState('gitflow');

    const strategies = {
        gitflow: {
            name: 'Gitflow',
            icon: GitBranch,
            color: 'indigo',
            tagline: 'Structure et Contrôle',
            description: 'Modèle de branchement structuré avec branches dédiées pour features, releases et hotfixes.',

            pros: [
                'Gestion claire des versions et releases',
                'Idéal pour projets avec dépendances complexes',
                'Parallélisation du développement sans interférence',
                'Stabilisation avant production (branch release)',
                'Historique Git très lisible et organisé'
            ],

            cons: [
                'Complexité accrue (beaucoup de branches)',
                'Déploiements plus lents que trunk-based',
                'Nécessite plus de planification',
                'Chaque branche nécessite sa propre config CI/CD',
                'Risque de merge complexes si branches longues'
            ],

            bestFor: [
                'Projets monolithiques avec nombreuses dépendances',
                'Équipes distribuées géographiquement',
                'Releases planifiées et versionnées (ex: v1.2.0)',
                'Produits nécessitant phase de stabilisation',
                'Environnements réglementés (finance, santé)'
            ],

            cicdIntegration: 'Modéré',
            releaseFrequency: 'Hebdomadaire / Mensuelle',
            teamSize: 'Moyenne à Grande (5-50+ devs)',
            complexity: 'Élevée'
        },

        trunk: {
            name: 'Trunk-Based Development',
            icon: Zap,
            color: 'green',
            tagline: 'Vitesse et Agilité',
            description: 'Développement directement sur la branche principale (trunk/main) avec intégrations fréquentes et petits commits.',

            pros: [
                'Déploiement ultra-rapide (plusieurs fois par jour)',
                'Simplicité : une seule branche principale',
                'Intégration continue optimale',
                'Feedback immédiat sur les changements',
                'Réduit drastiquement les conflits de merge'
            ],

            cons: [
                'Requiert discipline et maturité d\'équipe',
                'Tests automatisés robustes OBLIGATOIRES',
                'Feature flags nécessaires pour features incomplètes',
                'Risque plus élevé si mauvaise pratique',
                'Difficile avec grandes équipes non alignées'
            ],

            bestFor: [
                'Startups et produits en développement rapide',
                'Environnements DevOps/Cloud-native',
                'Équipes agiles avec CI/CD mature',
                'SaaS avec déploiement continu',
                'Microservices avec faible couplage'
            ],

            cicdIntegration: 'Excellent',
            releaseFrequency: 'Quotidienne / Multiple par jour',
            teamSize: 'Petite à Moyenne (2-20 devs)',
            complexity: 'Faible'
        }
    };

    const currentStrategy = strategies[selectedStrategy];
    const CurrentIcon = currentStrategy.icon;

    return (
        <div id="gitflow-vs-trunk" className="py-24 bg-slate-950 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Gitflow vs Trunk-Based Development
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                        Deux philosophies de branchement aux objectifs différents.
                        Le choix dépend de votre contexte : taille d'équipe, fréquence de release, et maturité CI/CD.
                    </p>
                </div>

                {/* Strategy Selector */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setSelectedStrategy('gitflow')}
                        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all
                            ${selectedStrategy === 'gitflow'
                                ? 'bg-indigo-600 text-white shadow-xl scale-105'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        <GitBranch size={24} />
                        Gitflow
                    </button>
                    <button
                        onClick={() => setSelectedStrategy('trunk')}
                        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all
                            ${selectedStrategy === 'trunk'
                                ? 'bg-green-600 text-white shadow-xl scale-105'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        <Zap size={24} />
                        Trunk-Based
                    </button>
                </div>

                {/* Strategy Details */}
                <div className={`bg-gradient-to-br from-${currentStrategy.color}-500/10 to-${currentStrategy.color}-600/5
                    border-2 border-${currentStrategy.color}-500/30 rounded-2xl p-8 mb-12 transition-all duration-500`}>

                    <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 bg-${currentStrategy.color}-500/20 rounded-xl`}>
                            <CurrentIcon size={48} className={`text-${currentStrategy.color}-400`} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white">{currentStrategy.name}</h3>
                            <p className={`text-${currentStrategy.color}-400 text-lg font-semibold`}>
                                {currentStrategy.tagline}
                            </p>
                        </div>
                    </div>

                    <p className="text-slate-300 text-lg mb-8">
                        {currentStrategy.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Avantages */}
                        <div className="bg-slate-900/50 rounded-xl p-6 border border-green-500/20">
                            <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                                <CheckCircle size={20} />
                                Avantages
                            </h4>
                            <ul className="space-y-2">
                                {currentStrategy.pros.map((pro, index) => (
                                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                                        <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />
                                        {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Inconvénients */}
                        <div className="bg-slate-900/50 rounded-xl p-6 border border-red-500/20">
                            <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                <XCircle size={20} />
                                Inconvénients
                            </h4>
                            <ul className="space-y-2">
                                {currentStrategy.cons.map((con, index) => (
                                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                                        <XCircle size={16} className="text-red-500 mt-1 shrink-0" />
                                        {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Idéal Pour */}
                    <div className="mt-6 bg-slate-900/50 rounded-xl p-6 border border-yellow-500/20">
                        <h4 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                            <AlertTriangle size={20} />
                            Idéal Pour
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {currentStrategy.bestFor.map((use, index) => (
                                <div key={index} className="bg-slate-950 rounded-lg px-4 py-3 text-slate-300 text-sm border border-slate-800">
                                    {use}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-950 border-b border-slate-800">
                                <tr>
                                    <th className="text-left p-4 text-slate-400 font-semibold">Critère</th>
                                    <th className="text-center p-4">
                                        <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold">
                                            <GitBranch size={18} />
                                            Gitflow
                                        </div>
                                    </th>
                                    <th className="text-center p-4">
                                        <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
                                            <Zap size={18} />
                                            Trunk-Based
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-400 font-semibold">Intégration CI/CD</td>
                                    <td className="p-4 text-center text-yellow-400">Modéré</td>
                                    <td className="p-4 text-center text-green-400">Excellent</td>
                                </tr>
                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-400 font-semibold">Fréquence de Release</td>
                                    <td className="p-4 text-center text-slate-300">Hebdomadaire / Mensuelle</td>
                                    <td className="p-4 text-center text-slate-300">Quotidienne / Multiple par jour</td>
                                </tr>
                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-400 font-semibold">Taille d'Équipe Optimale</td>
                                    <td className="p-4 text-center text-slate-300">Moyenne à Grande (5-50+)</td>
                                    <td className="p-4 text-center text-slate-300">Petite à Moyenne (2-20)</td>
                                </tr>
                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-400 font-semibold">Complexité</td>
                                    <td className="p-4 text-center text-red-400">Élevée</td>
                                    <td className="p-4 text-center text-green-400">Faible</td>
                                </tr>
                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-400 font-semibold">Risque de Conflits</td>
                                    <td className="p-4 text-center text-yellow-400">Moyen-Élevé</td>
                                    <td className="p-4 text-center text-green-400">Très Faible</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-slate-400 font-semibold">Tests Automatisés</td>
                                    <td className="p-4 text-center text-slate-300">Recommandés</td>
                                    <td className="p-4 text-center text-orange-400">OBLIGATOIRES</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Key Insight */}
                <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
                    <div className="flex items-start gap-4">
                        <Building2 size={32} className="text-purple-400 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-xl font-bold text-white mb-3">
                                💡 Insight Clé : Évolution du Marché
                            </h4>
                            <p className="text-slate-300 mb-4">
                                En 2025, <strong className="text-purple-400">Trunk-Based Development</strong> est devenu la pratique recommandée
                                pour le CI/CD moderne. Cependant, <strong className="text-indigo-400">Gitflow reste pertinent</strong> pour
                                les projets monolithiques complexes ou les environnements nécessitant des releases structurées.
                            </p>
                            <p className="text-slate-400 text-sm">
                                Les organisations utilisant CI/CD affichent des taux d'échec 2.5x plus faibles et des temps de récupération 60x plus rapides.
                                Le choix de la stratégie doit s'aligner sur votre maturité DevOps et vos contraintes métier.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitflowVsTrunkComparison;
