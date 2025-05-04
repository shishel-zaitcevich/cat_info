import CatList from './CatList';

import Modal from '../../../features/Modal/Modal';

import '../../../assets/styles/CatGalleryPage.scss';
import AuthButton from '../../shared/AuthButton/AuthButton';

const CatGalleryPage: React.FC = () => {
  return (
    <main>
      <section className="gallery-page">
        <div className="auth-wrapper">
          <AuthButton />
        </div>

        <CatList />
        <Modal />
      </section>
    </main>
  );
};

export default CatGalleryPage;
