import { AiOutlineSearch } from 'react-icons/ai';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IFilter } from '../interfaces/FilterOption.interfaces';
import FilterOption from './FilterOption';

function Filter() {
  const [filters, setFilters] = useState<IFilter>();

  return (
    <Card background="customBg" variant="outline">
      <CardHeader>
        <Flex justifyContent="space-between">
          <Heading size="md">Filters</Heading>
          <Button variant="link" fontSize="sm" color="primary.700">
            CLEAR
          </Button>
        </Flex>
        <InputGroup mt={4}>
          <Input placeholder="Search Filters" />
          <InputLeftElement children={<AiOutlineSearch />} />
        </InputGroup>
      </CardHeader>
      <CardBody pt={0}>
        <VStack gap={3}>
          <FilterOption
            title="Categories"
            options={['Recharge', 'Entertainment']}
          />
          <FilterOption title="Brands" options={['Paytm', 'Myntra']} />
        </VStack>
      </CardBody>
    </Card>
  );
}

export default Filter;
