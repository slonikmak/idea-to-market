import { useProject } from '../../contexts/ProjectContext';
import styles from './Header.module.css';

export function Header() {
  const { isSaving, clearProject } = useProject();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Product Research Tool</h1>
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
            if (window.confirm('Очистить сохранённый проект? Это действие необратимо.')) {
              clearProject();
            }
          }}
        >
          Clear
        </button>
      </div>
    </header>
  );
}
