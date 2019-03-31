/******************************************************** Closures ********************************************************/
/**
 * A function inside another function that: 1) uses variables from its parent scope and 2) is exposed to the outside world.
 */
/**
 * First example
 */
var clVariable;

function closureFunction() {
    console.log('Closures: ', clVariable); //undefined
    clVariable = 50;
    var clVariable = 10; //variable declaration os hoisted to the top of the function scope
    console.log('Closures: ', clVariable); //10
    return clVariable;
}
console.log('Closures: ', clVariable); //undefined
console.log('Closures: ', closureFunction()); //10

/**
 * Second example
 */
function outerFn() {
    var outerFnVariable = 10;

    function innerFn() {
        var innerFnVariable = 20;
        console.log("innerFnVariable = " + innerFnVariable + " outerFnVariable = " + outerFnVariable);
        innerFnVariable++;
        outerFnVariable++;
    }
    return innerFn;
}
var X = outerFn(); // outerFn() invoked the first time 
var Y = outerFn(); // outerFn() invoked the second time

X(); //innerFnVariable = 20 outerFnVariable = 10
X(); //innerFnVariable = 20 outerFnVariable = 11
X(); //innerFnVariable = 20 outerFnVariable = 12
Y(); //innerFnVariable = 20 outerFnVariable = 10



/******************************************************** Hoisting ********************************************************/
/**
 * Hoisting is a process of all variable declarations using var being lifted to the top of their functional/local scope(if declared inside a function) or to the top of their global scope (if declared outside of a function) regardless of where the actual declaration has been made. 
 * Functions declarations are also hoisted, but these go to the very top, so will sit above all of the variable declarations.
 */

/**
 * Example 1
 */
console.log('Hoisting variable value', hoistedValue); //undefined
var hoistedValue = 50;

//when compiled
var hoistedValue;
console.log('Hoisting variable value', hoistedValue); //undefined
hoistedValue = 50;

/**
 * Example 2
 * Functions declaration are hoisted above hoisted variable declarations
 */
function greetings() {
    console.log('Hello ' + myName); //undefined
};
greetings();
var myName = 'Anatolii';

//when compiled
function greetings() {
    console.log('Hello ' + myName); //undefined
};
var myName;
greetings();
myName = 'Anatolii';



/******************************************************** Let , const hoisting ********************************************************/
/* 
By fact let and const are also hoisted. But the difference between let, const and var is their initialisation.

The var is initialised with undefined right when the binding is created at the top of the scope. The lexically declared variables however stay uninitialised. This means that a ReferenceError exception is thrown when you try to access it. It will only get initialised when the let/const/class statement is evaluated, everything before (above) that is called the temporal dead zone.The temporal dead zone is not a syntactic location, but rather the time between the variable (scope) creation and the initialisation. It's not an error to reference the variable in code above the declaration as long as that code is not executed (e.g. a function body or simply dead code), and it will throw an exception if you access the variable before the initialisation even if the accessing code is below the declaration (e.g. in a hoisted function declaration that is called too early).
 */



/******************************************************** Object copying ********************************************************/
var obj1 = {
    a: 1,
    b: 2
};
var obj2 = {
    c: '24',
    d: 'D letter'
};
var obj3 = {
    z: 21,
    t: {
        r: 'old value'
    }
};

/**
 * Dosn't work for deep copy
 */
var copy1 = Object.assign({}, obj1, obj2); //proper way to copy without mutation 
var copy1Bad = Object.assign(obj1, obj2); //Bad way of copying, as we mutate obj1
var copyES6 = {
    ...obj1,
    ...obj2
}; //Es 6 way of copying

var copyWithNested = Object.assign({}, obj1, obj3);
copyWithNested.t.r = 'new value';
console.log('Object copying: ', obj3.t.r); // 'new value'

/**
 * This approach makes deep copy for all kind of objects containing objects, arrays, strings, booleans and numbers. For the rest types it will throw errors
 */
var copy2 = JSON.parse(JSON.stringify(obj3));

/**
 * The best way of copying  objects is by looping through all object's properties and assigning 'em to the newly created object
 */



/******************************************************** Lexical scope ********************************************************/
/* function scope of outer function === lexical scope of inner function.
 The idea here is that we have variables in the local execution context and variables in the global execution context. One intricacy of JavaScript is how it looks for variables. If it can’t find a variable in its local execution context, it will look for it in its calling context. And if not found there in its calling context. Repeatedly, until it is looking in the global execution context. (And if it does not find it there, it’s undefined).
 */



