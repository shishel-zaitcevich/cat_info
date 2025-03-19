// import '../assets/styles/shared/IconLike.scss'; // Подключаем стили

// import { forwardRef, useImperativeHandle, useRef } from 'react';
// import { gsap } from 'gsap';

// const MustacheAnimation = forwardRef((props, ref) => {
//   const mustacheRef = useRef<SVGSVGElement>(null);
//   const heartRef = useRef<SVGPathElement>(null);

//   const animateMustache = () => {
//     if (mustacheRef.current) {
//       const mustacheElements =
//         mustacheRef.current.querySelectorAll('.mustache');

//       if (mustacheElements.length > 0) {
//         gsap.to(mustacheElements, {
//           y: 10,
//           rotation: 10,
//           stagger: 0.1,
//           repeat: 2,
//           yoyo: true,
//           duration: 0.3,
//           ease: 'power1.inOut',
//         });
//       }
//     }

//     if (heartRef.current) {
//       gsap.to(heartRef.current, {
//         attr: { fill: 'pink' },
//         duration: 0.3,
//         ease: 'power1.inOut',
//         yoyo: true,
//         repeat: 2,
//       });
//     }
//   };

//   useImperativeHandle(
//     ref,
//     () => ({
//       triggerAnimation: animateMustache,
//     }),
//     []
//   );

//   return (
//     <div className="svg-container">
//       <svg
//         ref={mustacheRef}
//         xmlns="http://www.w3.org/2000/svg"
//         width="200"
//         height="200"
//         viewBox="0 0 200 200"
//       >
//         {/* Усы */}
//         <path
//           className="mustache"
//           d="M50 80 C20 20, 80 20, 50 80"
//           fill="black"
//         />
//         <path
//           className="mustache"
//           d="M150 80 C180 20, 120 20, 150 80"
//           fill="black"
//         />

//         {/* Сердце */}
//         <path
//           ref={heartRef}
//           className="heart"
//           d="M50 50 C70 30, 90 30, 100 50 C110 70, 90 90, 50 120 C10 90, -10 70, 0 50 Z"
//           fill="red"
//         />
//       </svg>
//     </div>
//   );
// });

// export default MustacheAnimation;
