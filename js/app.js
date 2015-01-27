// App Module file

var app = angular.module('app', []);

app.directive('colorText', [function(){
	return {
		restrict : 'AE',
		replace : true,
		template : '<h1 style="background-color:{{ color }}">Welcome Thomas</h1>',
		link : function(scope, elem, attr) {
			console.log ('I am in the link');
			elem.bind('click', function(){
				elem.css('background-color', 'white');
				scope.$apply(function(){
					scope.color = 'white';
				});	
			});

			elem.bind('mousemove', function(){
				elem.css('cursor', 'pointer');
			});
			
		}
	};
}]);

app.directive('test', [function(){	
	return {
		restrict : 'AE',
		replace : true,
		template : '<p>Compile function...</p>',
		compile : function(tElemnt, attrs) {
			console.log ('Inside Compile function');
			// Do optional DOM transformations
			return function(scope, element, attrs){
				console.log( 'Linking function');
			};
		}
	};
}]);