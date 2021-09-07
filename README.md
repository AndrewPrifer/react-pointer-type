# React Pointer Type

React hooks for adapting to pointer type changes. The correct alternative to feature detection.

## Quick start

```
yarn add react-pointer-type
```

```css
/* App.module.css */

:global(.mouse) .pointerIndicator {
  background: red;
}

:global(.touch) .pointerIndicator {
  background: blue;
}

:global(.pen) .pointerIndicator {
  background: green;
}
```

```tsx
import React from 'react';
import styles from './App.module.css';
import { usePointerType } from '../../';

function App() {
  const inputType = usePointerType({
    attachClass: true,
  });

  return (
    <div>
      <div>Current pointer type: {inputType}</div>
      <div className={styles.pointerIndicator}>
        This div is red for mouse, blue for touch and green for pen.
      </div>
    </div>
  );
}

export default App;
```
