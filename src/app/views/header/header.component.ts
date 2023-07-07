import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserState } from 'src/app/user/store/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Select(UserState.isLoggedIn) isLoggedIn$!: Observable<boolean>;

  subscriptions = new Subscription();
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.subscriptions.add(
      this.authService.logout().subscribe(
        _ => {
          this.router.navigate(['/login']);
        }
      )
    );
  }

}
