import React, { useState, useEffect, useRef } from 'react';
import {
    Plus, CheckCircle, AlertCircle, RotateCcw, Trash2, Info, Bug, Terminal, Tag
} from 'lucide-react';

// --- CONFIGURATION LAB STANDARD ---
const BRANCHES_STD = {
    main: { y: 60, color: '#ef4444', label: 'Main', desc: 'Production Stable' },
    hotfix: { y: 130, color: '#f97316', label: 'Hotfix', desc: 'Correction urgente' },
    release: { y: 200, color: '#22c55e', label: 'Release', desc: 'Préparation version' },
    develop: { y: 270, color: '#3b82f6', label: 'Develop', desc: 'Intégration continue' },
    feature: { y: 340, color: '#d8b4fe', label: 'Feature', desc: 'Nouvelles fonctions' },
};

const GUIDES_STD = {
    init: "1. Branche Principale (Main) : Contient uniquement du code stable, prêt pour la production.\n2. Branche de Développement (Develop) : C'est la branche d'intégration pour tout le travail en cours.",
    feature: "3. Feature Branch : Le développement des nouvelles fonctionnalités OU les corrections de bogues se déroulent ici. Une fois terminé et testé, on fusionne dans 'develop'.",
    release: "4. Release Branch : Créée pour préparer la production. C'est ici que les corrections de bogues et ajustements mineurs finaux sont effectués (Stabilisation). Une fois finalisée, elle part dans 'main' et 'develop'.",
    hotfix: "5. Hotfix : Pour les correctifs urgents APRES déploiement. Une période de stabilisation peut suivre un grand déploiement, nécessitant ces patchs rapides. Fusionnés vers 'main' et 'develop'."
};

