import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Grupo 14';
  isLoggedIn = false; 
  isAdmin = false; //to-do change
  username?: string;

  readonly ROOT_URL = 'http://localhost:8080/api';

  posts: any;

  constructor(private tokenStorageService: TokenStorageService, private http:HttpClient, public router: Router) {}

  getCategories() {
    this.posts = this.http.get(this.ROOT_URL + '/categories');
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      const flag = this.tokenStorageService.getIsAdmin();
      if(flag == 1){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  admin(): void {
    this.router.navigateByUrl('/admin');
  }
}
