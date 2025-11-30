import { useProject } from '../../contexts/useProject';
import type { ProblemTa, VotesMap } from '../../types';
import styles from './ProblemTaForm.module.css';

export function ProblemTaForm() {
  const { project, updateProblemTa } = useProject();
  const { problemTa } = project;

  const updateField = <K extends keyof ProblemTa>(field: K, value: ProblemTa[K]) => {
    updateProblemTa({ ...problemTa, [field]: value });
  };

  const updateB2C = (field: string, value: string) => {
    updateProblemTa({
      ...problemTa,
      b2c: { ...problemTa.b2c, [field]: value },
    });
  };

  const updateB2B = (field: string, value: string) => {
    updateProblemTa({
      ...problemTa,
      b2b: { ...problemTa.b2b, [field]: value },
    });
  };

  const updateProblem = (field: string, value: string) => {
    updateProblemTa({
      ...problemTa,
      problem: { ...problemTa.problem, [field]: value },
    });
  };

  const addVoter = () => {
    const newName = `Voter ${Object.keys(problemTa.votes).length + 1}`;
    updateField('votes', { ...problemTa.votes, [newName]: 3 });
  };

  const updateVote = (oldName: string, newName: string, rating: number) => {
    const newVotes: VotesMap = {};
    for (const [name, value] of Object.entries(problemTa.votes)) {
      if (name === oldName) {
        newVotes[newName] = Math.min(5, Math.max(1, rating));
      } else {
        newVotes[name] = value;
      }
    }
    updateField('votes', newVotes);
  };

  const removeVoter = (name: string) => {
    const newVotes = { ...problemTa.votes };
    delete newVotes[name];
    updateField('votes', newVotes);
  };

  return (
    <div className={styles.form}>
      {/* Basic Section */}
      <section className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Basic</h3>
        <div className={styles.fieldGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Project Name</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.projectName}
              onChange={(e) => updateField('projectName', e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
            <label className={styles.label}>Hypothesis</label>
            <textarea
              className={styles.textarea}
              value={problemTa.hypothesis}
              onChange={(e) => updateField('hypothesis', e.target.value)}
              placeholder="What is your core hypothesis?"
            />
          </div>
        </div>
      </section>

      {/* B2C Section */}
      <section className={styles.formSection}>
        <h3 className={styles.sectionTitle}>B2C Profile</h3>
        <div className={styles.fieldGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Geography</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2c.geography}
              onChange={(e) => updateB2C('geography', e.target.value)}
              placeholder="Target regions"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Sex</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2c.sex}
              onChange={(e) => updateB2C('sex', e.target.value)}
              placeholder="e.g., All, Male, Female"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Age</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2c.age}
              onChange={(e) => updateB2C('age', e.target.value)}
              placeholder="e.g., 25-45"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Occupation</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2c.occupation}
              onChange={(e) => updateB2C('occupation', e.target.value)}
              placeholder="Target occupations"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Education</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2c.education}
              onChange={(e) => updateB2C('education', e.target.value)}
              placeholder="Education level"
            />
          </div>
          <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
            <label className={styles.label}>Lifestyle</label>
            <textarea
              className={styles.textarea}
              value={problemTa.b2c.lifestyle}
              onChange={(e) => updateB2C('lifestyle', e.target.value)}
              placeholder="Describe lifestyle characteristics"
            />
          </div>
          <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
            <label className={styles.label}>Context</label>
            <textarea
              className={styles.textarea}
              value={problemTa.b2c.context}
              onChange={(e) => updateB2C('context', e.target.value)}
              placeholder="When/where do they encounter the problem?"
            />
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section className={styles.formSection}>
        <h3 className={styles.sectionTitle}>B2B Profile</h3>
        <div className={styles.fieldGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Geography</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2b.geography}
              onChange={(e) => updateB2B('geography', e.target.value)}
              placeholder="Target regions"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Sector</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2b.sector}
              onChange={(e) => updateB2B('sector', e.target.value)}
              placeholder="Industry sectors"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Size</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2b.size}
              onChange={(e) => updateB2B('size', e.target.value)}
              placeholder="SMB, Mid-market, Enterprise"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Decision Maker</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2b.decisionMaker}
              onChange={(e) => updateB2B('decisionMaker', e.target.value)}
              placeholder="Who makes buying decisions"
            />
          </div>
          <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
            <label className={styles.label}>Urgency Trigger</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.b2b.urgencyTrigger}
              onChange={(e) => updateB2B('urgencyTrigger', e.target.value)}
              placeholder="What triggers urgent need"
            />
          </div>
          <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
            <label className={styles.label}>Economic Factors</label>
            <textarea
              className={styles.textarea}
              value={problemTa.b2b.economicFactors}
              onChange={(e) => updateB2B('economicFactors', e.target.value)}
              placeholder="Relevant economic considerations"
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Problem</h3>
        <div className={styles.fieldGrid}>
          <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
            <label className={styles.label}>What</label>
            <textarea
              className={styles.textarea}
              value={problemTa.problem.what}
              onChange={(e) => updateProblem('what', e.target.value)}
              placeholder="Describe the problem in detail"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>When</label>
            <input
              className={styles.input}
              type="text"
              value={problemTa.problem.when}
              onChange={(e) => updateProblem('when', e.target.value)}
              placeholder="When does the problem occur"
            />
          </div>
          <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
            <label className={styles.label}>How to Measure</label>
            <textarea
              className={styles.textarea}
              value={problemTa.problem.howToMeasure}
              onChange={(e) => updateProblem('howToMeasure', e.target.value)}
              placeholder="How to measure problem severity/impact"
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Solution</h3>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Solution</label>
          <textarea
            className={styles.textarea}
            value={problemTa.solution}
            onChange={(e) => updateField('solution', e.target.value)}
            placeholder="Describe the proposed solution approach"
          />
        </div>
      </section>

      {/* Votes Section */}
      <section className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Votes</h3>
        <div className={styles.votesList}>
          {Object.entries(problemTa.votes).map(([name, rating]) => (
            <div key={name} className={styles.voteItem}>
              <input
                className={`${styles.input} ${styles.voterName}`}
                type="text"
                value={name}
                onChange={(e) => updateVote(name, e.target.value, rating)}
                placeholder="Voter name"
              />
              <input
                className={`${styles.input} ${styles.voterRating}`}
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => updateVote(name, name, parseInt(e.target.value) || 1)}
              />
              <button
                className={styles.removeButton}
                onClick={() => removeVoter(name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button className={`secondary ${styles.addButton}`} onClick={addVoter}>
          + Add Voter
        </button>
      </section>
    </div>
  );
}
