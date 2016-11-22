/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspRuntimeService } from './ssp-runtime.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { SspSceneService } from './ssp-scene.service';
import { InnerGame } from '../inner-game';
import { AsteroidsGame } from '../inner-games/asteroids/asteroids-game';

describe('Service: SspRuntime', () => {
  // let dummyInnerGame : InnerGame = {}; 
  // let mockVRSceneService : VRSceneService;
  let webglRenderTargetProvider = {
    provide: THREE.WebGLRenderTarget,
    useFactory: () => { 
      return new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter } )
    },
  // deps: [VRRenderer]
  // deps: [WebGLCanvasComponent]
  }

  let SspSceneServiceProvider = {
    provide: SspSceneService,
    useFactory: (vrSceneService) => {
      console.log(`now in SspSceneServiceProvider`);
      let o = new SspSceneService();
      o.vrSceneService = new VRSceneService(window.innerWidth, window.innerHeight,
        new THREE.WebGLRenderer());
      return o;
    },
    deps: [VRSceneService]
  } 

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [SspRuntimeService, VRSceneServiceProvider, AsteroidsGame]
      providers: [ VRSceneServiceProvider, webglRenderTargetProvider,
        SspSceneServiceProvider]
    });
    // this.innerGame = new InnerGame();
    this.innerGame = {};
    this.innerGame.updateScene = function () {};

    this.mockVRSceneService = {};
    this.mockVRSceneService.vrControls = {};
    this.mockVRSceneService.vrControls.update = function () {return true;};
    // vrSceneService.webVrManager.render
    this.mockVRSceneService.webVrManager = {};
    this.mockVRSceneService.webVrManager.render = function () {};

    this.mockVRSceneService.webGLRenderer = {};
    this.mockVRSceneService.webGLRenderer.getContext = function () {};
    this.mockVRSceneService.webGLRenderer.render = function () {};

    this.mockSspSceneService = {};
    this.mockSspSceneService.vrSceneService = this.mockVRSceneService;
    this.mockSspSceneService.offscreenImageBuf = {};
    this.mockSspSceneService.offscreenImageBuf.needsUpdate = false;

    // mock out document functions
    // document.getElementById = function (id : string) : HTMLElement {
      // document.appendChild()

  });

// get error:
// Error: Can't resolve all parameters for SspRuntimeService: (VRSceneService, ?).
  // it('should ...', inject([SspRuntimeService], (service: SspRuntimeService) => {
  // it('should ...', inject([SspRuntimeService, VRSceneService], 
  it('should ctor works', inject([SspSceneService, THREE.WebGLRenderTarget], 
    (sspSceneService : SspSceneService, webglRenderTarget: THREE.WebGLRenderTarget, 
    //  service = new SspRuntimeService(vrSceneService, asteroidsGame)) => {
     service = new SspRuntimeService(sspSceneService, webglRenderTarget, this.innerGame)) => {
      expect(service).toBeTruthy();
      expect(service.offscreenBuffer).toBeTruthy();
  }));

  // it ('mainLoop works', inject([VRSceneService, InnerGame], vrSceneService :VRSceneService,  ))
  // skip this test until I can figure out how to mock better
  // fit('mainLoop works', inject([SspSceneService, THREE.WebGLRenderTarget], 
  //   (sspSceneService : SspSceneService, webglRenderTarget : THREE.WebGLRenderTarget,
  //   //  service = new SspRuntimeService(vrSceneService, asteroidsGame)) => {
  //    service = new SspRuntimeService(this.mockSspSceneService, webglRenderTarget, this.innerGame)) => {
  //      spyOn(this.innerGame, 'updateScene');
  //      service.mainLoop();
  //      expect(this.innerGame.updateScene).toHaveBeenCalled();
  // }));
});
