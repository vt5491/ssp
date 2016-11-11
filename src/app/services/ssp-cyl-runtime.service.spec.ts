/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspCylRuntimeService } from './ssp-cyl-runtime.service';

describe('Service: SspCylRuntime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspCylRuntimeService]
    });
  });

  it('should ...', inject([SspCylRuntimeService], (service: SspCylRuntimeService) => {
    expect(service).toBeTruthy();
  }));
});
