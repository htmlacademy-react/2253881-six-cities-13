import { State } from '../../types/state';

export const getComments = (state: State) => state.comments.comments;

export const getStatusLoadingComments = (state: State) =>
  state.comments.isLoading;
