import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isAdmin = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.token);
        console.log(data);
        this.tokenStorage.saveUser(username, data.isAdmin);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.goToVideos();
      },
      (err) => {
        console.log(err.error);
        this.isLoginFailed = true;
      }
    );
  }

  goToVideos(): void {
    window.location.href = '/videos';
  }
}
