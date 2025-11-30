import { useProject } from '../../contexts/useProject';
import { CompetitionItemForm } from './CompetitionItemForm';
import styles from './CompetitionList.module.css';

export function CompetitionList() {
  const { project, addCompetitor, updateCompetitor, removeCompetitor } = useProject();
  const { competition } = project;

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <span className={styles.summaryText}>
          <span className={styles.count}>{competition.length}</span> competitor{competition.length !== 1 ? 's' : ''} tracked
        </span>
        <button onClick={addCompetitor}>+ Add Competitor</button>
      </div>

      {competition.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No competitors added yet.</p>
          <p>Click "Add Competitor" to start tracking your competition.</p>
        </div>
      ) : (
        <div className={styles.competitorList}>
          {competition.map((item) => (
            <CompetitionItemForm
              key={item.id}
              item={item}
              onUpdate={(updated) => updateCompetitor(item.id, updated)}
              onRemove={() => removeCompetitor(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
