///<reference path="../../../typings/index.d.ts" />
///<reference path="../../../node_modules/es6-promise/es6-promise.d.ts" />
import { Injectable, Injector } from '@angular/core';
import { IMoveableGameObject } from '../interfaces/imoveable-game-object';
// import { ParmsService } from './parms.service';
import { BaseService } from './base.service';
import { Asteroid } from '../inner-games/asteroids/asteroid';
// import * as _ from 'lodash';
// import {GUI} from 'dat.GUI';
// import {dat} from 'dat-gui/vendor/dat.gui';
// import * as dat from 'dat.GUI';
// declare var dat: any;
// import * as dat from 'dat-gui';
// import * as dat from 'dat';
// import * from 'dat-gui';

@Injectable()
export class UtilsService {

  // declare var dat.GUI: any;
  datGUI : dat.GUI;
  stats : Stats;
  parms : any;

  constructor(
    private injector: Injector,
    // private datGUI : dat.GUI  
    ) { 
    // console.log(`UtilsService: now in ctor`);
    // this.datGUI = this.injector.get(dat.GUI);
    this.datGUI = new dat.GUI();
    // this.addControls();
    // console.log(`UtilsService.cotr: datGUI=${this.datGUI}}`);

    this.parms = {}; 
  }

  addControls(controlObject) {
    this.datGUI.add( controlObject, 'canvasWidth', 500, 1000);
    // this.datGUI.add( controlObject, 'this.sspScene.sspSurface.position.x', 500, 1000);
  };

  addStats() {
    this.stats = new Stats();
    // this.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    (<any> this.stats).setMode(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild( this.stats.dom );
    // document.body.appendChild( (<any>this.stats).domElement );
    // document.getElementsByTagName('h1')[0].appendChild( (<any>this.stats).domElement );
    // this puts it at the top
    // let appRootElem = document.getElementsByTagName('app-root')[0]; 
    let insertPointElem = document.getElementById('webgl-container'); 
    
    insertPointElem.insertBefore(
      (<any>this.stats).domElement, 
      insertPointElem.childNodes[insertPointElem.childNodes.length - 1] );
  }

  updatePos(moveableGameObject: IMoveableGameObject, boundVal: number) {
    // console.log(`Utils.UpdatePos: entered`);
    
    let meshX = moveableGameObject.mesh.position.x;
    let meshY = moveableGameObject.mesh.position.y;

    meshX += moveableGameObject.vx;
    meshY += moveableGameObject.vy;

    if (meshX > boundVal) {
      meshX = -boundVal;
    }

    if (meshX < -boundVal) {
      meshX = boundVal;
    }

    if (meshY > boundVal) {
      meshY = -boundVal;
    }

    if (meshY < -boundVal) {
      meshY = boundVal;
    }

    moveableGameObject.mesh.position.x = meshX;
    moveableGameObject.mesh.position.y = meshY;
  }

  getGamepad() {

  }

  // this is the template function for getting gamepad Object.  It's up to
  // the caller to wrap this in a cluser so the gpad object is set locally
  // initGamepadConnectedListener(cb : () => boolean) {
  // initGamepadConnectedListener(cb : () => boolean) {

  // }
  // getGamepadConnectedPromise(cb : () => boolean) {

  // Example of how to call this function
  // let gpadPromise = _utils.getGamepadConnectedPromise();
  // gpadPromise.then( (res) => {
  //   console.log(`AsteroidsGame.gpadPromise.then: res=${res}`);
  //   this.gpad = <Gamepad>res;
  // })
  getGamepadConnectedPromise() {
    return new Promise((resolve, reject) => {
      window.addEventListener("gamepadconnected", function (e : any) {
        console.log(`Gamepad connected at index${e.gamepad.index}`);
        // this.gPad = navigator.getGamepads()[e.gamepad.index];
        resolve(navigator.getGamepads()[e.gamepad.index]);
      });
    });
  }

