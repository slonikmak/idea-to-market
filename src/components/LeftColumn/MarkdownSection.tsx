import React from 'react';
import { useProject } from '../../contexts/useProject';
import { buildMarkdownFromState, parseMarkdown } from '../../utils/markdown';
import type { MarkdownMode, ProblemTa, CompetitionItem } from '../../types';
import styles from './MarkdownSection.module.css';

export function MarkdownSection() {
  const { project, updateMarkdownRaw, updateProblemTa, updateCompetition } = useProject();
  const [mode, setMode] = React.useState<MarkdownMode>('all');
  const [errors, setErrors] = React.useState<string[]>([]);
  const [success, setSuccess] = React.useState('');

  const handleExport = () => {
    const markdown = buildMarkdownFromState(project, mode);
    updateMarkdownRaw(markdown);
    setErrors([]);
    setSuccess('Markdown generated from form data');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleImport = () => {
    if (!project.markdownRaw.trim()) {
      setErrors(['Markdown textarea is empty']);
      setSuccess('');
      return;
    }

    const result = parseMarkdown(project.markdownRaw, mode);
    
    if (result.errors.length > 0) {
      setErrors(result.errors);
      setSuccess('');
    } else {
      setErrors([]);
    }

    // Update state with parsed data (partial update)
    if (result.problemTa && (mode === 'all' || mode === 'problemTa')) {
      // Merge with existing problemTa to preserve any fields not in markdown
      const mergedProblemTa: ProblemTa = {
        ...project.problemTa,
        ...result.problemTa,
        b2c: {
          ...project.problemTa.b2c,
          ...(result.problemTa.b2c || {}),
        },
        b2b: {
          ...project.problemTa.b2b,
          ...(result.problemTa.b2b || {}),
        },
        problem: {
          ...project.problemTa.problem,
          ...(result.problemTa.problem || {}),
        },
        votes: result.problemTa.votes || project.problemTa.votes,
      };
      updateProblemTa(mergedProblemTa);
      if (result.errors.length === 0) {
        setSuccess('Problem+TA data imported successfully');
      }
    }

    if (result.competition && (mode === 'all' || mode === 'competition')) {
      updateCompetition(result.competition as CompetitionItem[]);
      if (result.errors.length === 0) {
        setSuccess((prev) => prev ? `${prev}. Competition data imported.` : 'Competition data imported successfully');
      }
    }

    if (result.errors.length === 0) {
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Markdown Import/Export</h2>
      <div className={styles.controls}>
        <select
          className={styles.modeSelect}
          value={mode}
          onChange={(e) => setMode(e.target.value as MarkdownMode)}
        >
          <option value="all">All</option>
          <option value="problemTa">Problem + TA Only</option>
          <option value="competition">Competition Only</option>
        </select>
        <div className={styles.buttonGroup}>
          <button className="secondary" onClick={handleExport}>
            Generate Markdown
          </button>
          <button onClick={handleImport}>
            Import from Markdown
          </button>
        </div>
      </div>
      <textarea
        className={`${styles.textarea} ${errors.length > 0 ? styles.textareaError : ''}`}
        placeholder="Paste LLM response here or generate from form..."
        value={project.markdownRaw}
        onChange={(e) => {
          updateMarkdownRaw(e.target.value);
          setErrors([]);
        }}
      />
      {errors.length > 0 && (
        <div className={styles.errorMessage}>
          {errors.map((error, i) => (
            <div key={i}>⚠️ {error}</div>
          ))}
        </div>
      )}
      {success && !errors.length && (
        <div className={styles.successMessage}>✓ {success}</div>
      )}
    </section>
  );
}
