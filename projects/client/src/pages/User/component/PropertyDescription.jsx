import * as React from "react";
import { VStack, Text, useColorModeValue } from "@chakra-ui/react";

const PropertyDescription = ({ property }) => {
  return (
    <VStack
      p={{ base: 5, md: 10 }}
      minH={{ base: "unset", md: "300px" }}
      alignItems="flex-start"
    >
      <Text
        textAlign="left"
        fontWeight="bold"
        textDecoration="underline"
        fontSize="xl"
        color={useColorModeValue("gray.600", "gray.800")}
      >
        About the Property
      </Text>
      <Text
        fontSize="1.2rem"
        textAlign="left"
        lineHeight="1.375"
        fontWeight="400"
        color={useColorModeValue("gray.600", "gray.800")}
      >
        {property.description}
      </Text>
      <Text
        mt={2}
        textAlign="left"
        fontWeight="bold"
        textDecoration="underline"
        fontSize="xl"
        color={useColorModeValue("gray.600", "gray.800")}
      >
        Property Address
      </Text>
      <Text
        fontSize="1.2rem"
        textAlign="left"
        lineHeight="1.375"
        fontWeight="400"
        color={useColorModeValue("gray.600", "gray.800")}
      >
        {property.address}
      </Text>
    </VStack>
  );
};

export default PropertyDescription;
