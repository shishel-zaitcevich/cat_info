declare module 'locomotive-scroll' {
    export interface LocomotiveScrollOptions {
      el: HTMLElement;
      smooth?: boolean;
      lerp?: number;
      inertia?: number;
      scrollFromAnywhere?: boolean;
      tablet?: {
        breakpoint: number;
      };
    }
  
    export default class LocomotiveScroll {
   
      constructor(options: LocomotiveScrollOptions);
      update(): void;
      
      // Изменяем тип для события
      on(event: string, callback: (event: Event) => void): void;
      
      destroy(): void;
    }
  }
  