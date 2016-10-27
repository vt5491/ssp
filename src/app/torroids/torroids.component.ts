// <reference path="../../../typings/index.d.ts" />
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torroids',
  templateUrl: './torroids.component.html',
  styleUrls: ['./torroids.component.css']
})
export class TorroidsComponent implements OnInit {

  webGLRenderer: THREE.WebGLRenderer;
  gl_webGLRenderer: any;
  
  constructor() { }

  ngOnInit() {
    console.log('TorroidsComponent.ngOnInit: entered');

    this.initOuterScene();
  }

  initOuterScene() {
    this.webGLRenderer = new THREE.WebGLRenderer({antialias: true, });
    this.webGLRenderer.setClearColor(0xf31313, 1.0);
    this.webGLRenderer.domElement.id = 'webGLRenderer';
    this.gl_webGLRenderer = this.webGLRenderer.getContext();

    this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById('canvas-container').appendChild( this.webGLRenderer.domElement );
  }
}
