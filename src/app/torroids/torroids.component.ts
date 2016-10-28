// <reference path="../../../typings/index.d.ts" />
import { Component, OnInit, ElementRef, Inject } from '@angular/core';

@Component({
  selector: 'app-torroids',
  templateUrl: './torroids.component.html',
  styleUrls: ['./torroids.component.css']
  // providers: [ElementRef],
})

export class TorroidsComponent implements OnInit {

  webGLRenderer: THREE.WebGLRenderer;
  gl_webGLRenderer: any;
  canvasWidth: number;
  canvasHeight: number;
  // private el: ElementRef;
  
  constructor(private el: ElementRef) { 
  // constructor(@Inject(ElementRef) ElementRef) {
  // constructor() { 
    // this.el = ElementRef;
  }

  ngOnInit() {
    console.log('TorroidsComponent.ngOnInit: entered');

    // console.log(`canvas.width = ${this.el.nativeElement.querySelector('#scene-view').width}`);
    // console.log(`canvas.height=${canvas.height}`);

    this.initOuterScene();
  }

  initOuterScene() {
    let canvas = this.el.nativeElement.querySelector('#scene-view');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    this.webGLRenderer = new THREE.WebGLRenderer({antialias: true, });
    this.webGLRenderer.setClearColor(0xf31313, 1.0);
    this.webGLRenderer.domElement.id = 'webGLRenderer';
    this.gl_webGLRenderer = this.webGLRenderer.getContext();

    // this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    // console.log(`TorroidsComponent.initOuterScene: document=${document}`);
    // document.getElementById('scene-view').appendChild( this.webGLRenderer.domElement );
    canvas.appendChild(this.webGLRenderer.domElement);

    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
  }
}
