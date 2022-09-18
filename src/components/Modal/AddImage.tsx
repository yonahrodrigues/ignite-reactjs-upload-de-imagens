import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { FormAddImage } from '../Form/FormAddImage';

interface ModalAddImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddImage({
  isOpen,
  onClose,
}: ModalAddImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent bgColor="pGray.900" mx="4">
        <ModalHeader fontSize="2xl" fontWeight="normal" color="gray.400">
          Nova imagem
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody px={[5, 60]}>
          <FormAddImage closeModal={handleCloseModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