/******************************************************** Prototypal inheritance example ********************************************************/
//Function-constructor
function Person(first, last, age, hobby, interests) {
    this.name = {
        first,
        last
    };
    this.age = age;
    this.hobby = hobby;
    this.interests = interests;
};

Person.prototype.persInfo = function () {
    return `My name is ${this.name.first} ${this.name.last}. I am  ${this.age} years old. My hobby is ${this.hobby}. I am interested in ${this.interests}.`;
};

var exampleTry = new Person('Anatolii', 'Yatsenko', 25, 'reading', 'development');
console.log('Prototypal try: ', exampleTry);

function Developer(first, last, age, hobby, interests, domain) {
    Person.call(this, first, last, age, hobby, interests);
    this.domain = domain;
};

Developer.prototype = Object.create(Person.prototype);
Developer.prototype.constructor = Developer;
Developer.prototype.hello = function () {
    return 'I am ' + this.name.first + ". I'm " + this.domain + ' developer. ';
};

function DeveloperLevel(first, last, age, hobby, interests, domain, level) {
    Developer.call(this, first, last, age, hobby, interests, domain);
    this.level = level;
};

DeveloperLevel.prototype = Object.create(Developer.prototype);
DeveloperLevel.prototype.constructor = DeveloperDeveloperLevel;
DeveloperLevel.prototype.getLevel = function () {
    return this.name.first + ' interests in ' + this.interests + ' and is ' + this.level + ' ' + this.domain + ' Developer.';
};

var protoResult = new DeveloperLevel('Anatolii', 'Yatsenko', 26, 'reading', 'development', 'Javascript', 'Junior');
console.log('Prototypal1 : ', protoResult.getLevel());
console.log('Prototypal2 : ', protoResult.persInfo());
console.log('Prototypal3 : ', protoResult.hello());



/**************************** The difference between adding method to constuctor via prototype and without it *********************************************/
/* functions added to constructor not via prototype object are redefined for each of the new objects created using the constructor. 
This isn't very optimal as the function should ideally be shared between all of the instances of the constructor's type.
 */



/******************************************************** Difference between function declaration, function expression and arrow fn ********************************************************/
/*
Fn declaration: 
    - Function declaration is hoisted on top of the scope
    - Function declarations load before any code is executed.
*/

/*
Fn expression: 
    - Function's declaration variable is hoisted on top. But if you try to call it before it's assignment the error will occur
 */


/*
Arrow functions:
    - You cannot call methods call(), apply() and bind() on arrow fn. 
    - Also arrow function uses lexical scope, therefore it has outer function's context binded to it
 */



/******************************************************** Try/finally execution ********************************************************/
/**
 * Finally is always executed, even though there was a return statement within 'try'. It also overwrites try's return statement
 */
const result = (() => {
    try {
        return 2;
    } finally {
        return 3;
    }
})();
console.log(result) // 3



/******************************************************** BOM, DOM, DOM events ********************************************************/
/**
 * BOM, DOM
 */
/* The BOM (Browser Object Model) consists of the objects navigator, history, screen, location and document which are children of window. 
In the document node is the DOM (Document Object Model), the document object model, which represents the contents of the page. You can manipulate it using javascript.
Browsers feature a Browser Object Model (BOM) that allows access and manipulation of the browser window. 
Using the BOM, developers can move the window, change text in the status bar, and perform other actions that do not directly relate to the page content.
Because no standards exist for the BOM, each browser has its own implementation
 */

/* The Document Object Model (DOM) is an application programming interface (API) for HTML as well as XML.
 The DOM maps out an entire page as a document composed of a hierarchy of nodes like a tree structure and using the DOMAPI nodes can be removed, added, and replaced.
*/

//Hierarchy:
//              DOM : document
// window =>    BOM : navigator, screen, location, frames, history, XMLHTTTPRequest
//              JS : Object, Array, function .....

/**
 * DOM events
 */
/* The browser triggers many events. The list of the most common event types and event names:
 mouse events (MouseEvent): mousedown, mouseup, click, dblclick, mousemove, mouseover, mousewheel, mouseout, contextmenu
 touch events (TouchEvent): touchstart, touchmove, touchend, touchcancel
 keyboard events (KeyboardEvent): keydown, keypress, keyup
 form events: focus, blur, change, submit
 window events: scroll, resize, hashchange, load, unload
onContentLoaded
*/



