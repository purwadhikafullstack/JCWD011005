import React, { useState, useEffect } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import CalendarWithPrice from './CalendarWithPrice';
import { CalendarIcon } from '@chakra-ui/icons';

const ButtonDateChange = ({ selectedDates, setSelectedDates, property_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonText, setButtonText] = useState('');
  console.log(selectedDates)

  useEffect(() => {
    if (selectedDates) {
      setButtonText(
        `${selectedDates[0].startDate.toDateString()} - ${selectedDates[0].endDate.toDateString()}`
      );
    } else {
      setButtonText('Pick a date');
    }
  }, [selectedDates]);

  const handleModalClose = () => {
    if (selectedDates) {
      setButtonText(
        `${selectedDates[0].startDate.toDateString()} - ${selectedDates[0].endDate.toDateString()}`
      );
    } else {
      setButtonText('Pick a date');
    }
  };

  return (
    <>
      <Button
        display="flex"
        justifyContent="flex-start"
        colorScheme="gray"
        leftIcon={<CalendarIcon />}
        onClick={onOpen}
        style={{ textAlign: "start" }}
      >
        {buttonText}
      </Button>

      <CalendarWithPrice
        isOpen={isOpen}
        onClose={onClose}
        onDatesSelected={setSelectedDates}
        selectedDates={selectedDates}
        onModalClose={handleModalClose}
        property_id={property_id}
      />
    </>
  );
};

export default ButtonDateChange;
