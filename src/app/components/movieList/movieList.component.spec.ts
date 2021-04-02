import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movieList.component';

describe('AboutComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
