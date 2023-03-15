import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleContriesComponent } from './handle-contries.component';

describe('HandleContriesComponent', () => {
  let component: HandleContriesComponent;
  let fixture: ComponentFixture<HandleContriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleContriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleContriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
