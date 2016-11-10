/// <reference path="../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject  } from '@angular/core/testing';
import { TorroidsComponent } from './torroids.component';
import { ElementRef, Renderer } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
import { SspTorusSceneService, SspTorusSceneProvider } from '../services/ssp-torus-scene.service';
import { BaseService } from '../services/base.service';
import { KbdHandlerRouterService } from '../services/kbd-handler-router.service';
import { CameraKbdHandlerService } from '../services/camera-kbd-handler.service';

let dummyCanvas = document.createElement('canvas');
let dummyNativeElement = {
  querySelector : function () {
    return dummyCanvas;
  } 
};

// dummyNativeElement.querySelector = function () {
//   return dummyCanvas;
// }

class MockElementRef implements ElementRef {
  // nativeElement = {};
  nativeElement = dummyNativeElement;
  // nativeElement = new Object();

  // nativeElement.querySelector = () => {

  // return nativeElement;
};


describe('Component: Torroids', () => {
  // component : TorroidsComponent;

  // beforeEachProviders(() => [Component, provide(ElementRef, { useValue: new MockElementRef() })]);
  // beforeEachProviders(() => [TorroidsComponent, provide(ElementRef, { useValue: new MockElementRef() })]);
  // beforeEachProviders(() => [SspTorusSceneProvider]);

  beforeEach ( () => {
    // this.component = new TorroidsComponent(new ElementRef());
    // this.component = new TorroidsComponent({ provide: ElementRef, useClass: MockElementRef })
    // let vrSceneService : VRSceneService = new VRSceneServiceProvider();
    // let sspTorusSceneService : SspTorusSceneService = new 
    // addProviders([
    //   { provide: Router, useClass: MockRouter }
    // ]);
    // this.component = new TorroidsComponent( 
    //   new MockElementRef(), 
    //   // inject([SspTorusSceneService],(service: SspTorusSceneService));
    //   // inject([SspTorusSceneService]))
    //   new SspTorusSceneService(100, 100, 
    //     new VRSceneService(10, 10, new THREE.WebGLRenderer({}))))
    // this.component = new TorroidsComponent(new ElementRef(), new SspService());
    // this.component = new TorroidsComponent( new ElementRef({}));
    TestBed.configureTestingModule({
      // imports: [... ],
      // declarations: [... ],
      // providers: [
      //   { .. },
      //   MyService
      // ]
        providers: [
          VRSceneServiceProvider, // note: needed
          SspTorusSceneProvider, 
          BaseService,
          KbdHandlerRouterService, 
          CameraKbdHandlerService, 
          ]
    });
    // this.component = new TorroidsComponent( new MockElementRef(), 
    //   new SspTorusSceneService())
  });
  // beforeEach(() => {
  //   addProviders([
  //       {provide: ElementRef, useClass: MockElementRef}
  //   ])
  // });

  // it('should create an instance', () => {
  //   // let component = new TorroidsComponent(@Inject(ElementRef) ElementRef);
  //   // let component = new TorroidsComponent( new MockElementRef());
  //   console.log('hi from ut');
  //   expect(this.component).toBeTruthy();
  // });

  // initOutersScene is dependent on onNgInit() having run, and while there
  // are ways to create mocks to simulate this, they are too hard for now, so
  // I'm just going to skip testing this method.
  // fit('initOuterScene should work', () => {
  //   // let component = new TorroidsComponent();
  //   console.log('hi from ut2');
  //   console.log(`ut: this.component=${this.component}`);
  //   console.log(`ut: this.component.querySelector=${this.component.querySelector}`);
  //   this.component.initOuterScene();
  //   console.log(`ut.initOuterScene: webGLRenderer=${this.component.webGLRenderer}`);
  //   // expect(this.component.webGLRenderer).toBeTruthy();
  //   // expect(this.component.webGLRenderer).toBeFalsy();
  // });

  it('ctor works', inject([SspTorusSceneService, BaseService, 
    KbdHandlerRouterService, CameraKbdHandlerService], 
    (sspTorusSceneService: SspTorusSceneService, baseService : BaseService, 
    renderer : Renderer, kbdHandlerRouterService : KbdHandlerRouterService, 
    component: TorroidsComponent = new TorroidsComponent(
      new MockElementRef(), sspTorusSceneService, BaseService, renderer,
      kbdHandlerRouterService)) => {
     expect(component).toBeTruthy(); 
     expect(component.sspTorusSceneService).toBeTruthy(); 
     expect(component.baseService).toBeTruthy(); 
    //  debugger;
    //  console.log(`ut: sspTorusSceneService.torusMesh.radius=${component2.sspTorusSceneService.torusMesh.geometry }`);
    //  console.log(`ut: sspTorusSceneService.torusMesh.name =${component2.sspTorusSceneService.torusMesh.name }`);
    })
  )
});
