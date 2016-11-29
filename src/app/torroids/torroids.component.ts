/// <reference path="../../../typings/index.d.ts" />
import { Component, OnInit, ElementRef, Inject, ViewChild, Injectable, Renderer, Injector } from '@angular/core';
import { WebGLCanvasComponent } from '../directives/webgl-canvas/webgl-canvas.component';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
// import { SspScene } from '../ssp-scene';
import { SspSceneService } from '../services/ssp-scene.service';
import { SspRuntime } from '../ssp-runtime';
import { SspTorusSceneService, SspTorusSceneProvider } from '../services/ssp-torus-scene.service';
import { SspCylSceneService, SspCylSceneProvider } from '../services/ssp-cyl-scene.service';
import { SspPlaneSceneService, SspPlaneSceneProvider } from '../services/ssp-plane-scene.service';
import { BaseService } from '../services/base.service';
import { SspTorusRuntimeService } from '../services/ssp-torus-runtime.service';
import { SspCylRuntimeService } from '../services/ssp-cyl-runtime.service';
import { SspRuntimeService } from '../services/ssp-runtime.service';
import { KbdHandlerRouterService} from '../services/kbd-handler-router.service';
import { CameraKbdHandlerService} from '../services/camera-kbd-handler.service';
import { AsteroidsMainService} from '../inner-games/asteroids/asteroids-main.service';
import { AsteroidsGame, AsteroidsGameProvider } from '../inner-games/asteroids/asteroids-game';
import { AsteroidsKbdHandler } from '../inner-games/asteroids/asteroids-kbd-handler';
import { InnerGame } from '../inner-game';
import { WebGLRenderTargetProvider } from '../services/utils.service';
import { ThreeJsSceneProvider } from '../services/utils.service';
import { Ship } from '../inner-games/asteroids/ship';

@Component({
  selector: 'app-torroids',
  templateUrl: './torroids.component.html',
  styleUrls: ['./torroids.component.css'],
  // providers: [ElementRef],
  providers: [VRSceneServiceProvider, WebGLCanvasComponent, SspTorusSceneProvider,
    SspCylSceneProvider, SspPlaneSceneProvider, AsteroidsMainService, 
    AsteroidsGameProvider, 
    //THREE.WebGLRenderTarget
    WebGLRenderTargetProvider, ThreeJsSceneProvider, Ship
  // BaseService 
  ]
})

// @ViewChild('webGLCanvas') someElement;

@Injectable()
export class TorroidsComponent implements OnInit {
  // @ViewChild(WebGLCanvasComponent) webGLCanvas : WebGLCanvasComponent;

  webGLRenderer: THREE.WebGLRenderer;
  gl_webGLRenderer: any;
  canvasWidth: number;
  canvasHeight: number;
  // private el: ElementRef;
  // vrScene : VRSceneService;
  // sspScene : SspScene;
  sspScene : SspSceneService;
  sspRuntime: SspRuntime;
  sspTorusRuntimeService : SspTorusRuntimeService;
  // model : { [outerScene : string] : string} = {};
  model : any = {};
  outerScene : String;
  //TODO create an official interface for this type
  // innerGame : any;
  innerGame : InnerGame;
  
  constructor(
    private el: ElementRef, 
    // private _sspTorusSceneService: SspTorusSceneService,
    public baseService: BaseService,
    private renderer : Renderer,
    private _kbdHandlerRouterService : KbdHandlerRouterService,
    private injector: Injector
    // public sspTorusRuntimeService: SspTorusRuntimeService
    ) 
  { 
    console.log(`TorroidComponent.ctor: entered`);
    // this.model = {
    //   outerScene: "torus"
    // }; 
    this.model.outerScene = 'torus';
    // this.model.outerScene = 'plane';
    // console.log('TorroidComponent: ctor: sspTorusSceneService=' + this.sspTorusSceneService);
    console.log('TorroidComponent: ctor: baseService=' + this.baseService);
    // this.sspTorusRuntimeService = new SspTorusRuntimeService(this._sspTorusSceneService.vrSceneService);
    // this.sspTorusRuntimeService = new SspTorusRuntimeService(this.sspScene.vrSceneService);
    // console.log('TorroidComponent: ctor: outerScene=' + this.model.outerScene);
    // this.innerGame = new AsteroidsGame();
    this.innerGame = this.injector.get(AsteroidsGame);
  }

