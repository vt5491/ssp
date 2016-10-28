/* tslint:disable:no-unused-variable */

// import { addProviders, async, inject } from '@angular/core/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { SSPScene} from './sspscene';

fdescribe('SSPScene', () => {
  let sspScene: SSPScene;

  beforeEach(() => {
    sspScene = new SSPScene();
  });

  it('should create an instance', () => {
    expect(new SSPScene()).toBeTruthy();
  });

  it('should have a camera', () => {
    // debugger;
    expect(sspScene.camera).toBeTruthy();
  });

  it('should have all the necessary objects', () => {
    //debugger;
    expect(sspScene.dolly).toBeTruthy();
    expect(sspScene.vrControls).toBeTruthy();
  });
});
