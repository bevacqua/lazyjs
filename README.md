#LazyJS #

**LazyJS** is an alternative to CommonJS/Modules and RequireJS with a minimal design that allows you to make your own decisions, rather than trying to force them on you.

# Concept #

The idea with LazyJS is very similar to what RequireJS aims at, which is dependencies that resolve themselves. The difference is LazyJS aims to be less intrusive in how you should style your code, and lets you determine how to handle dependencies beyond the physical modules you use.

## Getting Started with LazyJS ##

Using LazyJS, you only need to embed a single <script> tag in your HTML.

    <script id='lazyjs' src='/js/vendor/lazy.min.js' data-jumpstart='/js/app.js'></script>

This `<script>` tag will allow LazyJS to load via AJAX the script you reference in the `data-jumpstart` attribute. That's familiar enough, RequireJS behaves similarly.

Within scripts, though, there are differences. LazyJS uses what's called **comment directives**. So far there are two types of these directives.

- `define` directives, which allow us to define _multiple modules in a single file_:

    /*! lazy define module-1 */
    function sum(a, b){
        return a + b;
    }

    /*! lazy define module-2 */
    function print(text){
        console.log(text);
    }

**Definitions** mean that your modules will now be identified by whatever name $name you pick

    /*! lazy define $name */

- `require` directives, which make a module **depend on another one**:

    /*! lazy define module-3 */
    /*! lazy require module-1 */
    /*! lazy require module-2 */
    function funky(){
        print('the result is ' + sum(5, -2));
    }

**Dependency** as defined by `require` comment directives means that the code in a module won't be evaluated _at all_ until all of it's dependencies have been evaluated.

    /*! lazy require $name */

## Getting Practical ##

In a more practical scenario, you would probably want to completely skip module definitions, and stick to the _one-module-per-file_ convention, where if you had `/js/foo.js` with some code, you could add a `require` directive like /*! lazy require /js/foo.js */

If you stick to one module per file, `define` directives are not necessary. These do become crucial when you are bundling your scripts together, though.

## Getting Real ##

In a production scenario you don't want all those AJAX requests flying around. So you change things up very subtly:

    <script id='lazyjs' src='/js/vendor/lazy.min.js' data-jumpstart='/js/app.js' data-bundle='js/all.js'></script>

This might be kind of deceiving at first glance, but it will just perform two HTTP requests. One for LazyJS, and the other one for everything else. But here's the beauty.

Even though we've now fetched every single line of JavaScript, we are not going to evaluate it yet, we are just storing the strings, after some manipulation to figure out which module is which, and which module needs what. We don't even split the string until we need it.

This approach **drastically increases average load times**, and that's even when the script is cached and gzipped (as they should be). That's because JS parsing can take up a significant time on each page load. Time that might be better spent elsewhere, or _better distributed_.

Ok, but what happens to the jump-start script now? Well, it's essentially the same scenario as it was before using bundles, except now you have a nice hashtable with a list of modules that are eager to be evaluated. If `/js/app.js` is among those scripts, it will be parsed and executed immediately, if it's not, then the usual AJAX request would go get it.

If an script has any number of dependencies, then those will be resolved, recursively, until all dependencies are resolved and the script can load. Then, everything gets evaluated.

Note that modules will only be fetched/parsed/evaluated once. Just like when you don't have the aid of a script loader.

# Disclaimer #

This is the early prototype of an idea, an experiment if you will. Hopefully I'll get some input on it's viability, and then decide where the project will go from there.

Suggestions are welcome!