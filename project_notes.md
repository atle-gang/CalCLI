# CalCLI notes


## Moving and modifying the listEvents function 

To break down the project into smaller and manageable modules or components, I have decided to remove the async function, 
`listEvents` and move it to its own module named, `viewCalendar`.

To do this, I will need to relearn about export and import directives in JS, since I have a bit of experiencing of exporting and importing files in JS.
From [javascript.info](https://javascript.info/import-export), it states that we can label any declaration as exported by placing export before it,
be it a variable, function or a class.

### Export before declarations

**Note** - Please note that export before a class or a function does not make it a function expression. It's still a function declaration,
albeit exported. So, using the function that I want to move and further export, the code for it shall look like this

```javascript
export function listEvents(auth) {
  // rest of the code
}  // no ; at the end
```

### Export apart from declarations

Also, we can put `export` separately

```javascript
// 📁 say.js
function listEvents(auth) {
  // rest of the code
}

export {listEvents}; // a list of exported variables
```

### Import *

We put a list of what to import in curly braces `import {...}`

```javascript
import {listEvents} from './view-calendar/viewCalendar.js';

// Call function where it will be needed
```

But if there's a lot to import, we can import everything as an object using 
`import * as <obj>`

import * as say from './say.js';

```javascript
import * as say from './say.js';

// rest of code
```

## New additions that can need to be made to accommodate the changes I have listed above.

I need to create a new package named, `app` that will contain a module named, `app.js`. This module will be responsible for orchestrating the execution of the entire program by calling functions from other modules.

```bash
CalCLI/
├── app/
│   └── app.js                # Main module responsible for orchestrating the program
└── calendar/
    ├── configuration/
    │   ├── credentials.json  # File containing credentials for calendar configuration
    │   ├── index.js          # Module for setting up and managing calendar configuration
    │   └── token.js          # Module for managing authentication tokens
    └── view-calendar/
        ├── displayCalendar.js  # Module for displaying calendar events
        └── viewCalendar.js     # Module for viewing calendar information

```

## Challenges I encountered moving 'listEvents' function to its own module  

The first challenge I faced was encountering the error SyntaxError: Cannot use import statement outside a module. This error was new to me because most of the JavaScript code I've written before was contained within a single file. Upon researching the issue, I discovered that the error occurred because I was using an import statement outside of a module context, which is not supported by default in Node.js.

Code that caused the error:

```javascript
import { authorize } from "../configuration";
```

and also first exporting the function I was attempting to call, like this:

```javascript
export { authorize }
```
I fixed the, `SyntaxError: Cannot use import statement outside a module` error by using the `require` syntax, which is the standard in CommonJS modules.

So, I did the following:

File: index.js
```javascript
module.exports = { authorize };
```

File: viewCalendar.js
```javascript
const { authorize } = require("../configuration");
```

I also respectively importing the module(s)/function(s) I needed to run the `app.js` file.

Another issue I encountered after moving the `listEvents()` function was an error that read, `Error: Cannot find module '<path to token>credentials.json'` which told me that the module, `google-cloud/local-auth` was trying to find the credentials file in my root directory. 

Originally, the code that looked like this:
Ca
File: index.js
```javascript
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './credentials.json');
```

Which I believe both files were looked for in the root directory, but the files couldn't be found. To resolve this, I needed to specify an absolute file path to the location of the credentials file.

File: index.js
```javascript
const TOKEN_PATH = path.join(process.cwd(), './calendar/configuration/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './calendar/configuration/credentials.json');
```

