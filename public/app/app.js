
var myApp = angular.module('AuthenticationApp', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    console.log('running the following code in the configuration phase ... ');
    $urlRouterProvider.otherwise("/login");
    // set up the routers ...
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '_login.html',
        controller: 'LoginController'
    }).state('register', {
        url: '/register',
        templateUrl: '_register.html',
        controller: 'RegisterController'
    }).state('home', {
        url: '/home',
        templateUrl: '_home_authenticated.html'
    });

    // todo: How to provide acl for routes

});

myApp.controller('RegisterController', function ($scope, AuthenticationService) {
    $scope.message = 'Beginning Registration ... ';
    $scope.user = {};
    $scope.register = function () {
        AuthenticationService.register($scope.user).then(function (data) {
            console.log(data);
            $scope.user = {};
        }, function (data) {
            console.log(data);
        });
    };
});

myApp.controller('LoginController', function ($scope, AuthenticationService) {
    $scope.message = 'Enter login details .... ';
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.login = function () {
        AuthenticationService.login($scope.user).then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    };
});

myApp.factory('AuthenticationService', function ($http) {
    return {
        login: function (user) {
            console.log(user);
            return $http.post('/login', user); // returns a promise
        },
        register: function (user) {
            console.log(user);
            return $http.post('/register', user); // returns a promise
        }
    };
});