import { Box, Container } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import DashboardHeader from '@dashboard/components/DashboardHeader';

const MyOrders = () => {
  return (
    <>
      <DashboardHeader title="My Orders" />
      <Container p={4}>
        <TableContainer>
          <Table variant="striped" colorScheme="blackAlpha">
            <Thead background="customBg">
              <Tr>
                <Th borderBottom="none" borderRadius="10px 0 0 10px">
                  Order ID
                </Th>
                <Th borderBottom="none">Customer name</Th>
                <Th borderBottom="none">Product</Th>
                <Th borderBottom="none" borderRadius="0 10px 10px 0">
                  Amount
                </Th>
              </Tr>
            </Thead>
            <Tbody h={4} />
            {/* <Box width="full" h={4} /> */}
            <Tbody border="none">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
                <Tr key={`table-${v}`} border="none">
                  <Td borderRadius="10px 0 0 10px" border="none" py={3}>
                    8b8ba
                  </Td>
                  <Td py={3} border="none">
                    Wiliam Donut
                  </Td>
                  <Td py={3} border="none">
                    Paytm Voucher
                  </Td>
                  <Td py={3} borderRadius="0 10px 10px 0" border="none">
                    200 /-
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default MyOrders;
