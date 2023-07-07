import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthService } from "src/app/service/auth.service";
import { UserAction } from "./action";
import { tap } from "rxjs";

export class UserStateModel {
  isLoggedIn!: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    isLoggedIn: false
  }
})

@Injectable({
  providedIn: 'root'
})
export class UserState {

  constructor(
    private authService: AuthService
  ) {}

  @Selector()
  static isLoggedIn(state: UserStateModel) {
    return state.isLoggedIn;
  }

  @Action(UserAction.AuthCheck)
  isLoggedIn(ctx: StateContext<UserStateModel>) {
    return this.authService.checkAuth().pipe(
      tap(data => {
        ctx.dispatch({
          isLoggedIn: data.isLoggedIn
        });
      })
    );
  }

  @Action(UserAction.Login)
  Login(ctx: StateContext<UserStateModel>, action: UserAction.Login) {
    ctx.patchState({
      isLoggedIn: action.isLoggedIn
    });
  }

}
