import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClients } from './add-new-clients';

describe('AddNewClients', () => {
  let component: AddNewClients;
  let fixture: ComponentFixture<AddNewClients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewClients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewClients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
