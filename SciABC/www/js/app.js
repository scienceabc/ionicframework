// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ionic.service.core',  'ionic.service.analytics', 'ionic.service.push', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ionicLazyLoad', 'ngCordova'])

.run(function($ionicPlatform, $ionicPopup, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    $ionicAnalytics.register();

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: "No Internet Conection",
          content: "The internet is disconnected on your device."
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
    var io = Ionic.io();
    var push = new Ionic.Push({
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload);
      },
      "onRegister": function(data) {
        console.log(data.token);
      },
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          senderID: 215829783495,
          icon : "ic_stat_pushicon",
          iconColor: "#f47555"
        }
      }
    });
    var user = Ionic.User.current();
    console.log("User Id:",user.id);

    if (!user.id) {
      user.id = Ionic.User.anonymousId();
      console.log("User Id:",user.id);
      user.save();
    }

    var callback = function(data) {
      push.addTokenToUser(user);
      user.save();
      console.log("User Saved");
    };
    push.register(callback);
  });
})

.config(function ($sceProvider) {
  $sceProvider.enabled(false);
})

.filter('ago', function() {
  return function(input) {
    m = moment(input)
    if (m.isValid()){
      return m.fromNow();
    } else {
      return input;
    }
  };
})

.filter('form', function() {
  return function(input) {
    m = moment(input)
    if (m.isValid()){
      return m.format("MMMM D, YYYY");
    } else {
      return input;
    }
  };
})
