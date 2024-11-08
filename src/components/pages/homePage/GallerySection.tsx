import { useEffect } from 'react';
import '../../../assets/styles/GallerySection.scss';
import gsap from 'gsap';
// import 'locomotive-scroll/dist/locomotive-scroll.css';

export function GallerySection() {
  useEffect(() => {
    gsap.defaults({
      //улучшает плавность анимаций, возможно лучше удалить
      ease: 'power1.out',
      duration: 1,
    });

    gsap.to('#mtiv', {
      backgroundSize: '100%',
      backgroundPosition: '50% 100%',
      scrollTrigger: {
        trigger: '#mtiv',
        markers: false,
        scrub: 1,
        start: 'top 95%',
      },
    });

    const images = ['.ith', '.io', '.it'];
    images.forEach((selector) => {
      gsap.to(selector, {
        transform: 'scale(.7)',
        opacity: 0.65,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.nOne',
          markers: false,
          scrub: 0.5,
          start: 'top 90%',
          end: 'bottom 20%',
        },
        delay: 0.05,
      });
    });

    gsap.timeline().from('.no', {
      opacity: 0.1,
      // y: 50,
      scrollTrigger: {
        trigger: '.no',
        start: 'top 80%',
        end: 'bottom top',
        scrub: 0.5,
        markers: false,
      },
    });
    gsap.timeline().to('.no', {
      opacity: 1,
      scrollTrigger: {
        trigger: '.no',
        start: 'top 80%',
        end: 'bottom top',
        scrub: 0.5,
        markers: false,
      },
    });
  }, []);

  return (
    <div className="nOne" id="mtiv" data-scroll data-scroll-section>
      <img
        className="ith"
        src="/deniz-uzuner-0ZffcNJ7jP0-unsplash.jpg"
        alt=""
        data-scroll
        data-scroll-speed="-2"
      />
      <img
        className="io"
        src="/sara-groblechner-m5u3tXsY76w-unsplash.jpg"
        alt=""
        data-scroll
        data-scroll-speed="-5"
      />
      <img
        className="it"
        src="/oguzhan-tasimaz-r2Uk2g31JiE-unsplash.jpg"
        alt=""
        data-scroll
        data-scroll-speed="-1"
      />
      <h1 className="no" id="on" data-scroll data-scroll-speed="-4">
        GALLERY
      </h1>
    </div>
  );
}
