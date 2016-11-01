/// <reference path="../../../../typings/index.d.ts" />
import { Component, OnInit, ElementRef, Injectable } from '@angular/core';

@Component({
  selector: 'app-webgl-canvas',
  templateUrl: './webgl-canvas.component.html',
  styleUrls: ['./webgl-canvas.component.css']
})

@Injectable()
export class WebGLCanvasComponent implements OnInit {
  webGLRenderer: THREE.WebGLRenderer;
  canvasWidth: number;
  canvasHeight: number;
  canvasId: string;
  // constructor() { }
  constructor(private el: ElementRef) {
    console.log(`WebGLCanvasComponent.ctor: hello`);

    this.init();
  } 

  ngOnInit() {
    console.log(`WebGLCanvasComponent.ngOnInit: entered`);
    // let canvas = this.el.nativeElement.querySelector('canvas');
    let canvasDiv = this.el.nativeElement.querySelector('#canvas-div');

    // console.log(`WebGLCanvasComponent.ngOnInit: canvas= ${canvas}`);
    console.log(`WebGLCanvasComponent.ngOnInit: canvasDiv= ${canvasDiv}`);
    // canvas.appendChild(this.webGLRenderer.domElement);
    this.el.nativeElement.appendChild(this.webGLRenderer.domElement);
  }

  init() {
    console.log(`WebGLCanvasComponent.init: entered`);
    let canvas = this.el.nativeElement.querySelector('canvas');

    console.log(`WebGLCanvasComponent.init: canvas= ${canvas}`);
    this.webGLRenderer = new THREE.WebGLRenderer({antialias: true, });
    this.webGLRenderer.setClearColor(0xf31313, 1.0);
    this.webGLRenderer.domElement.id = 'webGLRenderer';
    // this.gl_webGLRenderer = this.webGLRenderer.getContext();
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.webGLRenderer.domElement.width = this.canvasWidth;
    this.webGLRenderer.domElement.height = this.canvasHeight;

    // canvas.appendChild(this.webGLRenderer.domElement);
    // console.log(`WebGLCanvasComponent.init: canvas.id= ${this.canvasId}`);
    // this.canvasId = 'abc';
    // console.log(`WebGLCanvasComponent.init: canvas.id(post)= ${this.canvasId}`);
    // canvas = this.el.nativeElement.querySelector('#abc');
    // console.log(`WebGLCanvasComponent.init: canvas-b= ${canvas}`);
  }
}
