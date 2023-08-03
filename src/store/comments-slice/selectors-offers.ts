import { State } from '../../types/state';

export const getComments = (state: State) => state.comments.comments;

export const getCommentsStatus = (state: State) => state.comments.error;