  // apply a deadzone to a gamepad axis value
  applyDeadzone(axisValue: number, threshold: number) {
    let percentage = (Math.abs(axisValue) - threshold) / (1 - threshold);

    if (percentage < 0)
      percentage = 0;

    return percentage * (axisValue > 0 ? 1 : -1);
  }

  // Because the sspSurface and sspMaterial variables will be nested two functions
  // deep at the time they are updated, we can't rely on simple pass by reference 
  // to update them properl.
  // (empirically determined during testing).  Thus we have to pass closure functions
  // that update them instead:
  // example:
  //   let sspSurfaceUpdateFn = (newMesh) => {
  //   sspSurface = newMesh;
  // };
  loadJsonModel(fp, scene, sspName, sspSurfaceUpdateFn, sspMaterialUpdateFn) {
    console.log(`Utils.loadJsonModel: fp=${fp}`);

    var loader = new THREE.ObjectLoader();
    // debugger;

    var promise = new Promise((resolve, reject) => {
      loader.load(
        fp,
        (blenderScene) => {
          console.log(`blenderScene.children.length=${blenderScene.children.length}`);

          for (var i = 0; i < blenderScene.children.length; i++) {
            var blenderMesh : THREE.Mesh = blenderScene.children[i] as THREE.Mesh;
            // Note: bug in three.js if you directly refer to the loaded mesh.  When you add to the
            // scene it will delete *some other* element from the blenderScene.children array.
            // So we have to manually create our mesh and copy in the blenderScene's child geometry
            // and material
            var mesh = new THREE.Mesh(blenderMesh.geometry as THREE.BufferGeometry, blenderMesh.material);
            // debugger;
            mesh.name = blenderMesh.name;
            // mesh.scale.set(25, 25, 25);
            if (mesh.name === sspName) {
              // mesh.rotateX(-Math.PI / 2.0);
              // sspSurface.$parent = mesh;
              sspSurfaceUpdateFn(mesh);
              // sspSurface.name = 'vt was here';
              // sspMaterial = mesh.material;
              sspMaterialUpdateFn(mesh.material);
            }
            scene.add(mesh);
          }
          resolve("loaded");
        })
    });

    return promise
  }

  // loadObjModel()  {
  loadObjModel(fpMtl, fpObj, scene, sspName, sspSurfaceUpdateFn, sspMaterialUpdateFn) {
    console.log('now in loadObjModel');
    var promise = new Promise(function(resolve, reject) {
    var mtlLoader = new (THREE as any).MTLLoader();
    mtlLoader.load( fpMtl, function( materials ) {
      console.log(`loadObjModel: materials=${materials}`);
      materials.preload();
      var loader = new (THREE as any).OBJLoader();
      loader.setMaterials(materials);
      loader.load( fpObj, function(object) {
        console.log(`loadObjModel: object.children.length=${object.children.length}`);
        for (var i = 0; i < object.children.length; i++) {
          let defaultMat = new THREE.MeshBasicMaterial(
            {
              color: Math.random() * 500000 + 500000,
              wireframe: false,
              side: THREE.DoubleSide
            }
          );
          let obj = object.children[i];

          if( obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
            // if( obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
            // if(  obj instanceof THREE.LineSegments) {
                // let mesh= new THREE.Mesh(obj.geometry as THREE.BufferGeometry, defaultMat);
                let mesh= new THREE.Mesh(obj.geometry as THREE.BufferGeometry, obj.material);
                // let mesh= new THREE.Mesh(obj.geometry as THREE.Geometry, obj.material);
                // var bufferGeometry = new THREE.BufferGeometry().fromGeometry( obj.geometry );
                // let mesh= new THREE.Mesh(bufferGeometry as THREE.BufferGeometry, obj.material);
            // }
            mesh.material = defaultMat;
            mesh.scale.set(25,25,25);
            // by adding this, I no longer get the pyramid, for some strange reason.kkkkjj
            // the reason is becuase the mesh created from obj is not "capable" enough somehow
            // to accomodate the dynamic texturing in ssp-runtime
            mesh.name = obj.name;

            // if (mesh.name === sspName) {
            if (mesh.name.match(sspName)) {
              mesh.material = defaultMat;
              sspSurfaceUpdateFn(mesh);
              sspMaterialUpdateFn(mesh.material);
            }
            // this.scene.add(mesh);
            scene.add(mesh);
          }
        }
        resolve("loadedObj");
      }.bind(this), () => {}, () => {} );
    }.bind(this));
  }.bind(this))
    return promise;
  }

