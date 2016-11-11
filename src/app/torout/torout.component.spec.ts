/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToroutComponent } from './torout.component';

describe('ToroutComponent', () => {
  let component: ToroutComponent;
  let fixture: ComponentFixture<ToroutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToroutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToroutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
