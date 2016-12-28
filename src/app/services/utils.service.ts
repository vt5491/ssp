///<reference path="../../../typings/index.d.ts" />
import { Injectable, Injector } from '@angular/core';
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
    console.log(`UtilsService.cotr: datGUI=${this.datGUI}}`);

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

// experimental
// export let DatGUIProvider = {
//   provide: dat.GUI,
//   // provide: dat.gui,
//   useFactory: () => {
//     return new dat.GUI();
//   },
// };
