import React, { useEffect, useState } from 'react';
import { fetchCatImages, CatImage } from '../api/catApi';

const CatGallery: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_CAT_API_KEY || '';

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const images = await fetchCatImages(apiKey, 10);
        setCatImages(images);
      } catch (e) {
        console.error(e);
        setError('Не удалось загрузить изображения котов.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [apiKey]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main data-scroll-container>
      <header data-scroll-section>
        <div className="wrapper">
          <h1>Привет, любители котов!</h1>
          <p>
            Это пример галереи котов с использованием библиотеки Locomotive
            Scroll.
          </p>
        </div>
      </header>
      {catImages.map((image) => (
        <section key={image.id} data-scroll-section className="container">
          <div className="parallax">
            <img
              data-scroll
              data-scroll-speed="-5"
              src={image.url}
              alt={image.breeds[0]?.name}
            />
          </div>
          <div data-scroll data-scroll-speed="2" className="text">
            <div className="wrapper">
              {image.breeds.length > 0 ? (
                <>
                  <h2>{image.breeds[0].name}</h2>
                  <p>{image.breeds[0].temperament}</p>
                </>
              ) : (
                <h2>Кот без породы</h2>
              )}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default CatGallery;

// import React, { useEffect, useState } from 'react';
// import '../assets/styles/CatGallery.scss'; // Предполагается, что ваши стили находятся в этом файле
// import { CatImage, fetchCatImages } from '../api/catApi';
// import LocomotiveScroll from 'locomotive-scroll';

// const CatGallery: React.FC = () => {
//   const apiKey = import.meta.env.VITE_CAT_API_KEY || '';
//   const [catImages, setCatImages] = useState<CatImage[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   // const galleryRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     const loadImages = async () => {
//       if (!apiKey) {
//         setError('API ключ не найден');
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const images = await fetchCatImages(apiKey, 10);
//         setCatImages(images);
//       } catch (e) {
//         console.error(e);
//         setError('Не удалось загрузить изображения котов.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadImages();
//   }, [apiKey]);

//   useEffect(() => {
//     const locoScroll = new LocomotiveScroll({
//       el: document.querySelector('[data-scroll-container]') as HTMLElement,
//       smooth: true,
//     });

//     return () => {
//       locoScroll.destroy(); // Очистка при размонтировании
//     };
//   }, []);

//   if (loading) return <p>Загрузка...</p>;
//   if (error) return <p>{error}</p>;
//   return (
//     <main data-scroll-container>
//       <header data-scroll-section>
//         <div className="wrapper">
//           <h1>Hello Designer!</h1>
//           <p>
//             This is an example of how you can use the locomotive scroll library,
//             you can see its GitHub in this{' '}
//             <a
//               href="https://locomotivemtl.github.io/locomotive-scroll/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               link
//             </a>{' '}
//             or you can see my{' '}
//             <a
//               href="https://youtu.be/DRWRVc87h7I"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               youtube
//             </a>{' '}
//             explanation of how to use this library.
//           </p>
//         </div>
//         <div className="scroll-animation">
//           Scroll Down
//           <svg viewBox="0 0 448 512" width="25" aria-label="chevron down">
//             <title>chevron down</title>
//             <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
//           </svg>
//         </div>
//       </header>
//       <section data-scroll-section className="container">
//         <div className="parallax">
//           <img
//             data-scroll
//             data-scroll-speed="-5"
//             src="https://images.unsplash.com/photo-1632592052900-b7e9a62adb1e?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMzQ3MzI3NQ&ixlib=rb-1.2.1&q=85"
//             alt=""
//           />
//         </div>
//         <div data-scroll data-scroll-speed="2" className="text">
//           <div className="wrapper">
//             <h2>Parallax effect</h2>
//             <p>
//               As you can notice the background is created to use an image with
//               the "img" tag to perfectly realize the offset background and the
//               depth we can give it.
//             </p>
//           </div>
//         </div>
//         <div className="scroll-animation">
//           Scroll Down
//           <svg viewBox="0 0 448 512" width="25" aria-label="chevron down">
//             <title>chevron down</title>
//             <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
//           </svg>
//         </div>
//       </section>
//       <section data-scroll-section>
//         <div className="wrapper">
//           <h2>Keep Scrolling</h2>
//           <p>
//             The wonderful thing about the library, it is disabled when the
//             viewport is less than 1000px, but only when the website loads, it
//             does not affect if the browser resizes. Try changing the editor view
//             to vertical and reload the code. You will notice the change when
//             scrolling, keep this in mind when creating your animations.
//           </p>
//         </div>
//         <div className="scroll-animation">
//           Scroll Down
//           <svg viewBox="0 0 448 512" width="25" aria-label="chevron down">
//             <title>chevron down</title>
//             <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
//           </svg>
//         </div>
//       </section>
//       <section data-scroll-section className="container">
//         <div className="parallax">
//           <img
//             data-scroll
//             data-scroll-speed="-5"
//             src="https://images.unsplash.com/photo-1678338712030-6b529c30bd41?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzkwODIwMDE&ixlib=rb-4.0.3&q=80"
//             alt=""
//           />
//         </div>
//         <div data-scroll data-scroll-speed="2" className="text">
//           <div className="wrapper">
//             <h2>Did you like this library?</h2>
//             <p>For more front-end code follow me on:</p>
//             <ul>
//               <li data-scroll data-scroll-speed="5">
//                 <a
//                   href="https://youtu.be/DRWRVc87h7I"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="35"
//                     fill="currentColor"
//                     className="bi bi-youtube"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104a2.007 2.007 0 0 1 1.419-1.419c1.217-.325 5.566-.332 6.197-.335zM9.042 2c-.58 0-4.57.033-5.703.305a1.006 1.006 0 0 0-.707.706C2.038 3.928 2 4.908 2 5.168c0 .26.036 1.239.333 2.148.312 1.051 1.045 1.792 2.132 2.064 1.283.307 4.049.37 5.608.37 1.056 0 1.32-.044 1.415-.052 1.08-.07 1.416-.07 1.415-1.419C3.993 2.03 8.22 2 9.042 2h.09zM9.042 5.78c-1.308 0-2.396.396-2.396.896s1.088.896 2.396.896 2.396-.396 2.396-.896-1.088-.896-2.396-.896zM8.051 10.243c-.81 0-1.48-.098-1.948-.245l-.06.056a2.964 2.964 0 0 0 2.294 1.136c.468 0 .964-.054 1.464-.14a2.964 2.964 0 0 0 1.587-1.417c.25-.555.547-1.18.671-2.145a3.124 3.124 0 0 1 .146-.03c.55-.088 1.12-.058 1.652.044l.057.01-.006.074a3.88 3.88 0 0 1-.042.76c-.044.45-.105.89-.183 1.338-.074.446-.154.892-.246 1.267-.135.597-.287 1.15-.537 1.683-.468.96-1.072 1.66-1.923 1.96a3.055 3.055 0 0 1-1.248.215c-.382 0-.719-.017-1.044-.05a4.034 4.034 0 0 1-1.254-.233 2.99 2.99 0 0 1-1.639-1.717c-.413-.732-.694-1.482-1.056-2.334-.105-.235-.227-.474-.334-.727-.111-.264-.22-.538-.324-.816-.027-.079-.056-.159-.077-.238.083.063.162.125.238.181.275.203.524.382.731.567.25.215.471.461.686.683.12.126.254.234.406.336.315.187.63.371.968.455.453.086.874-.02 1.283-.027.6-.013 1.061.016 1.479.065.633.074 1.148-.003 1.553-.16.513-.177 1.012-.462 1.47-.825.03-.517-.014-1.106-.105-1.586-.186-1.092-1.04-1.704-1.949-1.68-.663.021-1.178.553-1.27 1.128-.224 1.278.683 1.438 1.118 1.428a1.951 1.951 0 0 0 1.041-.082c.337-.099.595-.32.727-.62.154-.344.29-.735.48-1.052a2.017 2.017 0 0 1 .214-.291c.057.019.116.033.174.043.603.074 1.063.055 1.53-.186a2.068 2.068 0 0 0 .577-.333c.135.366.268.739.438 1.088.038.103.074.204.114.307l.006.015c.23.557.355 1.169.316 1.779-.024.579-.2 1.084-.547 1.52a1.651 1.651 0 0 1-1.139.597z" />
//                   </svg>
//                   Youtube
//                 </a>
//               </li>
//               <li data-scroll data-scroll-speed="5">
//                 <a
//                   href="https://www.linkedin.com/in/pedro-jesus-2b0364218/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="35"
//                     fill="currentColor"
//                     className="bi bi-linkedin"
//                     viewBox="0 0 16 16"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M0 1.146C0 .512.478 0 1.068 0h13.864C15.522 0 16 .512 16 1.146v13.708C16 15.488 15.522 16 14.932 16H1.068C.478 16 0 15.488 0 14.854V1.146zM4.75 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm.5 7H4v-5h1.25v5zm7.5-7a1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1 3 0zM10.5 7h1.25v5h-1.25V7zm-.5-2a3 3 0 0 0-2.999 3v5H6V7h1.25v1.75h.001V7h1.25V4.5z"
//                     />
//                   </svg>
//                   Linkedin
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="scroll-animation">
//           Scroll Down
//           <svg viewBox="0 0 448 512" width="25" aria-label="chevron down">
//             <title>chevron down</title>
//             <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
//           </svg>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default CatGallery;
