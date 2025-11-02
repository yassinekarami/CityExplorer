import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMapContent } from './popup-map-content';

describe('PopupMapContent', () => {
  let component: PopupMapContent;
  let fixture: ComponentFixture<PopupMapContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupMapContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupMapContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
