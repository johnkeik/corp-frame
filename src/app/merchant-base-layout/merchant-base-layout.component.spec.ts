import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBaseLayoutComponent } from './merchant-base-layout.component';

describe('MerchantBaseLayoutComponent', () => {
  let component: MerchantBaseLayoutComponent;
  let fixture: ComponentFixture<MerchantBaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantBaseLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantBaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
