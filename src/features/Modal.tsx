import React from 'react';
import s from './Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../api/store/store';
import { closeModal } from '../api/store/modalSlice';
import CatDetails, {
  CatDetailsProps,
} from '../components/pages/galleryPage/CatDetails/CatDetails';

const Modal: React.FC = () => {
  const { isOpen, modalData } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen || !modalData) return null;

  const renderContent = () => {
    switch (modalData.type) {
      case 'CatDetails':
        return <CatDetails {...(modalData.props as CatDetailsProps)} />;

      default:
        return <div>Неизвестный тип модального контента</div>;
    }
  };

  return (
    <div className={s.modalOverlay} onClick={() => dispatch(closeModal())}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={s.closeButton}
          onClick={() => dispatch(closeModal())}
        >
          <img src="/close.webp" alt="close" />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
