import { createSlice } from '@reduxjs/toolkit';
import { setOffersCurrentOfferCommentsThunk } from './set-offers-comments-async';

export interface ICommonSliceState {
  statusLoading: boolean;
  statusError: null | string;
}

const initialState: ICommonSliceState = {
  statusLoading: false,
  statusError: null,
};

const commonSlice = createSlice({
  name: '@commmon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setOffersCurrentOfferCommentsThunk.pending, (state) => {
        state.statusLoading = true;
      })
      .addCase(setOffersCurrentOfferCommentsThunk.fulfilled, (state) => {
        state.statusLoading = false;
      });
  },
});

export default commonSlice.reducer;
