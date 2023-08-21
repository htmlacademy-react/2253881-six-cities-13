import { createAction } from '@reduxjs/toolkit';
import { Path } from '../consts';

export const redirectToRoute = createAction<Path>('redirect/redirectToRoute');
