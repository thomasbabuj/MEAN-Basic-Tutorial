MEAN Stack Tutorial.
--------------------

How AngularJS tries to alleivate code complexity and redability

1) Unit Testing:

	It decouples DOM manipulation from application logic. Data and dependencies are 
	*$inject* as needed.

2) Different browsers implements features differently, but AJ's directive (or HTML extensions) takecare of the differences

3) Global Namespace : 
	Expressions and method definations are scoped within controllers, so they do not pollute the global namespace.

4) Data models are plain old Javascript objects.	

5) AJ provides solution for writing modular code and dependencies management.
		

What are directives:

	Directives are extensions of HTML markups in form of attributes, element names, CSS class and or even HTML comments.

	*ng-app* is a directive that bootstraps AngularJS and designates the caller element as the root.

	*ng-model* is a directive that binds form elements such as input, select, checkboxes, textarea or custom ones to a 
	property called  *$scope*. 

	*{{ }}* are a way of binding models to elements in HTML.

	Adding directives will make HTML validators to throw errors. However, this can be slove by prefixxing *data-* to every
	AJ's directives and Not using them as Elements but attributes, classes or comments.

	AJ directives are created in the same way as a *Controller*, but it returns a simple object( directive definition ) that
	has several properties to configure the directive.

	When creating a new directive, if they have any dependencies on external objects/services such as $rootScope, $http or $compile can be injected here.

	While matching directives, Angular strips the prefix x- or data- from element/attribute names. Then it converts - or :
	delimited strings to camelCase and machtes with the registered directives.

	Common Three properties in the directive definition object are as follows,

		restrict --  specify how a directive should be used in HTML
		template --  specifies the HTML markup that will be produced when directive is compiled and linked by Angular.
			or
		templateUrl --  Place the template in a separeate HTML file and pass the path 
		replace  -- specifies if the generated template will replace the HTML element on which the directive is attached.
					if we set replace to false, the default output template will be inserted into the element.			 









Resources : 

	http://adrianmejia.com/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/
	http://www.sitepoint.com/practical-guide-angularjs-directives/
	http://stackoverflow.com/questions/15285635/how-to-use-replace-of-directive-definition
