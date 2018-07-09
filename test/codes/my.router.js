import { AcquaModule } from 'acqua';
import { myService, myModel } from '~acqua';

export default class MyRouter extends AcquaModule {

  myFunction () {
    return 'hello world';
  }

  $init() {
    this.started = true;
  }

  callMyService() {
    return myService.doSomething();
  }

  callMyModel() {
    return myModel.querySomething();
  }

}