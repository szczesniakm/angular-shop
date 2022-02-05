import { Component, OnInit } from '@angular/core';
import { faSearch, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  cartIcon = faShoppingBag;
  userIcon = faUser;
  searchIcon = faSearch;

  logged: boolean = false;
  
  constructor() {  }

  ngOnInit(): void { }

  login(): void {
    this.logged = true;
  }

  logout(): void {
    this.logged = false;
  }
}
