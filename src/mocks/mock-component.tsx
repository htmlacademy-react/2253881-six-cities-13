import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';

export function withHistory(
  component: React.ReactNode,
  history?: MemoryHistory
) {
  const memoryHistory = history ?? createMemoryHistory();

  return <HistoryRouter history={memoryHistory}>{component}</HistoryRouter>;
}
