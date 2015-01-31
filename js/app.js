// App Module file

var app = angular.module('app', []);

app.directive('colorText', [function(){
	return {
		scope : {
			color : '@colorAttr'
		},
		restrict : 'AE',
		replace : true,
		template : '<h1 style="background-color:{{ color }}">Welcome Thomas</h1>',
		link : function(scope, elem, attr) {			
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


//code asks Angular to give the directive a new child scope that prototypically inherits from parent scope
app.directive('childsScope', [function(){
	return {
		scope : true , // use a child scope that inherits from parent
		restrict : 'E',
		replace : true,
		template : '<h2>Child Scope that Inherits from Parent</h2>',
		link : function(scope, elem, attr) {

			//scope.$apply(function(){
			//	scope.color = 'white';
			//});					
		}
	};
}]);

//an isolated scope
// This directive uses a new isolated scope that does not inherit from the parent
app.directive('isolatedScope', [function(){
	return {
		scope : {  }, // use a new isolated scope
		restrict : 'E',
		replace : true,
		template : '<h2 style="background-color: color ">Isolated Scope</h2>'

	};
}]);