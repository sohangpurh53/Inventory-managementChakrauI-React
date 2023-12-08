// ProductUpdateForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
import NotificationComponent from "../Notification";
import { useAuth } from '../../context/AuthContext';

const ProductUpdateForm = () => {
  const {accessToken} = useAuth()
  const [notificationMessage, setNotificationMessage] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    image: undefined,
    price: '',
    supplier: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await axiosInstance.get(`dashboard/product/${id}/update/`, {headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data);
        const [suppliers, categories] = await Promise.all([
          axiosInstance.get('dashboard/supplier/list/').then(response => response.data),
          axiosInstance.get('categories/').then(response => response.data),

        ]);

        setSupplierOptions(suppliers);
        setCategoryOptions(categories);
        
        setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({
      ...product,
      image: file,
    });
  };

  // Implement the rest of your update form here, similar to the create form but with pre-filled values from `product`

  const updateProduct = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', product.name);
    formDataToSend.append('category', product.category);
    formDataToSend.append('description', product.description);
    formDataToSend.append('image', product.image);
    formDataToSend.append('price', product.price);
    formDataToSend.append('supplier', product.supplier);

    axiosInstance.put(`dashboard/product/${id}/update/`, formDataToSend,{headers: {
      Authorization: `Bearer ${accessToken}`,
  
  }})
      .then(response => {if (response.data) {
        setNotificationMessage(`Product Entry Updated successfully!`);
        setTimeout(() => {
          setNotificationMessage(''); // Reset notification after 5 seconds
          window.location.href='/'
        }, 3000);
      } else {
        setNotificationMessage('Failed to create entry.');
      }}
      )
      .catch(error => console.error('Error updating product:', error));
     
  };

  return (
    <div className='body'>
      <fieldset className="container-form">
      <NotificationComponent message={notificationMessage} />

        <legend> <h3>Update Product</h3></legend>


        <form encType="multipart/form-data">

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"

              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={product.category}
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
              value={product.description}
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
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="supplier">Supplier:</label>
            <select
              name="supplier"
              value={product.supplier}
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


          <button onClick={updateProduct}>Update Product</button>

        </form>
        </fieldset>
    </div>
  );
};

export default ProductUpdateForm;
