import { useEffect, useState } from 'react';

export type PointerType = 'mouse' | 'pen' | 'touch';

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

interface UsePointerTypeOptions {
  initial?: PointerType;
  attachClass?: boolean;
  classPrefix?: string;
  updateOn?: PointerEventType;
}

export const usePointerType = ({
  initial = 'mouse',
  attachClass = false,
  classPrefix = '',
  updateOn = 'pointerdown',
}: UsePointerTypeOptions = {}) => {
  const [pointerType, setPointerType] = useState<PointerType>(initial);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      setPointerType(e.pointerType as PointerType);
    };

    document.addEventListener(updateOn, handler);

    return () => {
      document.removeEventListener(updateOn, handler);
    };
  }, []);

  useEffect(() => {
    if (attachClass) {
      document.documentElement.classList.add(classPrefix + pointerType);

      return () => {
        document.documentElement.classList.remove(classPrefix + 'mouse');
        document.documentElement.classList.remove(classPrefix + 'touch');
        document.documentElement.classList.remove(classPrefix + 'pen');
      };
    }

    return;
  }, [pointerType, classPrefix, attachClass]);

  return pointerType;
};
