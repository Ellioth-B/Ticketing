import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMissionComponent } from './order-mission.component';

describe('OrderMissionComponent', () => {
  let component: OrderMissionComponent;
  let fixture: ComponentFixture<OrderMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