  ngOnInit() {
    console.log('TorroidsComponent.ngOnInit: entered');
    // console.log('TorroidComponent: ngOnInit: sspTorusSceneService=' + this.sspTorusSceneService);
    // console.log('TorroidComponent: ngOnInit: sspTorusSceneService.vrSceneService.webGLRenderer=' + this.sspTorusSceneService.vrSceneService.webGLRenderer);

    // this.vrScene = new VRSceneService(window.innerWidth, window.innerHeight, this.webGLCanvas.webGLRenderer)
    // this.vrScene = new VRSceneService(window.innerWidth, window.innerHeight, this.webGLRenderer)

    // console.log(`canvas.width = ${this.el.nativeElement.querySelector('#scene-view').width}`);
    // console.log(`canvas.height=${canvas.height}`);
    // console.log(`TorroidComponent.ngOnInit: this.ssTorusSceneService.vrSceneService=${this.sspTorusSceneService}`);
    // console.log(`TorroidComponent.ngOnInit: this.ssTorusSceneService.vrSceneService=${this.sspTorusSceneService}`);

    // this.webGLRenderer = this.sspTorusSceneService.webGLRenderer;

    // this.initOuterScene();
  }

  initOuterScene() {
    console.log(`TorroidsComponent.initOuterScene: entered`);
    let webglDiv = this.el.nativeElement.querySelector('#webgl-container');
    webglDiv.appendChild(this.webGLRenderer.domElement).setAttribute("id", 'webgl-renderer-canvas');
    // webglDiv.setAttribute("id", 'webgl-renderer');

    this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    // this.webGLRenderer.setSize(window.innerWidth * 2.0, window.innerHeight * 2.0);

    let webglRendererCanvas : HTMLElement = this.el.nativeElement.querySelector('#webgl-renderer-canvas');
    // note: this is needed to give the element keyboard focus
    webglRendererCanvas.setAttribute('tabindex', "1");
    let listenFunc = this.renderer.listen(webglRendererCanvas, 'keydown', (event) => {
      console.log(`listenFunc: event=${event}`);
      this.kbdEventHandler(event);
      // console.log('Element clicked');
    });
    webglRendererCanvas.focus();
    // console.log(`TorroidsComponent.initOuterScene: webGLCanvasComponent.width=
    //   ${this.webGLCanvas.webGLRenderer.getSize().width}`);
    // let canvas = this.el.nativeElement.querySelector('#scene-view');
    // // canvas.width = window.innerWidth;
    // // canvas.height = window.innerHeight;
    // this.webGLRenderer = new THREE.WebGLRenderer({antialias: true, });
    // this.webGLRenderer.setClearColor(0xf31313, 1.0);
    // this.webGLRenderer.domElement.id = 'webGLRenderer';
    // this.gl_webGLRenderer = this.webGLRenderer.getContext();

    // // this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    // // console.log(`TorroidsComponent.initOuterScene: document=${document}`);
    // // document.getElementById('scene-view').appendChild( this.webGLRenderer.domElement );
    // canvas.appendChild(this.webGLRenderer.domElement);

    // this.canvasWidth = window.innerWidth;
    //  this.canvasHeight = window.innerHeight;
  }

  debugButtonClick(input, $event) {
    // console.log(`TorroidsComponent.debugButtonClick: webGLCanvasComponent.width=
    //   ${this.webGLCanvas.webGLRenderer.getSize().width}`);
  }

  startButtonClick(input, $event) {
    // this.quickScene();
    console.log('TorroidComponent: startGame: outerScene=' + this.outerScene);
    this.startGame();
  }

