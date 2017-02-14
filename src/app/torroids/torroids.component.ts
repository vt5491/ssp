// <reference path="../../../typings/index.d.ts" />
import { Component, OnInit, ElementRef, Inject, ViewChild, Injectable, Renderer, Injector } from '@angular/core';
import { WebGLCanvasComponent } from '../directives/webgl-canvas/webgl-canvas.component';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
import { ISspScene } from '../interfaces/ssp-scene';
import { SspRuntime } from '../ssp-runtime';
import { SspTorusSceneService, SspTorusSceneProvider } from '../services/ssp-torus-scene.service';
import { SspCylSceneService, SspCylSceneProvider } from '../services/ssp-cyl-scene.service';
import { SspPlaneSceneService, SspPlaneSceneProvider } from '../services/ssp-plane-scene.service';
import { SspCubeScene, SspCubeSceneProvider } from '../services/ssp-cube-scene.service';
import { SspPyramidScene, SspPyramidSceneProvider } from '../services/ssp-pyramid-scene.service';
import { SspSphereScene, SspSphereSceneProvider } from '../services/ssp-sphere-scene.service';
import { BaseService } from '../services/base.service';
import { SspTorusRuntimeService } from '../services/ssp-torus-runtime.service';
import { SspCylRuntimeService } from '../services/ssp-cyl-runtime.service';
import { SspRuntimeService } from '../services/ssp-runtime.service';
import { KbdHandlerRouterService} from '../services/kbd-handler-router.service';
import { CameraKbdHandlerService} from '../services/camera-kbd-handler.service';
import { AsteroidsGame } from '../inner-games/asteroids/asteroids-game';
import { AsteroidsKbdHandler } from '../inner-games/asteroids/asteroids-kbd-handler';
import { InnerGame } from '../interfaces/inner-game';
import { WebGLRenderTargetProvider, UtilsService } from '../services/utils.service';
import { ThreeJsSceneProvider } from '../services/utils.service';
import { Ship } from '../inner-games/asteroids/ship';

@Component({
  selector: 'app-torroids',
  templateUrl: './torroids.component.html',
  styleUrls: ['./torroids.component.css'],
  providers: [VRSceneServiceProvider, WebGLCanvasComponent, SspTorusSceneProvider,
    SspCylSceneProvider, SspPlaneSceneProvider, SspCubeSceneProvider,
    SspPyramidSceneProvider, SspSphereSceneProvider,
    WebGLRenderTargetProvider, ThreeJsSceneProvider,
    KbdHandlerRouterService,
  ]
})

@Injectable()
export class TorroidsComponent implements OnInit {
  webGLRenderer: THREE.WebGLRenderer;
  gl_webGLRenderer: any;
  canvasWidth: number;
  canvasHeight: number;
  private _sspScene : ISspScene;
  sspRuntime: SspRuntimeService;
  model : any = {};
  outerScene : String;
  //TODO create an official interface for this type
  innerGame : InnerGame;
  gPad : Gamepad;

  constructor(
    private el: ElementRef,
    public base: BaseService,
    private renderer : Renderer,
    private _kbdHandlerRouter : KbdHandlerRouterService,
    private injector: Injector,
    private utils: UtilsService
    )
  {
    //console.log(`TorroidComponent.ctor: entered`);
    this.model.outerScene = 'cyl';
    this.model.enableCameraTracking = false;
    this.model.enableGridHelpers = true;
    console.log('TorroidComponent: ctor: _kbdHandlerRouterService=' + this._kbdHandlerRouter);
    this.innerGame = this.injector.get(AsteroidsGame);
    let control = new function() {
      this.canvasWidth = 500;
     };

    this.utils.addControls(control);
  }

  ngOnInit() {
    console.log('TorroidsComponent.ngOnInit: entered');
  }

