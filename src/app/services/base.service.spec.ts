
/// <reference path="../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseService } from './base.service';

describe('Service: Base', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseService]
    });
  });

  it('should ...', inject([BaseService], (service: BaseService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a const ONE_DEG set at the class level', () => {
    expect(BaseService.ONE_DEG).toEqual(Math.PI / 180.0);
  });

  it('should have an instance level value projectionBoundary', inject([BaseService], (service: BaseService) => {
    expect(service.projectionBoundary).toBeTruthy();
  }));

  it('should have a boundVal value', inject([BaseService], (service: BaseService) => {
    service.boundVal = 7.0;
    expect(service.boundVal).toEqual(7.0);
  }));

  it('should have CAMERA_MOVE_DELTA set', inject([BaseService], (service: BaseService) => {
    expect(service.CAMERA_MOVE_DELTA).toBeTruthy();
  }));
});
