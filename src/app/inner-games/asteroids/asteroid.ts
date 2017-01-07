///<reference path="../../../../typings/index.d.ts" />
import { Injectable, Injector } from '@angular/core';
import { IMoveableGameObject } from "../../interfaces/imoveable-game-object";
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';
// import { EmptyParmsServiceProvider } from '../../services/utils.service';
// import { ParmsService } from '../../services/parms.service';

@Injectable()
export class Asteroid implements IMoveableGameObject {

  tag : string;
  three_id : number;
  x  : number;
  vx : number;
  vy : number;
  _width: number;
  height: number;
  DEFAULT_WIDTH = 0.2;
  DEFAULT_HEIGHT = 0.4;
  // make the asteroid smaller by this amount as it progresses through its lifecycle
  LIFECYLE_SCALE_FACTOR = 0.67;
  geom : THREE.PlaneBufferGeometry;
  mat : THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  vScalar: number = 0.004;
  bBox : THREE.Box3;
  lifeCycleStage: number;
  // parms : Object;

  // @Component({
  //   providers: [EmptyParmsServiceProvider],
  // })
  constructor (
    private _base : BaseService,
    private _utils : UtilsService,
    // private _parms? : Object
    //vt-x private _parmsService? : ParmsService
    // private _parmsService? : EmptyParmsServiceProvider
    // private _parmsService? : {provide: ParmsService, useFactory: () => {return new ParmsService({});}}
    // private injector : Injector
    private _parms : Object
  ) {
    this.x = 0.0;
    this.vx = 0.003;
    this.vy = 0;
    // console.log(`parmsSerice=${this.parmsService}`);
    // if (this.parmsService !== undefined) {
    //   this.parms = this.parmsService.parms;
    //   console.log(`parms=${this.parms}`);
    // }
    // else {
    //   this.parms = {};
    // }

    // this.width = this.parms['width'] || this.DEFAULT_WIDTH;
    // this.height = this.parms['height'] || this.DEFAULT_HEIGHT;

    this.init();
  };

  init() {
    this.width = this.parms['width'] || this.DEFAULT_WIDTH;
    this.height = this.parms['height'] || this.DEFAULT_HEIGHT;
    // console.log(`Asteroid.init: width=${this.width}, height=${this.height}`);

    this.tag = 'asteroid';
    // this.geom = new THREE.PlaneBufferGeometry(0.2, 0.4);
    this.geom = new THREE.PlaneBufferGeometry(this.width, this.height);
    this.geom.computeBoundingBox();
    this.mat = new THREE.MeshBasicMaterial({ color: 0x70FF20, side: THREE.DoubleSide });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    // this.mesh.position.z = 1.0;
    // this.mesh.position.x = -3.0;
    this.mesh.position.x = 0.0;
    // this.mesh.position.z = -10.0;
    this.mesh.position.z = 0.0;

    // it's important that all the x,y,z positions be set to zero for bBox to work properly
    // redundant to geom.boundingBox?
    this.bBox = new THREE.Box3().setFromObject(this.mesh);

    this.lifeCycleStage = 0;
    // console.log(`containsPoint=${this.bBox.containsPoint(new THREE.Vector3(-3.3, 0, 0))}`);
  };

  updatePos() {
    // this.mesh.position.x +=
    this.utils.updatePos(this, this.base.projectionBoundary);
  };

