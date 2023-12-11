import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import axiosInstance from '../utils/axiosInstance';
// import './css/graph.css';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Loading from './isLoading';
import { Flex } from '@chakra-ui/react';

const GraphComponent = () => {
  const {accessToken} = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const Navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => { if(accessToken){
        setAuthenticated(true);
        const fetchData = async () => {
     
          try {
            const [purchaseResponse, stockResponse] = await Promise.all([
              axiosInstance.get('purchases/',{headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }}),
              axiosInstance.get('stocks/',{headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }})
            ]);
    
            const purchaseData = purchaseResponse.data;
    
            // Create an object with product IDs as keys and an object with purchase and stock quantity as values
            const combinedData = {};
            purchaseData.forEach(purchase => {
              const productId = purchase.product.id;
              if (!combinedData[productId]) {
                combinedData[productId] = { purchaseQty: 0, stockQty: 0 };
              }
              combinedData[productId].purchaseQty += purchase.quantity;
            });
    
            stockResponse.data.forEach(stock => {
              const productId = stock.product.id;
              if (combinedData[productId]) {
                combinedData[productId].stockQty = stock.quantity;
              } else {
                combinedData[productId] = { purchaseQty: 0, stockQty: stock.quantity };
              }
            });
    
            const chartData = Object.keys(combinedData).map(productId => {
              const product = purchaseData.find(purchase => purchase.product.id === parseInt(productId, 10)).product;
              return {
                productName: product.name,
                purchaseQty: combinedData[productId].purchaseQty,
                stockQty: combinedData[productId].stockQty
              };
            });
            if(chartData){
              setData(chartData);
              setIsLoading(false)
            }
    
            
           
            
          } catch (error) {
            console.log('Error fetching data:', error);
            setIsLoading(false)
          }
        };
    
        fetchData();

      }else{
        setAuthenticated(false);
        Navigate('/signin')  
      }
    
  }, [accessToken, Navigate]);

  useEffect(() => {
    if(accessToken){
      setAuthenticated(true);
      const renderChart = () => {
        const labels = data.map(item => item.productName);
        const purchaseValues = data.map(item => item.purchaseQty);
        const stockValues = data.map(item => item.stockQty);
  
        const ctx = chartRef.current.getContext('2d');
  
        if (window.myChart) {
          window.myChart.destroy();
        }
  
        window.myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Total Products Qty',
                data: purchaseValues,
                backgroundColor: 'rgba(46, 145, 138, 0.7)',
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1
              },
              {
                label: 'Remaining Stock Qty',
                data: stockValues,
                backgroundColor: 'rgba(114, 205, 165, 0.7)',
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      };
  
      if (data.length > 0) {
        renderChart();
      }

    }else{
      setAuthenticated(false);
    }
    
  }, [accessToken, data]);

  return authenticated &&( isLoading? <Loading />: <Flex mx={'auto'} bg={'#f7f7f7'} maxW={{base:'250px', md:'md', lg:'lg'}} wrap={'wrap'}  padding={5}><canvas ref={chartRef} width="400" height="400"></canvas></Flex>);
};

export default GraphComponent;
