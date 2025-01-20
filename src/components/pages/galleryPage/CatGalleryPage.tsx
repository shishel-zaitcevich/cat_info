// import React, { useEffect, useState, useRef } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
import '../../../assets/styles/CatGalleryPage.scss';
// import { CatImage } from '../../../api/catApi';
import CatList from './CatList';

const CatGalleryPage: React.FC = () => {
  return (
    <main>
      <section>
        <CatList />
      </section>
    </main>
  );
};

export default CatGalleryPage;
