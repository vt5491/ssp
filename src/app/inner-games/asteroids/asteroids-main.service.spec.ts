/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsteroidsMainService } from './asteroids-main.service';
import { AsteroidsGame } from './asteroids-game';

describe('Service: Main', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsteroidsMainService, AsteroidsGame]
    });
  });

  it('should ...', inject([AsteroidsMainService], (service: AsteroidsMainService) => {
    expect(service).toBeTruthy();
  }));
});
