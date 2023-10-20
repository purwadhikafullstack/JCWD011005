import React from "react";
import {
  chakra,
  Stack,
  Flex,
  Text,
  Image,
  Badge,
} from "@chakra-ui/react";
import { useLocation, Link } from 'react-router-dom';

const PropertyCard = ({ property, selectedDates }) => {
  const location = useLocation();
  const formattedPrice = `IDR ${property.price.toLocaleString('id-ID')}`;
  const formattedName = property.name.toLowerCase().replace(/\s+/g, "-");

  const searchParams = new URLSearchParams(location.search);
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');

  const URL_API = process.env.REACT_APP_API_BASE_URL;

  return (
    <Link to={`/property-detail/${formattedName}?checkin=${checkin}&checkout=${checkout}`}
      state={{ property, selectedDates }}
    >
      <Stack
        p={3}
        py={3}
        justifyContent={{
          base: "flex-start",
          md: "space-around",
        }}
        direction={{
          base: "column",
          md: "row",
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
          w={{ base: "auto", md: "2xl" }}
          overflow="hidden"
          pos="relative"
        >
          <Flex ml="0 !important">
            <Image
              rounded="md"
              w={{ base: "100%", md: "24rem" }}
              h={{ base: "auto", md: "10rem" }}
              objectFit="cover"
              src={`${URL_API}/${property.image[0].path}`}
              alt={property.name}
            />
          </Flex>
          <Stack
            direction="column"
            spacing={2}
            w="100%"
          >
            <Stack align={"flex-start"}>
              <chakra.h3
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
              >
                {property.name}
              </chakra.h3>
              <Badge
                fontSize={{ base: "md", md: "xs" }}
                bg="#1E91B6"
                color={"white"}
              >
                {property.location}
              </Badge>
              <Text fontSize="lg" fontWeight="500">
                {property.address}
              </Text>
            </Stack>
            <Stack
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Stack direction="row" spacing={1}>
                <Flex
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  pos={{ base: "relative", md: "absolute" }}
                  bottom={{ base: 0, md: 2 }}
                  right={{ base: 0, md: 2 }}
                >
                  <Flex>
                    <chakra.h2 fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                      {formattedPrice}
                    </chakra.h2>
                    <chakra.span fontSize={{ base: "sm", md: "md" }}> /night</chakra.span>
                  </Flex>
                </Flex>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
};

export default PropertyCard
