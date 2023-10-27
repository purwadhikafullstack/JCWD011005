import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Flex,
  Spacer,
  IconButton,
  HStack,
  Input,
  Button,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import ButtonDateChange from './ButtonDateChange';
import { EditIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import CryptoJS from 'crypto-js';

const RoomChangeSearch = ({ pathName, selectedDates, onSearchInputChange, property_id, property }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localSelectedDates, setLocalSelectedDates] = useState(selectedDates);
  const [searchText, setSearchText] = useState('');

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return format(date, 'yyyy-MM-dd');
    } else {
      return '';
    }
  };

  const handleSearchInput = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    onSearchInputChange(searchText);
  };

  const propertyData = JSON.stringify(property);
  const encryptedData = CryptoJS.AES.encrypt(propertyData, 'your-secret-key').toString();
  const encodedData = encodeURIComponent(encryptedData);

  const handleSearchSubmit = () => {
    const formattedCheckin = formatDate(localSelectedDates[0].startDate);
    const formattedCheckout = formatDate(localSelectedDates[0].endDate);
    const newURL = `${pathName}?checkin=${formattedCheckin}&checkout=${formattedCheckout}&data=${encodedData}&selectedDates=${JSON.stringify(localSelectedDates)}`;
    window.location.replace(newURL);
  };
  
  useEffect(() => {
    setLocalSelectedDates(selectedDates);
  }, [selectedDates]);

  return (
    <Flex p={{ base: 2, md: 5 }} align="center">
      <HStack>
        <Box p="2">
          <Flex direction="row" flex="1">
            <Input
              size={isMobile ? "sm" : "md"}
              placeholder="Search..."
              borderColor={useColorModeValue('gray.300', 'white')}
              borderRadius="5px"
              w="100%"
              value={searchText}
              onChange={handleSearchInput}
            />
          </Flex>
        </Box>
      </HStack>
      <Spacer />
      <Box>
        <HStack>
          {isMobile ? (
            <Box d="block" ml="4">
              <IconButton
                aria-label="Options"
                icon={<EditIcon />}
                transition="all 0.2s"
                size="sm"
                color="white"
                variant="outline"
                bg="#1E91B6"
                _hover={{ bg: "auto" }}
                _focus={{ boxShadow: "outline" }}
                onClick={onOpen}
              />
              <Modal isOpen={isOpen} onClose={onClose} size="sm">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Change Search</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack spacing={4}>
                      <ButtonDateChange
                        selectedDates={localSelectedDates}
                        setSelectedDates={setLocalSelectedDates}
                        property_id={property_id}
                      />
                    </Stack>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      bg="#1E91B6"
                      color={"white"}
                      _hover={{
                        bg: "#9BBCC7",
                        boxShadow: "xl"
                      }}
                      onClick={() => {
                        onClose()
                        handleSearchSubmit()
                      }}
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          ) : (
            <HStack d={["none", "none", "block"]}>
              <ButtonDateChange
                selectedDates={localSelectedDates}
                setSelectedDates={setLocalSelectedDates}
                property_id={property_id}
              />
              <Button
                ml={2}
                bg="#1E91B6"
                color={"white"}
                _hover={{
                  bg: "#9BBCC7",
                  boxShadow: "xl"
                }}
                onClick={handleSearchSubmit}
              >
                Submit
              </Button>
            </HStack>
          )}
        </HStack>
      </Box>
    </Flex>
  );
};

export default RoomChangeSearch;
