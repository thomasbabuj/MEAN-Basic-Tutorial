// App Module file

var app = angular.module('app', []);

app.directive('hello', [function(){
	return {
		restrict : 'CEMA', // C : class, E : element, M : comments, A: attributes
		replace : true, // replaces original content with template
		template : '<span><br> Hello</span>' 
	};
}]); <!-- Hello Directives Ends -->

/*
*	@param1 :  Directive Name
*	@param2 :  function which returns a directive definition object
*/

app.directive('helloworld', [function(){
	return {
		restrict : 'AE', // Attribute and Element
		replace : true,
		template: '<h3>Hello World!</h3>'
	};
}]); <!-- Helloworld Directive Ends -->

app.directive('helloWorld', [function() {
	return {
		restrict : 'AE',
		replace : true,
		template : '<i><br />HelloWorld!!</i>'
	};
}]);

app.directive('default', [function(){
	return {
		restrict : 'E',
		replace : true,
		template : '<b>Inserting default output template</b>'
	};
}]);