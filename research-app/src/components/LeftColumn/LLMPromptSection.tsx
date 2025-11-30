import { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { PROBLEM_TA_PROMPT_TEMPLATE, COMPETITION_PROMPT_TEMPLATE, generatePrompt } from '../../constants/prompts';
import styles from './LLMPromptSection.module.css';

type PromptType = 'problemTa' | 'competition';

export function LLMPromptSection() {
  const { project } = useProject();
  const [showModal, setShowModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [promptType, setPromptType] = useState<PromptType>('problemTa');
  const [copied, setCopied] = useState(false);
  const [warning, setWarning] = useState('');

  const handleGeneratePrompt = async (type: PromptType) => {
    if (!project.idea.trim()) {
      setWarning('Please enter a product idea first');
      setTimeout(() => setWarning(''), 3000);
      return;
    }

    setWarning('');
    const template = type === 'problemTa' ? PROBLEM_TA_PROMPT_TEMPLATE : COMPETITION_PROMPT_TEMPLATE;
    const prompt = generatePrompt(template, project.idea);
    
    setCurrentPrompt(prompt);
    setPromptType(type);
    setShowModal(true);
    setCopied(false);

    // Try to copy to clipboard
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
    } catch {
      // Clipboard API not available - user will use the modal
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPrompt);
      setCopied(true);
    } catch {
      // Fallback - user can manually select and copy
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Generate LLM Prompts</h2>
      <div className={styles.buttonGroup}>
        <button
          className={styles.promptButton}
          onClick={() => handleGeneratePrompt('problemTa')}
        >
          📋 Copy prompt for Problem + TA
        </button>
        <button
          className={styles.promptButton}
          onClick={() => handleGeneratePrompt('competition')}
        >
          📋 Copy prompt for Competition
        </button>
      </div>
      {warning && <div className={styles.warning}>{warning}</div>}

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {promptType === 'problemTa' ? 'Problem + TA Prompt' : 'Competition Prompt'}
              </h3>
              <button className={styles.closeButton} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              <pre className={styles.promptText}>{currentPrompt}</pre>
            </div>
            <div className={styles.modalFooter}>
              {copied && <span className={styles.copiedText}>✓ Copied to clipboard</span>}
              <button className="secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button onClick={handleCopy}>
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
