import React from 'react';
import { GitMerge, ShieldAlert } from 'lucide-react';

const Navbar = () => (
    <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                    <GitMerge className="text-indigo-500" size={28} />
                    <span className="text-white font-bold text-xl tracking-tight font-mono">Gitflow<span className="text-indigo-500">Academy</span></span>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-8">
                        <a href="#concept" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Concept</a>
                        <a href="#tutorial" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Tutoriel</a>
                        <a href="#lab" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Le Lab</a>
                        <a href="#expert" className="text-rose-400 hover:text-rose-300 px-3 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-1"><ShieldAlert size={14} /> Lab Expert</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;
