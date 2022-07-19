import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  currentUser: any;
  videos: Array<any> = [];
  categories: any = [];

  constructor(
    private token: TokenStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);

    if (Object.keys(this.currentUser).length === 0) {
      window.location.href = '/login';
    }

    this.userService.getVideos().subscribe(
      (data) => {
        for (var i in data.data) this.videos.push(data.data[i]);
      },
      (err) => {
        console.log(err.error);
      }
    );

    this.userService.getCategories().subscribe(
      (data) => {
        for (var i in data.data) this.categories.push(data.data[i]);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  // ngAfterViewInit(): void {
  //   console.log('AFterViewInit');
  // }
}
