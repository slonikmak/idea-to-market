import { useProject } from '../../contexts/useProject';
import React from 'react';
import styles from './Header.module.css';

export function Header() {
  const { isSaving, clearProject } = useProject();
  const [showHelp, setShowHelp] = React.useState(false);

  return (
    <>
    <header className={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 className={styles.title}>Product Research Tool</h1>
        <button
          className={styles.helpButton}
          title="How to use the app"
          onClick={() => setShowHelp(true)}
        >
          ❓
        </button>
      </div>
      <div className={styles.savingIndicator}>
        {isSaving ? (
          <>
            <span className={styles.savingDot} />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <span className={styles.savedDot} />
            <span>Saved</span>
          </>
        )}
        <button
          className={styles.clearButton}
          title="Clear saved project"
          onClick={() => {
            if (window.confirm('Clear saved project? This action is irreversible.')) {
              clearProject();
            }
          }}
        >
          Clear
        </button>
      </div>
    </header>
    {showHelp && (
      <div className={styles.modalOverlay} onClick={() => setShowHelp(false)}>
        <div
          className={styles.modal}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>How to use the app</h3>
            <button className={styles.closeButton} onClick={() => setShowHelp(false)}>✕</button>
          </div>
          <div className={styles.modalContent}>
            <p>
              This tool helps you perform product-idea research. Enter your idea in the left column — then
              use the "Problem + TA" and "Competition" sections to generate prompts and get initial analysis.
            </p>
            <h4>Recommended workflow</h4>
            <ol>
              <li>Enter your idea into the "Product idea" field.</li>
              <li>Generate a prompt for "Problem + TA" to get analysis of the problem and target audience.</li>
              <li>
                For the "Competition" section keep in mind that it requires deeper research and external sources.
                We recommend running the generated prompt through deep-research services (for example ChatGPT,
                Perplexity, or another LLM/search tool) to obtain a full competitive analysis.
              </li>
              <li>Скопируйте результаты обратно в приложение — используйте их как входные данные
                для анализа и сравнения.</li>
            </ol>
            <p>
              Подсказки генерируются в разделе "Generate LLM Prompts" — вы можете скопировать их
              и отправить в выбранный вами сервис глубокого исследования.
            </p>

            <h4>Working with Markdown (export / import)</h4>
            <p>
              The "Markdown Import/Export" panel contains a large textarea and two important buttons:
            </p>
            <ol>
              <li>
                <strong>Generate Markdown (Export):</strong> builds Markdown from the current form data.
                You can choose the export mode from the select: <em>All</em>, <em>Problem + TA</em>, or <em>Competition</em>.
                The button writes generated markdown into the textarea — convenient for sending to an LLM or saving.
              </li>
              <li>
                <strong>Import from Markdown:</strong> parses the textarea contents and attempts to extract
                the <code>## Problem+TA</code> and/or <code>## Competition</code> sections depending on the
                selected mode. Import merges parsed data with the current state — fields missing from the
                markdown are preserved.
              </li>
            </ol>
            <p>
              A common workflow is: generate (or paste) the markdown response from an LLM (for example after
              performing Deep Research), paste it into the textarea, and press "Import from Markdown". If the
              parser finds issues or missing sections they will appear below as ⚠️ messages. On successful import
              the corresponding form fields will be updated.
            </p>
            <p>
              Tip: use the modes separately if you want to update only Problem+TA or only Competition — this
              reduces the chance of unintentionally overwriting data.
            </p>
          </div>
          <div className={styles.modalFooter}>
            <button className="secondary" onClick={() => setShowHelp(false)}>Закрыть</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
