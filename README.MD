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

 		specify the isolates scope property color should be bound to the attribute, which is applied to the directive in the HTML.

 		This method is called one way binding, with this technique you can only pass strings to the attribute ( using {{{}}} ). we call this one way mainly becuase, When parent scope changes the isolated scope will change. However the reverse is not true.

 		If the isolated property and the attribute name is same then we can write the directive definition like this
 		  scope : { color : '@' }

 	Option 2: Use = for Two way binding

 		This technique lets you assign actual scope model to the attribute rather then just plain strings.

 		As a result you can pass values ranging from simple strings and arrays to complex objects to the isolated scope. and also two binding exists.

 	Option 3: Use & to execute functions in the parent scope

 		Need to use  '&' symbol when you want to call a function from a parent scope.

 	Guidelines to choose the right scope for directives :

 		Parent Scope : ( scope : false ) -- 

 			This is the default case. If your 	directive does nto manipulate the parent scope properties you might not need a new scope.

 		Child Scope : ( scope : true ) --

 			Creates a new child scope for a directive which prototypically inherits from the parent scope.

 			If the properties and functions you set on the scope are not relavent to ther directives and the parent, you should probably create a new child scope.

 		Isoldated Scope : ( scope :{} )

 			You need this if the directive you are going to build is self contained and resuable. 

 			You directive might be creating many scope properties and functions which are meant for internal use, and should never seen by the outside world.

 			The Isoldated scope doesnt not inherit the parent scope.

 	Transclusion

 		Its a feature which lets us wrap a directive around arbitrary content.

 		We can latter extract and compile it against the correct scope, and finally place it at the specified position in the directive template.

 		If you set "transclude : true" in the directive definition, a new transcluded scope will be created which prototypically inherited from the parent scope.

 		If you want your directive with isolated scope to contain an aribitrary piece of content and execute it against the parent scope, trasnclusion can be used.

AngularJS Data Binding

	Data biding is an AngularJS feature that automatically synchronizes your model data with your HTML.

	Whenever the HTML is changed the model gets updated and whenever the model gets updated it is reflected in HTML.


AngularJS Scope

	$scope it is an object that contains all the data to which HTML is bound.

	Everything that is attached to the $scope, it is automatically *$watch*ed by AngularJS and upadted.

AngularJS Controllers

	Controllers are code that "controls" certain sections containing DOM elements in whcih they are declared.  They encapsulate the behaviour, callbacks and glue $scope models with views.

	ng-controller 
		
		Is a directive that tells angular what function controller to use for a particular view.

		Every time AngularJS loads, it reads the ng-controller argument, then it will look for a function in plain old javascript object with the same name or for angular.controller matching name.


	$scope 
	
		$scope 's are the glue between data models in the controllers and the views.

		Angularjs will $inject the scope objects to the view.

	
AngularJS Modules

	Modules are a way to encapsulate different parts of your application ( directives, controllers, factories, ...)	and reuse them in other places.

	Using modules brings many advantages such as modules can be loaded in any order, parallel depdendency loading, tests can only load
	the required modules and keep it fast, clear view of the dependencies.


AngularJS Templates

	Templates contains HTML and Angular elements ( directives, markup, filters or form controls).

	They can also be cached and referenced by Id.


AngularJS Routes (ngRoutes)

	ngRoutes module allows changing what we see in the app depdending on the URL(route).  It, usually , uses templates to inject the HTML
	into the app.

	It doesnot come with AngularJS core module, so we have to list it as a dependency.

	ngView is a directive used by $routeProvider to render HTMl into it. every time the URL changes, it will inject a new html
	template and controller into ngView.

AngularJS services (factory)

	Services are a way to inject data dependencies into controllers and they are created through "factories".

	Using services we can access the same scope object into multiple controllers.

	Refer ( example-services-factory.html)

AngularJS Filters

	Filters allow you to format and transform the output of expressions inside the curly braces.

	Built-in filters :

		filter : search for a given string in an array and return matches.

		Number : adds comma separated 1000's add two decimal places

		Currently : the sames as Numbers and adds a $ in front

		Date : takes a Unix timestamp or date string and output it in the format that you specify

		JSON : converts javascripts objects to JSON strings.

		lowercase/uppercase : converts strings to lower/upper case

		limitTo : number of elements from an array to show

		orderBy : order array of objects by key that you specify.

	We can chaing mulitple filters and also define your own filters.
	



