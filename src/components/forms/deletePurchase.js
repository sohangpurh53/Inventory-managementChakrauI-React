import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
// import '../css/delete.css'
import { useAuth } from '../../context/AuthContext';

const DeletePurchase = () => {
    const {accessToken} = useAuth()
    const { id } = useParams();
    const [deletePurchase, setDeletePurchase] = useState(null);
    const  Navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const purchaseData = await axiosInstance.get(`dashboard/purchase/${id}/delete/`, {headers: {
                    Authorization: `Bearer ${accessToken}`,
                
                }}).then(response => response.data);
                setDeletePurchase(purchaseData);
            } catch (error) {
                console.log(`Error while fetching data: ${error}`);
            }
        }
        fetchCategory();
    }, [id, accessToken]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`dashboard/purchase/${id}/delete`, {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }});
            // Redirect to another page after deletion (you can replace '/' with your desired path)
            Navigate('/')
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    return (
        <div className="confirmation-box">
            {deletePurchase && (
                <>
                    <p>Are you sure you want to delete {deletePurchase.id}?</p>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                    <button className='cancel' onClick={() => Navigate(`/`)}>Cancel</button>
                </>
            )}
        </div>
    );
}

export default DeletePurchase;