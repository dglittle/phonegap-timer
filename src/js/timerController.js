'use strict';

angular.module('timer').controller('TimerController', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.timer = new Date('1/1/' + new Date().getFullYear());

	var deferred;

	var timerFunction = function() {
		$scope.timer.setSeconds($scope.timer.getSeconds() - 1);
		deferred = $timeout(timerFunction, 1000);
	};

	var isNullTimer = function() {
		if ($scope.timer.getTime() == new Date('1/1/' + new Date().getFullYear()).getTime()) {
			return true;
		}
		return false;
	};

	$scope.start = function() {
		if (!deferred && !isNullTimer()) {
			deferred = $timeout(timerFunction, 1000);
		}
	};

	$scope.stop = function() {
		if (deferred) {
			$timeout.cancel(deferred);
			deferred = null;
		}
	};

	$scope.addMinutes = function(minutes) {
		$scope.timer.setMinutes($scope.timer.getMinutes() + minutes);
	};

	$scope.$watch('timer', function(newVal) {
		if (isNullTimer()) {
			$scope.stop();
			if (navigator.notification) {
				navigator.notification.vibrate(2000);
			}
		}
	}, true);

	var formattedHours = function() {
		return $scope.timer.getHours().toString().length == 2 ? $scope.timer.getHours().toString() : '0' + $scope.timer.getHours();
	};

	var formattedMinutes = function() {
		return $scope.timer.getMinutes().toString().length == 2 ? $scope.timer.getMinutes().toString() : '0' + $scope.timer.getMinutes();
	};

	var formattedSeconds = function() {
		return $scope.timer.getSeconds().toString().length == 2 ? $scope.timer.getSeconds().toString() : '0' + $scope.timer.getSeconds();
	};

	$scope.formatted = function() {
		return formattedHours() + ':' + formattedMinutes() + ':' + formattedSeconds();
	};
}]);