import { describe } from 'vitest';
import { setComments, setError, ICommentsSliceState } from './comments-slice';
import commentsSlice from './comments-slice';
import { sendComment } from './async-comments';
import { makeCommets } from '../../mocks/mocks';

describe('comments slice', () => {
  const state: ICommentsSliceState = {
    comments: [],
    error: false,
    isLoading: false,
  };

  const commentsMocks = makeCommets();

  it('should set comments into state', () => {
    const result = commentsSlice(state, setComments(commentsMocks));

    expect(result.comments).toEqual(commentsMocks);
  });

  it('should set another status Error', () => {
    const result = commentsSlice(state, setError);

    expect(result.error).toEqual(!state.error);
  });

  it('sendComment.pending should set loading true', () => {
    const expectedState = {
      ...state,
      isLoading: true,
    };

    const result = commentsSlice(state, sendComment.pending);

    expect(expectedState).toEqual(result);
  });

  it('sendComment.fullfield should set loading true', () => {
    const expectedState = {
      ...state,
      isLoading: false,
    };

    const editedState = { ...state, isLoading: true };

    const result = commentsSlice(editedState, sendComment.fulfilled);

    expect(expectedState).toEqual(result);
  });

  it('sendComment.reject should set loading false', () => {
    const expectedState = {
      ...state,
      isLoading: false,
    };

    const editedState = { ...state, isLoading: true };

    const result = commentsSlice(editedState, sendComment.rejected);

    expect(expectedState).toEqual(result);
  });
});