  initOuterScene() {
    console.log(`TorroidsComponent.initOuterScene: entered`);
    let webglDiv = this.el.nativeElement.querySelector('#webgl-container');
    webglDiv.appendChild(this.webGLRenderer.domElement).setAttribute("id", 'webgl-renderer-canvas');

    let webglRendererCanvas : HTMLElement = this.el.nativeElement.querySelector('#webgl-renderer-canvas');
    // note: this is needed to give the element keyboard focus
    webglRendererCanvas.setAttribute('tabindex', "1");
    let listenFunc = this.renderer.listen(webglRendererCanvas, 'keydown', (event) => {
      this.kbdEventHandler(event);
    });

    if (this.utils.parms.enableGridHelpers) {
      let gridHelper_xy = new THREE.GridHelper(100, 20);
      gridHelper_xy.rotateX(this.base.ONE_DEG * 90.0);
      this.sspScene.vrScene.scene.add(gridHelper_xy);

      let gridHelper_xz = new THREE.GridHelper(100, 20);
      gridHelper_xz.rotateX(this.base.ONE_DEG * 0.0);
      this.sspScene.vrScene.scene.add(gridHelper_xz);

      let gridHelper_yz = new THREE.GridHelper(100, 20);
      gridHelper_yz.rotateZ(this.base.ONE_DEG * 90.0);
      // this.sspScene.vrScene.scene.add(gridHelper_yz);

      let axisHelper = new THREE.AxisHelper(10);
      this.sspScene.vrScene.scene.add(axisHelper);
    }

    webglRendererCanvas.focus();
    document.getElementById('webgl-renderer-canvas').focus();
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

    this.utils.parms.enableCameraTracking = this.model.enableCameraTracking;
    this.utils.parms.enableGridHelpers = this.model.enableGridHelpers;
    // this.innerGame = this.injector.get(AsteroidsMainService);

    switch (this.model.outerScene) {
      case 'torus':
        this.sspScene = this.injector.get(SspTorusSceneService);
        break;

      case 'cyl':
        this.sspScene = this.injector.get(SspCylSceneService);

        break;
      case 'plane':
        this.sspScene = this.injector.get(SspPlaneSceneService);

        break;

      case 'cube':
        this.sspScene = this.injector.get(SspCubeScene);

        break;

      case 'pyramid':
        this.sspScene = this.injector.get(SspPyramidScene);

        break;

      case 'sphere':
        this.sspScene = this.injector.get(SspSphereScene);

        break;
      default:
        console.log('invalid switch selection');
    }

    //TODO: these next lines means the client has to know low-levels of
    // kbdHandlerRouter.  Is there a way to eliminate this?
    //set the dolly of the cameraKbdHandler
    this.kbdHandlerRouter.cameraKbdHandler.dolly = this.sspScene.vrScene.dolly;

    this.webGLRenderer = this.sspScene.vrScene.webGLRenderer;
    this.sspRuntime = new SspRuntimeService(
      this.sspScene,
      this.injector.get(THREE.WebGLRenderTarget),
      this.innerGame,
      this.injector.get(CameraKbdHandlerService),
      this.injector.get(UtilsService),
      this.injector.get(BaseService),
      );
    this.initOuterScene();

    this.utils.addStats();

    this.sspRuntime.mainLoop();
  }

  kbdEventHandler($event) {
    this.kbdHandlerRouter.keyEventHandler($event);
  };

  onResize(event) {
    console.log('TorroidsComponent.onResize: event=' + event)
    var camera = this.sspRuntime.outerVrScene.camera;
    var renderer = this.sspRuntime.webGLRenderer;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    // and inform the inner game as well
    this.sspRuntime.onResize(event);
  }

  // Getters and Setters
  get kbdHandlerRouter(): KbdHandlerRouterService {
    return this._kbdHandlerRouter;
  };
  get sspScene(): ISspScene {
    return this._sspScene;
  };
  set sspScene(newSspScene : ISspScene) {
    this._sspScene = newSspScene;
  };
}
