import React, { useState } from 'react';
import SymptomInputForm from '../symptom-input-form/symptom-input-form.component';
import PsychologyAssistantChat from '../psych-assistant/psych-assistant.component';
import './tabs.styles.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('symptomInputForm');

  const renderContent = () => {
    switch (activeTab) {
      case 'symptomInputForm':
        return <SymptomInputForm />;
      case 'psychologyAssistantChat':
        return <PsychologyAssistantChat />;
      default:
        return <SymptomInputForm />;
    }
  };

  return (
    <div className="tabs">
      <div className="tab-buttons">
        <button
          className={activeTab === 'symptomInputForm' ? 'active' : ''}
          onClick={() => setActiveTab('symptomInputForm')}
        >
          DSM-5 Symptom Checker
        </button>
        <button
          className={activeTab === 'psychologyAssistantChat' ? 'active' : ''}
          onClick={() => setActiveTab('psychologyAssistantChat')}
        >
          Psychology Assistant Chat
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default Tabs;