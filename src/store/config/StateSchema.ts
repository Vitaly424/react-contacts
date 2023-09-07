import { LoginSchema } from "../AuthByUsername";
import { UserSchema } from "../User";

export interface StateSchema {
    loginForm: LoginSchema;
    user: UserSchema;
}
