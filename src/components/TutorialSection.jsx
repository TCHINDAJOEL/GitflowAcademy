import React, { useState } from 'react';
import { BookOpen, RefreshCw, Github, Terminal, GitPullRequest, Users, Server } from 'lucide-react';

const TutorialSection = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: "Introduction",
            icon: BookOpen,
            content: (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Pourquoi Gitflow ?</h3>
                    <p className="text-slate-400">
                        Gitflow est un modèle de branchement strict conçu pour les projets avec des cycles de release planifiés. Il attribue des rôles spécifiques à différentes branches et définit comment elles doivent interagir.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h4 className="font-bold text-green-400 mb-2">Avantages</h4>
                            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                <li>Développement parallèle sans interférences</li>
                                <li>Collaboration structurée pour les grandes équipes</li>
                                <li>Gestion claire des versions (Hotfix vs Feature)</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h4 className="font-bold text-red-400 mb-2">Inconvénients</h4>
                            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                <li>Complexité accrue (trop de branches ?)</li>
                                <li>Pas idéal pour le déploiement continu (CI/CD)</li>
                                <li>Historique parfois difficile à lire</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Cycle de Vie",
            icon: RefreshCw,
            content: (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Le Cycle de Vie d'une Feature</h3>
                    <div className="relative border-l-2 border-slate-700 pl-6 ml-2 space-y-6">
                        <div className="relative">
                            <div className="absolute -left-[33px] bg-purple-500 rounded-full w-4 h-4 mt-1.5"></div>
                            <h4 className="font-bold text-purple-400">1. Création</h4>
                            <p className="text-sm text-slate-400">Départ depuis <code>develop</code>. La branche est isolée pour ne pas casser le code commun.</p>
                            <code className="block mt-2 bg-black p-2 rounded text-xs text-green-400 font-mono">git flow feature start login-page</code>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[33px] bg-blue-500 rounded-full w-4 h-4 mt-1.5"></div>
                            <h4 className="font-bold text-blue-400">2. Développement</h4>
                            <p className="text-sm text-slate-400">Commits réguliers. Tests locaux. Le travail avance sans impacter les autres.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[33px] bg-green-500 rounded-full w-4 h-4 mt-1.5"></div>
                            <h4 className="font-bold text-green-400">3. Finalisation</h4>
                            <p className="text-sm text-slate-400">Fusion vers <code>develop</code>. La branche feature est supprimée.</p>
                            <code className="block mt-2 bg-black p-2 rounded text-xs text-green-400 font-mono">git flow feature finish login-page</code>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "GitHub & PR",
            icon: Github,
            content: (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">L'Environnement GitHub</h3>
                    <p className="text-slate-400">
                        En équipe, on ne merge jamais directement en local. On passe par des <strong>Pull Requests (PR)</strong>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                            <GitPullRequest size={32} className="text-indigo-400 mb-3" />
                            <h4 className="font-bold text-white mb-2">Pull Request</h4>
                            <p className="text-xs text-slate-400">Une demande de fusion. "J'ai fini ma feature, pouvez-vous l'intégrer ?"</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                            <Users size={32} className="text-indigo-400 mb-3" />
                            <h4 className="font-bold text-white mb-2">Code Review</h4>
                            <p className="text-xs text-slate-400">Les collègues relisent le code, commentent et demandent des corrections avant validation.</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                            <Server size={32} className="text-indigo-400 mb-3" />
                            <h4 className="font-bold text-white mb-2">CI / Checks</h4>
                            <p className="text-xs text-slate-400">Des robots lancent les tests automatiques à chaque PR pour garantir la qualité.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Commandes",
            icon: Terminal,
            content: (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Cheat Sheet Gitflow</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="text-slate-200 border-b border-slate-700">
                                <tr>
                                    <th className="py-2">Action</th>
                                    <th className="py-2">Commande Git Flow</th>
                                    <th className="py-2">Equivalent Git Standard</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono text-xs">
                                <tr className="border-b border-slate-800">
                                    <td className="py-2 font-sans">Initier</td>
                                    <td className="py-2 text-green-400">git flow init</td>
                                    <td className="py-2 text-slate-500">git init, git branch...</td>
                                </tr>
                                <tr className="border-b border-slate-800">
                                    <td className="py-2 font-sans">Start Feature</td>
                                    <td className="py-2 text-green-400">git flow feature start X</td>
                                    <td className="py-2 text-slate-500">git checkout -b feature/X develop</td>
                                </tr>
                                <tr className="border-b border-slate-800">
                                    <td className="py-2 font-sans">Finish Feature</td>
                                    <td className="py-2 text-green-400">git flow feature finish X</td>
                                    <td className="py-2 text-slate-500">git checkout develop, git merge...</td>
                                </tr>
                                <tr className="border-b border-slate-800">
                                    <td className="py-2 font-sans">Start Release</td>
                                    <td className="py-2 text-green-400">git flow release start 1.0</td>
                                    <td className="py-2 text-slate-500">git checkout -b release/1.0 develop</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div id="tutorial" className="py-24 bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Tutoriel Complet</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Comprenez la théorie avant de passer à la pratique. Maîtrisez le cycle de vie complet et l'intégration avec GitHub.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Navigation Latérale */}
                    <div className="md:w-1/4 flex flex-col gap-2">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeStep === index
                                            ? 'bg-indigo-600 text-white shadow-lg'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {step.title}
                                </button>
                            );
                        })}
                    </div>

                    {/* Contenu Principal */}
                    <div className="md:w-3/4 bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl min-h-[400px]">
                        {steps[activeStep].content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialSection;