/******************************************************** Recursion ********************************************************/
/**
 * Recursive is function which calls itself
 */
function factorial(value) {
    if (value === 1) {
        return 1;
    }
    return value * factorial(value - 1);
}
console.log(factorial(10)); //3628800



/******************************************************** Context ********************************************************/
/**
 * Simple example. Context(this) referes to the object where function was called
 */
var simpleContextExample = {
    prop: 'propValue'
};

function getPropertyValue() {
    return this.prop;
}
simpleContextExample.methodToGetPropValue = getPropertyValue;
console.log(simpleContextExample.methodToGetPropValue()); // 'propValue'


/**
 * Second example. Return object overwrites previously assigned props.
 * Because an object was returned during construction, the new object that 'this' was bound to simply gets discarded.
 */
function secondContextExample() {
    this.prop = 89;
    this.prop2 = 'qwe';
    return {
        prop: 41
    };
}
secondContextExampleInstance = new secondContextExample();
console.log(secondContextExampleInstance.prop); // 41


/**
 * Third example.
 * When a function is called as a method of an object, context(this) is set to the object the method is called on
 */
var thirdContextExampleObj = {
    getContext: function () {
        return this;
    }
};
thirdContextExampleObj.getContext() === thirdContextExampleObj; // true


/**
 * When invoked in this manner, the value of 'this' within the scope of the function will be set to the newly created instance
 */
function resettingContextExample() {
    return this;
}
console.log(resettingContextExample()) // window
console.log(new resettingContextExample()) // foo




/******************************************************** bind(), apply(), call() ********************************************************/

/**
 * Basics
 */
// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = {
    a: 'Custom'
};
// This property is set on the global object
var a = 'Global';

function whatsThis() {
    return this.a; // The value of this is dependent on how the function is called
}
whatsThis(); // 'Global'
whatsThis.call(obj); // 'Custom'
whatsThis.apply(obj); // 'Custom'



/**
 * call(), apply()
 */
function add(c, d) {
    return this.a + this.b + c + d;
}
var o = {
    a: 1,
    b: 3
};

// The first parameter is the object to use as 'this', subsequent parameters are passed as arguments in the function call
add.call(o, 5, 7); // 16

// The first parameter is the object to use as 'this', the second is an array whose members are used as the arguments in the function call
add.apply(o, [10, 20]); // 34


/**
 * bind()
 */
/* ECMAScript 5 introduced Function.prototype.bind(). Calling f.bind(someObject) creates a new function with the same body and scope as f, but where this occurs in the original function, in the new function it is permanently bound to the first argument of bind, regardless of how the function is being used.
 */
function f() {
    return this.a;
}
var g = f.bind({
    a: 'azerty'
});
console.log(g()); // azerty
var h = g.bind({
    a: 'yoo'
}); // bind only works once!
console.log(h()); // azerty

var o = {
    a: 37,
    f: f,
    g: g,
    h: h
};
console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty



/******************************************************** Promises ********************************************************/
/**
 *  Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.
 */

/**
 * Guarantees 
 */
/*
Unlike "old-style", passed-in callbacks, a promise comes with some guarantees:
Callbacks will never be called before the completion of the current run of the JavaScript event loop.
Callbacks added with then() even after the success or failure of the asynchronous operation, will be called, as above.
Multiple callbacks may be added by calling then() several times. Each callback is executed one after another, in the order in which they were inserted.
One of the great things about using promises is chaining.
*/

/**
 * Methods
 */
/* 
Promise.all(iterable) --- Returns a promise that either fulfills when all of the promises in the iterable argument have fulfilled or rejects as soon as one of the promises in the iterable argument rejects. If the returned promise fulfills, it is fulfilled with an array of the values from the fulfilled promises in the same order as defined in the iterable. If the returned promise rejects, it is rejected with the reason from the first promise in the iterable that rejected. This method can be useful for aggregating results of multiple promises.

Promise.race(iterable) --- Returns a promise that fulfills or rejects as soon as one of the promises in the iterable fulfills or rejects, with the value or reason from that promise.

Promise.reject() --- Returns a Promise object that is rejected with the given reason.

Promise.resolve() --- Returns a Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value. Generally, if you don't know if a value is a promise or not, Promise.resolve(value) it instead and work with the return value as a promise.
*/

