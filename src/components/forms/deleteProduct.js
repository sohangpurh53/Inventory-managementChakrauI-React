import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import '../css/delete.css'
import { useAuth } from '../../context/AuthContext';

const DeleteProduct = () => {
    const {accessToken} = useAuth()
    const { id } = useParams();
    const [deleteProduct, setDeleteProduct] = useState(null);
    

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const productData = await axiosInstance.get(`dashboard/product/${id}/delete/`, {headers: {
                    Authorization: `Bearer ${accessToken}`,
                
                }}).then(response => response.data);
                setDeleteProduct(productData);
            } catch (error) {
                console.log(`Error while fetching data: ${error}`);
            }
        }
        fetchCategory();
    }, [id, accessToken]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`dashboard/product/${id}/delete`, {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }});
            // Redirect to another page after deletion (you can replace '/' with your desired path)
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    return (
        <div className="confirmation-box">
            {deleteProduct && (
                <>
                    <p>Are you sure you want to delete {deleteProduct.name}?</p>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                    <button className='cancel' onClick={() => window.location.href = `/`}>Cancel</button>
                </>
            )}
        </div>
    );
}

export default DeleteProduct;