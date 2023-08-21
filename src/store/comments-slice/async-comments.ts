import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { BASE_BACKEND_URL, APIRoute } from '../../consts';
import { IComment } from '../../types/comments';
import axios from 'axios';
import { getToken } from '../../services/token';
import { setComments } from './comments-slice';
import { IForm } from '../../types/common';

interface IValue {
  id: string;
  form: IForm;
}

export const sendComment = createAsyncThunk<
  void,
  IValue,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('comments/setComments', async ({ id, form }, { dispatch, getState }) => {
  const comments = getState().comments.comments;
  const token = getToken();
  const res = await axios.post<IComment>(
    `${BASE_BACKEND_URL + APIRoute.Comments + id}`,
    form,
    {
      headers: { 'x-token': token },
    }
  );
  const { data } = res;
  const newComments = [...comments, data];
  dispatch(setComments(newComments));
});
