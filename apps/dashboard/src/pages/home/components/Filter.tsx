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
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '@dashboard/store/api/categories.query';
import { useGetBrandsQuery } from '@dashboard/store/api/brand.query';

function Filter({ setQuery }: any) {
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();

  const [catFilter, setCatFilter] = useState<string[]>([]);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);

  const [search, setSearch] = useState('');

  const clearFilters = () => {
    setCatFilter([]);
    setBrandFilter([]);
  };

  const setCf = (key: string) => {
    setCatFilter((p) =>
      p.includes(key) ? p.filter((c) => c !== key) : [...p, key]
    );
  };
  const setBf = (key: string) => {
    setBrandFilter((p) =>
      p.includes(key) ? p.filter((c) => c !== key) : [...p, key]
    );
  };

  useEffect(() => {
    if (!catFilter.length && !brandFilter.length) {
      setQuery('');
    } else {
      setQuery(
        `?category=${catFilter.join('&category=')}&brand=${brandFilter.join(
          '&brand='
        )}`
      );
    }
  }, [catFilter, brandFilter]);

  return (
    <Card background="customBg" variant="outline">
      <CardHeader>
        <Flex justifyContent="space-between">
          <Heading size="md">Filters</Heading>

          <Button
            variant="link"
            fontSize="sm"
            color="primary.700"
            onClick={clearFilters}
          >
            CLEAR
          </Button>
        </Flex>
        <InputGroup mt={4}>
          <Input
            placeholder="Search Filters"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputLeftElement children={<AiOutlineSearch />} />
        </InputGroup>
      </CardHeader>
      <CardBody pt={0}>
        <VStack gap={3}>
          {/* <FilterOption
            title="Categories"
            options={categories ?? []}
            setFilter={toggleBrandFilter}
            filter={catFilters}
          />
          <FilterOption
            title="Brands"
            options={brands ?? []}
            setFilter={toggleCatFilter}
            filter={brandFilters}
          /> */}

          <Flex flexDir="column" gap={2} alignSelf="flex-start">
            <Text fontSize="md" fontWeight={500}>
              Categories
            </Text>
            <Flex flexDir="inherit" gap={2}>
              {categories
                ?.filter((c) => (search ? c.label.includes(search) : true))
                ?.map((opt, i) => {
                  return (
                    <Checkbox
                      key={`filter-${opt.value}`}
                      fontSize="sm"
                      color="primary.1000"
                      fontWeight={400}
                      isChecked={catFilter.includes(opt.value)}
                      onChange={() => setCf(opt.value)}
                    >
                      {opt.label}
                    </Checkbox>
                  );
                })}
            </Flex>
          </Flex>

          <Flex flexDir="column" gap={2} alignSelf="flex-start">
            <Text fontSize="md" fontWeight={500}>
              Brands
            </Text>
            <Flex flexDir="inherit" gap={2}>
              {brands
                ?.filter((c) => (search ? c.label.includes(search) : true))
                ?.map((opt, i) => {
                  return (
                    <Checkbox
                      key={`filter-${opt.value}`}
                      fontSize="sm"
                      color="primary.1000"
                      fontWeight={400}
                      isChecked={brandFilter.includes(opt.value)}
                      onChange={() => setBf(opt.value)}
                    >
                      {opt.label}
                    </Checkbox>
                  );
                })}
            </Flex>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default Filter;
