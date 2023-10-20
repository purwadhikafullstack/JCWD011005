import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const PropertyImagesPreview = ({ isOpen, onClose, images }) => {

  const customGalleryStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>All Pictures</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Gallery
            showPlayButton={false}
            items={images}
            showThumbnails={true}
            style={customGalleryStyles}
          />
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PropertyImagesPreview;
