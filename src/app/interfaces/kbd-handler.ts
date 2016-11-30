export interface KbdHandler {

  _name : string;
  // keyHandler(event : KeyboardEvent, object : any);
  keyEventHandler(event : KeyboardEvent);

  // get name() {
  //   return this._name;
  // }
}
