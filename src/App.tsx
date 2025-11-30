import { ProjectProvider } from './contexts/ProjectContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { MainLayout } from './components/MainLayout';
import { LeftColumn } from './components/LeftColumn';
import { ProblemTaForm } from './components/ProblemTaForm';
import { CompetitionList } from './components/CompetitionForm';
import styles from './App.module.css';

function App() {
  return (
    <ErrorBoundary>
      <ProjectProvider>
        <div className={styles.app}>
          <Header />
          <MainLayout
            leftColumn={<LeftColumn />}
            problemTaTab={<ProblemTaForm />}
            competitionTab={<CompetitionList />}
          />
        </div>
      </ProjectProvider>
    </ErrorBoundary>
  );
}

export default App;
