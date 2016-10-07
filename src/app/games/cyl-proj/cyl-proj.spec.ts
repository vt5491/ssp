/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

// import { addProviders, async, inject } from '@angular/core/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import {CylProj} from './cyl-proj';
// import VREPRuntime from '../vrepruntime'
// import VREPRuntime = require('../vrepruntime');
import * as _ from 'lodash';


describe('CylProj', () => {
  let cylProj: CylProj;

  beforeEach( () => {
    cylProj = new CylProj();
  });

  it('should create an instance', () => {
    expect(new CylProj()).toBeTruthy();
  });

  // it('implements the VREPRuntime interface', () => {
  //   // expect(this.cylProj)
  //   console.log(`typeof cylProj=${typeof cylProj}`)
  //   console.log(`typeof cylProj instanceof CylProj=${cylProj instanceof CylProj}`)
  //   // console.log(`typeof cylProj instanceof CylProj=${cylProj instanceof VREPRuntime}`)
  // })
 
  it('implements the VREPRuntime interface', () => {
    // console.log(`ut: cylProj.toJson=${JSON.stringify(cylProj)}`)
    // expect(_.functions(CylProj))
    // let cylProj = new CylProj()
    let funcs = _.functions(Object.getPrototypeOf(cylProj));
    
    // console.log(`ut: funcs=${funcs}`);
    // console.log(`ut: funcs.length=${funcs.length}`);
    // console.log(`ut: funcs[0]=${funcs[0]}`);
    
    expect(_.find(funcs, (fName) => { return fName === 'init'; }).length === 1);
    expect(_.find(funcs, (fName) => { return fName === 'animationLoop'; }).length === 1);
  });
  
  it('has the appropriate properties', () => {
    // debugger;
    expect(cylProj.webGLRenderer).toBeTruthy();
    // verify its of type 'webGLRenderer'
    expect((<any> cylProj.webGLRenderer.constructor).name 
      === (<any> (new THREE.WebGLRenderer()).constructor).name);
  });

});
