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



Resources : 

	http://adrianmejia.com/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/

