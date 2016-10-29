/// <reference path="../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TorroidsComponent } from './torroids.component';
import { ElementRef } from '@angular/core';

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


fdescribe('Component: Torroids', () => {
  // component : TorroidsComponent;

  // beforeEachProviders(() => [Component, provide(ElementRef, { useValue: new MockElementRef() })]);
  // beforeEachProviders(() => [TorroidsComponent, provide(ElementRef, { useValue: new MockElementRef() })]);

  beforeEach ( () => {
    // this.component = new TorroidsComponent(new ElementRef());
    // this.component = new TorroidsComponent({ provide: ElementRef, useClass: MockElementRef })
    this.component = new TorroidsComponent( new MockElementRef());
    // this.component = new TorroidsComponent( new ElementRef({}));
  });
  // beforeEach(() => {
  //   addProviders([
  //       {provide: ElementRef, useClass: MockElementRef}
  //   ])
  // });

  it('should create an instance', () => {
    // let component = new TorroidsComponent(@Inject(ElementRef) ElementRef);
    let component = new TorroidsComponent( new MockElementRef());
    console.log('hi from ut');
    expect(component).toBeTruthy();
  });

  it('initOuterScene should work', () => {
    // let component = new TorroidsComponent();
    console.log('hi from ut2');
    console.log(`ut: this.component=${this.component}`);
    console.log(`ut: this.component.querySelector=${this.component.querySelector}`);
    this.component.initOuterScene();
    console.log(`ut.initOuterScene: webGLRenderer=${this.component.webGLRenderer}`);
    // expect(this.component.webGLRenderer).toBeTruthy();
    // expect(this.component.webGLRenderer).toBeFalsy();
  });
});
