import React from 'react';
import styles from './App.module.css';
import {
  useMatchPointerType,
  useMatchPointerTypeClassName,
  usePointerType,
  usePointerTypeClassName,
} from '../../';

function App() {
  const inputType = usePointerType();
  const match = useMatchPointerType(['touch', 'pen']);
  usePointerTypeClassName();
  useMatchPointerTypeClassName(['touch', 'pen'], {
    match: 'nohover',
  });

  return (
    <div>
      <div>Current pointer type: {inputType}</div>
      <div>Matching pen or touch: {String(match)}</div>
      <div className={styles.pointerIndicator}>
        This div is red for mouse, blue for touch and green for pen.
      </div>
      <div className={styles.matchIndicator}>
        This div is green if pen or touch are matched, otherwise red.
      </div>
    </div>
  );
}

export default App;
