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
});
