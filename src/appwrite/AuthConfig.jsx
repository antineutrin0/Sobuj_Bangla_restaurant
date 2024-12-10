import React, { createContext, useContext, useState, useEffect } from "react";
import { Account, Client, ID } from "appwrite";
import conf from '../conf/conf.js';

// Set up the Appwrite client and account service
const client = new Client();
client.setEndpoint(conf.sobujbanglaURL).setProject(conf.sobujbanglaProjectId);

const account = new Account(client);

// AuthService with authentication methods
class AuthService {
    async createAccount({ email, password, name, userType }) {
        try {
            // Create a new user account
            const userAccount = await account.create(ID.unique(), email, password, name);
    
            if (userAccount) {
                console.log("User ID:", userAccount.$id);
                console.log("User Type:", userType);
    
                // Log the user in after account creation
                await account.createEmailPasswordSession(email, password);
    
                // Update user preferences with the role
                await account.updatePrefs({ role: userType });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error creating account:", error.message);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout() {
        try {
            await account.deleteSession("current");
        } catch (error) {
            throw error;
        }
    }
}

// Create AuthContext
const AuthContext = createContext();

// The AuthProvider component that will wrap the app and provide the context
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authService = new AuthService();

    // Fetch the current user on app load
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching user:", error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const createAccount = async (userData) => {
        try {
            await authService.createAccount(userData);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            await authService.login(credentials);
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, createAccount, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the AuthContext in any component
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
