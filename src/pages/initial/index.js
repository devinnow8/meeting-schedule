import React, { useState, useEffect } from "react";

import { useNylas } from '@nylas/nylas-react';
import { useNavigate, useSearchParams } from "react-router-dom";

const Initial = () => {

    const nylas = useNylas();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [userId, setUserId] = useState('');
    const SERVER_URI = 'http://192.168.1.58:9000/api/v1/calendar';

    useEffect(() => {
        console.log("nylasnylas app", nylas)
        if (!nylas) {
            navigate("/login")
            return;
        }

        console.log(searchParams.get('code'), 'params.has');
        if (searchParams.get('code')) {
            nylas
                .exchangeCodeFromUrlForToken()
                .then((response) => {
                    const user = JSON.parse(response);
                    console.log(user, 'useruseruser');
                    setUserId(user.id);
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('token', user.token); // Jwt token

                    navigate("/dashboard")

                })
                .catch((error) => {
                    console.error('An error occurred parsing the response:', error);
                });
        } else {
            console.log("nylas app no code")
            const userId = localStorage.getItem("userId");
            console.log("userId layout: ", userId)
            if (!userId) {
                navigate("/login");
            } else {

                navigate("/dashboard")
            }
        }
    }, [])


    return null;
};


export default Initial;
