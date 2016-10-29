/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { WebGLCanvasComponent } from './webgl-canvas.component';
import { ElementRef } from '@angular/core';

let mockCanvas = document.createElement('canvas');
let mockNativeElement = {
  querySelector : function () {
    return mockCanvas;
  } 
};

class MockElementRef implements ElementRef {
  nativeElement = mockNativeElement;
};

describe('Component: WebGLCanvas', () => {
  beforeEach ( () => {
    this.component = new WebGLCanvasComponent( new MockElementRef());
  });

  it('should create an instance', () => {
    // let component = new WebGLCanvasComponent();
    // expect(component).toBeTruthy();
    expect(this.component).toBeTruthy();
  });

  it('a webGLRenderer is attached to the template canvas', () => {
    expect(this.component.webGLRenderer).toBeTruthy(); 
  })
});
