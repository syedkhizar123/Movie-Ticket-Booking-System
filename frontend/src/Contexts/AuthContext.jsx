import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false)
    const Backend_URL = import.meta.env.Backend_URL


    const checkToken = async () => {
        const token = localStorage.getItem('cinema_app_token');
        if (!token) return false;

        try {
            const res = await fetch(`${Backend_URL}/auth/validate-token`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200) {
                const data = await res.json();
                console.log('Token valid', data);
                return true;
            } else {
                localStorage.removeItem('cinema_app_token'); // remove expired
                return false;
            }
        } catch (err) {
            localStorage.removeItem('cinema_app_token'); // remove expired/invalid
            return false;
        }
    }
    useEffect(() => {
        const verify = async () => {
            const valid = await checkToken();
            setLoginStatus(valid);
        };

        verify();
    }, []);



    return (
        <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
            {children}
        </AuthContext.Provider>
    )
}