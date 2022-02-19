import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  cartIcon = faShoppingBag;
  userIcon = faUser;
  searchIcon = faSearch;

  loggedIn: Observable<boolean>;
  
  constructor(
    private router: Router,
    private authService: AuthenticationService) 
  {
    this.loggedIn = authService.isAuthenticatedObservable();
  }

  ngOnInit(): void { }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['login']);
  }
}
