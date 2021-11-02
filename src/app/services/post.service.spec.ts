import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        PostService
      ],
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts successfully', ()=>{
    const postItem = [
      {
        "userID": 1,
        "id": 1,
        "title": "sunt aut facere repellat pr",
        "body": "quia et suscipit \nsuscipit recusandae consequuntur expedita et"
      },
      {
        "userID": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae \nsequi sint"
      },
    ]

    service.getPosts()
      .subscribe((posts:any) => { 
        expect(posts.length).toBe(2);
      });

    let req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts')
    expect(req.request.method).toBe("GET");

    req.flush(postItem);
    httpMock.verify();
  })
});
