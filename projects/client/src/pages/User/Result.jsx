import React, { useState, useEffect } from 'react';
import { Flex, Spinner, Center, Box, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useRedirectOnInvalidDates } from './Redirect';
import SearchChange from './component/SearchChange';
import CardProperty from './component/CardProperty';
import SortMenu from './component/SortMenu';
import Pagination from './component/Pagination';

function Result() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkin = new Date(searchParams.get('checkin'));
  const checkout = new Date(searchParams.get('checkout'))
  useRedirectOnInvalidDates(checkin, checkout)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOptions, setSortOptions] = useState({ sortBy: 'price', sort: 'asc' });
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location'));
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: checkin,
      endDate: checkout,
      key: 'selection'
    }
  ]);
  const [searchText, setSearchText] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handleSearchChange = (searchText) => {
    setSearchText(searchText);
    filterProperties(searchText);
  };

  const handleSortChange = (sortOption) => {
    const sortOptionsMap = {
      'Lowest price': { sortBy: 'price', sort: 'asc' },
      'Highest price': { sortBy: 'price', sort: 'desc' },
      'Name A-Z': { sortBy: 'name', sort: 'asc' },
      'Name Z-A': { sortBy: 'name', sort: 'desc' },
    };
    const newSortOptions = sortOptionsMap[sortOption] || { sortBy: 'price', sort: 'asc' };
    setSortOptions(newSortOptions);
    fetchProperties(newSortOptions);
  };

  const filterProperties = (text) => {
    if (text === '') {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter((property) =>
        property.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProperties(filtered);
    }
  };

  const handleSearchSubmit = (searchText, selectedDates) => {
    setSearchText(searchText);
    setSelectedDates(selectedDates);
    fetchProperties(sortOptions);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const URL_API = process.env.REACT_APP_API_BASE_URL;

  const fetchProperties = async (sortOptions) => {
    try {
      const categoryResponse = await axios.get(`${URL_API}/properties/category`);
      const categories = categoryResponse.data.result;
      const propertyCategory = categories.find((category) => category.name === selectedLocation);

      const availablePropertiesResponse = await axios.get(`${URL_API}/properties/available`, {
        params: {
          start_date: checkin,
          end_date: checkout,
          property_category_id: propertyCategory.property_category_id,
          sortBy: sortOptions.sortBy,
          sort: sortOptions.sort,
          keyword: searchText,
          page: page,
          per_page: limit
        },
      });

      setTotalPages(availablePropertiesResponse.data.totalPages);
      setProperties(availablePropertiesResponse.data.properties);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties(sortOptions);
  }, [window.location.search, page]);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  return (
    <Flex direction="column" align="center" p={4}>
      <Flex borderRadius="lg" boxShadow="md" borderWidth="1px">
        <SearchChange
          onSubmit={handleSearchSubmit}
          selectedLocation={selectedLocation}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          onSearchInputChange={handleSearchChange}
          updateSelectedLocation={setSelectedLocation}
          updateSelectedDates={setSelectedDates}
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="flex-end" width="100%" mb={4} mt={{ base: 2, md: 5 }}>
        <div style={{ flex: 1 }}></div>
        <SortMenu handleSortChange={handleSortChange} />
      </Flex>
      <Box minWidth="97vw" minHeight="63vh" borderRadius="lg" boxShadow="md" borderWidth="1px" p={2}>
        <Flex mt={4} w="100%" flexWrap="wrap">
          {loading ? (
            <Center mt={8}>
              <Spinner size="xl" />
            </Center>
          ) : (
            filteredProperties.map((property) => (
              <CardProperty selectedDates={selectedDates} key={property.property_id} property={property} />
            ))
          )}
        </Flex>
      </Box>
      <Stack mt="5">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
      </Stack>
    </Flex>
  );
}

export default Result;
