import React, { useState } from 'react';
import ProductForm from './forms/productForm';
import PurchaseForm from './forms/purchaseForm';
import OrderForm from './forms/orderForm';
import CategoryForm from './forms/categoryForm';
import Product from './Product';
import PurchaseList from './Purchase';
import StockList from './Stock';
import OrderItemList from './OrderItem';
import './css/dashboard.css';
import Table from './table';
import SuppliersInfo from './suppliersInfo';
import CategoryList from './Categories';
import CustomersInfo from './customerInfo';
import GraphComponent from './graphData';
import CustomerRegister from './auth/customerRegister';
import SupplierRegister from './auth/supplierRegister';
import { Box,VStack,HStack, Button,   IconButton,  useDisclosure, } from '@chakra-ui/react';
  // import { BiSidebar } from 'react-icons/bi';
  import { CloseIcon } from '@chakra-ui/icons';
  import { CgMenuGridO } from "react-icons/cg";

  const AdminDashboard = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [activeComponent, setActiveComponent] = useState('TableDisplay');

    const handleClick = (componentName) => {
      setActiveComponent(componentName);
      onToggle();
    };
  

    const renderComponent = () => {
      switch (activeComponent) {
        case 'ProductForm':
          return <ProductForm />;
        case 'PurchaseForm':
          return <PurchaseForm />;
        case 'OrderForm':
          return <OrderForm />;
        case 'CategoryForm':
          return <CategoryForm />;
        case 'CustomerForm':
          return <CustomerRegister/>;
        case 'SupplierForm':
          return <SupplierRegister/>;
        case 'Product':
          return <Product />;
        case 'PurchaseList':
          return <PurchaseList />;
        case 'StockList':
          return <StockList />;
        case 'OrderItemList':
          return <OrderItemList />;
        case 'SuppliersInfo':
          return <SuppliersInfo />;
        case 'CustomersInfo':
          return <CustomersInfo />;
        case 'Category':
          return <CategoryList/>;
        case 'TableInfo':
          return <Table />;
        default:
          return <GraphComponent/>;
      }
    };
  
  
  
    return (
      <>

  
    <Box
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          minH="100vh"
        >
  
          <HStack  p="4" bg="gray.700" color="white" w={{ base: '100%', md: '7.5%', lg:'5%' }}>
            <IconButton
            icon={isOpen ? <CloseIcon />: <CgMenuGridO  />
           }
              onClick={onToggle}
              aria-label="Toggle Navigation Bar"
              mx={'auto'}
            />
          </HStack>
  
          <VStack
            spacing={4}
            align="start"
            bg="gray.700"
            color="white"
            width={isOpen ? { base: '100%', md: '20%' } : '0'}
            p="4"
            transition="width 0.3s ease"
            overflow="hidden"
            visibility={isOpen ? 'visible' : 'hidden'}
            
          >
            {isOpen && (
              <>
                 <Button w={'100%'} onClick={() => handleClick('ProductForm')}>Create-Product</Button>
                  <Button w={'100%'} onClick={() => handleClick('PurchaseForm')}>Create-Purchase</Button>
                  <Button w={'100%'} onClick={() => handleClick('OrderForm')}>Create-Order</Button>
                  <Button w={'100%'} onClick={() => handleClick('CategoryForm')}>Create-Category</Button>
                  <Button w={'100%'} onClick={() => handleClick('CustomerForm')}>Create-Customer</Button>
                  <Button w={'100%'} onClick={() => handleClick('SupplierForm')}>Create-Supplier</Button>
                  <Button w={'100%'} onClick={() => handleClick('Category')}>Category</Button>
                  <Button w={'100%'} onClick={() => handleClick('Product')}>Product</Button>
                  <Button w={'100%'} onClick={() => handleClick('PurchaseList')}>Purchase</Button>
                  <Button w={'100%'} onClick={() => handleClick('StockList')}>Stock</Button>
                  <Button w={'100%'} onClick={() => handleClick('OrderItemList')}>Order</Button>
                  <Button w={'100%'} onClick={() => handleClick('SuppliersInfo')}>Supplier</Button>
                  <Button w={'100%'} onClick={() => handleClick('CustomersInfo')}>Customer</Button>
                  <Button w={'100%'} onClick={() => handleClick('TableInfo')}>Inventory</Button>
              </>
            )}
          </VStack>
  
          {/* Main Content */}
          <Box mt={5} mx={'auto'} flex="1" p={{ base: '4', md: '4' }}>
            {renderComponent()}
          </Box>
        </Box>

        
      </>
    );
  };
  
  export default AdminDashboard;