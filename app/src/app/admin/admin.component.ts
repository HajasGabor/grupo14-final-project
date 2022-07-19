import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  addVideoForm: any = {
    title: null,
    url: null,
    category: null,
  };
  addUserForm:  any = { 
    email: null, password: null, isAdmin: null, name: null 
  };
  addCategoryForm:  any = { 
    name: null 
  };
  isAdmin: any;
  currentUser: any;
  videos: Array<any> = [];
  categories: any = [];
  users: any = [];
  addVideoFailed = false;
  readonly ROOT_URL = 'http://localhost:8080/api';

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.isAdmin = this.token.getIsAdmin();

    if (Object.keys(this.currentUser).length === 0) {
      window.location.href = '/login';
    }

    if (this.isAdmin == 0) {
      window.location.href = '/videos';
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

    this.userService.getUsers().subscribe(
      (data) => {
        for (var i in data.data) this.users.push(data.data[i]);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  removeVideo(videoId: any): void {
    console.log('videoId' + videoId);
    this.http.delete(this.ROOT_URL + '/video/' + videoId).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  removeCategory(categoryId: any): void {
    console.log('categoryId' + categoryId);
    this.http.delete(this.ROOT_URL + '/category/' + categoryId).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  removeUser(userId: any): void {
    console.log('userId' + userId);
    this.http.delete(this.ROOT_URL + '/user/' + userId).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  addVideo(): void {
    const { title, url, category } = this.addVideoForm;
    var categoryId;
    for (var i in this.categories) {
      if (this.categories[i].name == category) {
        categoryId = this.categories[i].id;
        break;
      }
    }
    this.http
      .post(this.ROOT_URL + '/video', {
        name: title,
        url: url,
        categoryId: categoryId,
      })
      .subscribe(
        (data) => {
          console.log('success', data);
          window.location.reload();
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  addUser(): void {
    const { email, password, isAdmin, name } = this.addUserForm;
    this.http
      .post(this.ROOT_URL + '/user', {
        email: email,
        password: password,
        isAdmin: isAdmin,
        name: name
      })
      .subscribe(
        (data) => {
          console.log('success', data);
          window.location.reload();
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  addCategory(): void {
    const { name } = this.addCategoryForm;
    this.http
      .post(this.ROOT_URL + '/category', {
        name: name
      })
      .subscribe(
        (data) => {
          console.log('success', data);
          window.location.reload();
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  //TO-Do
  updateVideo(video:any): void {
    this.http.put(this.ROOT_URL+'/video/' + video.videoId, {'name': video.videoName, 'url':video.url, 'categoryId':video.categoryId}).subscribe(
      (data) => {
       console.log(video);
       window.location.reload();
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  updateCategory(category:any): void {
    this.http.put(this.ROOT_URL+'/category/' + category.id, {'name': category.name}).subscribe(
      (data) => {
       console.log(category);
       window.location.reload();
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  updateUser(user:any): void {
    this.http.put(this.ROOT_URL+'/user/' + user.id, {'name': user.name, 'email': user.email, 'password': user.password, 'isAdmin': user.isAdmin}).subscribe(
      (data) => {
       console.log(user);
       window.location.reload();
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  // ngAfterViewInit(): void {
  //   console.log('AFterViewInit');
  // }
}
