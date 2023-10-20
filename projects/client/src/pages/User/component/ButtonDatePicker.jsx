import React, { useState, useEffect } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import CalendarModal from './CalendarModal';
import { CalendarIcon } from '@chakra-ui/icons';

const ButtonDatePicker = ({ selectedDates, setSelectedDates, property_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (selectedDates) {
      setButtonText(
        `${selectedDates[0].startDate.toDateString()} - ${selectedDates[0].endDate.toDateString()}`
      );
    } else {
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      setButtonText(`${today.toDateString()} - ${tomorrow.toDateString()}`);
    }
  }, [selectedDates]);

  const handleDatesSelected = (dates) => {
    setButtonText(
      `${dates[0].startDate.toDateString()} - ${dates[0].endDate.toDateString()}`
    );
    setSelectedDates(dates);
  };

  const handleModalClose = () => {
    if (selectedDates) {
      setButtonText(
        `${selectedDates[0].startDate.toDateString()} - ${selectedDates[0].endDate.toDateString()}`
      );
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

      <CalendarModal
        isOpen={isOpen}
        onClose={onClose}
        onDatesSelected={handleDatesSelected}
        selectedDates={selectedDates}
        onModalClose={handleModalClose}
        property_id={property_id}
      />
    </>
  );
};

export default ButtonDatePicker
