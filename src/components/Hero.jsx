import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-8">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                v1.0.0 Stable Release
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8">
                Maîtrisez le flux <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Gitflow</span> sans douleur.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
                Comprenez enfin comment gérer vos branches, releases et hotfix grâce à notre simulateur interactif. Plus de théorie abstraite, pratiquez le workflow standard de l'industrie.
            </p>
            <div className="flex justify-center gap-4">
                <a href="#lab" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2">
                    Lancer le Simulateur <ArrowRight size={18} />
                </a>
                <a href="#tutorial" className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-8 py-3 rounded-lg font-bold transition-all border border-slate-700">
                    Apprendre d'abord
                </a>
            </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
    </div>
);

export default Hero;
