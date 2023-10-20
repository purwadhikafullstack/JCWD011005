import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import RoomDateChange from './RoomDateChange';
import RoomCard from './RoomCard';

function RoomList({ rooms, id, pathName, property_id, selectedDates, property }) {
  console.log(rooms)
  return (
    <Flex id={id} mt={2} direction="column" align="center" p={4}>
      <Flex borderRadius="lg" boxShadow="md" borderWidth="1px">
        <RoomDateChange property={property} pathName={pathName} selectedDates={selectedDates} property_id={property_id} />
      </Flex>

      <Box mt={{ base: 4, md: 8 }} minWidth="97vw" minHeight="63vh" borderRadius="lg" boxShadow="md" borderWidth="1px" p={2}>
        <Flex justify={"center"} align={"center"} mt={{ base: 1, md: 2 }} w="100%" flexWrap="wrap">
          <RoomCard rooms={rooms} />
        </Flex>
      </Box>
    </Flex>
  );
}

export default RoomList;
