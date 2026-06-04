import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayComponent } from './voter.component';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should pass through inputs', () => {
    component.question = "Do you agree?";
    component.yesAnswer = "Yes";
    component.noAnswer = "No";
    fixture.detectChanges();
    expect(component.voterTestComponent.question).toEqual('Do you agree?');
    expect(component.voterTestComponent.yesAnswer).toEqual('Yes');
    expect(component.voterTestComponent.noAnswer).toEqual('No');
  });

  it('should handle outputs', () => {
    component.voterTestComponent.vote(true);
    fixture.detectChanges();
    expect(getElementById("#lastVote").textContent).toEqual("Yes");
  });

});