import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(videos: any[], filter: string): any {
    if (!videos || !filter) {
      return videos;
    }

    return videos.filter((video) => video.categoryId === filter);
  }
}
