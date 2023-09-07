import { StateSchema } from '../../../config/StateSchema';

export const authData = (state: StateSchema) => state?.user?.authData;
export const _inited = (state: StateSchema) => state?.user?._inited;
