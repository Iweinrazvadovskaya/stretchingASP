import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTranslationComponent } from './new-translation.component';

describe('NewTranslationComponent', () => {
  let component: NewTranslationComponent;
  let fixture: ComponentFixture<NewTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
