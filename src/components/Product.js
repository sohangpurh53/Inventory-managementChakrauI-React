import React, { useState, useEffect } from 'react';
import './css/style.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './isLoading';
import axiosInstance from '../utils/axiosInstance';


const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);
      const fetchData = async () => {
        try {
          const fetchedProducts = await axiosInstance(`dashboard/products/list/?page=${currentPage}`,{headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => response.data);
          setProducts(fetchedProducts.results || []);
          setHasNextPage(fetchedProducts.next !== null);
          setHasPrevPage(fetchedProducts.previous !== null);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {
      setAuthenticated(false);
      window.location.href = '/signin';
    }
  }, [accessToken, currentPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (

    <div className='body'>
      {isLoading ? (<Loading />) : (
        authenticated && (
          <div className="container">
            <ul className="product-list">
              {products.map(product => (
                <li key={product.id} className="product-item">
                  <img src={product.image} alt="" /> <h6>{product.name} </h6>
                  <ul className="product-details">
                    <li>Description: {product.description.slice(0, 20)}{product.description.length > 100 ? '...' : ''}</li>
                    <li>Price: {product.price}</li>
                    <li><Link className='edit-button' to={`/product/${product.id}/update`}> <p className="bi bi-pencil-square"> Update</p> </Link></li>
                    <li><Link  className='delete' to={`/product/${product.id}/delete`}> <p className="bi bi-trash"> Delete</p> </Link></li>
                  </ul>
                </li>
              ))}
            </ul>
            <div className="pagination">
              {hasPrevPage && <button onClick={handlePrevPage}>Previous</button>}
              <span className='page-number'> Page&nbsp;{currentPage}</span>
              {hasNextPage && <button onClick={handleNextPage}>Next</button>}
            </div>
          </div>
        )
      )}

    </div>
  );
};

export default Product;
