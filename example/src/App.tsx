import React from 'react';
import {
  useMatchPointerType,
  usePointerType,
  usePointerTypeClassName,
} from '../../';
import styles from './App.module.css';

function App() {
  const inputType = usePointerType();
  const match = useMatchPointerType(['touch', 'pen']);
  usePointerTypeClassName();

  return (
    <div>
      <div>{inputType}</div>
      <div>
        {match ? 'Matched "touch or pen".' : 'No match for "touch or pen".'}
      </div>
      <div className={styles.pointerStyled}>
        This div is red for mouse, blue for touch and green for pen.
      </div>
    </div>
  );
}

export default App;
