import React from 'react';
import { ShieldAlert } from 'lucide-react';
import AdvancedGitflowVisualizer from './AdvancedGitflowVisualizer';

const ExpertLabSection = () => (
    <div id="expert" className="bg-slate-950 border-t border-slate-800 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-rose-900/20 p-2 rounded-lg border border-rose-700/50 shadow-lg">
                            <ShieldAlert className="text-rose-500" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Expert Laboratory</h3>
                    </div>
                    <p className="text-slate-400 max-w-xl">
                        Zone de vol libre. Gérez plusieurs branches en parallèle, résolvez des conflits de fusion et manipulez l'historique. <span className="text-rose-400 font-bold">Attention : Risque d'erreurs élevé.</span>
                    </p>
                </div>
            </div>
            <AdvancedGitflowVisualizer />
        </div>
    </div>
);

export default ExpertLabSection;
