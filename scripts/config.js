var context = context || {};

context.MAX_HEIGHT = 400;
context.MAX_WIDTH = 400;
context.MIN_HEIGHT = 150;
context.MIN_WIDTH = 280;
context.PANE_PADDING_WIDTH = 10;
context.PANE_PADDING_HEIGHT = 5;

context.BRANDING_HEIGHT = 21;

context.MAX_QUERY_WORDS = 6;
context.MAX_QUERY_LENGTH = 200;

context.WIKIPEDIA_MOBILE_HOST = 'en.m.wikipedia.org';
context.WIKIPEDIA_HOST = 'en.wikipedia.org';
context.WIKIPEDIA_PREFIX = 'https://en.m.wikipedia.org/wiki/';
context.WIKIPEDIA_SEARCH_URL =
    "https://en.m.wikipedia.org/w/index.php?search=";

context.TUTORIAL_WIDTH = context.MAX_WIDTH;
context.TUTORIAL_HEIGHT = 370;
context.TUTORIAL_INTRO_WIDTH = context.MAX_WIDTH;
context.TUTORIAL_INTRO_HEIGHT = 150;

context.TUTORIAL_CLOSE_MESSAGE = 'tutorial-close_' + chrome.runtime.id;
