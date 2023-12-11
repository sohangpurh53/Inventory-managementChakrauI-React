import React, { useState, useEffect } from 'react';
import Product from './Product';
import PurchaseList from './Purchase';
import StockList from './Stock';
import OrderItemList from './OrderItem';
import Loading from './isLoading'; // Import the Loading component
// import './css/home.css';
import Table from './table'


const Home = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate data loading with a setTimeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clear the timeout if component is unmounted
    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
    setIsMenuOpen(false);

    // Close the menu after clicking an option
  };
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const renderHomeComponent = () => {
    switch (activeComponent) {
      case 'Product':
        return <Product />;
      case 'PurchaseList':
        return <PurchaseList />;
      case 'StockList':
        return <StockList />;
      case 'OrderItemList':
        return <OrderItemList />;
      default:
        return <Table />;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='burger-menu'>
            {isMenuOpen ? (
              <div className="close-icon" onClick={toggleMenu}>
                <span className='cross1'></span>
                <span className='cross2'></span>
              </div>
            ) : (
              <div className="burger-icon" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            )}
            {isMenuOpen && (
              <div className="menu-options">
                <button onClick={() => handleClick('Product')}>Display Product</button>
                <button onClick={() => handleClick('PurchaseList')}>Display Purchase</button>
                <button onClick={() => handleClick('StockList')}>Display Stock</button>
                <button onClick={() => handleClick('OrderItemList')}>Display Order</button>
              </div>
            )}
          </div>

          <div className='home-container'>
            <aside className="aside-menu">
              <div>
                <div>
                  <button onClick={() => handleClick('Product')}>Display Product</button>
                  <button onClick={() => handleClick('PurchaseList')}>Display Purchase</button>
                  <button onClick={() => handleClick('StockList')}>Display  Stock</button>
                  <button onClick={() => handleClick('OrderItemList')}>Display Order</button>
                </div>
              </div>
            </aside>

            <div className="main-content">

              {renderHomeComponent()} {/* Render the active component */}

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
