import React, { useState } from "react";
import { Stack, Flex, Button, Text, VStack, useBreakpointValue, Heading } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import PropertyImages from './component/PropertyImages';
import PropertyDescription from './component/PropertyDescription';
import RoomList from './component/RoomList';


export const PropertyDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkin = new Date(searchParams.get('checkin'));
  const checkout = new Date(searchParams.get('checkout'));
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: checkin,
      endDate: checkout,
      key: 'selection'
    }
  ]);
  const encodedData = searchParams.get("data");

  let property = null;

  if (location.state && location.state.property) {
    property = location.state.property;
  } else if (encodedData) {
    try {
      const decryptedData = CryptoJS.AES.decrypt(
        decodeURIComponent(encodedData),
        "your-secret-key"
      );
      const propertyData = JSON.parse(
        decryptedData.toString(CryptoJS.enc.Utf8)
      );
      property = propertyData;
    } catch (error) {
      console.error("Error decrypting property data:", error);
    }
  }

  const pathName = location.pathname;
  const formattedPrice = `IDR ${property.price.toLocaleString('id-ID')}`;
  const propertyImages = property.image;
  const propertyRooms = property.rooms;
  console.log(propertyRooms)

  

  return (
    <>
      <Flex
        mt={4}
        w="full"
        h="100vh"
        backgroundSize="cover"
        backgroundPosition="center center"
      >
        <Stack
          w="full"
          justify="flex-start"
          px={useBreakpointValue({ base: 4, md: 8 })}
        >
          <Stack direction={{ base: "column", sm: "column", md: "row" }} maxH="70vh">
            <PropertyImages images={propertyImages} />
          </Stack>
          <Stack direction={{ base: "column", sm: "column", md: "row" }}>
            <Flex justifyContent="flex-start" px={useBreakpointValue({ base: 4, md: 8 })} flex={1} align={{ base: "flex-start", sm: "flex-start", md: "flex-end" }}>
              <Heading
                color="black"
                fontWeight={700}
                fontSize={useBreakpointValue({ base: '4xl', md: '6xl' })}
                textAlign="left"
                justifyItems="self-start"
              >
                {property.name}
              </Heading>
            </Flex>
            <Flex p={2} flex={1} justify="flex-end" align="flex-end">
              <VStack align="flex-end" justifyContent="flex-end" spacing={0}>
                <Text
                  color="black"
                  fontWeight={400}
                  fontSize={useBreakpointValue({ base: 'md', md: 'lg' })}
                  textAlign="right"
                >
                  Start from
                </Text>
                <Text
                  color="red"
                  fontWeight={700}
                  fontSize={useBreakpointValue({ base: 'xl', md: '3xl' })}
                  textAlign="left"
                >
                  {formattedPrice}
                </Text>
                <Text
                  color="black"
                  fontWeight={400}
                  fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
                  textAlign="left"
                >
                  /night
                </Text>
                <Button
                  mt={2}
                  bg="blue.400"
                  rounded="full"
                  color="white"
                  _hover={{ bg: 'blue.500' }}
                  onClick={() => {
                    const targetSection = document.getElementById("roomSection");
                    if (targetSection) {
                      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Show Rooms
                </Button>
              </VStack>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
      <PropertyDescription property={property} />
      <RoomList property={property} pathName={pathName} selectedDates={selectedDates} property_id={property.property_id} price={property.price} rooms={propertyRooms} id="roomSection" />
    </>
  );
}
