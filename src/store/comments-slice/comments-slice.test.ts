import { describe } from 'vitest';
import { setComments, setError } from './comments-slice';
import commentsSlice from './comments-slice';
import { makeCommets } from '../../mocks/mocks';

describe('comments slice', () => {
  const state = {
    comments: [],
    error: false,
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
});
