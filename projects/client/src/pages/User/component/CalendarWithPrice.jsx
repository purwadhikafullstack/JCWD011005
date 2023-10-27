import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import "./css/date.css";
import { format, endOfYear } from 'date-fns';

const CalendarWithPrice = ({ isOpen, onClose, onDatesSelected, selectedDates, property_id }) => {
  const [modalSelectedDates, setModalSelectedDates] = useState(selectedDates || [
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    }
  ]);

  const [displayedPrices, setDisplayedPrices] = useState({});
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

  const fetchPrices = async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/properties/price/${property_id}?start_date=${startDate}&end_date=${endDate}`
      );
      const pricesData = response.data.price[0].prices;
      console.log(pricesData)
      const displayedPrices = {};

      pricesData.forEach((priceInfo) => {
        const date = format(new Date(priceInfo.date), 'yyyy-MM-dd');
        const displayedPrice = priceInfo.displayed;
        displayedPrices[date] = displayedPrice;
      });
      setDisplayedPrices(displayedPrices);
      console.log(displayedPrices["2023-10-25"])
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const formattedPrice = (price) => {
    return `${price.toLocaleString('id-ID')}`;
  };

  const selectedStartDate = modalSelectedDates[0]?.startDate?.toDateString() || '';
  const selectedEndDate = modalSelectedDates[0]?.endDate?.toDateString() || '';

  useEffect(() => {
    if (isOpen) {
      const currentDate = modalSelectedDates.startDate || new Date();
      const firstDayOfMonth = currentDate;
      const lastDayOfMonth = endOfYear(currentDate);

      const formattedStartDate = format(firstDayOfMonth, 'yyyy-MM-dd');
      const formattedEndDate = format(lastDayOfMonth, 'yyyy-MM-dd');

      console.log(formattedStartDate)
      console.log(formattedEndDate)

      fetchPrices(formattedStartDate, formattedEndDate);
    }
  }, [isOpen, modalSelectedDates]);

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
                    dayContentRenderer={(date) => (
                      <div>
                        <div className="custom-date-wrapper">
                          <div className="rdrDayNumber">
                            <span>{date.getDate()}</span>
                          </div>
                          <div className="custom-price">
                            <Text color={"blue.600"} mt={7}>
                              {isNaN(Number(displayedPrices[format(date, 'yyyy-MM-dd')])) ? (
                                <span></span>
                              ) : (
                                formattedPrice(Number(displayedPrices[format(date, 'yyyy-MM-dd')]))
                              )}
                            </Text>
                          </div>
                        </div>
                      </div>
                    )}
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
                    {selectedStartDate === selectedEndDate ? 'Pick a date' : selectedEndDate}
                  </Text>
                </Box>
              </Flex>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            bg="#1E91B6"
            color="white"
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

export default CalendarWithPrice;
