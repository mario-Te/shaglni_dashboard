import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTableComponent } from './default-table.component';

describe('DefaultTableComponent', () => {
  let component: DefaultTableComponent;
  let fixture: ComponentFixture<DefaultTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultTableComponent]
    });
    fixture = TestBed.createComponent(DefaultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
