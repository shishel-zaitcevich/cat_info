import CatList from './CatList';

import Modal from '../../../features/Modal';

import '../../../assets/styles/CatGalleryPage.scss';

const CatGalleryPage: React.FC = () => {
  return (
    <main>
      <section className="gallery-page">
        <CatList />
        <Modal />
      </section>
    </main>
  );
};

export default CatGalleryPage;
