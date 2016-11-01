/// <reference path="../../typings/index.d.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TorroidsComponent } from './torroids/torroids.component';
import { WebGLCanvasComponent } from './directives/webgl-canvas/webgl-canvas.component';
// import { VRSceneService, VRSceneServiceProvider} from './vr-scene.service';

@NgModule({
  declarations: [
    AppComponent,
    TorroidsComponent,
    WebGLCanvasComponent,
  ],
  // exports: [
  //   WebGLCanvasComponent
  // ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
