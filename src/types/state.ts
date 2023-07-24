import { store } from '../store/store';
import { mainReducer } from '../store/reducer';

export type State = ReturnType<typeof store.getState>;

export type Reducer = ReturnType<typeof mainReducer>;

export type AppDispatch = typeof store.dispatch;
