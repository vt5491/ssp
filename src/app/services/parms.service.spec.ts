/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParmsService } from './parms.service';
import { EmptyParmsServiceProvider  } from './utils.service';

describe('Service: Parms', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [ParmsService]
      providers: [EmptyParmsServiceProvider]
    });
  });

  it('should ...', inject([ParmsService], (service: ParmsService) => {
    expect(service).toBeTruthy();
  }));
});
