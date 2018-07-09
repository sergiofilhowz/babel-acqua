import path from 'path';
import chai from 'chai';
import { Acqua } from 'acqua';
import MyModel from './codes/my.model';
import MyRouter from './codes/my.router';
const { expect } = chai;

describe('Babel acqua plugin', () => {

  it('should transform', () => {
    const acqua = new Acqua();
    expect(acqua.getFunctionName(MyModel)).equal('myModel');
    expect(acqua.getParamNames(MyRouter)).to.have.members(['myService', 'myModel']);
  });

  it('should load acqua', () => {
    const acqua = new Acqua({
      log: console.log.bind(console),
      err: console.error.bind(console)
    });
    acqua.loadDir(path.join(__dirname, 'codes'));

    const myModel = acqua.get('myModel');
    const myService = acqua.get('myService');
    const myRouter = acqua.get('myRouter');

    expect(myRouter.started).to.equal(true);
    expect(myRouter.callMyService()).to.equal(myService.doSomething());
    expect(myRouter.callMyModel()).to.have.property('id').equal(myModel.querySomething().id);
    expect(myRouter.callMyModel()).to.have.property('name').equal(myModel.querySomething().name);
  })

});