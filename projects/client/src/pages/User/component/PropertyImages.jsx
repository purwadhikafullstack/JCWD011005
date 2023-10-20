import React, { useState } from "react";
import { Flex, Image, Stack, Box, Text } from "@chakra-ui/react";
import PropertyImagesPreview from "./PropertyImagesPreview";
import logo from "../../../assets/images/pro-rent.jpg";

export default function PropertyImages({ images }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const URL_API = process.env.REACT_APP_API_BASE_URL;

  const galleryImages = images.map((image, index) => ({
    original: `${URL_API}/${image.path}`,
    thumbnail: `${URL_API}/${image.path}`,
  }));

  return (
    <Stack direction={{ base: "column", sm: "column", md: "row" }} minwidth="100vw" maxH="70vh">
      <Flex flex={1}>
        {images.length > 0 && (
          <Image
            minW={{ base: "auto", sm: "auto", md: "50vw" }}
            alt="Main Image"
            objectFit="cover"
            src={`${URL_API}/${images[0].path}`}
            w="auto"
          />
        )}
      </Flex>
      <Flex flex={1} direction="column">
        <Stack
          display="grid"
          gridTemplateColumns={{
            base: "repeat(4, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gridTemplateRows={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={{ base: 1, md: 2 }}
          position="relative"
        >
          {images.slice(1, 5).map((image, index) => (
            <Box
              key={index}
              position="relative"
              style={{
                cursor: index === 3 ? "pointer" : "auto",
              }}
              onClick={index === 3 ? openModal : undefined}
            >
              <Image
                alt={`Image ${index + 1}`}
                objectFit="cover"
                src={image && image.path ? `${URL_API}/${image.path}` : logo}
                minH={{ base: "8vh", sm: "auto", md: "34vh" }}
                maxH={{ base: "auto", sm: "auto", md: "34vh" }}
                maxW={{ base: "auto", sm: "auto", md: "22vw" }}
                minW={{ base: "auto", sm: "auto", md: "22vw" }}
                style={{ filter: index === 4 ? "brightness(0.5)" : "none" }}
              />
              {index === 4 && (
                <Text
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  textAlign="center"
                  color="white"
                  fontSize={{ base: "2xs", md: "2xl" }}
                  p={2}
                  borderRadius="10px"
                  cursor="pointer"
                >
                  Show More Pictures
                </Text>
              )}
            </Box>
          ))}
        </Stack>
      </Flex>
      <PropertyImagesPreview isOpen={isModalOpen} onClose={closeModal} images={galleryImages} />
    </Stack>
  );
}
