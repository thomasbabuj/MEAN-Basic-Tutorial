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

	Common properties of the directive definition object are as follows,

		restrict --  specify how a directive should be used in HTML

		template --  specifies the HTML markup that will be produced when directive is compiled and linked by Angular.
			or
		templateUrl --  Place the template in a separeate HTML file and pass the path 

		replace  -- specifies if the generated template will replace the HTML element on which the directive is attached.
					if we set replace to false, the default output template will be inserted into the element.			 					
	    link property and scope:

    		The template produced by a directive is meaningless unless it's compiled against the right scope.
    	
    		By default a directive does not get a child scope. Rather, it gets the parent's scope. This means, if the directive presents inside a controller it will use that controller's scope.

    		To utilize the scope, we can use the link property of the definition object

    		link function takes three arguments, 

    			scope -- the scope passed to the directive.

    			elem  -- The jQLite wrapped element on which the directive is applied. If we included jQuery in the HTMl before AngularJS is included this becomes jQuery wrapped instead of JQLite. There is no need to again wrap it inside $() for DOM manipulations.

    			attrs -- An object representing normalized attributes attached to the element on which the directive is applied.

    		The link function is mainly used for attaching event listeners to DOM elements, watching model properties for changes, and updating the DOM.

    	compile function :

    		The compile function is used to perform any DOM transformation before the link function runs.

    		it accepts following arguments

    			tElement -- the element on which the directive is applied
    			attrs    -- the normalized list of attributes declared on the element

    		note : compile function doest not have access to scope and must return a link function. but if there is no compile function we can config the link function as usual.


How Directives are compiled :

	When application bootstraps, Angular starts parsing the DOM using the $compile service.

	This service searches for directives in the markup and matches them against registered directives.

	Once all the directives have been identified, Angular executes their compile functions.

	Since compile function returns a link function which is added to the list of link functions to be executed later.

	This is called the compile phase.

	If directives needs to be cloned multiple times, (EG. ng-repeat), we get the performance benefits as compile functions runs once for the 
	cloned template, but the links functions runs for each cloned instance. This is why compile function does not receive a scope.

Changing a Directive's Scope : ( In Some cases our directives may want to add serveral properties and functions to the scope that are for internal use only)

	By default a directive gets the partent's scope.

	If we are exposing the parent controller's scope to the directives, they are free to modify the scope properties.

	So, we have two other otions:

		1) Child scope -- this scope prototypically inherits the parents's scope.
		2) An isolated scope -- A new scope that doesn't inherit from the parent's scope. Isolated scopes are good when we want to create reusable components.

		These scope can be configured with the scope property of the directive definition object..

 Binding Between Isolated and parent scope properties

 	Angular gives you the flexibility to selectively pass parent scope properties to the directive through bindings.

 	Currently the "color-text" directive is not functional, since we have an isolated scope, the expression inside the directive template evaluates against this scope.

 	But ng-model directive on the input element refers to the parent scope property color.

 	In Angular, this binding can be achieved by setting attributes on the directive element in HTML and configuring the scope property in the directive definition object.		

 	Option 1: Use @ for One way text binding




Resources : 

	http://adrianmejia.com/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/
	http://www.sitepoint.com/practical-guide-angularjs-directives/
	http://stackoverflow.com/questions/15285635/how-to-use-replace-of-directive-definition
	http://onehungrymind.com/angularjs-directives-basics/
