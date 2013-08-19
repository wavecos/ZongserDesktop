var zongerAppModule = angular.module('ZongserApp', []);

/* Controllers */
zongerAppModule.controller('ListSongController', function($scope, $rootScope, $http) {

	$scope.searchSongs = function() {
		var searchCriteria = encodeURIComponent($scope.search);
		// take a look in callback=JSON_CALLBACK in the url, I use this for JSONP callback
		var iTunesUrl = 'https://itunes.apple.com/search?callback=JSON_CALLBACK&term=' + searchCriteria + '&entity=song&limit=10';

		console.log('search criteria ' + searchCriteria);
		// Get top 10 Songs from iTunes url
		$http.jsonp(iTunesUrl).success(function(data, status, headers, config) {
			$scope.songs = data.results;
			$rootScope.songs = data.results;
		});

	};
});

zongerAppModule.controller('DetailController', function($scope, $rootScope, $routeParams) {
	var id = $routeParams.id;
	var song = $rootScope.songs[id];
	$scope.song = song;
});

/* Routes */
zongerAppModule.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			controller: 'ListSongController',
			templateUrl: 'partials/list.html'
		}).
		when('/view/:id', {
			controller: 'DetailController',
			templateUrl: 'partials/detail.html'
		}).
		otherwise({
			redirectTo: '/'});
});

