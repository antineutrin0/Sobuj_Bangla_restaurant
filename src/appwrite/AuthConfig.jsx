import React, { createContext, useContext, useState, useEffect } from "react";
import { Account, Client, ID } from "appwrite";
import conf from '../conf/conf.js';


const client = new Client();
client.setEndpoint(conf.sobujbanglaURL).setProject(conf.sobujbanglaProjectId);

const account = new Account(client);


class AuthService {
    async createAccount({ email, password, name, userType }) {
        try {
            
            const userAccount = await account.create(ID.unique(), email, password, name);
    
            if (userAccount) {
                console.log("User ID:", userAccount.$id);
                console.log("User Type:", userType);
    
                
                await account.createEmailPasswordSession(email, password);
    
               
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


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authService = new AuthService();

    
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


export const useAuth = () => useContext(AuthContext);
export default AuthProvider;