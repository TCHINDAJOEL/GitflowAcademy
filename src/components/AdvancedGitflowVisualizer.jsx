import React, { useState, useEffect, useRef } from 'react';
import {
    ShieldAlert, GitBranch, AlertTriangle, RotateCcw, Plus, CheckCircle, AlertCircle, Info, CheckSquare, Terminal, Zap, BookOpen
} from 'lucide-react';

const AdvancedGitflowVisualizer = () => {
    const [commits, setCommits] = useState([]);
    const [branches, setBranches] = useState([]);
    const [currentBranchId, setCurrentBranchId] = useState('develop');
    const [time, setTime] = useState(0);
    const [messages, setMessages] = useState([]);
    const [conflictState, setConflictState] = useState(null);
    const [explanation, setExplanation] = useState({ title: "Prêt", text: "Initialisez le dépôt pour commencer." });
    const scrollRef = useRef(null);

    const BASE_SLOTS = { main: 60, develop: 350 };

    const getBranchColor = (type) => {
        switch (type) {
            case 'main': return '#ef4444';
            case 'hotfix': return '#f97316';
            case 'release': return '#22c55e';
            case 'develop': return '#3b82f6';
            case 'feature': return '#d8b4fe';
            default: return '#94a3b8';
        }
    };

    useEffect(() => { initExpertLab(); }, []);
    useEffect(() => { if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth; }, [commits]);

    const addLog = (cmd, desc, guideTitle = "", guideText = "") => {
        setMessages(prev => [{ id: Date.now() + Math.random(), cmd, desc }, ...prev].slice(0, 10));
        if (guideTitle) setExplanation({ title: guideTitle, text: guideText });
    };

    const initExpertLab = () => {
        const initTime = 50;
        setTime(initTime);
        const c1 = { id: 'c1' + Math.random(), x: 50, y: BASE_SLOTS.main, branchId: 'main', color: getBranchColor('main'), type: 'init', tag: 'v1.0.0' };
        const c2 = { id: 'c2' + Math.random(), x: 50, y: BASE_SLOTS.develop, branchId: 'develop', color: getBranchColor('develop'), type: 'init', parentId: c1.id };
        setCommits([c1, c2]);
        setBranches([
            { id: 'main', name: 'main', type: 'main', headId: c1.id, y: BASE_SLOTS.main },
            { id: 'develop', name: 'develop', type: 'develop', headId: c2.id, y: BASE_SLOTS.develop }
        ]);
        setCurrentBranchId('develop');
        setMessages([{ id: 1, cmd: 'git init', desc: 'Repo expert initialized' }]);
        setExplanation({ title: "Mode Expert", text: "Ici, pas de garde-fous. Vous pouvez créer plusieurs releases en parallèle, merger des features entre elles, ou cherry-pick des commits. Attention aux conflits !" });
    };

    const createBranch = (type) => {
        const parentBranch = branches.find(b => b.id === currentBranchId);
        if (!parentBranch) return;

        let newY = 340;
        const existingTypeCount = branches.filter(b => b.type === type).length;

        if (type === 'feature') newY = 420 + (existingTypeCount * 60);
        if (type === 'release') newY = 280 - (existingTypeCount * 40);
        if (type === 'hotfix') newY = 130 + (existingTypeCount * 40);

        const branchName = `${type}/${Date.now().toString().slice(-4)}`;
        const newBranch = { id: branchName + Math.random(), name: branchName, type: type, headId: parentBranch.headId, y: newY };

        setBranches(prev => [...prev, newBranch]);
        setCurrentBranchId(newBranch.id);

        const newTime = time + 60;
        setTime(newTime);
        const startCommit = {
            id: `c-${Date.now() + Math.random()}`, x: newTime, y: newY, branchId: newBranch.id,
            color: getBranchColor(type), type: 'start', parentId: parentBranch.headId
        };

        setCommits(prev => [...prev, startCommit]);

        let guideT = `Branche ${type} créée`;
        let guideD = `Vous travaillez maintenant sur une branche isolée.`;
        if (type === 'release') guideD += " Utilisez cette branche pour stabiliser la version. Attention : en créer plusieurs en parallèle est risqué !";

        addLog(`git checkout -b ${branchName}`, `Created ${type} branch`, guideT, guideD);
    };

    const makeCommit = () => {
        const currentB = branches.find(b => b.id === currentBranchId);
        if (!currentB) return;
        const newTime = time + 60;
        setTime(newTime);
        const newCommit = {
            id: `c-${Date.now() + Math.random()}`, x: newTime, y: currentB.y, branchId: currentB.id,
            color: getBranchColor(currentB.type), type: 'commit', parentId: currentB.headId
        };
        setCommits(prev => [...prev, newCommit]);
        setBranches(prev => prev.map(b => b.id === currentB.id ? { ...b, headId: newCommit.id } : b));
        addLog(`git commit -m "..."`, 'Commit added', "Commit standard", "L'unité de base de votre historique.");
    };

    const handleMerge = (targetBranchId) => {
        if (conflictState) return;
        const sourceB = branches.find(b => b.id === currentBranchId);

        let targetB = branches.find(b => b.id === targetBranchId);
        if (!targetB) {
            targetB = branches.find(b => b.id.includes(targetBranchId) || b.name === targetBranchId);
        }

        if (!sourceB || !targetB) return;

        const isRiskyMerge = sourceB.type === 'feature' && targetB.id.includes('develop');
        if (isRiskyMerge && Math.random() > 0.6) {
            setConflictState({ source: sourceB, target: targetB });
            addLog(`git merge ${sourceB.name}`, 'CONFLICT!', "Conflit de fusion", "Git ne peut pas fusionner automatiquement les changements. Vous devez résoudre les conflits manuellement.");
            return;
        }
        executeMerge(sourceB, targetB);
    };

    const executeMerge = (sourceB, targetB) => {
        const newTime = time + 60;
        setTime(newTime);
        const mergeCommit = {
            id: `c-${Date.now() + Math.random()}`, x: newTime, y: targetB.y, branchId: targetB.id,
            color: getBranchColor(targetB.type), type: 'merge',
            parentId: targetB.headId, secondaryParentId: sourceB.headId
        };
        setCommits(prev => [...prev, mergeCommit]);
        setBranches(prev => prev.map(b => b.id === targetB.id ? { ...b, headId: mergeCommit.id } : b));
        setCurrentBranchId(targetB.id);
        setConflictState(null);
        addLog(`git merge ${sourceB.name}`, `Merged into ${targetB.name}`, "Fusion réussie", "Les historiques ont été réunis.");
    };

    const handleResolveConflict = () => {
        if (!conflictState) return;
        executeMerge(conflictState.source, conflictState.target);
        addLog('git add . && git commit', 'Conflict resolved', "Conflit résolu", "Vous avez choisi manuellement quelles versions du code garder.");
    };

    const handleCherryPick = () => {
        const newTime = time + 60;
        setTime(newTime);
        const current = branches.find(b => b.id === currentBranchId);
        const cpCommit = {
            id: `c-${Date.now() + Math.random()}`, x: newTime, y: current.y, branchId: current.id,
            color: getBranchColor(current.type), type: 'cherry', parentId: current.headId
        };
        setCommits(prev => [...prev, cpCommit]);
        setBranches(prev => prev.map(b => b.id === current.id ? { ...b, headId: cpCommit.id } : b));
        addLog(`git cherry-pick <hash>`, 'Cherry-pick success', "Cherry-Pick", "Vous avez copié un commit spécifique d'une autre branche sans tout fusionner. Utile pour récupérer un fix précis.");
    };

    const renderExpertLine = (startCommit, endCommitId, isSecondary) => {
        const endCommit = commits.find(c => c.id === endCommitId);
        if (!endCommit) return null;
        const isStraight = startCommit.y === endCommit.y;
        const pathData = isStraight
            ? `M ${endCommit.x} ${endCommit.y} L ${startCommit.x} ${startCommit.y}`
            : `M ${endCommit.x} ${endCommit.y} C ${endCommit.x + 40} ${endCommit.y}, ${startCommit.x - 40} ${startCommit.y}, ${startCommit.x} ${startCommit.y}`;
        return <path key={`line-${startCommit.id}-${endCommit.id}`} d={pathData} stroke={isSecondary ? endCommit.color : startCommit.color} strokeWidth={isSecondary ? "1.5" : "2.5"} strokeDasharray={isSecondary ? "3,3" : "0"} fill="none" opacity={isSecondary ? "0.6" : "0.9"} />;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
            <div className="lg:col-span-3 flex flex-col bg-slate-950 rounded-xl shadow-2xl overflow-hidden border border-slate-800">
                <div className="bg-slate-900 p-4 flex justify-between items-center border-b border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-rose-500">
                            <ShieldAlert size={20} />
                            <span className="font-mono font-bold tracking-wider">EXPERT LAB</span>
                        </div>
                        <div className="bg-slate-800 px-3 py-1 rounded border border-slate-700 flex items-center gap-2">
                            <GitBranch size={14} className="text-slate-400" />
                            <select
                                value={currentBranchId}
                                onChange={(e) => setCurrentBranchId(e.target.value)}
                                className="bg-transparent text-sm font-mono outline-none text-blue-400 font-bold cursor-pointer"
                            >
                                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {conflictState && <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded border border-red-500/50 animate-pulse text-xs font-bold"><AlertTriangle size={14} /> CONFLICT !</div>}
                        <button onClick={initExpertLab} className="text-slate-500 hover:text-white transition-colors"><RotateCcw size={16} /></button>
                    </div>
                </div>

                <div className="bg-slate-900/50 p-2 border-b border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex flex-col gap-1 p-1">
                        <span className="text-[9px] text-slate-500 font-mono uppercase">Créer Branche</span>
                        <div className="flex gap-1">
                            <button onClick={() => createBranch('feature')} className="btn-icon-xs bg-purple-500/20 text-purple-400 hover:bg-purple-500/40" title="New Feature"><Plus size={14} /></button>
                            <button onClick={() => createBranch('release')} className="btn-icon-xs bg-green-500/20 text-green-400 hover:bg-green-500/40" title="New Release"><CheckCircle size={14} /></button>
                            <button onClick={() => createBranch('hotfix')} className="btn-icon-xs bg-orange-500/20 text-orange-400 hover:bg-orange-500/40" title="New Hotfix"><AlertCircle size={14} /></button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                        <span className="text-[9px] text-slate-500 font-mono uppercase">Actions</span>
                        <div className="flex gap-1">
                            <button onClick={makeCommit} disabled={conflictState} className="btn-xs bg-blue-600 hover:bg-blue-500 w-full">Commit</button>
                            <button onClick={handleCherryPick} disabled={conflictState} className="btn-xs bg-slate-700 hover:bg-slate-600 w-full">🍒 Pick</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                        <span className="text-[9px] text-slate-500 font-mono uppercase">Merges</span>
                        <div className="flex gap-1">
                            <button onClick={() => handleMerge('develop')} disabled={conflictState || currentBranchId.includes('develop')} className="btn-xs bg-slate-700 hover:bg-slate-600 w-full">To Dev</button>
                            <button onClick={() => handleMerge('main')} disabled={conflictState || currentBranchId.includes('main')} className="btn-xs bg-slate-700 hover:bg-slate-600 w-full">To Main</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                        <span className="text-[9px] text-slate-500 font-mono uppercase">Urgence</span>
                        <div className="flex gap-1">
                            {conflictState ? (
                                <button onClick={handleResolveConflict} className="btn-xs bg-red-600 hover:bg-red-500 w-full animate-pulse text-white">RESOLVE</button>
                            ) : (
                                <div className="text-[10px] text-slate-600 flex items-center justify-center w-full bg-slate-800 rounded italic">Pas de conflit</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative h-[400px] overflow-x-auto bg-[#0a0a0a]" ref={scrollRef}>
                    <svg height="600" width={Math.max(800, time + 200)} className="absolute top-0 left-0 min-w-full">
                        {branches.map(b => (
                            <g key={b.id}>
                                <line x1="0" y1={b.y} x2="10000" y2={b.y} stroke="#334155" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />
                                <text x="10" y={b.y - 8} fill={getBranchColor(b.type)} fontSize="9" fontFamily="monospace" className="opacity-50">{b.name}</text>
                            </g>
                        ))}
                        {commits.map(commit => (
                            <React.Fragment key={`explines-${commit.id}`}>
                                {commit.parentId && renderExpertLine(commit, commit.parentId, false)}
                                {commit.secondaryParentId && renderExpertLine(commit, commit.secondaryParentId, true)}
                            </React.Fragment>
                        ))}
                        {commits.map((commit) => (
                            <g key={commit.id} transform={`translate(${commit.x}, ${commit.y})`}>
                                <circle r="5" fill="#0a0a0a" stroke={commit.color} strokeWidth="2" />
                                {commit.type === 'start' && <circle r="2" fill={commit.color} />}
                                {commit.type === 'cherry' && <circle r="2" fill="#fff" />}
                                {commit.tag && (
                                    <g transform="translate(0, -15)">
                                        <rect x="-18" y="-10" width="36" height="14" rx="2" fill="#334155" />
                                        <text x="0" y="0" textAnchor="middle" fill="#fff" fontSize="8">{commit.tag}</text>
                                    </g>
                                )}
                                {branches.find(b => b.headId === commit.id)?.id === currentBranchId && (
                                    <circle r="8" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2,2" className="animate-spin-slow" />
                                )}
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><BookOpen size={64} className="text-indigo-500" /></div>
                    <h4 className="text-indigo-400 font-mono font-bold mb-2 flex items-center gap-2">
                        <Info size={16} /> {explanation.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {explanation.text}
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <h4 className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Zap size={12} className="text-green-500" /> Capacités Débloquées
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-400 font-mono">
                        <li className="flex items-center gap-2"><CheckSquare size={12} className="text-green-500" /> <span>Multi-branches simultanées</span></li>
                        <li className="flex items-center gap-2"><CheckSquare size={12} className="text-green-500" /> <span>Simulation de Conflits</span></li>
                        <li className="flex items-center gap-2"><CheckSquare size={12} className="text-green-500" /> <span>Cherry-picking</span></li>
                        <li className="flex items-center gap-2"><CheckSquare size={12} className="text-green-500" /> <span>Workflow Hotfix // Release</span></li>
                    </ul>
                </div>

                <div className="bg-black p-3 font-mono text-[10px] text-slate-500 h-48 overflow-y-auto border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-slate-600 uppercase">
                        <Terminal size={10} /> Expert Console
                    </div>
                    {messages.map(m => (
                        <div key={m.id} className="flex flex-col border-b border-slate-900/50 py-1">
                            <span className="text-yellow-600">$ {m.cmd}</span>
                            <span className="text-slate-500 pl-2"># {m.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvancedGitflowVisualizer;
