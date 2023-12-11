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

const Footer = () => {
 return (
    <Box as="footer" backgroundColor="blue.700" py="6">
      <Flex justifyContent="space-between" alignItems="center" gap={2} maxWidth="1200px" mx="auto">
        <Flex direction="column" justifyContent="center" alignItems="flex-start">
          <Text color="white" fontSize="xl" fontWeight="bold">Inventory Management System</Text>
          <Text color="white" fontSize="sm">
            Developed By Hakimuddin Sohangpurwala
          </Text>
        </Flex>

        <Flex direction="column"  justifyContent="center" alignItems="flex-start">
          <Text color="white" fontSize="lg" fontWeight="bold" mb="2">Links</Text>
          <Link color="white" href="#" fontSize="sm" mb="1"  to="/" >Home</Link> 
         <Link color="white" href="#" fontSize="sm" mb="1"  to="/product/" >Products</Link>
         <Link color="white" href="#" fontSize="sm" mb="1"  to="/category/" >Catergories</Link>
         <Link color="white" href="#" fontSize="sm" mb="1"  to="/order/" >Orders</Link>
         
         

          {/* <Link color="white" href="#" fontSize="sm" mb="1">Home</Link>
          <Link color="white" href="#" fontSize="sm" mb="1">About</Link>
          <Link color="white" href="#" fontSize="sm" mb="1">Contact</Link> */}
        </Flex>
        <Flex direction="column"  alignItems="flex-start">
          <Link color="white" href="#" fontSize="sm" mb="1"  to="/purchase/" >Purchase</Link>
         <Link color="white" href="#" fontSize="sm" mb="1"  to="/stock/" >Stocks</Link>
         <Link color="white" href="#" fontSize="sm" mb="1"  to="/customer/" >Customer</Link>
         <Link color="white" href="#" fontSize="sm" mb="1"  to="/supplier/" >Supplier</Link>
         <Link color="white" href="#" fontSize="sm" mb="1"  to="/inventory/" >Inventory</Link>
         </Flex>
{/* 
        <Flex direction="column" justifyContent="center"  alignItems={'self-start'}>
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