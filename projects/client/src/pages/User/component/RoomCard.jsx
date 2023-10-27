import React from "react";
import {
  Heading,
  Stack,
  Flex,
  Text,
  Button,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import RoomImages from "./RoomImages";

const RoomCard = ({ rooms }) => {
  console.log(rooms)
  const roomImages = rooms.map((room) => room.image);
  const textColor = useColorModeValue("gray.600", "gray.800");

  const formattedPrice = (prices) => {
    if (Array.isArray(prices) && prices.length === 1) {
      return `${prices[0].toLocaleString('id-ID')}`;
    } else if (Array.isArray(prices) && prices.length > 1) {
      return `${Math.max(...prices).toLocaleString('id-ID')}`;
    } else {
      return "N/A"; // Handle the case where prices is not an array or undefined
    }
  };
  const roomsWithPrice = rooms.filter((room) => {
    return (
      Array.isArray(room.prices) && room.prices.length > 0 && formattedPrice(room.prices) !== "N/A"
    );
  });

  return (
    <>
      {roomsWithPrice.map((room, index) => (
        <Stack
          key={index}
          p={3}
          py={3}
          justifyContent={{
            base: "flex-start",
            md: "space-around"
          }}
          direction={{
            base: "column",
            md: "row"
          }}
          alignItems={{ md: "center" }}
        >
          <Stack
            spacing={{ base: 0, md: 4 }}
            direction={{ base: "column", md: "row" }}
            border="1px solid"
            borderColor="gray.400"
            p={2}
            rounded="md"
            w={{ base: "auto", md: "80vw" }}
            overflow="hidden"
            pos="relative"
          >
            <Flex ml="0 !important">
              <RoomImages
                rounded="md"
                images={roomImages}
                currentRoomIndex={index}
              />
            </Flex>
            <Stack mt={{ base: 1, md: 2 }} direction="column" spacing={2} w="100%">
              <Stack justify={"flex-start"} align={"flex-start"}>
                <Heading fontWeight="bold">
                  {room.name}
                </Heading>
                <Flex align="flex-start" justify={"flex-start"} mt={{ base: 2, md: 4 }}>
                  <Icon as={BsFillPersonFill} boxSize={6} />
                  <Text ml={2} as="b" size={{ base: "sm", md: "md" }} textAlign="left">
                    {room.max_guest}
                  </Text>
                  <Text textAlign="left" ml={1} as={"i"} color={textColor}>
                    (Maximum guest of this room is {room.max_guest} people)
                  </Text>
                </Flex>
                <Text textAlign="left" fontSize="lg">
                  {room.description}
                </Text>
                <Flex>
                <Text fontWeight="bold" fontSize="xl">
  {Array.isArray(room.prices) && room.prices.length > 0
    ? formattedPrice(room.prices)
    : "N/A"}
</Text>
                  <Text fontSize={"sm"}> /night</Text>
                </Flex>
              </Stack>
              <Stack direction="row" justify="flex-end" alignItems="flex-end">
                <Stack direction="row" spacing={1}>
                  <Flex
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    pos={{ base: "relative", md: "absolute" }}
                    bottom={{ base: 0, md: 2 }}
                    right={{ base: 0, md: 2 }}
                  >
                    <Flex>
                      <Button size={{ base: "sm", md: "md" }} bgColor={"#1E91B6"} color={"white"}>
                        Book This Room
                      </Button>
                    </Flex>
                  </Flex>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
};

export default RoomCard;
