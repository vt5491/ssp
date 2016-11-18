/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsteroidsMainService } from './asteroids-main.service';

describe('Service: Main', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsteroidsMainService]
    });
  });

  it('should ...', inject([AsteroidsMainService], (service: AsteroidsMainService) => {
    expect(service).toBeTruthy();
  }));
});
