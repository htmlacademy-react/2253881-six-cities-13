import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from './mocks';
import { State } from '../types/state';
import { Provider } from 'react-redux';

export const withHistory = (
  component: React.ReactNode,
  history?: MemoryHistory
) => {
  const memoryHistory = history ?? createMemoryHistory();

  return <HistoryRouter history={memoryHistory}>{component}</HistoryRouter>;
};

interface IComponentWithMockStore {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: React.ReactNode,
  initialState: Partial<State> = {}
): IComponentWithMockStore {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}
