/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilsService, DatGUIProvider  } from './utils.service';

xdescribe('Service: Utils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService, DatGUIProvider]
    });
  });

  it('should ...', inject([UtilsService, DatGUIProvider], (service: UtilsService) => {
    expect(service).toBeTruthy();
    expect(service.addControls).toBeTruthy();
    // expect(service.datGui).toBeTruthy();
  }));
});