What RESTful API really means ?

	REST stands for Repersentational State Transfer.  It is an architecture that allows
	client-server communication through a uniform interface.

	They are also stateless, cachable and has a property called idempotence, which means,that the side effects of multiple identical requests have the same effect as the same single request.

	HTTP RESTful API's are compose of :

		HTTP methods, e.g GET, PUT, DELETE, PATCH, POST

		Base URI , eg. http://www.yahoo.com

		URL Path  eg. /blog/article1.html

		Media type, eg. HTML, JSON, XML, Microformats, Images, ....

	POST, GET, PUT, DELETE = CREATE , READ , UPDATE, DELETE ( CRUD )


Mongoose Read and Query

	There are multiple options for reading/querying data :

		Model.find(conditions, [fields], [options], [callback]);
		Model.findByID(id, [fields], [options], [callback]);
		Model.findOne(conditions, [fields], [options], [callback]);

Mongoose Update

	Each model has an update method which accepts mulitple updates ( because batch updates doesn't return an array with data)	

	Alternatively, the method *findOneAndUpdate* could be used to update one and return an object.

		Model.update(conditions, update, [options], [callback]);
		Model.findByIdAndUpdate(id, [update], [options], [callback]);
		Model.findOneAndUpdate(conditions, [update], [options], [callback]);

Mongoose Delete

	Update and Remove mongoose API are identical, the only difference it is that no elements are returned.

		Model.remove(conditions,[callback]);
		Model.findByIdAndDelete(id, [options], [callback]);
		Model.findOneAndRemove(conditions,[options], [callback]);	


ExpressJS and Middlewares

	Express is a complete web framework solution.

	Through middlewares layers, it handles : cookies, sessions, caching, CSRF, compression and many more.

	Middlewares

		Are a stack of processors that runs on each request made to the server.

		You can have any number of middlewares that will process the request one by one in a serial fashion.

		Some might alter the request input, log outputs, and data and pass it to the next() middleware in the chain.

		Middlewares are added to express stack using *app.use* for any method or the app.VERB( app.get, app.delete, app.post ,...)

		Usually, we dont have to develop a bunch of middlewares besides routes, since Expressjs has a bunch of middlewares avaibale.

	Default Express Middlewares

		morgan - Logger

		body-parser  - Parse the body so you can access parameters in requests in req.body ( e.g req.body.name)

		cookie-parser - Parse the cookies so you can access parameters in cookies req.cookies ( eg. req.cookies.name)

		serve-facicon - Serve favicon from routes. Should be call on the top before
		any other routing/middlewares takes place to avoid unnecesssary parsing.

	Other ExpressJS middlewares

		compression - compress all request. e.g (app.use(compression()))

		session - create session (eg. app.use(session({ select : 'b@ndw1d7h'})))

		method-override - app.use(methodOverride('_method')) Override methods to the one specified
		on the _method pararm.
		E.g GET /resource/1?_method=DELETE will become DELETE /resource/1

		response-time - app.use( responseTime() ) - adds X-Rresponse-Time header to responses.

		errorhandler - sending full error stack traces to the client when an error occurs.
			its a good practice to surrond it with an if statement to check process.env.NODE_ENV === 'development'

		vhost - Allows you to use differnt stack of middlewares depending on the request
				menaning that we can assigns different instances with differnt middlewares.

		csurf -  Adds a CROSS Site Request Forgery (CSRF) protection by adding a toke to responds either via
		session or cookie-parser  middleware.

		timeout - halt execution if it take more that a given time.












 	
 		



Resources : 

	http://adrianmejia.com/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/
	http://www.sitepoint.com/practical-guide-angularjs-directives/
	http://stackoverflow.com/questions/15285635/how-to-use-replace-of-directive-definition
	http://onehungrymind.com/angularjs-directives-basics/

	http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/

	http://adrianmejia.com/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/
