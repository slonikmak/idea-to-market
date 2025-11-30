import { useProject } from '../../contexts/useProject';
import styles from './IdeaInputSection.module.css';

export function IdeaInputSection() {
  const { project, updateIdea } = useProject();

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Product Idea</h2>
      <textarea
        className={styles.textarea}
        placeholder="Describe your product idea here..."
        value={project.idea}
        onChange={(e) => updateIdea(e.target.value)}
      />
    </section>
  );
}
