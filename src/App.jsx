import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConceptSection from './components/ConceptSection';
import TutorialSection from './components/TutorialSection';
import LabSection from './components/LabSection';
import ExpertLabSection from './components/ExpertLabSection';
import CICDSection from './components/CICDSection';
import GitflowVsTrunkComparison from './components/GitflowVsTrunkComparison';
import AdvancedCICDConcepts from './components/AdvancedCICDConcepts';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <ConceptSection />
      <TutorialSection />
      <LabSection />
      <ExpertLabSection />
      <CICDSection />
      <GitflowVsTrunkComparison />
      <AdvancedCICDConcepts />
      <Footer />
    </div>
  );
};

export default App;
