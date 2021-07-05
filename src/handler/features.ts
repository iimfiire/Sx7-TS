import fireClient from './fireClient';

type execute = (client: fireClient) => void | Promise<void>;


export default class Feature {
  _execute: execute;

  constructor(execute: execute) {
    this._execute = execute;
  }

  get execute() {
    return this._execute;
  }

}
