import { setOffersCurrentOfferCommentsThunk } from './set-offers-comments-async';
import commonSlice from './common-slice';
import { ICommonSliceState } from './common-slice';

describe('common slice', () => {
  const state: ICommonSliceState = {
    statusLoading: false,
    statusError: null,
  };

  it('setOffersCurrentOfferCommentsThunk.pending status loading should be true', () => {
    const expectedState = { ...state, statusLoading: true };

    const result = commonSlice(
      state,
      setOffersCurrentOfferCommentsThunk.pending
    );

    expect(result).toEqual(expectedState);
  });

  it('setOffersCurrentOfferCommentsThunk.fullfield status loading should be false', () => {
    const expectedState = { ...state, statusLoading: false };
    const editedState = { ...state, statusLoading: true };

    const result = commonSlice(
      editedState,
      setOffersCurrentOfferCommentsThunk.fulfilled
    );

    expect(result).toEqual(expectedState);
  });
});
