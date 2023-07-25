import React, { useState, useEffect } from "react";

import { useNylas } from '@nylas/nylas-react';
import { useNavigate, useSearchParams } from "react-router-dom";

const Initial = () => {

    const nylas = useNylas();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [userId, setUserId] = useState('');
    const SERVER_URI = 'https://calendar-service-agox.onrender.com/api/v1/calendar';

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

                    console.log(response, 'responseresponse');

                    const user = JSON.parse(response);
                    console.log(user, 'useruseruser');
                    setUserId(user.id);
                    localStorage.setItem('userDetail', JSON.stringify(user))

                    navigate("/home")

                })
                .catch((error) => {
                    console.error('An error occurred parsing the response:', error);
                });
        } else {
            console.log("nylas app no code")
            const userId = JSON.parse(localStorage.getItem('userDetail'))?.id || ''
            console.log("userId layout: ", userId)
            if (!userId) {
                navigate("/login");
            } else {

                navigate("/home")
            }
        }
    }, [])


    return null;
};


export default Initial;
