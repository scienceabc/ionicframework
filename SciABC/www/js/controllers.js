angular.module('app.controllers', ['app.services', 'ngSanitize'])

.controller('postsCtrl', function($scope, $state, $ionicLoading, $ionicPlatform, $cordovaDevice, $sce, $http) {
  $ionicPlatform.ready(function() {
    $scope.$apply(function() {
      var device = $cordovaDevice.getDevice();
      $scope.uuid = device.uuid;
    });
  });
  $scope.$on( "$ionicView.loaded", function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  });
  wordpressUrl = "https://www.scienceabc.com/wp-json/sabc-api/v1/posts";
  $http.get(wordpressUrl)
  .success(function(response){
    $scope.posts = response;
  })
  .error(function(response, status) {
    console.log("Error while received response. " + status + response);
  });
  $scope.page = 2;
  $scope.refresh = function() {
    $state.go($state.currentState, {}, {reload:true});
    window.location.reload(true);
  }
  $scope.loadMore = function() {
    wordpressUrl = "https://www.scienceabc.com/wp-json/sabc-api/v1/posts";
    wordpressUrl = wordpressUrl + '?page=' + $scope.page;
    $scope.page +=1;
    $http.get(wordpressUrl)
    .success(function(response){
      $scope.posts = $scope.posts.concat(response);
    })
    .error(function(response, status){
      console.log("Error while received response. " + status + response);
    });
    $scope.$broadcast('scroll.resize');
  };
  $scope.$on( "$ionicView.afterEnter", function() {
    $ionicLoading.hide();
    $gaUrl = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-62306096-1&cid=' + $scope.uuid + '&dh=scienceabc.com&dp=%2Fhome&dt=homepage&ds=app';
    $gaUrl = $sce.trustAsResourceUrl($gaUrl);
    $http.get($gaUrl)
    .success(function(response){
      console.log("Success loggin in GA. " + status + response);
    })
    .error(function(response, status){
      console.log("Error loggin in GA. " + status + response);
    });
  });
})

.controller('postCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicPlatform, $cordovaDevice, $sce, $http) {
  $ionicPlatform.ready(function() {
    $scope.$apply(function() {
      var device = $cordovaDevice.getDevice();
      $scope.uuid = device.uuid;
    });
  });
  $scope.$on( "$ionicView.loaded", function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  });

  $scope.refresh = function() {
    $state.go($state.currentState, {}, {reload:true});
    window.location.reload(true);
  }

  wordpressUrl = "https://www.scienceabc.com/wp-json/sabc-api/v1/post/" + $stateParams.postId;
  $http.get(wordpressUrl)
  .success(function(response){
    $scope.post = response;
    permalink = $scope.post.permalink.replace('https://www.scienceabc.com','');
    $gaUrl = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-62306096-1&cid=' + $scope.uuid + '&dh=scienceabc.com&dp=' + permalink + '&dt=' + $scope.post.title + '&ds=app';
    $gaUrl = $sce.trustAsResourceUrl($gaUrl);
    $http.get($gaUrl)
    .success(function(response){
      console.log("Success loggin in GA. " + status + response);
    })
    .error(function(response, status){
      console.log("Error loggin in GA. " + status + response);
    });
  })
  .error(function(response, status) {
    console.log("Error while received response. " + status + response);
  });

  $scope.share = function(link) {
    window.plugins.socialsharing.share(null, null, null, link);
  };
  $scope.facebook = function(link) {
    window.plugins.socialsharing.shareViaFacebook(null, null, link);
  };
  $scope.twitter = function(link) {
    window.plugins.socialsharing.shareViaTwitter(null, null, link);
  };
  $scope.whatsapp = function(link) {
    window.plugins.socialsharing.shareViaWhatsApp(null, null, link);
  };
  $scope.showButton = true;
  $scope.showIframe = false;
  $scope.showComments = function() {
    var disqus_title = $scope.post.dsq_title;
    var disqus_identifier = $scope.post.dsq_id;
    var disqus_url = $scope.post.permalink;
    var url = "https://www.scienceabc.com/disqus.html?";
    $scope.url = url + "shortname=scienceabc&url=" + encodeURIComponent(disqus_url) +
    "&title=" + encodeURIComponent(disqus_title) + "&identifier=" + encodeURIComponent(disqus_identifier);
    $scope.url = $sce.trustAsResourceUrl($scope.url);
    $scope.showButton = false;
    $scope.showIframe = true;
  }

  $scope.$on("$destroy", function () {
    if ($scope.lastScriptElm && $scope.lastScriptElm.parentNode) {
      $scope.lastScriptElm.parentNode.removeChild($scope.lastScriptElm);
      $scope.lastScriptElm = null;
    }
  });

  $scope.$on( "$ionicView.afterEnter", function() {
    $ionicLoading.hide();
  });
})

.controller('catCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicPlatform, $cordovaDevice, $sce, $http) {
  $ionicPlatform.ready(function() {
    $scope.$apply(function() {
      var device = $cordovaDevice.getDevice();
      $scope.uuid = device.uuid;
    });
  });
  $scope.$on( "$ionicView.loaded", function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  });
  wordpressUrl = "https://www.scienceabc.com/wp-json/sabc-api/v1/category/"+$stateParams.catId;
  $http.get(wordpressUrl)
  .success(function(response){
    $scope.posts = response;
  })
  .error(function(response, status) {
    console.log("Error while received response. " + status + response);
  });

  $scope.refresh = function() {
    $state.go($state.currentState, {}, {reload:true});
    window.location.reload(true);
  }

  $scope.page = 2;
  $scope.loadMore = function() {
    wordpressUrl = "https://www.scienceabc.com/wp-json/sabc-api/v1/category/"+$stateParams.catId;
    wordpressUrl = wordpressUrl + '?page=' + $scope.page;
    $scope.page +=1;
    $http.get(wordpressUrl)
    .success(function(response){
      $scope.posts = $scope.posts.concat(response);
    })
    .error(function(response, status){
      console.log("Error while received response. " + status + response);
    });
    $scope.$broadcast('scroll.resize');
  };
  $scope.$on( "$ionicView.afterEnter", function() {
    $ionicLoading.hide();
    $gaUrl = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-62306096-1&cid=' + $scope.uuid + '&dh=scienceabc.com&dp=%2FCategory&dt=Category'+$stateParams.catId+'&ds=app';
    $gaUrl = $sce.trustAsResourceUrl($gaUrl);
    $http.get($gaUrl)
    .success(function(response){
      console.log("Success loggin in GA. " + status + response);
    })
    .error(function(response, status){
      console.log("Error loggin in GA. " + status + response);
    });
  });
})
