import React from 'react';
import type { ReactNode } from 'react';
import styles from './MainLayout.module.css';

type TabId = 'problemTa' | 'competition';

interface MainLayoutProps {
  leftColumn: ReactNode;
  problemTaTab: ReactNode;
  competitionTab: ReactNode;
}

export function MainLayout({ leftColumn, problemTaTab, competitionTab }: MainLayoutProps) {
  const [activeTab, setActiveTab] = React.useState<TabId>('problemTa');

  return (
    <div className={styles.layout}>
      <div className={styles.leftColumn}>
        {leftColumn}
      </div>
      <div className={styles.rightColumn}>
        <nav className={styles.tabNav}>
          <button
            className={`${styles.tab} ${activeTab === 'problemTa' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('problemTa')}
          >
            Problem + TA
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'competition' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('competition')}
          >
            Competition
          </button>
        </nav>
        <div className={styles.tabContent}>
          {activeTab === 'problemTa' ? problemTaTab : competitionTab}
        </div>
      </div>
    </div>
  );
}
