/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { SspRuntimeService } from './ssp-runtime.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
// import { SspSceneService } from './ssp-scene.service';
import { SspPlaneSceneService, SspPlaneSceneProvider } from './ssp-plane-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
import { InnerGame } from '../interfaces/inner-game';
import { AsteroidsGame } from '../inner-games/asteroids/asteroids-game';
import { Ship } from '../inner-games/asteroids/ship';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { BaseService } from './base.service';
import { UtilsService } from './utils.service';
import { WebGLRenderTargetProvider, ThreeJsSceneProvider } from './utils.service';

describe('Service: SspRuntime', () => {
  // SspRuntime can really be only instantiated at runtime, since it's dependent
  // on the inner-game selected by the user.  Thus, there is no pre-canned
  // provider.  So it's up to everyone who needs to instantiate an SspRuntime
  // to provide their own.  Thus, we have to provide a provider suitable for 
  // this test suite.
      // this.sspRuntime = new SspRuntimeService(
      // this.sspScene,
      // this.injector.get(THREE.WebGLRenderTarget),
      // this.innerGame,
      // this.injector.get(CameraKbdHandlerService),
      // this.injector.get(UtilsService)
      // );

  let SspRuntimeServiceFactory = (
    sspPlaneScene : ISspScene, 
    webGlRenderTarget : THREE.WebGLRenderTarget,
    innerGame : InnerGame,
    cameraKbdHandler : CameraKbdHandlerService,
    utils : UtilsService
    ) => {
    //   console.log(`sspPlaneScene=${sspPlaneScene},
    //   webglRenderTarget=${webGlRenderTarget},
    //   innerGame=${innerGame},
    //   cameraKbdHandler=${cameraKbdHandler},
    //   utils=${utils}
    //  ` );
      
    return new SspRuntimeService(
      sspPlaneScene, webGlRenderTarget, innerGame, cameraKbdHandler, utils);
  };

  let SspRuntimeServiceProvider = {
    provide: SspRuntimeService,
    useFactory: SspRuntimeServiceFactory,
    deps: [
      SspPlaneSceneService, 
      THREE.WebGLRenderTarget, 
      AsteroidsGame,
      CameraKbdHandlerService, 
      UtilsService]
  }
  // let dummyInnerGame : InnerGame = {}; 
  // let mockVRSceneService : VRSceneService;
  //TODO: this provider is now in utils.sevice, so pull from there instead
  let webglRenderTargetProvider = {
    provide: THREE.WebGLRenderTarget,
    useFactory: () => { 
      return new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter } )
    },
  // deps: [VRRenderer]
  // deps: [WebGLCanvasComponent]
  }

  let SspSceneServiceProvider = {
    // provide: SspSceneService,
    // provide: ISspScene,
    useFactory: (vrSceneService) => {
      // console.log(`now in SspSceneServiceProvider`);
      // let o = new SspSceneService( 
      // let o = new SspPlaneSceneService( 
      //   new VRSceneService(window.innerWidth, window.innerHeight,
      //     // new THREE.WebGLRenderer()
      //     vrSceneService
      //     ));

        let o = new SspPlaneSceneService(window.innerWidth, window.innerHeight,
          vrSceneService )
      return o;
    },
    deps: [VRSceneService]
  } 

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [SspRuntimeService, VRSceneServiceProvider, AsteroidsGame]
      providers: [ 
        SspRuntimeServiceProvider, 
        VRSceneServiceProvider, WebGLRenderTargetProvider, AsteroidsGame,
        SspPlaneSceneProvider, CameraKbdHandlerService, BaseService, 
        UtilsService, Ship, Injector, ThreeJsSceneProvider]
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
  // it('should ctor works', inject([SspSceneService, THREE.WebGLRenderTarget, CameraKbdHandlerService], 
  //   (sspSceneService : SspSceneService, webglRenderTarget: THREE.WebGLRenderTarget, cameraKbdHandler : CameraKbdHandlerService,
  // it('should ctor works', inject([SspSceneServiceProvider, 
  it('should ctor works', inject([ SspPlaneSceneService,
    THREE.WebGLRenderTarget, CameraKbdHandlerService, VRSceneService, UtilsService], 
    (sspSceneService : ISspScene, 
     webglRenderTarget: THREE.WebGLRenderTarget, 
     cameraKbdHandler : CameraKbdHandlerService,
     vrSceneService : VRSceneService,
     utils : UtilsService
    //  service = new SspRuntimeService(vrSceneService, asteroidsGame)) => {
    //  service = new SspRuntimeService(
    //    sspSceneService, 
    //    webglRenderTarget, 
    //    this.innerGame,
    //     cameraKbdHandler 
       ) => {
      let service = new SspRuntimeService(
        sspSceneService,
        webglRenderTarget,
        this.innerGame,
        cameraKbdHandler, utils);
      expect(service).toBeTruthy();
      expect(service.offscreenImageBuf.image.data).toBeTruthy();
      expect(service.utils).toBeTruthy();
      expect(service.initOffscreenImageBuf).toBeTruthy();
      expect(service.onResize).toBeTruthy();
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
  it('initOffscreenImageBuf should work', inject([SspRuntimeService], (service: SspRuntimeService) => {
    service.initOffscreenImageBuf();
    // console.log(`ut: offscreenImageBuf=${service.offscreenImageBuf}`);
    // console.log(`ut: offscreenImageBuf.image=${service.offscreenImageBuf.image}`);
    
    expect((<any>service.offscreenImageBuf).image).toBeTruthy();
    expect(service.innerGameHeight).toBeTruthy();
    expect(service.innerGameHeight).toBeGreaterThan(0);
    expect(service.innerGameWidth).toBeTruthy();
    expect(service.innerGameWidth).toBeGreaterThan(0);
  }));

  it('initInnerSceneCamera should work', inject([SspRuntimeService], (service: SspRuntimeService) => {
    service.initInnerSceneCamera();
    
    expect(service.initInnerSceneCamera).toBeTruthy();
    expect(service.innerSceneCamera).toBeTruthy();
    expect(service.innerSceneCamera.position.z).toEqual(-5);
    // expect((<any>service.offscreenImageBuf).image).toBeTruthy();
    // expect(service.innerGameHeight).toBeTruthy();
    // expect(service.innerGameHeight).toBeGreaterThan(0);
    // expect(service.innerGameWidth).toBeTruthy();
    // expect(service.innerGameWidth).toBeGreaterThan(0);
  }));
});
