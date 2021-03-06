# Neutrino TypeScript React Preset

[![Build Status](https://travis-ci.org/guzart/neutrino-preset-typescript-react.svg?branch=master)](https://travis-ci.org/guzart/neutrino-preset-typescript-react)
[![npm version](https://badge.fury.io/js/neutrino-preset-typescript-react.svg)](https://badge.fury.io/js/neutrino-preset-typescript-react)

## Requirements

- Node.js v6.9+
- Yarn or npm client
- Neutrino v5

## Installation

`neutrino-preset-typescript-react` can be installed via the Yarn or npm clients. Inside your project, make sure
`neutrino` and `neutrino-preset-typescript-react` are development dependencies, and that `react`, and `react-dom` along with their type definitions `@types/react`, `@types/react-dom` are dependencies.

#### Yarn

```bash
❯ yarn add --dev neutrino neutrino-preset-typescript-react
❯ yarn add react react-dom @types/react @types/react-dom
```

#### npm

```bash
❯ npm install --save-dev neutrino neutrino-preset-typescript-react
❯ npm install --save react react-dom @types/react @types/react-dom
```

## Project Layout

`neutrino-preset-typescript-react` follows the standard [project layout](https://neutrino.js.org/project-layout) specified by Neutrino. This
means that by default all project source code should live in a directory named `src` in the root of the
project. This includes JavaScript files, CSS stylesheets, images, and any other assets that would be available
to your compiled project.

## Quickstart

After installing Neutrino and the typescript react preset, add a new directory named `src` in the root of the project, with
a single TypeScript file named `index.ts` in it.

```bash
❯ mkdir src && touch src/index.ts && touch src/Hello.tsx
```

This preset exposes an element in the page with an ID of `root` to which you can mount your application. Edit
your `src/index.ts` file with the following:

```javascript
// src/index.ts
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from './Hello';

ReactDOM.render(
  React.createElement(Hello, { compiler: 'TypeScript', framework: 'React' }),
  document.getElementById('root')
);
```

```javascript
// src/Hello.tsx
import * as React from "react";

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <div>
    <h1>Hello from {props.compiler} and {props.framework}!</h1>
    <p>Hello world</p>
  </div>
);
```

Now edit your project's package.json to add commands for starting and building the application:

```json
{
  "scripts": {
    "start": "neutrino start --use neutrino-preset-typescript-react",
    "build": "neutrino build --use neutrino-preset-typescript-react"
  }
}
```

Start the app, then open a browser to the address in the console:

#### Yarn

```bash
❯ yarn start
✔ Development server running on: http://localhost:5000
[at-loader] Using typescript from typescript and "tsconfig.json" from tsconfig.json.
⠇ Waiting for initial build to finish
[at-loader] Checking started in a separate process...
[at-loader] Ok, 0.128 sec.
✔ Build completed
```

#### npm

```bash
❯ npm start
✔ Development server running on: http://localhost:5000
[at-loader] Using typescript from typescript and "tsconfig.json" from tsconfig.json.
⠇ Waiting for initial build to finish
[at-loader] Checking started in a separate process...
[at-loader] Ok, 0.128 sec.
✔ Build completed
```

## Hot Module Reloading

Add `react-hot-loader@next` as a dependency, and its typing `@types/react-hot-loader`

```bash
❯ yarn add react-hot-loader@next @types/react-hot-loader
```

Wrap your application with `react-hot-loader` `AppContainer` component, preferrably you should do this at
the root of your project. You will have to listen for changes and re-render the new component in the DOM,
like so:

```js
// src/index.ts
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import * as Hello from './Hello';

const load = (Root: any) => {
  const app = React.createElement(Root, { compiler: 'TypeScript', framework: 'React' });
  ReactDOM.render(React.createElement(AppContainer, null, app), document.getElementById('root'));
};

if (module.hot) {
  module.hot.accept('./Hello', () => {
    const NextHello = require('./Hello') as typeof Hello;
    load(NextHello.Hello);
  });
}

load(Hello.Hello);
```

Take a look at [examples/hmr/](https://github.com/guzart/neutrino-preset-typescript-react/tree/master/examples/hmr)
for an example on HMR.
