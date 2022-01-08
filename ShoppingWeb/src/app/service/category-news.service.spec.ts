import { TestBed } from '@angular/core/testing';

import { CategoryNewsService } from './category-news.service';

describe('CategoryNewsService', () => {
  let service: CategoryNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
