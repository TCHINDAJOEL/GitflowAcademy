import React from 'react';
import { GitMerge } from 'lucide-react';

const Footer = () => (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <GitMerge className="text-indigo-500 opacity-50" size={24} />
                <span className="text-slate-500 font-mono text-sm">© 2024 Gitflow Academy</span>
            </div>
            <div className="text-slate-600 text-sm">
                Conçu pour les développeurs, par des développeurs. <span className="text-slate-800">|</span> <span className="font-mono">git reset --hard head</span>
            </div>
        </div>
    </footer>
);

export default Footer;
