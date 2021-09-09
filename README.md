# React Pointer Type

A tiny (442 B), zero dependency React hook for adapting to pointer type changes. The correct alternative to feature detection.

## Why

Web browsers can be used with different pointing devices. These pointing devices have different precisions and features. Touch, for example, is a crude pointing device which also occludes much of the screen. While pens are more precise, just like touch, they often lack hovering, which leads to "sticky" `:hover` states when the device tries to emulate the behavior. You need to adjust your UI to the needs of each of them.

To solve these problems, developers often use crude ways to detect whether a device is used with a touch screen, or with a mouse.

The issue with this solution is that modern devices like Microsoft Surface laptops or the iPad Pro not only support all three, but are routinely used with mouse, touch and pen inputs all in the same session. This renders traditional feature detection inadequate. You need to check for the pointing device in use *right now*, and react to changes in real time.

This library is an easy way to achieve that.

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

## API Reference

### `usePointerType(options)`

Returns the current pointer type and optionally attaches the corresponding class to the document element.

#### Parameters

`options.initial: string = 'mouse'`: when the website is loaded, the pointing device is not known initially. You can set the default here.

`options.updateOn: PointerEventType = 'pointerdown'`: specifies which pointer event type to use for updating.

`options.attachClass: boolean = false`: whether to attach a class to the document element. Useful if you want to change the styles based on the pointer type. The possible classes are `.mouse`, `.pen` and `.touch`.

`options.classPrefix: string = ''`: what prefix to use for the class. Useful to avoid name collisions.

#### Returns

`pointerType: PointerType`: the current pointer type.

### Types

```ts
type PointerType = 'mouse' | 'pen' | 'touch';

type PointerEventType =
  | 'pointerover'
  | 'pointerenter'
  | 'pointerdown'
  | 'pointermove'
  | 'pointerup'
  | 'pointercancel'
  | 'pointerout'
  | 'pointerleave'
  | 'gotpointercapture'
  | 'lostpointercapture';
```

# How does it work?

The library checks the `pointerType` property on pointer events. Pointer events are supported by all modern browsers and Safari.
