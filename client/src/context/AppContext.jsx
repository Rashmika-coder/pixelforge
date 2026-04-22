// AppContext.jsx — Global state management using React Context API
// Provides user info, auth token, credit balance, and shared functions
// to every component in the app without prop drilling.

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    // Retrieve the token from localStorage so the user stays logged in on refresh
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(false)

    // Backend URL is set via environment variable (VITE_BACKEND_URL in .env)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    /**
     * Fetches the user's current credit balance from the server.
     * Called on login and after each image generation.
     */
    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/users/credits', { headers: { token } })
            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    /**
     * Sends the prompt to the backend to generate an image.
     * Deducts a credit on success. Redirects to /buy if the user has no credits.
     */
    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/image/generate-image',
                { prompt },
                { headers: { token } }
            )
            if (data.success) {
                loadCreditsData() // refresh credit count after generation
                return data.resultImage
            } else {
                toast.error(data.message)
                loadCreditsData()
                if (data.creditBalance === 0) {
                    navigate('/buy') // redirect to pricing page if out of credits
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    /**
     * Clears the auth token and user info from state and localStorage.
     */
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    // On app load (or when token changes), fetch user credits if a token exists
    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl,
        token, setToken, credit, setCredit,
        loadCreditsData, logout, generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider