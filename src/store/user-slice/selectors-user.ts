import { State } from '../../types/state';

export const getAuthStatus = (state: State) => state.user.authorizationStatus;
