import React, { useState, useEffect, useContext } from "react";

import { useNylas } from '@nylas/nylas-react';
import { useNavigate, useSearchParams } from "react-router-dom";
import UserContext from "../../hooks/UserContext";

const Initial = () => {
    const { setToken } = useContext(UserContext);
    const nylas = useNylas();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const SERVER_URI = 'https://calendar-service-agox.onrender.com/api/v1/calendar';

    useEffect(() => {
        if (!nylas) {
            navigate("/login")
            return;
        }
        if (searchParams.get('code')) {
            console.log('hereeeeee');
            nylas
                .exchangeCodeFromUrlForToken()
                .then((response) => {
                    const user = JSON.parse(response);
                    setToken(user.token);
                    localStorage.setItem('userToken', (user?.token))
                    navigate("/home")
                })
                .catch((error) => {
                    console.error('An error occurred parsing the response:', error);
                });
        } else {
            console.log('hereeeeee222');
            const userToken = (localStorage.getItem('userToken')) || ''

            if (!userToken) {
                navigate("/login");
            } else {
                navigate("/home")
            }
        }
    }, [])


    return null;
};


export default Initial;
