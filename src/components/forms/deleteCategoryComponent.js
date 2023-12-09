import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import '../css/delete.css'
import { useAuth } from '../../context/AuthContext';
import { Button, Text, Badge, Flex } from '@chakra-ui/react';
import { IoArrowBackCircleSharp } from "react-icons/io5";


const DeleteCategory = () => {
    const {accessToken} = useAuth()
    const { id } = useParams();
    const [deleteCategory, setDeleteCategory] = useState(null);
    const  Navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryData = await axiosInstance.get(`dashboard/category/${id}/delete/`,{headers: {
                    Authorization: `Bearer ${accessToken}`,
                
                }}).then(response => response.data);
                setDeleteCategory(categoryData);
            } catch (error) {
                console.log(`Error while fetching data: ${error}`);
            }
        }
        fetchCategory();
    }, [id, accessToken]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`dashboard/category/${id}/delete`,{headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }});
            // Redirect to another page after deletion (you can replace '/' with your desired path)
            Navigate('/') 
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    return (
   <>
   <Button mx={5}  my={10} bg={'white'} onClick={()=>{Navigate('/')}}><IoArrowBackCircleSharp size={'30px'} color='gray' /></Button>
        <Flex mt={5} flexDirection={'column'} mx={'auto'}  wrap={'wrap'} gap={4} maxW={{base:'md', md:'md', lg:'lg'}}>
           
            {deleteCategory && (
                <>
                    <Text fontSize={{base:'md', md:'md', lg:'xl'}} textAlign={'center'}>Are you sure you want to delete <Badge color={'red.400'}>{deleteCategory.name}?</Badge> </Text>
                  <Flex mx={'auto'} gap={4} flexDirection={'row'}> 
                    <Button maxW={'50%'} bg={'red.400'} _hover={{bg:'red.600'}} color={'white'} onClick={handleDelete}>Delete</Button>
                    <Button  maxW={'50%'} onClick={() => Navigate(`/`)}>Cancel</Button>
                    </Flex> 
                </>
            )}
        </Flex> 
        </>
    );
}

export default DeleteCategory;