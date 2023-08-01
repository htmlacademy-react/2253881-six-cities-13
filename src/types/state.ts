import { store } from '../store/store';
import { rootReducer } from '../store/store';

export type State = ReturnType<typeof store.getState>;

export type Reducer = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