/**
 * Prototype 
 */
/*
Promise.prototype.catch() --- Appends a rejection handler callback to the promise, and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled.

Promise.prototype.then() --- Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler, or to its original settled value if the promise was not handled (i.e. if the relevant handler onFulfilled or onRejected is not a function).

Promise.prototype.finally() --- Appends a handler to the promise, and returns a new promise which is resolved when the original promise is resolved. The handler is called when the promise is settled, whether fulfilled or rejected. 
*/

/*
The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
A Promise is in one of these states:
    - pending: initial state, not fulfilled or rejected.
    - fulfilled: successful operation
    - rejected: failed operation.
    - settled: the Promise is either fulfilled or rejected, but not pending.
*/

/**
 * Basic example
 */
function successCallback(result) {
    console.log("Audio file ready at URL: " + result);
}

function failureCallback(error) {
    console.log("Error generating audio file: " + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
//Same as 
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);



/**
 * Callback doom example
 */
doSomething(function (result) {
    doSomethingElse(result, function (newResult) {
        doThirdThing(newResult, function (finalResult) {
            console.log('Got the final result: ' + finalResult);
        }, failureCallback);
    }, failureCallback);
}, failureCallback);

/**
 * Same with promises
 */
doSomething()
    .then(function (result) {
        return doSomethingElse(result);
    })
    .then(function (newResult) {
        return doThirdThing(newResult);
    })
    .then(function (finalResult) {
        console.log('Got the final result: ' + finalResult);
    })
    .catch(failureCallback);


/**
 * Promise chain execution queue
 */
new Promise((resolve, reject) => {
        console.log('Initial');
        resolve();
    })
    .then(() => {
        throw new Error('Something failed');
        console.log('Do this'); //will not be executed
    })
    .catch((e) => {
        console.log('Do that', e); //
    })
    .then(() => {
        console.log('Do this, no matter what happened before');
    })
    .finally(() => {
        console.log('This is executed whatever happened before')
    });
//Result will be 
//Initial
//Do that Error: Something failed
//Do this, no matter what happened before
//This is executed whatever happened before




/******************************************************** async/await ********************************************************/
//TO BE ADDED


/******************************************************** Error propagations within async code ********************************************************/

function UserException(message) {
    this.message = message;
    this.name = 'UserException';
}

function getMonthName(mo) {
    mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    if (months[mo] !== undefined) {
        return months[mo];
    } else {
        throw new UserException('InvalidMonthNo');
    }
}

try {
    // statements to try
    var myMonth = 15; // 15 is out of bound to raise the exception
    var monthName = getMonthName(myMonth);
} catch (e) {
    monthName = 'unknown';
    console.log(e.message, e.name); // pass exception object to err handler
}

//2 
function doSomethingErrorProne() {
    if (ourCodeMakesAMistake()) {
        throw (new Error('The message'));
    } else {
        doSomethingToGetAJavascriptError();
    }
}
try {
    doSomethingErrorProne();
} catch (e) {
    console.log(e.name); // logs 'Error'
    console.log(e.message); // logs 'The message' or a JavaScript error message)
}
/*
The output will be the following:
-- InvalidMonthNo UserException
-- ReferenceError
-- ourCodeMakesAMistake is not defined
*/



/******************************************************** Getting rid of duplicates in Array ********************************************************/
var arrayWithDuplicates = ['2', 'qwe', '2', 'qwe', '2', 'qwe', '11', 'sth', 'sth'];
/**
 * First approach
 */
var firstApproachES6 = new Set(arrayWithDuplicates);
console.log('No duplicates ES6: ', firstApproachES6);
/**
 * Second approach
 */
var secondApproach = arrayWithDuplicates.filter((item, index, array) => {
    return array.indexOf(item) === index;
});
console.log('Second approach filter: ', secondApproach);


/******************************************************** Counting Duplicate Array Items ********************************************************/
var arrayOfItemsToCheck = ['qw', 'ew', 'uy', '12', 'qw', '12', 'uy', 'uy'];
var finalResult = arrayOfItemsToCheck.reduce((resultObject, item) => {
    resultObject[item] = resultObject[item] ? ++resultObject[name] : 1;
    return resultObject;
}, {});
console.log('Duplicates count: ', finalResult);




/******************************************************** Type conversion ********************************************************/

console.log(true + false); // 1
console.log(12 / "6"); // 2
console.log("number" + 15 + 3); // 'number153'
console.log(15 + 3 + "number"); // '18number'
console.log([1] > null); // true
console.log("foo" + +"bar"); // 'fooNaN'
console.log('true' == true); // false
console.log(false == 'false'); // false
console.log(!![]); //true
console.log([] == true); //false
console.log(![] == true); //false
console.log(null == ''); // false
console.log(!!"false" == !!"true"); // true
console.log(['x'] == 'x'); // true 
console.log([] + null + 1); // 'null1'
console.log([1, 2, 3] == [1, 2, 3]); // false
console.log({} + [] + {} + [1]); // '0[object Object]1'
console.log(!+[] + [] + ![]); // 'truefalse'
console.log(new Date(0) - 0); // 0
console.log(new Date(0) + 0); // 'Thu Jan 01 1970 02:00:00(EET)0'


/******************************************************** Http headers  ********************************************************/
/*
Headers can be grouped according to their contexts:
General header: Headers applying to both requests and responses but with no relation to the data eventually transmitted in the body.
Request header: Headers containing more information about the resource to be fetched or about the client itself.
Response header: Headers with additional information about the response, like its location or about the server itself (name and version etc.).
Entity header: Headers containing more information about the body of the entity, like its content length or its MIME-type.
*/

/**
 * Headers examples
 */
/*
Authorization - Contains the credentials to authenticate a user agent with a server.,
Cache-Control -Specifies directives for caching mechanisms in both requests and responses.,
Keep-Alive - Controls how long a persistent connection should stay open.,
Connection -Controls whether the network connection stays open after the current transaction finishes.,
Accept -Informs the server about the types of data that can be sent back. It is MIME-type.
Cookie - Contains stored HTTP cookies previously sent by the server with the Set-Cookie header.,
CORS HEADERS : {
    Access-Control-Allow-Origin
    Access-Control-Allow-Credentials
    Access-Control-Allow-Headers
    Access-Control-Allow-Methods
    Access-Control-Expose-Headers
    Access-Control-Max-Age
    Access-Control-Request-Headers
    Access-Control-Request-Method
    Origin
    Timing-Allow-Origin
},
Content-Type - Indicates the media type of the resource.,
Content-Length - Indicates the size of the entity-body, in decimal number of octets, sent to the recipient.,
Host,
Referer,
User-Agent,
Server,
Accept-Ranges,
Range,
Retry-After,
*/



/******************************************************** Restirct changing object's property value  ********************************************************/
var objectWithUnchangableValue = {};
Object.defineProperty(objectWithUnchangableValue, 'key1', {
    value: "proprty's value",
    writable: false,
    enumerable: true,
    configurable: true
});
objectWithUnchangableValue.key1 = 'new value';
console.log("Property's value changing restriction", objectWithUnchangableValue.key1); // "property's value"

/******************************************************** Call stack  ********************************************************/
//TO BE ADDED


/******************************************************** Regular expression  ********************************************************/
//TO BE ADDED
/******************************************************** scripts loading within browser ********************************************************/
//TO BE ADDED



/******************************************************** SOLID principles ********************************************************/
//TO BE ADDED
// S - Single-responsiblity principle
// O - Open-closed principle
// L - Liskov substitution principle
// I - Interface segregation principle
// D - Dependency Inversion Principle




/******************************************************** Creating object  ********************************************************/
var obj1 = Object.create(Object.prototype);
var obj2 = {};
var obj3 = new Object();


/******************************************************** Loop over nodes  ********************************************************/

/**
 * First approach
 */
var divs1 = document.getElementsByTagName('div');
[].forEach.call(divs1, function (item) {
    item.style.color = 'green';
});

/**
 * Second approach
 */
var divs2 = document.getElementsByTagName('div'),
    i;

for (i = 0; i < divs2.length; ++i) {
    divs[i].style.color = "green";
}

/**
 * Third approach
 */
Array.prototype.slice.call(document.childNodes);

/**
 * Fourth approach
 */
Array.from(nodeList);

/**
 * Fifth approach - use document.querySelectorAll('div'); For-loop and forEach() will work in this approach
 */
var t = document.querySelectorAll('div');
[].map.call(t, function (item) {
    return '2';
})


/******************************************************** RANDOM  ********************************************************/
typeof JSON.parse("0"); // number
console.log(['6'] * ['5']); // 30
console.log(null == false); // false