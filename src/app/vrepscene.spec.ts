/* tslint:disable:no-unused-variable */

// import { addProviders, async, inject } from '@angular/core/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { VREPScene} from './vrepscene';

fdescribe('VREPScene', () => {
  let vrepScene: VREPScene;

  beforeEach(() => {
    vrepScene = new VREPScene();
  });

  it('should create an instance', () => {
    expect(new VREPScene()).toBeTruthy();
  });
  
  it('should have a camera', () => {
    // debugger;
    expect(vrepScene.camera).toBeTruthy();
  })

  it('should have a dolly', () => {
    // debugger;
    expect(vrepScene.dolly).toBeTruthy();
  })
});
