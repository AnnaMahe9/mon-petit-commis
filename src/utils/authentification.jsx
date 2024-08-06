import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useAuth() {
    const navigate = useNavigate();

    const [token, setToken] = useState();
    const [userId, setUserId] = useState();

    function getToken() {
        const token = localStorage.getItem('accessToken');
        if(token) {
            setToken(token);
            setUserId(JSON.parse(jwtDecode(localStorage.getItem('accessToken')).id));
        } else {
            navigate('/login');
        }
    }

    return { getToken };
}

function getUserId() {
    return userId;
}
export {
    useAuth,
    getUserId,
}