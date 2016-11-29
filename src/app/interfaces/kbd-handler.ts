export interface KbdHandler {

  _name : string;
  keyHandler(event : KeyboardEvent, object : any);
}
