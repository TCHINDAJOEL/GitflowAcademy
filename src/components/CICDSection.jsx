import React, { useState } from 'react';
import { Cpu, TestTube, Rocket, GitBranch, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

const CICDSection = () => {
    const [activeStage, setActiveStage] = useState(0);
    const [pipelineRunning, setPipelineRunning] = useState(false);

    const stages = [
        {
            name: 'Build',
            icon: Cpu,
            color: 'blue',
            description: 'Compilation du code source',
            details: 'Le code est récupéré du dépôt, les dépendances sont installées, et le projet est compilé en artefacts déployables.',
            tasks: ['git clone', 'npm install', 'npm run build', 'Création artefact'],
            duration: '2-5 min'
        },
        {
            name: 'Test',
            icon: TestTube,
            color: 'yellow',
            description: 'Tests automatisés',
            details: 'Exécution de tests unitaires, d\'intégration et de régression pour garantir la qualité du code.',
            tasks: ['Tests unitaires', 'Tests intégration', 'Analyse qualité', 'Coverage report'],
            duration: '5-10 min'
        },
        {
            name: 'Deploy',
            icon: Rocket,
            color: 'green',
            description: 'Déploiement en production',
            details: 'L\'application testée est déployée sur les serveurs ou plateformes cloud pour être accessible aux utilisateurs.',
            tasks: ['Build Docker image', 'Push vers registry', 'Deploy Kubernetes', 'Health check'],
            duration: '3-8 min'
        }
    ];

    const simulatePipeline = () => {
        setPipelineRunning(true);
        setActiveStage(0);

        const interval = setInterval(() => {
            setActiveStage(prev => {
                if (prev < stages.length - 1) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    setPipelineRunning(false);
                    return prev;
                }
            });
        }, 2000);
    };

    const getStageStatus = (index) => {
        if (!pipelineRunning && activeStage === 0) return 'pending';
        if (index < activeStage) return 'success';
        if (index === activeStage && pipelineRunning) return 'running';
        return 'pending';
    };

    return (
        <div id="cicd" className="py-24 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <Zap className="text-yellow-500" size={36} />
                        CI/CD : Intégration & Déploiement Continus
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                        Le CI/CD automatise le processus de développement : de l'écriture du code jusqu'à la mise en production.
                        Comprendre le CI/CD est essentiel pour maîtriser Gitflow dans un contexte professionnel moderne.
                    </p>
                </div>

                {/* CI vs CD Explanation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-indigo-400 mb-3 flex items-center gap-2">
                            <GitBranch size={20} />
                            Continuous Integration (CI)
                        </h3>
                        <p className="text-slate-300 text-sm mb-4">
                            L'intégration continue consiste à fusionner fréquemment le code des développeurs dans une branche principale,
                            suivi de builds et tests automatisés.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                Détection rapide des bugs
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                Réduction des conflits de merge
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                Tests automatisés à chaque commit
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-950 border border-green-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                            <Rocket size={20} />
                            Continuous Deployment (CD)
                        </h3>
                        <p className="text-slate-300 text-sm mb-4">
                            Le déploiement continu étend le CI en déployant automatiquement chaque changement validé
                            directement en production.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                Livraison plus rapide des fonctionnalités
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                Réduction du risque par petits incréments
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                Feedback utilisateur immédiat
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Pipeline Visualization */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-8 mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold text-white">Pipeline CI/CD Interactif</h3>
                        <button
                            onClick={simulatePipeline}
                            disabled={pipelineRunning}
                            className="btn-primary bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {pipelineRunning ? 'Pipeline en cours...' : 'Lancer le Pipeline'}
                        </button>
                    </div>

                    {/* Visual Pipeline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stages.map((stage, index) => {
                            const Icon = stage.icon;
                            const status = getStageStatus(index);

                            return (
                                <div
                                    key={stage.name}
                                    className={`relative border-2 rounded-xl p-6 transition-all duration-500 cursor-pointer
                                        ${status === 'success' ? 'border-green-500 bg-green-500/10' : ''}
                                        ${status === 'running' ? 'border-yellow-500 bg-yellow-500/10 animate-pulse' : ''}
                                        ${status === 'pending' ? 'border-slate-700 bg-slate-900/50' : ''}
                                    `}
                                    onClick={() => !pipelineRunning && setActiveStage(index)}
                                >
                                    {/* Status Indicator */}
                                    <div className="absolute -top-3 -right-3">
                                        {status === 'success' && (
                                            <CheckCircle size={24} className="text-green-500 bg-slate-950 rounded-full" />
                                        )}
                                        {status === 'running' && (
                                            <Clock size={24} className="text-yellow-500 bg-slate-950 rounded-full animate-spin" />
                                        )}
                                        {status === 'pending' && (
                                            <div className="w-6 h-6 border-2 border-slate-700 rounded-full bg-slate-950"></div>
                                        )}
                                    </div>

                                    {/* Stage Content */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <Icon size={28} className={`text-${stage.color}-400`} />
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{stage.name}</h4>
                                            <p className="text-xs text-slate-500">{stage.duration}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-400 mb-3">
                                        {stage.description}
                                    </p>

                                    <div className="space-y-1">
                                        {stage.tasks.map((task, i) => (
                                            <div
                                                key={i}
                                                className={`text-xs font-mono px-2 py-1 rounded transition-all duration-300
                                                    ${status === 'success' ? 'bg-green-500/20 text-green-300' : ''}
                                                    ${status === 'running' ? 'bg-yellow-500/20 text-yellow-300' : ''}
                                                    ${status === 'pending' ? 'bg-slate-800 text-slate-500' : ''}
                                                `}
                                            >
                                                {task}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Stage Details */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-white mb-3">
                            Détails : {stages[activeStage].name}
                        </h4>
                        <p className="text-slate-300 text-sm">
                            {stages[activeStage].details}
                        </p>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-indigo-400 mb-2">2.5x</div>
                        <p className="text-slate-300 text-sm">
                            Taux d'échec des changements plus faible avec CI/CD
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-green-400 mb-2">60x</div>
                        <p className="text-slate-300 text-sm">
                            Récupération plus rapide en cas de problème
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-yellow-400 mb-2">$25.5B</div>
                        <p className="text-slate-300 text-sm">
                            Marché DevOps projeté pour 2028 (croissance 19.7%)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CICDSection;
