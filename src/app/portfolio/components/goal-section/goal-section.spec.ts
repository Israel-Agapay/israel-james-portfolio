import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSection } from './goal-section';

describe('GoalSection', () => {
  let component: GoalSection;
  let fixture: ComponentFixture<GoalSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
