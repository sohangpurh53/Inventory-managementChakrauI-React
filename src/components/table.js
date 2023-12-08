import React, { useEffect, useState } from 'react';
import './css/table.css';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Loading from './isLoading';
import {
  Table,
  Thead,
  Box, 
  Tbody,
  TableContainer,
  Tr,
  Th,
  Td,

TableCaption,
Flex,

} from '@chakra-ui/react'


const TableData = () => {
  const {accessToken} = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
  const [orderDetails, setOrderDetails] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
      // Simulate data loading with a setTimeout
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  

    if(accessToken){
      setAuthenticated(true);
      const fetchData = async () => {
        try {
          const Data = await 
            axiosInstance.get('dashboard/list/table/', {headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then((response) => response.data)
          
  
          setOrderDetails(Data.order_item_data);
          setPurchaseDetails(Data.purchase_data);
          setStockDetails(Data.stock_data);
          
        } catch (error) {
          console.error('Error fetching data:', error);
          
        } 
      };
      fetchData();
    }else{
      setAuthenticated(false);
      window.location.href = '/signin'
    }
    // Clear the timeout if component is unmounted
     return () => clearTimeout(loadingTimeout);
    
  }, [accessToken]);

  
  // Total quantity calculation
  const totalStockQuantity = stockDetails.reduce((total, stock) => total + stock.quantity, 0);
  const totalOrderQuantity = orderDetails.reduce((total, order) => total + order.quantity, 0);
  const totalPurchaseQuantity = purchaseDetails.reduce((total, purchase) => total + purchase.quantity, 0);
  
  // total price calulation
  const totalOrdersalesPrice = orderDetails.reduce((total, order) => total + order.quantity * order.price, 0);
  const totalPurchasePrice = purchaseDetails.reduce((total, purchase) => total + purchase.quantity * purchase.product.price, 0);
 
  //  total profit/loss
  const totalProfitOrLoss = orderDetails.reduce((total, order) => total + order.price * order.quantity - order.product.price * order.quantity, 0);

  

  return (isLoading ? (
        <Loading />
      ) : (
        authenticated &&( 
         
         
          
<Flex
     mt={5}
     wrap={'wrap'}
     flexDirection={{base:'row', md:'column', lg:'row'}}
    > 
    {/* purchase */}
    <Box mr={2}>  
    <TableContainer>
     <Table size={'md'}>
     <TableCaption >Purchase</TableCaption>
          <Thead>
            <Tr>
              <Th>Product Name</Th>
              <Th>Quantity</Th>
              <Th>Purchase Price</Th>
              <Th>Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {purchaseDetails.map((item, index) => (
              <Tr key={index}>
                <Td>{item.product.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.product.price}</Td>
                <Td>{item.quantity * item.product.price}</Td>
              </Tr>
            ))}
             <Tr>
              <Td><b>Purchase Grand Total</b></Td>
              <Td> <b>{totalPurchaseQuantity}</b></Td>
              <Td> </Td>
              <Td><b>{totalPurchasePrice}</b></Td>
            </Tr>
          </Tbody>
        </Table>
        </TableContainer>
        </Box>
        
        {/* order */}
        <Box mr={2}> 
        <TableContainer> 
            <Table size={'md'}>
            <TableCaption>Order</TableCaption>
          <Thead>
            <Tr>
              <Th>Product Name</Th>
              <Th>Quantity</Th>
              <Th>Sale Price</Th>
              <Th>Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderDetails.map((item, index) => (
              <Tr key={index}>
                <Td>{item.product.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.price}</Td>
                <Td>{item.quantity * item.price}</Td>
              </Tr>
            ))}
            <Tr>
              <Td><b>Order Grand Total</b></Td>
              <Td> <b>{totalOrderQuantity}</b></Td>
              <Td> </Td>
              <Td><b>{totalOrdersalesPrice}</b></Td>
            </Tr>
          </Tbody>
        </Table>
        </TableContainer>
        </Box>

      {/* stock */}
        <Box mr={2}>
          <TableContainer> 
             <Table size={'md'}>
             <TableCaption>Stock</TableCaption>
          <Thead>
            <Tr>
              <Th>Product Name</Th>
              <Th>Quantity</Th>
            </Tr>
            
          </Thead>
          <Tbody>
            {stockDetails.map((item, index) => (
              <Tr key={index}>
                <Td>{item.product.name}</Td>
                <Td>{item.quantity}</Td>
                
              </Tr>
            ))}
           <Tr>
              <Td><b>Total Stock Quantity</b></Td>
              <Td>{totalStockQuantity}</Td>
            </Tr>
         
          </Tbody>
        </Table>
          </TableContainer>
        </Box>
           
           {/* profitandloss */}
         <Box mr={2}>
          <TableContainer>
          <Table size={'md'}>
            <TableCaption>
              Profit & Loss
            </TableCaption>
          <Thead>
            <Tr>
              <Th>Purchase Price Per Unit</Th>
              <Th>Sale Price Per Unit</Th>
              <Th>Qty Sold</Th>
              <Th>Balance Amount</Th>
              <Th>Profit or Loss</Th>
             
              
            </Tr>
          </Thead>
          <Tbody>
          {orderDetails.map((revenue, index) =>(
          <Tr key={index}>
            <Td>{revenue.product.price}</Td>
            <Td>{revenue.price}</Td>
            <Td>{revenue.quantity}</Td>
            <Td style={{ color: (revenue.price * revenue.quantity - revenue.product.price * revenue.quantity) >= 0 ? 'green' : 'red' }}>{ revenue.price*revenue.quantity - revenue.product.price*revenue.quantity}</Td>
            <Td style={{ color: (revenue.price * revenue.quantity - revenue.product.price * revenue.quantity) >= 0 ? 'green' : 'red' }}>
        { (revenue.price * revenue.quantity - revenue.product.price * revenue.quantity) >= 0 ? 'Profit' : 'Loss' }
        </Td>
            </Tr>
        ))}   
          <Tr>
              <Td><b>Total <i>Profit / Loss</i></b></Td>
              <Td> </Td>
              <Td> </Td>
              <Td style={{ color: (totalProfitOrLoss) >= 0 ? 'green' : 'red' }}><b>{totalProfitOrLoss}</b></Td>
            </Tr>
          </Tbody>
        </Table>
        </TableContainer>
         </Box>
        
       
           
        
    </Flex>
        
        
        )
      )
 
   
  );
};

export default TableData;