const StandardGitflowVisualizer = () => {
    const [commits, setCommits] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeBranches, setActiveBranches] = useState({ feature: false, release: false, hotfix: false });
    const [currentVersion, setCurrentVersion] = useState({ major: 0, minor: 1, patch: 0 });
    const [activeGuide, setActiveGuide] = useState(GUIDES_STD.init);
    const scrollRef = useRef(null);
    const commitsRef = useRef([]);
    const timeRef = useRef(0);
    const [time, setTime] = useState(0);

    useEffect(() => { resetSimulation(); }, []);
    useEffect(() => { if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth; }, [commits]);

    const formatVersion = (v) => `v${v.major}.${v.minor}.${v.patch}`;
    const parseVersion = (tag) => {
        const match = tag.match(/v(\d+)\.(\d+)\.(\d+)/);
        if (match) return { major: parseInt(match[1]), minor: parseInt(match[2]), patch: parseInt(match[3]) };
        return { major: 0, minor: 1, patch: 0 };
    };

    const recalculateState = (commitList) => {
        const newActive = { feature: false, release: false, hotfix: false };
        let lastTag = 'v0.1.0';
        commitList.forEach(c => {
            if (c.type === 'start') {
                if (c.branch === 'feature') newActive.feature = true;
                if (c.branch === 'release') newActive.release = true;
                if (c.branch === 'hotfix') newActive.hotfix = true;
            } else if (c.type === 'merge') {
                const sourceParent = commitList.find(p => p.id === c.secondaryParentId);
                if (sourceParent) {
                    if (sourceParent.branch === 'feature') newActive.feature = false;
                    if (sourceParent.branch === 'release') newActive.release = false;
                    if (sourceParent.branch === 'hotfix') newActive.hotfix = false;
                }
            }
            if (c.tag) lastTag = c.tag;
        });
        setActiveBranches(newActive);
        setCurrentVersion(parseVersion(lastTag));
        commitsRef.current = commitList;
        if (commitList.length > 0) {
            const lastTime = commitList[commitList.length - 1].x;
            setTime(lastTime);
            timeRef.current = lastTime;
        } else {
            setTime(50);
            timeRef.current = 50;
        }
        if (newActive.hotfix) setActiveGuide(GUIDES_STD.hotfix);
        else if (newActive.release) setActiveGuide(GUIDES_STD.release);
        else if (newActive.feature) setActiveGuide(GUIDES_STD.feature);
        else setActiveGuide(GUIDES_STD.init);
    };

    const addMessage = (text) => setMessages(prev => [{ id: Date.now() + Math.random(), text }, ...prev].slice(0, 5));

    const createCommit = (branch, type, mergeSourceId = null, tag = null) => {
        const newTime = timeRef.current + 60;
        timeRef.current = newTime;
        setTime(newTime);
        const lastOnBranch = commitsRef.current.filter(c => c.branch === branch).pop();
        let parentId = null;
        let secondaryParentId = null;
        if (type === 'merge') {
            parentId = lastOnBranch ? lastOnBranch.id : null;
            secondaryParentId = mergeSourceId;
        } else {
            parentId = type === 'start' ? mergeSourceId : (lastOnBranch ? lastOnBranch.id : null);
        }
        const newCommit = {
            id: Date.now() + Math.random(),
            branch, x: newTime, y: BRANCHES_STD[branch].y,
            type, parentId, secondaryParentId, tag,
            color: BRANCHES_STD[branch].color
        };
        const newCommitsList = [...commitsRef.current, newCommit];
        commitsRef.current = newCommitsList;
        setCommits(newCommitsList);
        if (tag) setCurrentVersion(parseVersion(tag));
        return newCommit;
    };

    const resetSimulation = () => {
        const initMain = { id: 1, branch: 'main', x: 50, y: BRANCHES_STD.main.y, type: 'init', color: BRANCHES_STD.main.color, tag: 'v0.1.0', parentId: null };
        const initDev = { id: 2, branch: 'develop', x: 50, y: BRANCHES_STD.develop.y, type: 'init', color: BRANCHES_STD.develop.color, parentId: 1 };
        const initialCommits = [initMain, initDev];
        setCommits(initialCommits);
        recalculateState(initialCommits);
        setMessages([{ id: Date.now(), text: "Projet initialisé. HEAD sur Develop." }]);
        setActiveGuide(GUIDES_STD.init);
    };

    const handleUndo = () => {
        if (commits.length <= 2) return;
        const newCommits = commits.slice(0, -1);
        setCommits(newCommits);
        recalculateState(newCommits);
        addMessage("Action annulée");
    };

    const handleStartFeature = () => {
        if (activeBranches.feature) return;
        setActiveBranches(prev => ({ ...prev, feature: true }));
        setActiveGuide(GUIDES_STD.feature);
        const lastDev = commitsRef.current.filter(c => c.branch === 'develop').pop();
        createCommit('feature', 'start', lastDev.id);
        addMessage("git checkout -b feature/xxx develop");
    };
    const handleCommitFeature = () => {
        if (!activeBranches.feature) return;
        createCommit('feature', 'commit');
        addMessage("git commit -m 'Dev feature'");
    };
    const handleFinishFeature = () => {
        if (!activeBranches.feature) return;
        const lastFeature = commitsRef.current.filter(c => c.branch === 'feature').pop();
        createCommit('develop', 'merge', lastFeature.id);
        setActiveBranches(prev => ({ ...prev, feature: false }));
        setActiveGuide(GUIDES_STD.init);
        addMessage("git checkout develop && git merge feature/xxx");
    };

    const handleStartRelease = () => {
        if (activeBranches.release) return;
        setActiveBranches(prev => ({ ...prev, release: true }));
        setActiveGuide(GUIDES_STD.release);
        const lastDev = commitsRef.current.filter(c => c.branch === 'develop').pop();
        const nextVer = { ...currentVersion, minor: currentVersion.minor + 1, patch: 0 };
        createCommit('release', 'start', lastDev.id, `RC-${formatVersion(nextVer)}`);
        addMessage(`git checkout -b release/${formatVersion(nextVer)} develop`);
    };
    const handleCommitRelease = () => {
        if (!activeBranches.release) return;
        createCommit('release', 'commit');
        addMessage("git commit -m 'Fix bug sur Release'");
    };
    const handleFinishRelease = () => {
        if (!activeBranches.release) return;
        const lastRelease = commitsRef.current.filter(c => c.branch === 'release').pop();
        const nextVer = { ...currentVersion, minor: currentVersion.minor + 1, patch: 0 };
        const tag = formatVersion(nextVer);
        createCommit('main', 'merge', lastRelease.id, tag);
        createCommit('develop', 'merge', lastRelease.id);
        setActiveBranches(prev => ({ ...prev, release: false }));
        setActiveGuide(GUIDES_STD.init);
        addMessage(`git checkout main && git merge release...`);
    };

    const handleStartHotfix = () => {
        if (activeBranches.hotfix) return;
        setActiveBranches(prev => ({ ...prev, hotfix: true }));
        setActiveGuide(GUIDES_STD.hotfix);
        const lastMain = commitsRef.current.filter(c => c.branch === 'main').pop();
        createCommit('hotfix', 'start', lastMain.id);
        addMessage("git checkout -b hotfix/urgent main");
    };
    const handleCommitHotfix = () => {
        if (!activeBranches.hotfix) return;
        createCommit('hotfix', 'commit');
        addMessage("git commit -m 'Patch appliqué'");
    };
    const handleFinishHotfix = () => {
        if (!activeBranches.hotfix) return;
        const lastHotfix = commitsRef.current.filter(c => c.branch === 'hotfix').pop();
        const nextVer = { ...currentVersion, patch: currentVersion.patch + 1 };
        const tag = formatVersion(nextVer);
        createCommit('main', 'merge', lastHotfix.id, tag);
        createCommit('develop', 'merge', lastHotfix.id);
        setActiveBranches(prev => ({ ...prev, hotfix: false }));
        setActiveGuide(GUIDES_STD.init);
        addMessage(`Hotfix déployé. Tag ${tag} créé.`);
    };

    const renderLine = (startCommit, endCommitId, isSecondary = false) => {
        const endCommit = commits.find(c => c.id === endCommitId);
        if (!endCommit) return null;
        const isStraight = startCommit.y === endCommit.y;
        const pathData = isStraight
            ? `M ${endCommit.x} ${endCommit.y} L ${startCommit.x} ${startCommit.y}`
            : `M ${endCommit.x} ${endCommit.y} C ${endCommit.x + 30} ${endCommit.y}, ${startCommit.x - 30} ${startCommit.y}, ${startCommit.x} ${startCommit.y}`;
        return (
            <path
                key={`line-${startCommit.id}-${endCommit.id}`}
                d={pathData}
                stroke={isSecondary ? endCommit.color : startCommit.color}
                strokeWidth={isSecondary ? "2" : "3"}
                strokeDasharray={isSecondary && !isStraight ? "4,4" : "0"}
                fill="none"
                opacity={isSecondary ? "0.6" : "0.8"}
            />
        );
    };

    const handleResetToCommit = (commitId) => {
        const index = commits.findIndex(c => c.id === commitId);
        if (index === -1) return;
        const newCommits = commits.slice(0, index + 1);
        setCommits(newCommits);
        recalculateState(newCommits);
        addMessage(`Reset vers commit ${commitId.toString().slice(-4)}`);
    };

    return (
        <div className="flex flex-col w-full bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700 font-sans text-slate-200">
            <div className="bg-slate-950 p-4 flex justify-between items-center border-b border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-indigo-400">
                        <Terminal size={20} />
                        <span className="font-mono font-bold">Standard Lab</span>
                    </div>
                    <div className="hidden md:flex bg-slate-800 px-3 py-1 rounded-full text-xs font-mono items-center gap-2 border border-slate-700">
                        <Tag size={12} className="text-yellow-400" />
                        Prod: <span className="text-yellow-400 font-bold">{formatVersion(currentVersion)}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleUndo} disabled={commits.length <= 2} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5">
                        <RotateCcw size={12} /> Undo
                    </button>
                    <button onClick={resetSimulation} className="btn-danger text-xs px-3 py-1.5 flex items-center gap-1.5">
                        <Trash2 size={12} /> Reset
                    </button>
                </div>
            </div>
            <div className="bg-slate-800/50 p-3 border-b border-slate-800 flex gap-3 items-start backdrop-blur-sm">
                <Info size={18} className="text-blue-400 mt-0.5 shrink-0" />
                <p className="text-blue-200 text-xs md:text-sm font-mono whitespace-pre-line leading-relaxed opacity-90">
                    {activeGuide}
                </p>
            </div>
            <div className="relative h-80 overflow-x-auto bg-[#0f172a] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent" ref={scrollRef}>
                <svg height="350" width={Math.max(800, time + 100)} className="absolute top-0 left-0 min-w-full">
                    {Object.entries(BRANCHES_STD).map(([key, branch]) => (
                        <g key={key}>
                            <line x1="0" y1={branch.y} x2="10000" y2={branch.y} stroke="#1e293b" strokeWidth="2" />
                            <text x="10" y={branch.y - 10} fill={branch.color} fontSize="10" fontWeight="bold" className="uppercase opacity-70 font-mono">
                                {branch.label}
                            </text>
                        </g>
                    ))}
                    {commits.map(commit => (
                        <React.Fragment key={`lines-${commit.id}`}>
                            {commit.parentId && renderLine(commit, commit.parentId, false)}
                            {commit.secondaryParentId && renderLine(commit, commit.secondaryParentId, true)}
                        </React.Fragment>
                    ))}
                    {commits.map((commit, index) => (
                        <g
                            key={commit.id}
                            transform={`translate(${commit.x}, ${commit.y})`}
                            onClick={() => handleResetToCommit(commit.id)}
                            className="cursor-pointer hover:opacity-80 transition-all duration-200"
                        >
                            <circle r="15" fill="transparent" />
                            <circle r="6" fill="#0f172a" stroke={commit.color} strokeWidth="2" />
                            {commit.type === 'merge' && <circle r="3" fill={commit.color} />}
                            {index === commits.length - 1 && (
                                <g><circle r="10" fill="none" stroke={commit.color} strokeWidth="1" strokeDasharray="2,2" className="animate-spin-slow opacity-50" /></g>
                            )}
                            {commit.tag && (
                                <g transform="translate(0, -18)">
                                    <rect x="-24" y="-12" width="48" height="16" rx="4" fill="#1e293b" stroke={commit.color} strokeWidth="1" />
                                    <text x="0" y="-1" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" className="font-mono">{commit.tag}</text>
                                </g>
                            )}
                        </g>
                    ))}
                </svg>
            </div>
            <div className="p-4 md:p-6 bg-slate-900 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`control-card ${activeBranches.feature ? 'active border-purple-500/30 bg-purple-500/5' : ''}`}>
                    <div className="card-header text-purple-400"><Plus size={16} /> <span>Features</span></div>
                    <p className="text-xs text-slate-500 mb-3 font-mono">Dev quotidien</p>
                    {!activeBranches.feature ? (
                        <button onClick={handleStartFeature} disabled={activeBranches.release || activeBranches.hotfix} className="btn-primary bg-purple-600 hover:bg-purple-500 disabled:opacity-30">Start Feature</button>
                    ) : (
                        <div className="flex gap-2"><button onClick={handleCommitFeature} className="btn-secondary text-purple-300 border-purple-500/30 hover:bg-purple-500/10 flex-1">Commit</button><button onClick={handleFinishFeature} className="btn-primary bg-purple-600 hover:bg-purple-500 flex-1">Merge</button></div>
                    )}
                </div>
                <div className={`control-card ${activeBranches.release ? 'active border-green-500/30 bg-green-500/5' : ''}`}>
                    <div className="card-header text-green-400 justify-between"><div className="flex items-center gap-2"><CheckCircle size={16} /> <span>Release</span></div><span className="text-[10px] font-mono opacity-60">v{currentVersion.major}.{currentVersion.minor + 1}.0</span></div>
                    <p className="text-xs text-slate-500 mb-3 font-mono">Stabilisation</p>
                    {!activeBranches.release ? (
                        <button onClick={handleStartRelease} disabled={activeBranches.feature || activeBranches.hotfix} className="btn-primary bg-green-600 hover:bg-green-500 disabled:opacity-30 disabled:bg-slate-700">Start Release</button>
                    ) : (
                        <div className="flex flex-col gap-2"><button onClick={handleCommitRelease} className="btn-secondary text-green-300 border-green-500/30 hover:bg-green-500/10 w-full flex items-center justify-center gap-2"><Bug size={12} /> Fix Bug</button><button onClick={handleFinishRelease} className="btn-primary bg-green-600 hover:bg-green-500 w-full">Deploy Prod</button></div>
                    )}
                </div>
                <div className={`control-card ${activeBranches.hotfix ? 'active border-orange-500/30 bg-orange-500/5' : ''}`}>
                    <div className="card-header text-orange-400 justify-between"><div className="flex items-center gap-2"><AlertCircle size={16} /> <span>Hotfix</span></div><span className="text-[10px] font-mono opacity-60">v{currentVersion.major}.{currentVersion.minor}.{currentVersion.patch + 1}</span></div>
                    <p className="text-xs text-slate-500 mb-3 font-mono">Urgence Prod</p>
                    {!activeBranches.hotfix ? (
                        <button onClick={handleStartHotfix} disabled={activeBranches.release} className="btn-primary bg-orange-600 hover:bg-orange-500 disabled:opacity-30">Start Hotfix</button>
                    ) : (
                        <div className="flex flex-col gap-2"><button onClick={handleCommitHotfix} className="btn-secondary text-orange-300 border-orange-500/30 hover:bg-orange-500/10 w-full flex items-center justify-center gap-2"><Bug size={12} /> Patch</button><button onClick={handleFinishHotfix} className="btn-primary bg-orange-600 hover:bg-orange-500 w-full">Deploy Hotfix</button></div>
                    )}
                </div>
            </div>
            <div className="bg-black p-3 font-mono text-[10px] md:text-xs text-slate-400 border-t border-slate-800 h-32 overflow-y-auto">
                <div className="space-y-1">{messages.map(msg => (<div key={msg.id} className="flex gap-2"><span className="text-green-500 select-none">$</span><span className="text-slate-300">{msg.text}</span></div>))}</div>
            </div>
        </div>
    );
};

export default StandardGitflowVisualizer;
