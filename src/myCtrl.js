/* @ngInject */
class MyCtrl {
  /* @ngInject */
  constructor() {
    this.baseline = `Hey I'm a lazy loaded controller !!! `
  }
}

const register = (ngModule) => {
  ngModule.controller('MyCtrl', MyCtrl)
}


export default register
