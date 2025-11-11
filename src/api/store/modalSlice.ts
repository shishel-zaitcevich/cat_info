import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatDetailsProps } from '../../components/pages/galleryPage/CatDetails/CatDetails';

type ModalProps = CatDetailsProps | Record<string, never>;

interface ModalState {
  isOpen: boolean;
  modalData: { type: string; props?: ModalProps } | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalData: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: string; props?: ModalProps }>
    ) => {
      state.isOpen = true;
      state.modalData = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalData = null;
    },
    toggleModal: (
      state,
      action: PayloadAction<{ type: string; props?: ModalProps }>
    ) => {
      state.isOpen = !state.isOpen;
      state.modalData = state.isOpen ? action.payload : null;
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
