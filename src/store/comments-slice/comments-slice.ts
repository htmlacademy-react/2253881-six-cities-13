import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../types/comments';
import { sendComment } from './async-comments';

export interface ICommentsSliceState {
  comments: Array<IComment>;
  error: boolean;
  isLoading: boolean;
}

const initialState: ICommentsSliceState = {
  comments: [],
  error: false,
  isLoading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(sendComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendComment.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commentsSlice.reducer;

export const { setComments, setError } = commentsSlice.actions;
