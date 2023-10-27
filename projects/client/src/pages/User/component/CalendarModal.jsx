import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
  Box,
  Flex
} from '@chakra-ui/react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CalendarModal = ({ isOpen, onClose, onDatesSelected, selectedDates, onModalClose }) => {
  const [modalSelectedDates, setModalSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    if (selectedDates) {
      setModalSelectedDates(selectedDates);
    }
  }, [selectedDates]);

  const toast = useToast();

  const handleSelect = (ranges) => {
    const selectedStartDate = ranges.selection.startDate.toDateString();
    const selectedEndDate = ranges.selection.endDate.toDateString();

    if (
      selectedStartDate === selectedEndDate &&
      selectedStartDate === modalSelectedDates[0].startDate.toDateString() &&
      selectedEndDate === modalSelectedDates[0].endDate.toDateString()
    ) {
      toast({
        description: 'The minimum stay duration is one night.',
        status: 'error',
        duration: 600,
      });
      return;
    }

    setModalSelectedDates([ranges.selection]);
  };

  const handleSubmit = () => {
    const selectedStartDate = modalSelectedDates[0].startDate.toDateString();
    const selectedEndDate = modalSelectedDates[0].endDate.toDateString();

    if (selectedStartDate === selectedEndDate) {
      return;
    }

    onClose();
    onDatesSelected(modalSelectedDates);
  };

  const calculateNightCount = () => {
    const startDate = modalSelectedDates[0].startDate;
    const endDate = modalSelectedDates[0].endDate;
    const timeDiff = endDate.getTime() - startDate.getTime();
    const nightCount = timeDiff / (1000 * 3600 * 24);
    return nightCount;
  };

  useEffect(() => {
    if (!isOpen) {
      onModalClose();
    }
  }, [isOpen, onModalClose]);

  const selectedStartDate = modalSelectedDates[0].startDate.toDateString();
  const selectedEndDate = modalSelectedDates[0].endDate.toDateString();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Dates</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isOpen && (
            <>
              <Flex justifyContent="center">
                <Box>
                  <DateRange
                    ranges={modalSelectedDates}
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    showDateDisplay={false}
                    minDate={new Date()}
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between">
                <Box>
                  <Text>Check in</Text>
                  <Text>{selectedStartDate}</Text>
                </Box>
                <Box>
                  <Text>Check Out</Text>
                  <Text>
                    {selectedStartDate === selectedEndDate
                      ? 'Pick a date'
                      : selectedEndDate}
                  </Text>
                </Box>
              </Flex>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            bg="#1E91B6"
            color={"white"}
            _hover={{
              bg: "#9BBCC7",
              boxShadow: "xl"
            }}
            onClick={handleSubmit}
            isDisabled={modalSelectedDates[0].startDate.toDateString() === modalSelectedDates[0].endDate.toDateString()}
          >
            Submit {modalSelectedDates[0].startDate.toDateString() === modalSelectedDates[0].endDate.toDateString() ? '' : `(${calculateNightCount()} night${calculateNightCount() === 1 ? '' : 's'})`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CalendarModal;
