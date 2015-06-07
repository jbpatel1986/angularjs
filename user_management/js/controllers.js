var app = angular.module('single-page-app', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'getUsersCtrl'
		})
		.when('/new', {
			templateUrl: 'new.html',
			controller: 'addUserCtrl'
		})
		.when('/edit/:id', {
			templateUrl: 'edit.html',
			controller: 'editUserCtrl'
		})
});

app.controller('getUsersCtrl',function ($scope, $http) {

	$http.get("http://localhost:3000/api/profile")
		.success(function(response){
			$scope.users = response;
		});

});

app.controller('editUserCtrl', ['$scope', '$http', '$routeParams', '$window', function ($scope, $http, $routeParams, $window) {
	
	if($routeParams.id){

		$http.get("http://localhost:3000/api/profile/" + $routeParams.id)
			.success(function(response){
				$scope.user = {
					id: response[0].id,
					first_name: response[0].first_name,
					last_name: response[0].last_name,
					age: response[0].age
				};
			}).error(function() {
	       		console.log("error");
	   		});
   	}


	$scope.updateUser = function(){
		
		var userData = {
			'firstName': $scope.user.first_name,
			'lastName': $scope.user.last_name,
			'age': $scope.user.age
		};

		$http.put("http://localhost:3000/api/profile/" + $routeParams.id, $.param(userData), {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
			.success(function(response){
				$scope.result = response;
				$window.location.href = '/angularjs/user_management/';
			}).error(function(error) {
       			console.log(error);
   			});
	}
	

	$scope.deleteUser = function(){
		
		$http.delete("http://localhost:3000/api/profile/" + $routeParams.id)
			.success(function(response){
				$scope.result = response;
				$window.location.href = '/angularjs/user_management/';
			}).error(function(error) {
       			console.log(error);
   			});
	}		
}]);

app.controller('addUserCtrl', ['$scope', '$http', '$window', function ($scope, $http,$window) {
	
	$scope.addUser = function(){
		
		var userData = {
			'firstName': $scope.user.first_name,
			'lastName': $scope.user.last_name,
			'age': $scope.user.age
		};

		$http.post("http://localhost:3000/api/profile/", $.param(userData), {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
			.success(function(response){
				$scope.result = response;
				$window.location.href = '/angularjs/user_management/';
			}).error(function(error) {
       			console.log(error);
   			});   		
	}
	
}]);
