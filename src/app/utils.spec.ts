/// <reference path="../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

// import { addProviders, async, inject } from '@angular/core/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import {Utils} from './utils';

// export interface TestInterface{
//   abc();
//   def();
// }

describe('Utils', () => {
  let utils: Utils;
  // let testInterface = interface TestInterface{
  //   abc();
  //   def();
  // }

  // interface TestInterface{
  //   abc();
  //   def();
  // }

  // class testObject1 implements TestInterface {
  //   abc () {}
  //   def () {}
  //   ghi () {}
  // }
  //
  // class testObject2 {
  //   xyz () {}
  // }

  beforeEach( () => {
    utils = new Utils();
  });

  it('should create an instance', () => {
    expect(new Utils()).toBeTruthy();
    // var a = new THREE.MeshFaceMaterial()
    // var b = new THREE.Mesh
  });

  // it('implements works', () => {
  //   expect(utils.implementsInterface(testObject1, TestInterface)).toBeTruthy()
  //   expect(utils.implementsInterface(testObject2, TestInterface)).toBeFalsy()
  // })

});
