import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, HStack, Text } from '@chakra-ui/react';
import { CgSortAz } from "react-icons/cg";

function SortMenu({ handleSortChange }) {
  const handleSortOptionClick = (sortOption) => {
    let sortBy = sortOption === 'Lowest price' || sortOption === 'Highest price' ? 'price' : 'name';
    let sort = sortOption === 'Lowest price' || sortOption === 'Name A-Z' ? 'asc' : 'desc';

    handleSortChange(sortOption);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('sortBy', sortBy);
    newSearchParams.set('sort', sort);

    const newURL = `${window.location.pathname}?${newSearchParams.toString()}`;

    window.history.replaceState(null, '', newURL);
  };

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Sort options"
        size="sm"
        color="white"
        variant="outline"
        bg="#1E91B6"
        _hover={{ bg: "auto" }}
        _focus={{ boxShadow: "outline" }}
        icon={
          <HStack spacing={2} align="center">
            <CgSortAz fontSize="20px" />
            <Text fontSize="sm" pr="2">Sort by</Text>
          </HStack>
        }
      />
      <MenuList>
        <MenuItem onClick={() => handleSortOptionClick('Lowest price')}>Lowest price</MenuItem>
        <MenuItem onClick={() => handleSortOptionClick('Highest price')}>Highest price</MenuItem>
        <MenuItem onClick={() => handleSortOptionClick('Name A-Z')}>Name A-Z</MenuItem>
        <MenuItem onClick={() => handleSortOptionClick('Name Z-A')}>Name Z-A</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default SortMenu;
