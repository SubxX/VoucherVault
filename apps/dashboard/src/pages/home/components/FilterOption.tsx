import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { IFilterOptionProps } from '../interfaces/FilterOption.interfaces';

function FilterOption({ title, options }: IFilterOptionProps) {
  return (
    <Flex flexDir="column" gap={2} alignSelf="flex-start">
      <Text fontSize="md" fontWeight={500}>
        {title}
      </Text>
      <Flex flexDir="inherit" gap={2}>
        {options.map((opt, i) => {
          return (
            <Checkbox
              fontSize="sm"
              color="primary.1000"
              fontWeight={400}
              key={`filter-${i}`}
            >
              {opt}
            </Checkbox>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default FilterOption;
