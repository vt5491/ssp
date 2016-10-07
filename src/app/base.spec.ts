/* tslint:disable:no-unused-variable */

// import { addProviders, async, inject } from '@angular/core/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import {Base} from './base';

describe('Base', () => {
  let base: Base;

  beforeEach( () => {
    base = new Base();
  });

  it('should create an instance', () => {
    expect(new Base()).toBeTruthy();
  });

  it('ONE_DEG is set', () => {
    expect(Base.ONE_DEG).toBeTruthy();
  });
});
