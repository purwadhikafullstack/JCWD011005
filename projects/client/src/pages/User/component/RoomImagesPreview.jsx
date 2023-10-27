import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const RoomImagesPreview = ({ isOpen, onClose, images }) => {
    const URL_API = process.env.REACT_APP_API_BASE_URL;
    
    const galleryImages = images.map((image, index) => ({
    original: `${URL_API}/${image.path}`,
    thumbnail: `${URL_API}/${image.path}`,
    }));

  const customGalleryStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>All Pictures</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Gallery 
            showPlayButton={false} 
            items={galleryImages}
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

export default RoomImagesPreview;
