import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../types/comments';

interface ICommentsSliceState {
  comments: Array<IComment>;
  error: boolean;
}

const initialState: ICommentsSliceState = {
  comments: [],
  error: false,
};

const commentsSlice = createSlice({
  name: '@comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Array<IComment>>) => {
      state.comments = action.payload;
    },
    setError: (state) => {
      state.error = !state.error;
    },
  },
});

export default commentsSlice.reducer;

export const { setComments, setError } = commentsSlice.actions;
