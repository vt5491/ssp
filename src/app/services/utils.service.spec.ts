/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseService  } from './base.service';
import { UtilsService  } from './utils.service';
// import { EmptyParmsServiceProvider  } from './utils.service';
import { AsteroidNoParmsProvider  } from './utils.service';
// import { ParmsService  } from './parms.service';
import { Asteroid } from '../inner-games/asteroids/asteroid';

fdescribe('Service: Utils', () => {
  let AsteroidNoParmsProvider = {
    provide: Asteroid,
    useFactory: (base, utils) => {
      return new Asteroid(base, utils, {});
    },
    deps: [BaseService, UtilsService]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService, BaseService, AsteroidNoParmsProvider]
    });
  });

  it('should ctor works', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
    expect(service.addControls).toBeTruthy();
    expect(service.datGUI).toBeTruthy();
    expect(service.parms).toBeTruthy();
    expect(service.updatePos).toBeTruthy();
  }));

  it('should updatePos works', inject([UtilsService, Asteroid], 
    (service: UtilsService, asteroid : Asteroid) => {
    // we test with an asteroid, but it should work with any mesh object using
    // vx and vy.
    asteroid.vx = 1.0;
    asteroid.vy = 0.0;

    let initPosX = asteroid.mesh.position.x;
    let initPosY = asteroid.mesh.position.y;

    let boundVal = 4.0;
    service.updatePos(asteroid, boundVal);

    let newPosX = asteroid.mesh.position.x;
    let newPosY = asteroid.mesh.position.y;

    expect(newPosX).toEqual(initPosX + 1.0);
    expect(newPosY).toEqual(initPosY + 0.0);
  }));

  fit('should getGamepadConnectedPromise works', inject([UtilsService], (service: UtilsService) => {
    // mock navigator.getGamepads to return a gamepad objet
    let origFunc = navigator.getGamepads;

    navigator.getGamepads = () => {
      let result = [];
      let gp : Gamepad = new Gamepad();

      result.push(gp);

      return result;
    }

    let p = service.getGamepadConnectedPromise();

    // p.then(console.log(`hi from p.then`));
    // p.then((res) => {console.log(`hi from p.then, res={res}`)});
    // p.then(() => {});
    // p.then();

    // let gpe = new GamepadEvent('gamepadconnected');
    // let gpe = new GamepadEvent();
    // gpe.gamepad = new Gamepad();
    // window.dispatchEvent(gpe);
    // let result = service.getGamePad();

    // expect(<any>result instanceof Gamepad).toBe(true);
    navigator.getGamepads = origFunc;
  }));

});
