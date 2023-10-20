import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  List,
  ListItem,
  ModalFooter,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';

function ButtonLocation({ selectedLocation, setSelectedLocation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);

  const URL_API = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${URL_API}/properties/category`)
      .then((response) => {
        const categoryList = response.data.result.map((category) => category.name);
        setLocations(categoryList);
      })
      .catch((error) => {
        console.error('Error fetching property categories:', error);
      });
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleButtonClick = () => {
    setIsOpen(true);
    setSearchQuery('');
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Button
        display="flex"
        style={{ textAlign: "start" }}
        justifyContent="flex-start"
        leftIcon={<SearchIcon />}
        onClick={handleButtonClick}
      >
        {selectedLocation ? selectedLocation : 'Mau nginep dimana?'}
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Search location"
              value={searchQuery}
              onChange={handleInputChange}
            />
            {searchQuery && (
              <List mt={4}>
                {filteredLocations.map((location) => (
                  <ListItem
                    key={location}
                    cursor="pointer"
                    onClick={() => handleLocationSelect(location)}
                    py={2}
                    px={3}
                    _hover={{ background: 'gray.100' }}
                  >
                    {location}
                  </ListItem>
                ))}
              </List>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ButtonLocation;
