///<reference path="../../../typings/index.d.ts" />
import {Injectable} from '@angular/core';
import {Injector} from '@angular/core';
import {Provider} from '@angular/core';
import Object3D = THREE.Object3D;
import Vector3 = THREE.Vector3;
import Scene = THREE.Scene;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Mesh = THREE.Mesh;
import VRControls = THREE.VRControls;
import VREffect = THREE.VREffect;
import { WebGLCanvasComponent} from '../directives/webgl-canvas/webgl-canvas.component';

@Injectable()
export class VRSceneService {
  scene: Scene;
  camera: PerspectiveCamera;
  dolly: Object3D;
  vrControls: VRControls;
  vrEffect: VREffect;
  //TODO: rename this to something like "renderer" since it can either
  // be a WebVRManager or a simple WebGLRenderer depending on if the user is running
  // a webVR-enabled browser or not
  webVrManager;
  sphere: Mesh;
  cube: Mesh;
  BaseRotation = new THREE.Quaternion();
  orbitControls : THREE.OrbitControls;
  // webGLRenderer: THREE.WebGLRenderer;

  //TODO: width, height not needed here
  constructor(width, height, private _webGLRenderer: THREE.WebGLRenderer) {
    // shouldn't have to do this, but..
    // glRenderer.init()
    // console.log(`VrScene.ctor: glRenderer.guid=${glRenderer.guid}`)
    // Note: setting the size here doesn't have any effect as it's overridden
    // in torroids.component anyway (?) 
    console.log(`->VrSceneSerivce.ctor: webGLRenderer.width=${this.webGLRenderer.getSize().width},width=${this.webGLRenderer.getSize().height}`);
    
    this.scene = new THREE.Scene;
    //vt add
    // this.scene = ((document.querySelector('a-scene') as AFrame.Entity).object3D as THREE.Scene);
    //vt end

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    this.camera.name = 'vrscene_camera'
    // this.camera.position.set(0, 1.5, 10);
    this.camera.position.set(0, 0, 0);
    this.dolly = new THREE.Object3D();
    this.dolly.position.z = 50;
    this.scene.add(this.dolly);
    //
    this.dolly.add(this.camera);

    if ((<any>window).navigator.getVRDisplays) {
      console.log(`VRSceneService.ctor: now on webVR path`);
      this.vrControls = new THREE.VRControls(this.camera);

      this.vrEffect = new THREE.VREffect(this.webGLRenderer);
      // this.vrEffect = new THREE.VREffect(glRenderer.domElement);
      this.vrEffect = new THREE.VREffect(this.webGLRenderer);
      this.vrEffect.setSize(width, height);
      this.webVrManager = new (<any>window).WebVRManager(this.webGLRenderer, this.vrEffect);
    }
    else {
      // get a standard renderer
      // this.webVrManager = new THREE.WebGLRenderer();
      this.webVrManager = this.webGLRenderer;
      this.webVrManager.setPixelRatio(window.devicePixelRatio);
      // this.webVrManager.setSize(window.innerWidth, window.innerHeight);
      this.webVrManager.setSize(width, height);
    }

    // apply orbitControls to the camera as well
    this.orbitControls = new THREE.OrbitControls(this.camera, this.webGLRenderer.domElement);
		//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
		this.orbitControls.enableDamping = true;
		this.orbitControls.dampingFactor = 0.25;
		this.orbitControls.enableZoom = false;    

    this.camera.quaternion.copy(this.BaseRotation);

    // // add a GridHelper
    // let gridHelper = new THREE.GridHelper(100, 10);
    // gridHelper.rotateX(Math.PI / 180.0 * 90.0);
    // this.scene.add(gridHelper);

    // glRenderer.canvas.focus();
    this._webGLRenderer.domElement.focus();
  };

  // Getters and Setters
  get webGLRenderer(): THREE.WebGLRenderer {
    // console.log('---> now accessing _webGLRenderer');
    return this._webGLRenderer;
  };
  set webGLRenderer(theWebGLRenderer: THREE.WebGLRenderer) {
    this._webGLRenderer = theWebGLRenderer;
  }

  // get webVrManager() {
  //   return this._webVrManager;
  // };
}

// let VRSceneFactory = (glRenderer: THREE.WebGLRenderer) => {
let VRSceneFactory = () => {
  var width = window.innerWidth
  var height = window.innerHeight
  // glRenderer.init(width, height)
  var webGLRenderer = new THREE.WebGLRenderer({antialias: true});

  return new VRSceneService(window.innerWidth, window.innerHeight, webGLRenderer);
};

export let VRSceneServiceProvider = {
  provide: VRSceneService,
  useFactory: VRSceneFactory,
  // deps: [VRRenderer]
  // deps: [WebGLCanvasComponent]
}

