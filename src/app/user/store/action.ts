import { User } from "src/app/models/user";
import { LoginForm } from "../model/login.model";

export module UserAction {

  export class AuthCheck {
    static readonly type = '[User] AuthCheck';
  }

  export class Login {
    static readonly type = '[User] Login';
    constructor(public isLoggedIn: boolean) {}
  }

  export class Logout {
    static readonly type = '[User] Logout';
  }

  export class SetUser {
    static readonly type = '[User] SetUser';
    constructor(public user: User) {}
  }

}
