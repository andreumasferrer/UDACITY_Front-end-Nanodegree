# Website Performance Optimization Project

## About
The goal for this project was to optimize [Cameron Pittman's portfolio](https://github.com/gosukiwi/web-performance-portfolio) page for speed. In particular, optimize the critical rendering path and make _index.html_ page render as quickly as possible and improve _main.js_ to achieve 60 fps in _pizza.html_. This was done by applying the techniques I had picked up in  [Website Performance Optimization](https://www.udacity.com/course/ud884) and [Browser Rendering Optimization](https://www.udacity.com/course/ud860) courses. 

Following is Udacity's description for this project:
> *You will optimize a provided website with a number of optimization- and performance-related issues so that it achieves a target PageSpeed score and runs at 60 frames per second.*


##Getting started
### How to run
* Just download or clone this repository and open `dist/index.html` in your favorite browser. 

You can see an online version by clicking [here](https://andreumasferrer.github.io/UDACITY_Front-end_Nanodegree/p4_website_optimization/dist/). Also, you can check how it scores in [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fandreumasferrer.github.io%2FUDACITY_Front-end_Nanodegree%2Fp4_website_optimization%2Fdist%2F&tab=mobile). (_Mobile: **95**/100, Desktop:**97**/100_)
### How to build
You can edit and build your own version using [Grunt Task Runner guide](http://gruntjs.com). In the terminal, go to the project directory and:

1. Run `npm install` once to download an install project dependencies.
2. Run `Grunt` command every time you make modifications to the source code (_src_ directory).

##### Software requirements: 
* Grunt 0.4.x CLI instaled (needs Node & NMP, more info: [Grunt getting started guide](http://gruntjs.com/getting-started)). 
* [ImageMagick](http://www.imagemagick.org/script/binary-releases.php) CLI tools installed 

## Optimizations made
### Part 1: Page load speed optimization

* **Minifying HTML/CSS/JS** in _/dist_ directory: files were minified using Grunt plugins to ensure faster downloading.
* **Optimize images** (size and compression).
* **Eliminate render-blocking CSS** in above-the-fold content:
	* Specify media attribute for printing stylesheet (_print.css link_).
	* Get rid off “Open Sans” font and use sans-serif standard font.
	* Simplify CSS selectors in style.css (group styles & use classes). Delete unused styles.
	* Inline styles from styles.css in index.html
* **Eliminate render-blocking JavaScript** in above-the-fold content:
	* Move the Google Analytics script to the end of the page and load it *async*hronously.


### Part 2: Frame rate optimization

The optimizations were made in `views/js/main.js` and in `views/pizza.html`. Look for the keyword _**OPTIMIZATIONS**_ in the comments. 

* Improvements in **`updatePositions()`**function:
	* Replace _querySelectorAll_ with _getElementsByClassName_ when getting the items.
	* Read scroll position only once (_body.scrollTop_) outside the loop to avoid recalculate layout in each iteration (_forced synchronous layout / forced reflow_). 
	* Do all possible calculations once also outside the loop.
	* Use _transform_ property instead of _left_ ->  Take advantage of CSS3 hardware acceleration 
* Improvements in the **initial creation of the moving pizzas**:
	* Query the DOM for _movingpizzas1_ element only once (outside loop).
	* Use faster _getElementById_ instead of _querySelector_
	* Calculate maximum number of pizzas that fits in the window to avoid creating 200
	* Declare the elem variable (var elem;) in the initialisation of the for-loop to prevent it from being created every time the loop is executed.
	* Set the initial _left_ position of each pizza in order to left it prepated for translateX transfomation inside _updatePositions_ function.
* Improvements in **`resizePizzas(size)`**function:
	* Use faster _getElementById_ instead of _querySelector_ in _changeSliderLabel_, in _determineDX_ and in _changePizzaSizes(size)_ functions.
	* Inside _changePizzaSizes(size)_: 
		* Read the DOM to get _randomPizzaCointainers_ only once outside the loop. 
		* Since all pizzas are the same size, no need to read each pizzaContainer. Get _dx_ and _newwidth_ from the first element (also outside the loop) to avoid _forced reflow_.
	* Call _changeSliderLabel_ (DOM manipulation) after reading and changing pizza sizes and to avoid an unecessary layout recalculation.
* Add `"use strict";` statement in fuction definitions to make the code more secure and to make it easier for JavaScript engines to perform optimizations.
* Add _backface-visibility_ property with the _hidden_ value to _mover_ class styles (inlined CSS) to enable hardware acceleration for better performance.

* Aditionally, I applied optimizations for page **loading speed**: minify html/css/js, optimize images, inline css, defer main.js and added the viewport meta tag.
