import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO
const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getVideos(): Observable<any> {
    return this.http.get(API_URL + '/allVideos', { responseType: 'json' });
  }

  getCategories(): Observable<any> {
    return this.http.get(API_URL + '/categories', { responseType: 'json' });
  }

  getUsers(): Observable<any> {
    return this.http.get(API_URL + '/users', { responseType: 'json' });
  }
}
