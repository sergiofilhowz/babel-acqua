import { AcquaModule } from 'acqua';

export default class MyModel extends AcquaModule {

  querySomething() {
    return { id: 1, name: 'something' };
  }

}