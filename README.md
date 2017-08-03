Eslint Plugin Trove
===================

### Rules

`no-state-prop`:
* Cannot access `state` properties directly inside `mapStateToProps`, must use function like `getStatePropertyX(state)`
* Cannot access `state` properties directly inside `createSelector`

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
