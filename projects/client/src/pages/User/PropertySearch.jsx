import React, { useState } from "react";
import { Box, Stack, Container, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import ButtonLocation from "./component/ButtonLocation";
import ButtonDatePicker from "./component/ButtonDatePicker";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

export const PropertySearch = () => {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const toast = useToast();

  const formatDate = (date) => format(date, 'yyyy-MM-dd');

  const handleSubmit = () => {
    if (!selectedLocation) {
      toast({
        title: "Select a location first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      let startDate, endDate;

      if (selectedDates) {
        startDate = formatDate(selectedDates[0].startDate);
        endDate = formatDate(selectedDates[0].endDate);
      } else {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        startDate = formatDate(today);
        endDate = formatDate(tomorrow);
      }
      navigate(`/result?checkin=${startDate}&checkout=${endDate}&location=${selectedLocation}`, {
        state: { selectedDates },
      });
    }
  }

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <ButtonLocation
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
              <ButtonDatePicker
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
              />
            </Stack>
            <Button
              fontFamily="heading"
              mt={8}
              w="full"
              bg="#1E91B6"
              color="white"
              _hover={{
                bg: "#9BBCC7",
                boxShadow: "xl",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

