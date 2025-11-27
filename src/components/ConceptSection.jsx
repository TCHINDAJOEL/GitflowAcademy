import React from 'react';
import { GitBranch, GitMerge, Plus, CheckCircle, AlertCircle, Tag } from 'lucide-react';
import FeatureCard from './FeatureCard';

const ConceptSection = () => (
    <div id="concept" className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Les 5 Piliers du Gitflow</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Gitflow n'est pas juste un outil, c'est une constitution. Chaque branche a un rôle, une durée de vie et des règles d'interaction précises.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    title="Master / Main"
                    description="Le sanctuaire. Elle ne contient que du code de production stable. On n'y touche jamais directement, on y merge seulement."
                    icon={GitBranch}
                    color="text-red-500"
                />
                <FeatureCard
                    title="Develop"
                    description="La colonne vertébrale. C'est ici que l'histoire s'écrit au quotidien. Toutes les features partent d'ici et y reviennent."
                    icon={GitMerge}
                    color="text-blue-500"
                />
                <FeatureCard
                    title="Feature Branches"
                    description="Les chantiers temporaires. Pour chaque nouvelle fonctionnalité, on crée une branche isolée. Une fois finie, on la ferme."
                    icon={Plus}
                    color="text-purple-500"
                />
                <FeatureCard
                    title="Release Branches"
                    description="La zone de transit. Quand on est prêt à livrer, on gèle le code ici pour la stabilisation finale avant la production."
                    icon={CheckCircle}
                    color="text-green-500"
                />
                <FeatureCard
                    title="Hotfix Branches"
                    description="L'urgence vitale. Les seules branches autorisées à partir de Main pour corriger un bug critique en production immédiatement."
                    icon={AlertCircle}
                    color="text-orange-500"
                />
                <FeatureCard
                    title="Tags & Versions"
                    description="La mémoire. Chaque fusion vers Main crée un Tag (v1.0.0) pour marquer l'histoire et permettre les retours en arrière."
                    icon={Tag}
                    color="text-yellow-500"
                />
            </div>
        </div>
    </div>
);

export default ConceptSection;
