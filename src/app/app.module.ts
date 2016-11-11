/// <reference path="../../typings/index.d.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TorroidsComponent } from './torroids/torroids.component';
import { WebGLCanvasComponent } from './directives/webgl-canvas/webgl-canvas.component';
import { VRSceneService, VRSceneServiceProvider} from './services/vr-scene.service';
// import { SspTorusSceneService, SspTorusSceneProvider} from './services/ssp-torus-scene.service';
import { SspTorusRuntimeService } from './services/ssp-torus-runtime.service';
import { BaseService } from './services/base.service';
import { KbdHandlerRouterService } from './services/kbd-handler-router.service';
import { CameraKbdHandlerService } from './services/camera-kbd-handler.service';
import { ToroutComponent } from './torout/torout.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TorroidsComponent,
    WebGLCanvasComponent,
    ToroutComponent,
    HomeComponent,
  ],
  // exports: [
  //   WebGLCanvasComponent
  // ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'torroids', component: TorroidsComponent },
      { path: 'torout', component: ToroutComponent },
      { path: '', component: HomeComponent },
    ]),
  ],
  // providers: [],
  // providers: [THREE.WebGLRenderer],
  providers: [
    VRSceneServiceProvider,
    // SspTorusRuntimeService
    BaseService,
    KbdHandlerRouterService,
    CameraKbdHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
