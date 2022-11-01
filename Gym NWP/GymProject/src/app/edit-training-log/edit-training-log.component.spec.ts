import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingLogComponent } from './edit-training-log.component';

describe('EditTrainingLogComponent', () => {
  let component: EditTrainingLogComponent;
  let fixture: ComponentFixture<EditTrainingLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrainingLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrainingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
