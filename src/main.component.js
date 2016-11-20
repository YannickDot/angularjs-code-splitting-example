import template from './main.tpl.html';
import css from './main.css'

/* @ngInject */
class MyController {
  /* @ngInject */
  constructor() {
    this.counter = 0;
  }

  increaseCounter() {
    this.counter++;
  }

  decreaseCounter() {
    this.counter--;
  }
}

const MyComponent = {
  template,
  controller: MyController,
  controllerAs: 'MyController'
}

const register = (ngModule) => {
  ngModule.component('myComponent', MyComponent)
}

export default register
