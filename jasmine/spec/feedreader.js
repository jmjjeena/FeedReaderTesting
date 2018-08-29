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
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have an URL defined', function() {
            for (let feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            }
        });

        it('have a name defined', function() {
            for (let feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toBe(0);
            }
        });

    });

    describe('The menu', function() {
        const body = document.querySelector('body');

        it('is hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        it('toggle visibility when the menu icon is clicked', function() {
            const menuIcon = document.querySelector('.menu-icon-link');
            const initialMenuState = body.classList.contains('menu-hidden');

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).not.toBe(initialMenuState);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(initialMenuState);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('have at least a single entry', function(done) {
            let entriesCount = document.querySelector('.feed').getElementsByClassName('entry').length;
            expect(entriesCount).toBeGreaterThan(0);
            done();
        });


    });

    describe('New Feed Selection', function() {
        let initialFeedContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeedContent = document.querySelector('.feed').innerHTML;

                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('changes feed content', function(done) {
            newFeedContent = document.querySelector('.feed').innerHTML;
            expect(initialFeedContent).not.toBe(newFeedContent);
            done();
        });
    });
}());
