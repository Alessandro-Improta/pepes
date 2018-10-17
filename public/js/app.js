/**
* pepes Module
*
* Description
*/
angular.module('pepes', ['ui.router']);

angular.module('pepes').config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: './../views/home.html',
				controller: 'mainController'
			})
			.state('menu', {
				url: '/menu',
				templateUrl: './../views/menu.html',
				controller: 'mainController'
			})
			.state('catering', {
				url: '/catering',
				templateUrl: './../views/catering.html',
				controller: 'mainController'
			})
			.state('nav', {
				url: '/nav',
				templateUrl: './../views/nav.html',
				controller: 'mainController'
			})
			.state('contactUs', {
				url: '/contactUs',
				templateUrl: './../views/contactUs.html',
				controller: 'mainController'
			});

		$urlRouterProvider
			.otherwise('/');
	});