  loadColladaModel(fp, scene, sspName, sspSurfaceUpdateFn, sspMaterialUpdateFn) {
      console.log(`now in loadColladaModel`); 
      var loader = new (THREE as any).ColladaLoader();
      loader.options.convertUpAxs = true;

      // var mat = new THREE.MeshBasicMaterial({color: 0x806040, side: THREE.DoubleSide})

      var promise = new Promise( (resolve, reject) => {
        // loader.load( 'assets/cube.dae', (collada) => {
        // loader.load( 'assets/luxorPyramidScene.dae', (collada) => {
        loader.load( fp, (collada) => {
          console.log(`now in collada load closure`);
          let dae = collada.scene
          dae.rotateX(-Math.PI / 2.0);
          dae.scale.x = dae.scale.y = dae.scale.z = 5.0;
          dae.updateMatrix();
          scene.add(dae);

          resolve('loaded');
        })
      })

      return promise;

  }

  loadTexture (fp) {
    let promise = new Promise((resolve, reject) => {
      console.log(`Utils: point a`);
      
      let loader = new THREE.TextureLoader();
      // debugger;
      loader.load(fp, (texture) => {
        console.log(`Utils: point b, texture=${texture}`);
        resolve(texture);
      })
    })

    return promise;
  }

  // sspSurfaceUpdateFn(newMesh) {
  //   console.log('SspCylScene.init: now in sspSurfaceUpdateFn');
  //   this.sspSurface = newMesh;
  // };

  // sspMaterialUpdateFn (newMaterial) => {
  //   console.log('SspCylScene.init: now in sspMaterialUpdateFn');
  //   this.sspMaterial = newMaterial;
  // };
  // sspSurfaceUpdateFn = (newMesh) => {
  sspSurfaceUpdateFn = function(newMesh) {
    console.log('SspCylScene.init: now in sspSurfaceUpdateFn');
    this.sspSurface = newMesh;
  };

  sspMaterialUpdateFn = function(newMaterial) {
    console.log('SspCylScene.init: now in sspMaterialUpdateFn');
    this.sspMaterial = newMaterial;
  };

}

// here's where we define the providers for things that don't have their own native
// class with the app.
export let WebGLRenderTargetProvider = {
  provide: THREE.WebGLRenderTarget,
  useFactory: () => {
    return new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter })
  },
};

export let ThreeJsSceneProvider = {
  provide: THREE.Scene,
  useFactory: () => {
    return new THREE.Scene();
  },
};

export let ThreeJsWebGLRendererProvider = {
  provide: THREE.WebGLRenderer,
  useFactory: () => {
    return new THREE.WebGLRenderer({antialias : true});
  },
};

// export let EmptyParmsServiceProvider = {
//   provide: ParmsService,
//   useFactory: () => {
//     return new ParmsService({});
//   },
// };

export let AsteroidNoParmsProvider = {
    provide: Asteroid,
    useFactory: (base, utils) => {
      return new Asteroid(base, utils, {});
    },
    deps: [BaseService, UtilsService]
  }
// experimental
// export let DatGUIProvider = {
//   provide: dat.GUI,
//   // provide: dat.gui,
//   useFactory: () => {
//     return new dat.GUI();
//   },
// };