  startGame() {
    console.log('TorroidsComponent.startGame: entered');
    console.log('TorroidsComponent.startGame: this.model.outerScene=' + this.model.outerScene);

    // this.innerGame = this.injector.get(AsteroidsMainService);

    switch (this.model.outerScene) {
      case 'torus':
        this.sspScene = this.injector.get(SspTorusSceneService);
        // this.webGLRenderer = this.sspScene.vrSceneService.webGLRenderer;

        // this.initOuterScene();

        // this.sspTorusRuntimeService = new SspTorusRuntimeService(this.sspScene.vrSceneService);
        // this.sspRuntime = new SspTorusRuntimeService(this.sspScene.vrSceneService);
        // console.log('TorroidComponent: ctor: outerScene=' + this.model.outerScene);
        break;
      case 'cyl':
        this.sspScene = this.injector.get(SspCylSceneService);

        // this.webGLRenderer = this.sspScene.vrSceneService.webGLRenderer;

        // this.initOuterScene();

        // this.sspRuntime = new SspCylRuntimeService(this.sspScene.vrSceneService);
        break;
      case 'plane':
        this.sspScene = this.injector.get(SspPlaneSceneService);

        break;
      default:
        console.log('invalid switch selection');
    }

    console.log(`TorroidsComponent.startGame: this.innerGame.asteroidsGame.asteroids[0].vx= ${(<any>this.innerGame).asteroids[0].vx}`);
    this.webGLRenderer = this.sspScene.vrSceneService.webGLRenderer;
    // this.sspRuntime = new SspRuntimeService(this.sspScene.vrSceneService, this.innerGame);
    // this.sspRuntime = new SspRuntimeService(this.sspScene.vrSceneService, 
    this.sspRuntime = new SspRuntimeService(this.sspScene, 
      this.injector.get(THREE.WebGLRenderTarget),
      // new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter }), 
      this.innerGame);
    this.initOuterScene();

    // start hack
    // add the asteroid directly to the outer scene
    // this.sspScene.vrSceneService.scene.add((<any>this.innerGame).asteroids[0].mesh);
    // end hack

    this.sspRuntime.mainLoop();
  }

  kbdEventHandler($event) {
    if ($event.keyCode === 32) {
      console.log(`TorroidsComponent.kbdEventHandler: toggling kbdHandler`);
      console.log(`keyHandler.name=${this.kbdHandlerRouterService.kbdHandler._name}`)

      //TODO: delegate all the getting of services to the kbd router.  this
      // should not be exposed to the client
      if (this.kbdHandlerRouterService.kbdHandler._name === 'cameraKbdHandler') {
        this.kbdHandlerRouterService.kbdHandler = new AsteroidsKbdHandler();
      }
      else if (this.kbdHandlerRouterService.kbdHandler._name === 'asteroidsKbdHandler') {
        this.kbdHandlerRouterService.kbdHandler = new CameraKbdHandlerService(this.baseService);
      }
    }
    console.log(`TorroidComponent.kbdEventHandler:  $event.type=${$event.type}, $event=${$event}`);
    // this.kbdHandlerRouterService.keyHandler ($event, this.vrScene.dolly);
    // this.kbdHandlerRouterService.keyHandler ($event, this.sspTorusSceneService.vrSceneService.dolly);
    switch (this.kbdHandlerRouterService.kbdHandler._name) {
      case('cameraKbdHandler') :
        this.kbdHandlerRouterService.keyHandler ($event, this.sspScene.vrSceneService.dolly);
      break;
      case('asteroidsKbdHandler') :
        this.kbdHandlerRouterService.keyHandler ($event, (<AsteroidsGame>this.innerGame).ship);
      break;
    }
  };

  // Getters and Setters
  // get sspTorusSceneService(): SspTorusSceneService {
  //   return this._sspTorusSceneService;
  // };
  // set sspTorusSceneService(thesspTorusSceneService: SspTorusSceneService) {
  //   this._sspTorusSceneService = thesspTorusSceneService;
  // }
  // get sspScene(): SspScene {
  //   return this.sspScene;
  // };
  // set sspTorusSceneService(thesspTorusSceneService: SspTorusSceneService) {
  //   this._sspTorusSceneService = thesspTorusSceneService;
  // }

  get kbdHandlerRouterService(): KbdHandlerRouterService {
    return this._kbdHandlerRouterService;
  };
}
