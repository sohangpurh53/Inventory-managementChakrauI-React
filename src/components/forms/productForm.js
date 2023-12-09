import React, { useState, useEffect } from 'react';
import '../css/style.css'
import Loading from '../isLoading';
import axiosInstance from '../../utils/axiosInstance'
import NotificationComponent from "../Notification";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ProductForm = () => {
  const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productform, setProductform] = useState({
    name: '',
    category: '',
    description: '',
    image: null,
    price: '',
    supplier: '',
  });
  const  Navigate = useNavigate()

  // useEffect(() => {
    
  // }, []);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if(accessToken){
      setAuthenticated(true);

      const fetchData = async () => {

        try {
          const [suppliers, categories] = await Promise.all([
            axiosInstance.get('dashboard/supplier/list/',{headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then(response => response.data),
            axiosInstance.get('categories/',{headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then(response => response.data),
  
          ]);
  
          setSupplierOptions(suppliers);
          setCategoryOptions(categories);
  
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();

    }else{
      setAuthenticated(false);
      Navigate('/signin')
    }

  
    return () => clearTimeout(loadingTimeout);
  }, [accessToken, Navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductform({
      ...productform,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductform({
      ...productform,
      image: file,
    });
  };

  const createProduct = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', productform.name);
    formDataToSend.append('category', productform.category);
    formDataToSend.append('description', productform.description);
    formDataToSend.append('image', productform.image);
    formDataToSend.append('price', productform.price);
    formDataToSend.append('supplier', productform.supplier);

    axiosInstance.post('product/create/', formDataToSend, {headers: {
      Authorization: `Bearer ${accessToken}`,
  
  }})
      .then(response => {if (response.data) {
        setNotificationMessage(`Product Entry created successfully!`);
        setTimeout(() => {
          setNotificationMessage(''); // Reset notification after 5 seconds
        }, 5000);
      } else {
        setNotificationMessage('Failed to create entry.');
      }})
      .catch(error => console.error('Error creating product:', error));
  };
  return (
    <div className='body'>
      {isLoading? (<Loading/>):(authenticated &&( <fieldset className="container-form">
        <NotificationComponent message={notificationMessage} />
        <legend> <h3>Product</h3></legend>


        <form encType="multipart/form-data">

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"

              name="name"
              value={productform.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={productform.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Category</option>
              {categoryOptions.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"

              name="description"
              value={productform.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
          </div>

          <div>
            <label htmlFor="name">Price:</label>
            <input
              type="number"

              name="price"
              value={productform.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="supplier">Supplier:</label>
            <select
              name="supplier"
              value={productform.supplier}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a supplier</option>
              {supplierOptions.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.full_name}
                </option>
              ))}
            </select>
          </div>


          <button onClick={createProduct}>Create Product</button>

        </form>


      </fieldset>)
       
      )}
      
    </div>
  )
}

export default ProductForm