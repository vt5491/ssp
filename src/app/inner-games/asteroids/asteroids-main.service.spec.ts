/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsteroidsMainService } from './asteroids-main.service';
// import { AsteroidsGame, AsteroidsGameProvider } from './asteroids-game';
import { AsteroidsGame } from './asteroids-game';
import { Ship } from './ship';
import { ThreeJsSceneProvider } from '../../services/utils.service';
import { BaseService } from '../../services/base.service';

describe('Service: Main', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsteroidsMainService, AsteroidsGame, 
        Ship, ThreeJsSceneProvider, BaseService]
    });
  });

  it('should ...', inject([AsteroidsMainService], (service: AsteroidsMainService) => {
    expect(service).toBeTruthy();
  }));
});
