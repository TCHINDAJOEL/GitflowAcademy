import React from 'react';
import { Terminal } from 'lucide-react';
import StandardGitflowVisualizer from './StandardGitflowVisualizer';

const LabSection = () => (
    <div id="lab" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Terminal className="text-green-500" /> Le Lab Interactif (Standard)
                    </h2>
                    <p className="text-slate-400">
                        Le mode guidé pour apprendre les bases. Sécurité maximale, impossible de se tromper.
                    </p>
                </div>
            </div>
            <StandardGitflowVisualizer />
        </div>
    </div>
);

export default LabSection;
