## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

### Getting started

#### Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

#### Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

<!-- project start -->
### Part 1 : optimize CRP

#### image resizing

* use gulp plugins to resize and compress the images, and the picture element to
pick the right one based on the window size

#### critical CSS / JS

* add the `async` attribute to the JS scripts (since they weren't modifying the page)
* minify both CSS and JS
* inline the critical CSS using gulp

### Part 2 : optimize fps

#### on page scrolling issues

* The for loop inside the `updatePositions()` function is creating a _forced synchronous layout_
because of a read/write cycle.

##### improvements

* calculate the scrolled height outside of the for loop and store it into `bodyScrollTop`
* lower the number of pizzas in the background from 200 to 50, since we can't see
more than 50 pizzas on screen.
* used `transform: translateZ(0);` within the `.mover` class, to be sure the pizzas
in the background are drawn on their own layer (avoids repaint on scrolling)

#### on resizing issues

* The for loop inside `changePizzaSizes` function is creating a _forced synchronous layout_
* the line `var oldWidth = elem.offsetWidth;` within the `determineDx()` function
is also causing a _forced synchronous layout_

##### improvements

* access the DOM only once and store the element within `rndPizzaContainer`
* every pizza container has the same size of the others, so calculate it only once
outside the loop

##### issues

* `determineDx()` is still causing a _forced synchronous layout_

### Gulp setup

To use gulp you will need [nodejs](https://docs.npmjs.com/getting-started/installing-node).
Once you have that install gulp globally : `npm install --global gulp-cli`
Then enter the project directory and init both npm and gulp: `npm init` ; `npm install --save-dev gulp`
Create a _gulpfile.js_ in which you will define gulp tasks
To run gulp simply type the name of the task in the command line
[gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

The plugins used for this project are :
* [gulp-rename](https://www.npmjs.com/package/gulp-rename)
* [gulp-image-resize](https://www.npmjs.com/package/gulp-rename)
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-clean-css](https://github.com/scniro/gulp-clean-css)
* [gulp-webp](https://www.npmjs.com/package/gulp-webp)
* [critical](https://github.com/addyosmani/critical)
