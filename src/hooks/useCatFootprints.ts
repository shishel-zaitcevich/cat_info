import { useState, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

export const useCatFootprints = (isSectionOpen: boolean): Point[] => {
  const [path, setPath] = useState<Point[]>([]);

  useEffect(() => {
    if (isSectionOpen) {
      // Пример пути от левого верхнего угла к центру снизу
      const newPath: Point[] = [
        { x: 50, y: 50 },
        { x: 100, y: 150 },
        { x: 150, y: 250 },
        { x: 200, y: 350 },
      ];
      setPath(newPath);
    } else {
      setPath([]);
    }
  }, [isSectionOpen]);

  return path;
};