  // returns true or false depending if the point is inside the asteroid's bounding box.
  collisionTest(point : THREE.Vector3) : boolean {
    let beenHit : boolean = false;

    // since manipulate the point during testing, make a clone so we don't affect
    // the parent object of point.
    let pointClone = point.clone();
    // beenHit = this.bBox.containsPoint(pointClone.sub(this.mesh.position));
    beenHit = this.mesh.geometry.boundingBox.containsPoint(pointClone.sub(this.mesh.position));

    // if (this.mesh.geometry.boundingBox.max.x == 1.0
    // if (this.mesh.scale.x == 2.0
    //   // && Math.abs(pointClone.x - this.mesh.position.x) < 2.0
    //   // && Math.abs(pointClone.y - this.mesh.position.y) < 2.0
    // ){
    //   // parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
    //   console.log(`Asteroid.collisionTest:
    //     b.x=${Number(point.x).toFixed(3)},p.x=${Number(pointClone.x).toFixed(3)}, ast.x=${Number(this.mesh.position.x).toFixed(3)}, delta=${Number(point.x - this.mesh.position.x).toFixed(3)}:
    //     b.y=${Number(point.y).toFixed(3)},p.y=${Number(pointClone.y).toFixed(3)}, ast.y=${Number(this.mesh.position.y).toFixed(3)}, delta=${Number(point.y - this.mesh.position.y).toFixed(3)}
    //     `);
    //   console.log(`beenHit=${beenHit}`);
    // }

    return beenHit;
  }

  collisionHandler() {
    // this.vx = -this.vx;
    let result = [];
    console.log(`Asteroid.collisionHandler: lifeCycleStage=${this.lifeCycleStage}`);
    if (this.lifeCycleStage < 2) {
      // this.parms['width'] = this.width * this.LIFECYLE_SCALE_FACTOR;
      // this.parms['height'] = this.height * this.LIFECYLE_SCALE_FACTOR;
      let vx = this.vx;
      let vy = this.vy;
      let posX = this.mesh.position.x;
      let posY = this.mesh.position.y;
      let posZ = this.mesh.position.z;
      let lastLifeCycleStage = this.lifeCycleStage;

      //TODO: break init into a static and dynamic init
      // this.init();
      //
      // this.vx = vx;
      // this.vy = vy;
      // this.mesh.position.x = posX;
      // this.mesh.position.y = posY;
      // this.mesh.position.y = posZ;

      let splitAst1 = new Asteroid(
        this.base,
        this.utils,
        // new ParmsService({width : this.width, height : this.height})
        {width : this.width * this.LIFECYLE_SCALE_FACTOR, height : this.height * this.LIFECYLE_SCALE_FACTOR}
      );

      splitAst1.mesh.position.x = this.mesh.position.x;
      splitAst1.mesh.position.y = this.mesh.position.y;
      splitAst1.mesh.position.z = this.mesh.position.z;

      splitAst1.vx =  -this.vx;
      splitAst1.vy =  this.vy;

      splitAst1.three_id = splitAst1.mesh.id;
      splitAst1.lifeCycleStage = lastLifeCycleStage + 1;
      // return true;
      // return new Asteroid(this.base, this.utils);
      // let splitAst = this.clone();
      // var obj2:any=Object.assign({},obj1);
      // let splitAst : Asteroid = Object.assign({} , this);
      // splitAst.vy = -this.vy

      let splitAst2 = new Asteroid(
        this.base,
        this.utils,
        {width : this.width * this.LIFECYLE_SCALE_FACTOR, height : this.height * this.LIFECYLE_SCALE_FACTOR}
      );

      splitAst2.mesh.position.x = this.mesh.position.x;
      splitAst2.mesh.position.y = this.mesh.position.y;
      splitAst2.mesh.position.z = this.mesh.position.z;

      splitAst2.vx =  this.vx;
      splitAst2.vy = -this.vy;

      splitAst2.three_id = splitAst2.mesh.id;
      splitAst2.lifeCycleStage = lastLifeCycleStage + 1;
      result = [splitAst1, splitAst2];
    }

    return result;
  }

  //getters and setters
  get base(): BaseService {
    return this._base;
  };
  get utils(): UtilsService {
    return this._utils;
  };
  // get parmsService(): ParmsService {
  //   return this._parmsService;
  // };
  get parms(): Object {
    return this._parms;
  };

  get width(): number {
    return this._width;
  };
  set width(w : number) {
    this._width = w;
    // this.geom.w
    // this.geom.
  };

}
