/// <reference path="../../../typings/index.d.ts" />
import { Component, OnInit, ElementRef, Inject, ViewChild, Injectable, Renderer } from '@angular/core';
import { WebGLCanvasComponent } from '../directives/webgl-canvas/webgl-canvas.component';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
import { SspTorusSceneService, SspTorusSceneProvider } from '../services/ssp-torus-scene.service';
import { BaseService } from '../services/base.service';
import { SspTorusRuntimeService } from '../services/ssp-torus-runtime.service';
import { KbdHandlerRouterService} from '../services/kbd-handler-router.service';

@Component({
  selector: 'app-torroids',
  templateUrl: './torroids.component.html',
  styleUrls: ['./torroids.component.css'],
  // providers: [ElementRef],
  providers: [VRSceneServiceProvider, WebGLCanvasComponent, SspTorusSceneProvider,
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
  vrScene : VRSceneService;
  sspTorusRuntimeService : SspTorusRuntimeService;
  
  constructor(
    private el: ElementRef, 
    private _sspTorusSceneService: SspTorusSceneService,
    public baseService: BaseService,
    private renderer : Renderer,
    private _kbdHandlerRouterService : KbdHandlerRouterService
    // public sspTorusRuntimeService: SspTorusRuntimeService
    ) 
  { 
    console.log('TorroidComponent: ctor: sspTorusSceneService=' + this.sspTorusSceneService);
    this.sspTorusRuntimeService = new SspTorusRuntimeService(this._sspTorusSceneService.vrSceneService);
  }

  ngOnInit() {
    // console.log('TorroidsComponent.ngOnInit: entered');
    // console.log('TorroidComponent: ngOnInit: sspTorusSceneService=' + this.sspTorusSceneService);
    // console.log('TorroidComponent: ngOnInit: sspTorusSceneService.vrSceneService.webGLRenderer=' + this.sspTorusSceneService.vrSceneService.webGLRenderer);

    // this.vrScene = new VRSceneService(window.innerWidth, window.innerHeight, this.webGLCanvas.webGLRenderer)
    // this.vrScene = new VRSceneService(window.innerWidth, window.innerHeight, this.webGLRenderer)

    // console.log(`canvas.width = ${this.el.nativeElement.querySelector('#scene-view').width}`);
    // console.log(`canvas.height=${canvas.height}`);
    // console.log(`TorroidComponent.ngOnInit: this.ssTorusSceneService.vrSceneService=${this.sspTorusSceneService}`);
    // console.log(`TorroidComponent.ngOnInit: this.ssTorusSceneService.vrSceneService=${this.sspTorusSceneService}`);

    this.webGLRenderer = this.sspTorusSceneService.webGLRenderer;

    this.initOuterScene();
  }

  initOuterScene() {
    console.log(`TorroidsComponent.initOuterScene: entered`);
    let webglDiv = this.el.nativeElement.querySelector('#webgl-container');
    webglDiv.appendChild(this.webGLRenderer.domElement).setAttribute("id", 'webgl-renderer-canvas');
    // webglDiv.setAttribute("id", 'webgl-renderer');

    this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);

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
    this.startGame();
  }

  startGame() {
    console.log('TorroidsComponent.startGame: entered');

    let scene = this._sspTorusSceneService.vrSceneService.scene;
    let camera = this._sspTorusSceneService.vrSceneService.camera;

    var geometry = new THREE.PlaneGeometry( 65, 40, 32 );                                            
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );         
    var plane = new THREE.Mesh( geometry, material );                                                
    // plane.rotateX(Math.PI / 180.0 * 90.0)                                                               
    plane.rotateX( BaseService.ONE_DEG * 90.0)                                                               
    scene.add( plane );     

    document.getElementById('webgl-container').focus();
    // this.webGLRenderer.render(scene, camera);
    // this.sspTorusSceneService.vrSceneService.webVrManager.render(scene, camera);
    this.sspTorusRuntimeService.mainLoop();
  }

  kbdEventHandler($event) {
    console.log(`TorroidComponent.kbdEventHandler: $event.type=${$event.type}, $event=${$event}`);
    // this.kbdHandlerRouterService.keyHandler ($event, this.vrScene.dolly);
    this.kbdHandlerRouterService.keyHandler ($event, this.sspTorusSceneService.vrSceneService.dolly);
  };

  quickScene() {
    console.log('TorroidsComponent.quickScene: entered');
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);           
    camera.name = 'vrscene_camera';                                                              
    camera.position.set(0, 1.5, 10);  

    var geometry = new THREE.PlaneGeometry( 65, 40, 32 );                                            
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );         
    var plane = new THREE.Mesh( geometry, material );                                                
    // plane.rotateX(Math.PI / 180.0 * 90.0)                                                               
    plane.rotateX( BaseService.ONE_DEG * 90.0)                                                               
    scene.add( plane );     

    // this.webGLCanvas.webGLRenderer.render(scene, camera);
    // this.webGLRenderer.render(scene, camera);

  }

  // Getters and Setters
  get sspTorusSceneService(): SspTorusSceneService {
    return this._sspTorusSceneService;
  };
  set sspTorusSceneService(thesspTorusSceneService: SspTorusSceneService) {
    this._sspTorusSceneService = thesspTorusSceneService;
  }

  get kbdHandlerRouterService(): KbdHandlerRouterService {
    return this._kbdHandlerRouterService;
  };
}
