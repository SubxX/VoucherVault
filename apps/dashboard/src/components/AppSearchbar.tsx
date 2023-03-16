import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

const AppSearchbar = () => {
  return (
    <InputGroup>
      <Input placeholder="Search" />
      <InputLeftElement children={<AiOutlineSearch />} />
    </InputGroup>
  );
};

export default AppSearchbar;
