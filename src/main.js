import angular from 'angular'
import oclazyload from 'oclazyload'
import uiRouter from 'angular-ui-router'

const myModuleName = 'app'
const myModule = angular.module(myModuleName, ['ui.router', 'oc.lazyLoad'])

myModule.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/state1')
    $stateProvider
      .state('state1', {
        url: '/state1',
        template: require('./partials/state1.html'),
      })
      .state('state2', {
        url: '/state2',
        templateProvider: function () {
          return System.import('./partials/state2.html')
        }
      })
      .state('state3', {
        url: '/state3',
        templateProvider: function () {
          return System.import('./partials/state3.html')
        },
        controller: 'MyCtrl as ctrl',
        resolve: {
          __controller: ['$ocLazyLoad', ($ocLazyLoad) => {
            return System.import('./myCtrl.js')
              .then(module => {
                const register = module.default
                register(myModule) // We attach the controller fn to the module
                $ocLazyLoad.load({
                  name: myModuleName
                }) // Let's reload the module so Angular can take changes in account
              })
          }]
        }
      })
      .state('state4', {
        url: '/state4',
        template: '<my-component></my-component>',
        // component: 'myComponent',
        resolve: {
          __component: ['$ocLazyLoad', ($ocLazyLoad) => {
            return System.import('./main.component.js')
              .then(module => {
                const register = module.default
                register(myModule) // We attach the controller fn to the module
                $ocLazyLoad.load({
                  name: myModuleName
                }) // Let's reload the module so Angular can take changes in account
              })
          }]
        }
      })

  })

angular.element(document).ready(function () {
  const appNode = document.querySelector('#app')
  appNode.innerHTML = `
    <div ui-view></div>
    <a ui-sref='state1'>State 1</a>
    <a ui-sref='state2'>State 2</a>
    <a ui-sref='state3'>State 3</a>
    <a ui-sref='state4'>State 4</a>

  `
  angular.bootstrap(appNode, ['app'])
})
