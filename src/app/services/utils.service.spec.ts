/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseService  } from './base.service';
import { UtilsService  } from './utils.service';
// import { EmptyParmsServiceProvider  } from './utils.service';
import { AsteroidNoParmsProvider  } from './utils.service';
// import { ParmsService  } from './parms.service';
import { Asteroid } from '../inner-games/asteroids/asteroid';

describe('Service: Utils', () => {
  let AsteroidNoParmsProvider = {
    provide: Asteroid,
    useFactory: (base, utils) => {
      return new Asteroid(base, utils, {});
    },
    deps: [BaseService, UtilsService]
  }

  let fakeJsonLoad = function(fn, cb) {
    if (fn === 'myPath/abc.json') {
      let scene = new THREE.Scene();
      let cubeGeom = new THREE.BoxGeometry(2,2,2);
      let cubeMat = new THREE.MeshBasicMaterial({color: 0xffffff});
      let cubeMesh = new THREE.Mesh(cubeGeom, cubeMat);
      cubeMesh.name = 'cube';
      scene.add(cubeMesh);
      let sphereGeom = new THREE.SphereGeometry(5);
      let sphereMat = new THREE.MeshBasicMaterial({color: 0x808080});
      let sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
      sphereMesh.name = 'sphere';
      scene.add(sphereMesh);

      // call the callback
      cb(scene);
    }
  }

  let fakeTextureLoader = (fn, cb) => {
    if (fn === 'myPath/testImg1.jpg') {
      let mat = new THREE.MeshBasicMaterial({ color: 0x808080 });
      mat.name = "ut1";

      cb(mat);
    }
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

  it('should getGamepadConnectedPromise works', inject([UtilsService], (service: UtilsService) => {
    // mock navigator.getGamepads to return a gamepad objet
    let origFunc = navigator.getGamepads;

    navigator.getGamepads = () => {
      let result = [];
      let gp : Gamepad = new Gamepad();

      result.push(gp);

      return result;
    }

    let p = service.getGamepadConnectedPromise();

    navigator.getGamepads = origFunc;
  }));

  it('should load a three.json model properly', inject([UtilsService],
    (utils: UtilsService) => {
      console.log(`ut: entered`);
      
      // spyOn(THREE.ObjectLoader.prototype, "load").call(fakeJsonLoad);
      let scene = new THREE.Scene();
      let sspSurface = new THREE.Mesh();
      let sspMaterial = new THREE.Material();
      let sspSurfaceUpdateFn = (newMesh) => {
        console.log('now in sspSurfaceUpdateFn');
        sspSurface = newMesh;
      };
      let sspMaterialUpdateFn = (newMaterial) => {
        console.log('now in sspMaterialUpdateFn');
        sspMaterial = newMaterial;
      };
      // debugger;

      let saveObjectLoader = THREE.ObjectLoader.prototype.load;
      THREE.ObjectLoader.prototype.load = fakeJsonLoad;
      let loadPromise: Promise<string> = utils.loadJsonModel(
        'myPath/abc.json', scene, 'cube', sspSurfaceUpdateFn, sspMaterialUpdateFn);

      expect(loadPromise).toBeTruthy();

      loadPromise.then((status) => {
        console.log(`status=${status}`);
        // debugger;
        expect(status).toEqual("loaded");
        expect(scene.children.length).toEqual(2);
        expect(sspSurface.name).toEqual('cube'); 
        expect(sspMaterial).toBeTruthy();

        // restore original saveLoader
        THREE.ObjectLoader.prototype.load = saveObjectLoader;
      })
    }));

  fit('should load a three.js texture properly', inject([UtilsService],
    (utils: UtilsService) => {
      console.log(`now in ut`);
      
      let saveTextureLoader = THREE.TextureLoader.prototype.load;
      let tmpFn : any = THREE.TextureLoader.prototype.load as any;
      // debugger;
      tmpFn = fakeTextureLoader;
      THREE.TextureLoader.prototype.load = tmpFn;

      let texturePromise = utils.loadTexture('myPath/testImg1.jpg');

      expect(texturePromise).toBeTruthy();

      texturePromise.then((texture) => {
        console.log(`ut: now in texturePromise handler, texture=${texture}`);
        expect(texture).toBeTruthy();
        expect(texture instanceof THREE.MeshBasicMaterial).toBeTruthy();

        THREE.TextureLoader.prototype.load = saveTextureLoader;
      })

  }));
  
});
