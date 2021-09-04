import { useEffect, useState } from 'react';

export type PointerType = 'mouse' | 'pen' | 'touch';

interface UsePointerTypeOptions {
  initial?: PointerType;
}

export const usePointerType = ({
  initial = 'mouse',
}: UsePointerTypeOptions = {}) => {
  const [pointerType, setPointerType] = useState<PointerType>(initial);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      setPointerType(e.pointerType as PointerType);
    };

    document.addEventListener('pointerdown', handler);

    return () => {
      document.removeEventListener('pointerdown', handler);
    };
  }, []);

  return pointerType;
};

interface UseMatchPointerTypeOptions {
  initial?: PointerType;
}

export const useMatchPointerType = (
  pointerTypes: PointerType[],
  { initial = 'mouse' }: UseMatchPointerTypeOptions = {}
) => {
  const type = usePointerType({ initial });

  return pointerTypes.includes(type);
};

interface UsePointerTypeClassNameOptions {
  prefix?: string;
  initial?: PointerType;
}

export const usePointerTypeClassName = ({
  prefix = '',
  initial = 'mouse',
}: UsePointerTypeClassNameOptions = {}) => {
  const type = usePointerType({ initial });

  useEffect(() => {
    document.documentElement.classList.add(prefix + type);

    return () => {
      document.documentElement.classList.remove(prefix + 'mouse');
      document.documentElement.classList.remove(prefix + 'touch');
      document.documentElement.classList.remove(prefix + 'pen');
    };
  }, [type, prefix]);
};

interface UseMatchPointerTypeClassNameOptions {
  match?: string;
  noMatch?: string;
  initial?: PointerType;
}

export const useMatchPointerTypeClassName = (
  pointerTypes: PointerType[],
  {
    match: matchClass,
    noMatch: noMatchClass,
    initial = 'mouse',
  }: UseMatchPointerTypeClassNameOptions
) => {
  const match = useMatchPointerType(pointerTypes, { initial });

  useEffect(() => {
    if (match && matchClass) {
      document.documentElement.classList.add(matchClass);
    }

    if (!match && noMatchClass) {
      document.documentElement.classList.add(noMatchClass);
    }

    return () => {
      if (matchClass) {
        document.documentElement.classList.remove(matchClass);
      }
      if (noMatchClass) {
        document.documentElement.classList.remove(noMatchClass);
      }
    };
  }, [match, matchClass, noMatchClass]);
};
