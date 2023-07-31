import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const UserContext = createContext();


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("userToken"));
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    console.log(user, token,"token");

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/v1/tokens/filterByEmail`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            console.log(JSON.stringify(response.data), "contextresponse");
            if (response.data) {

                setUser(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserData(token);
        }
    }, [token]);


    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;