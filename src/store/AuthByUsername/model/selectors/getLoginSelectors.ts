import { StateSchema } from '../../../config/StateSchema';

export const password = (state: StateSchema) => state?.loginForm?.password || '';
export const username = (state: StateSchema) => state?.loginForm?.username || '';
export const isLoading = (state: StateSchema) => state?.loginForm?.isLoading || false;
export const error = (state: StateSchema) => state?.loginForm?.error;
