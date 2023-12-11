// import React from 'react';
// import { Link } from 'react-router-dom';
// import './css/header.css'
// import { useAuth } from '../context/AuthContext';

// const Header = () => {
//   const { accessToken } = useAuth()
//   return (
//     <div className="header">
//       <nav className="nav">
//         <ul className="nav-list">
//           <li className="nav-item">
//             <Link to="/" className="nav-link">Dashboard</Link>
//           </li>
//           {/* <li className="nav-item">
//             <Link to="/customer/form/" className="nav-link">Customer</Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/supplier/" className="nav-link">Supplier</Link>
//           </li> */}
//           {/* <li className="nav-item">
//             <Link to="/product/" className="nav-link">Product</Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/purchase/form/" className="nav-link">Purchase Form</Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/product/form/" className="nav-link">Product Form</Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/order/form/" className="nav-link">Order Form</Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/category/form/" className="nav-link">Category Form</Link>
//           </li> */}
//           {/* <li className="nav-item">
//             <Link to="/dashboard/" className="nav-link">Home</Link>
//           </li> */}
//           {accessToken ?(<li className="nav-item">
//             <Link to="/signout/" className="nav-link">SignOut</Link>
//           </li>):(<li className="nav-item">
//             <Link to="/signin/" className="nav-link">SignIn</Link>
//           </li>
//           )}
          
          
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Header;

import React from 'react';
import {
//  Box,
 Flex,
 Heading,
//  Text,
 
 Button,
 IconButton,
 useColorMode,
 Stack,
//  Collapse,
//  Icon,
} from '@chakra-ui/react';
// import { useDisclosure } from '@chakra-ui/react';
import { FaMoon, FaSun, } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

import {Link} from 'react-router-dom'
const Navbar = () => {
 const { colorMode, toggleColorMode } = useColorMode();
 const {accessToken} = useAuth()
//  const { isOpen, onToggle } = useDisclosure();

 return (
    <Flex as="nav" align="center" bg="blue.500"color={'white'} justify="space-between" wrap="wrap" padding="1.5rem">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <Link to="/" _focus={{ boxShadow: 'none' }}>
           Inventory-Management
          </Link>
        </Heading>
      </Flex>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        
      </Stack>

      {/* <Box display={{ base: 'block', md: 'none' }} onClick={onToggle}>
        {isOpen ? (
          <IconButton
            aria-label="Close Menu"
            icon={<FaTimes />}
            variant="outline"
            size="lg"
          />
        ) : (
          <IconButton
            aria-label="Open Menu"
            icon={<FaBars />}
            variant="outline"
            size="lg"
          />
        )}
      </Box> */}

      <Stack
        direction={{ base: 'column', md: 'row' }}
        // display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width="full"
        alignItems="center"
        justifyContent="space-between"
      >
      {accessToken ?
             <Button to="/signout/" bg={'green.300'} _hover={{bg:'green.500'}} color={'white'} as={Link}>SignOut</Button>
         :
             <Button to="/signin/" bg={'orange.400'} color={'white'} _hover={{bg:'orange.600'}} as={Link}>SignIn</Button>
           }
        <IconButton
          position={'absolute'}
          right={{base:'10'}}
          aria-label="Toggle Theme"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Stack>
    </Flex>
 );
};

export default Navbar;