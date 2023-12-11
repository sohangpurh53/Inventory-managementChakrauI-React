// import React from 'react';
// import { Link } from 'react-router-dom';
// import './css/footer.css'

// const Footer = () => {
//   return (
//     <div className="footer-main">
//       <nav className="footer">
//         <ul className="footer-list">
//           <li className="footer-item">
//             <Link to="/" className="footer-link">Home</Link>
//           </li>
         
//           <li className="footer-item">
//             <Link to="/product/" className="footer-link">Products</Link>
//           </li>
         
//           <li className="footer-item">
//             <Link to="/category/" className="footer-link">Catergories</Link>
//           </li>
//           <li className="footer-item">
//             <Link to="/order/" className="footer-link">Orders</Link>
//           </li>
//           <li className="footer-item">
//             <Link to="/purchase/" className="footer-link">Purchase</Link>
//           </li>
//           <li className="footer-item">
//             <Link to="/stock/" className="footer-link">Stocks</Link>
//           </li>
//           <li className="footer-item">
//             <Link to="/customer/" className="footer-link">Customer</Link>
//           </li>
         
//           <li className="footer-item">
//             <Link to="/supplier/" className="footer-link">Supplier</Link>
//           </li>
         
//           <li className="footer-item">
//             <Link to="/inventory/" className="footer-link">Inventory</Link>
//           </li>
         
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Footer;

import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';

const Footer = () => {
 return (
    <Box as="footer" backgroundColor="blue.700" py="6">
      <Flex justifyContent={{base:'space-evenly', md:'center', lg:'space-evenly'}} alignItems="center" gap={2.5}  maxWidth="1200px" mx="auto">
        <Flex direction="column" justifyContent="center" alignItems="flex-start">
          <Text ml={2} color="white" fontSize={{base:"small", md:'xs', lg:'lg'}} fontWeight="bold">Inventory Management System</Text>
          <Text ml={2} fontWeight="bold" color="cyan.300" fontSize={{base:"small", md:'x-small', lg:'lg'}}>
            Developed By Hakimuddin Sohangpurwala
          </Text>
        </Flex>
     
     
        <Flex direction="column" color={'white'}  alignItems="flex-start">
          <Text color="white" fontSize="md" fontWeight="bold" mb="2">Links</Text>
          <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/"} >Home</Link> 
         <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/product/"} >Products</Link>
         <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/category/"} >Catergories</Link>
         <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/order/"}>Orders</Link>
        </Flex>
      <Flex direction="column" mt={8} color={'white'} alignItems="flex-start">
                <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/purchase/"} >Purchase</Link>
              <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/stock/"} >Stocks</Link>
              <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/customer/"} >Customer</Link>
              <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/supplier/"} >Supplier</Link>
              <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/inventory/"} >Inventory</Link>
              </Flex>
        <Flex direction="column" color={'white'}  alignItems="flex-start">
          <Text color="white" fontSize={{base:"x-small", md:'md', lg:'md'}} fontWeight="bold" mb="2">Forms</Text>
          <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/customer/form/"} >Customer</Link> 
         <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/product/form/"} >Products</Link>
         <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/category/form/"} >Catergory</Link>
         <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/order/form/"}>Order</Link>
         <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/purchase/form/"}>Purchase</Link>
         <Link color="white"  fontSize={{base:"x-small", md:'md', lg:'md'}} mb="1"  href={"/supplier/form/"}>Supplier</Link>

        </Flex>

        


         
{/* 
        <Flex direction="column"   alignItems={'self-start'}>
          <Text color="white" fontSize="md" fontWeight="bold" mb="2">Social</Text>
          <Link color="white" href="#" fontSize="sm" mb="1">Facebook</Link>
          <Link color="white" href="#" fontSize="sm" mb="1">Twitter</Link>
          <Link color="white" href="#" fontSize="sm" mb="1">Instagram</Link>
        </Flex> */}
      </Flex>
    </Box>
 );
};

export default Footer;