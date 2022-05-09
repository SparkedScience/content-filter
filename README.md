# ContentFilter
A Vanilla JS package to check user input
# Installation
```
npm i @sparkedscience/content-filter
```
# Usage
```
import ContentFilter from '@sparkedscience/content-filter';

// Object creation
let cf = new ContentFilter("en");
// OR
let cf = new ContentFilter("en", "hello, world");

//Check if the input is valid
cf.filter(input); // Returns the input with all filtered words replaced with ***.
```
Currently, the following languages are supported: English (en), Spanish (es), Italian (it), and Indonesian (id).

The package supports an optional custom word list. The constructor accepts a comma seperated list of words to
use in the filter.

# NPM Script
```
npm run demo
```
This is the only script right now. It will open a new tab with the demo page.