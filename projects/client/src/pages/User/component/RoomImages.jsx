import React, { useState } from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import RoomImagesPreview from "./RoomImagesPreview";
import logo from "../../../assets/images/pro-rent.jpg";

const RoomImages = ({ images, currentRoomIndex }) => {
  const arrowStyles = {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    width: "auto",
    marginTop: "-22px",
    padding: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      background: "black",
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = images[currentRoomIndex].length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    marginLeft: `-${currentSlide * 100}%`,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const URL_API = process.env.REACT_APP_API_BASE_URL;

  return (
    <Flex width="full" overflow="hidden" position="relative">
      <Flex
        maxW={{ base: "100%", md: "38rem" }}
        maxH={{ base: "auto", md: "14rem" }}
        width="full"
        {...carouselStyle}
      >
        {images[currentRoomIndex].map((slide, sid) => (
          <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
            <Text color="white" fontSize="xs" padding="8px 12px" position="absolute" top="0">
              {sid + 1} / {slidesCount}
            </Text>
            <Image
              cursor="pointer"
              onClick={openModal}
              rounded={"md"}
              src={`${URL_API}/${slide.path}` || logo}
              alt="carousel image"
              boxSize="full"
              backgroundSize="cover"
            />
          </Box>
        ))}
        <RoomImagesPreview isOpen={isModalOpen} onClose={closeModal} images={images[currentRoomIndex]} />
      </Flex>
      <Text {...arrowStyles} left="0" onClick={prevSlide}>
        &#10094;
      </Text>
      <Text {...arrowStyles} right="0" onClick={nextSlide}>
        &#10095;
      </Text>
    </Flex>
  );
};

export default RoomImages;
