/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page? -> Spec "are defined" fails: Expected 0 not to be 0
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Loops through each feed in the allFeeds object and ensures it has a
     * URL defined and that the URL is not empty.
     */
    it('all URLs are defined and they are not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(typeof feed.url).toEqual('string');
        expect(feed.url.length).toBeGreaterThan(0);
      });
    });

    /* Loops through each feed in the allFeeds object and ensures it has a name
     * defined and that the name is not empty.
     */
    it('all names are defined and they are not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(typeof feed.name).toEqual('string');
        expect(feed.name.length).toBeGreaterThan(0);
      });
    });

  });


  describe('The menu', function() {
    var body = $('body');

    /* Test that ensures the menu element is hidden by default. */
    it('is hidden by default', function() {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

    /* The menu changes visibility when the menu icon is clicked. This test
     * have two expectations: does the menu display when clicked and does it
     * hide when clicked again.
     */
    it('changes visibility when the menu icon is clicked', function() {
      var menuIcon = $('.menu-icon-link');
      menuIcon.trigger('click');
      expect(body.hasClass('menu-hidden')).toBeFalsy();
      menuIcon.trigger('click');
      expect(body.hasClass('menu-hidden')).toBeTruthy();
    });

  });


  describe('Initial Entries', function() {

    /* We call the asynchronous function "loadFeed" with "done" as its callback
     * This way we ensure done is called when it completes
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* When the loadFeed function is called and completes its work, there is at
     * least single .entry element within the .feed container.
     */
    it('is has at least one .entry element within the .feed container', function(done) {
      var entries = $('.feed .entry');
      expect(entries.length).toBeGreaterThan(0);
      done();
    });

  });

  describe('New Feed Selection', function() {
    var initialContent,
      updatedContent;

    beforeEach(function(done) {
      // Load initial content and, once loaded, save the results.
      loadFeed(0, function() {
        initialContent = $('.feed .entry h2').text();
        // Once inital content is loaded, load another content and save results.
        loadFeed(1, function() {
          updatedContent = $('.feed .entry h2').text();
          done();
        });
      });
    });

    /* Test that when a new feed is loaded by the loadFeed function that the
     * content actually changes.
     */
    it('updates the content', function(done) {
      expect(initialContent).not.toEqual(updatedContent);
      done();
    });

  });
}());
