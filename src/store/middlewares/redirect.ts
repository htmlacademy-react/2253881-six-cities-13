import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { Reducer } from '../../types/state';

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'game/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
