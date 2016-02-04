angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('menu', {
      url: '/menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })




    .state('menu.posts', {
      url: '/posts',
      views: {
        'side-menu21': {
          templateUrl: 'templates/posts.html',
          controller: 'postsCtrl'
        }
      }
    })


    .state('menu.cat', {
      url: '/cat/:catId',
      views: {
        'side-menu21': {
          templateUrl: 'templates/posts.html',
          controller: 'catCtrl'
        }
      }
    })


    .state('menu.post', {
      url: '/posts/:postId',
      views: {
        'side-menu21': {
          templateUrl: 'templates/post.html',
          controller: 'postCtrl'
        }
      }
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/posts');

});
