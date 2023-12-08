import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";


// SignOutComponent.js

function SignOutComponent() {
  
    useEffect(() => {
        const handleSignOut = async () => {
            const refresh_token = localStorage.getItem('refresh_token');
            try {
                const response = await axiosInstance.post('token/blacklist/', { refresh_token: refresh_token });

                if (response.status === 200) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/signin';
                } else {
                    console.log('something went wrong');
                }
            } catch (error) {
                console.error(error);
            }
        };

        handleSignOut();
    }, []);

    return null;
}

export default SignOutComponent;
