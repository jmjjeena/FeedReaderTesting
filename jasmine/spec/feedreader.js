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
    /* This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test makes sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('have an URL defined', function() {
            for (let feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            }
        });
        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('have a name defined', function() {
            for (let feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toBe(0);
            }
        });

    });
    // This suite is about the side menu.
    describe('The menu', function() {
        const body = document.querySelector('body');
        // This test ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        // This test ensures menu changes visibility when the menu icon is clicked.
        it('toggle visibility when the menu icon is clicked', function() {
            const menuIcon = document.querySelector('.menu-icon-link');
            const initialMenuState = body.classList.contains('menu-hidden');

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).not.toBe(initialMenuState);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(initialMenuState);
        });
    });
    // This suite is about the feed entries.
    describe('Initial Entries', function() {
        // Load feed before test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        /* This test ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        it('have at least a single entry', function(done) {
            let entriesCount = document.querySelector('.feed').getElementsByClassName('entry').length;
            expect(entriesCount).toBeGreaterThan(0);
            done();
        });
    });
    // This suite is about loading new feed.
    describe('New Feed Selection', function() {
        let initialFeedContent;
        // Get the initial feed and load new feed afterwards.
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeedContent = document.querySelector('.feed').innerHTML;

                loadFeed(1, function() {
                    done();
                });
            });
        });
        /* This test ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        it('changes feed content', function(done) {
            newFeedContent = document.querySelector('.feed').innerHTML;
            expect(initialFeedContent).not.toBe(newFeedContent);
            done();
        });
    });
}());
