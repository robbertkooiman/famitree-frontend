import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTreePersonComponent } from './family-tree-person.component';

describe('FamilyTreePersonComponent', () => {
  let component: FamilyTreePersonComponent;
  let fixture: ComponentFixture<FamilyTreePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyTreePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTreePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
