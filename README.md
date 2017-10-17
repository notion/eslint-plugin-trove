Eslint Plugin Trove [![Build Status](https://travis-ci.org/notion/eslint-plugin-trove.svg?branch=master)](https://travis-ci.org/notion/eslint-plugin-trove)
===================

### Rules

`module-boundary`:
* Cannot reach into top-level `notion-modules` packages

`no-state-prop`:
* Cannot access `state` properties directly inside `mapStateToProps`, must use function like `getStatePropertyX(state)`
* Cannot access `state` properties directly inside `createSelector`

#### `module-boundary`

This rule will check all import/require to ensure it does not reach into a top-level `notion-modules` package

##### Valid

```js
import { actionCreators } from 'notion-modules/thread';
```

##### Invalid

```js
import { actionCreators } from 'notion-modules/thread/message';
```

#### `no-state-prop`

This rule will check `mapStateToProps` for code trying to access state properties directly.

##### Valid

```js
import { connect } from 'react-redux';
import { getItem } from './selectors';

const App = () => {};

connect((state) => {
  return {
    item: getItem(state),
  };
})(App);
```

##### Invalid

```js
import { connect } from 'react-redux';

const App = () => {};

connect((state) => {
  return {
    item: state.item,
  };
})(App);
```

This rule will check `createSelector` for code trying to access state properties directly.

##### Valid

```js
import { createSelector } from 'reselect';
const getItem = (state) => state.item;

const getItemOpen = createSelector(
  getItem,
  (item) => item.open
);
```

##### Invalid

```js
import { createSelector } from 'reselect';

const getItem = createSelector(
  (state) => state.item,
  (item) => item
);
```
