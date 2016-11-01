/// <reference path="../../../typings/index.d.ts" />
import { Component, OnInit, ElementRef, Inject, ViewChild, Injectable } from '@angular/core';
import { WebGLCanvasComponent } from '../directives/webgl-canvas/webgl-canvas.component';
import { VRSceneService, VRSceneServiceProvider } from '../vr-scene.service';

@Component({
  selector: 'app-torroids',
  templateUrl: './torroids.component.html',
  styleUrls: ['./torroids.component.css'],
  // providers: [ElementRef],
  providers: [VRSceneServiceProvider, WebGLCanvasComponent]
})

// @ViewChild('webGLCanvas') someElement;

@Injectable()
export class TorroidsComponent implements OnInit {
  @ViewChild(WebGLCanvasComponent) webGLCanvas : WebGLCanvasComponent;

  webGLRenderer: THREE.WebGLRenderer;
  gl_webGLRenderer: any;
  canvasWidth: number;
  canvasHeight: number;
  // private el: ElementRef;
  vrScene : VRSceneService;
  
  constructor(private el: ElementRef) { 
  // constructor(private el: ElementRef, private vrscene: VRSceneService) { 
    // console.log('TorroidComponent: ctor: vrscene=' + vrscene);
  // constructor(@Inject(ElementRef) ElementRef) {
  // constructor() { 
    // this.el = ElementRef;
    this.initOuterScene();
  }

  ngOnInit() {
    console.log('TorroidsComponent.ngOnInit: entered');

    this.vrScene = new VRSceneService(window.innerWidth, window.innerHeight, this.webGLCanvas.webGLRenderer)

    // console.log(`canvas.width = ${this.el.nativeElement.querySelector('#scene-view').width}`);
    // console.log(`canvas.height=${canvas.height}`);

    // this.initOuterScene();
  }

  initOuterScene() {
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
    console.log(`TorroidsComponent.debugButtonClick: webGLCanvasComponent.width=
      ${this.webGLCanvas.webGLRenderer.getSize().width}`);
  }

  startButtonClick(input, $event) {
    this.quickScene();
  }

  quickScene() {
    console.log('TorroidsComponent.quickScene: entered');
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);           
    camera.name = 'vrscene_camera';                                                              
    camera.position.set(0, 1.5, 10);  

    var geometry = new THREE.PlaneGeometry( 65, 40, 32 );                                            
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );         
    var plane = new THREE.Mesh( geometry, material );                                                
    plane.rotateX(Math.PI / 180.0 * 90.0)                                                               
    scene.add( plane );     

    this.webGLCanvas.webGLRenderer.render(scene, camera);

  }
}
