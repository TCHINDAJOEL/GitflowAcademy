import React from 'react';

const FeatureCard = ({ title, description, icon: Icon, color }) => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1">
        <div className={`w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-700`}>
            <Icon className={color} size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2 font-mono">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
);

export default FeatureCard;
