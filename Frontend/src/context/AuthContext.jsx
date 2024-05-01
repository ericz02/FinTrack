import {createContext,useContext,useState} from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const login = (userData) => {
        setUser(userData);
        console.log(user.name)
    }
    const logout = () => {
        setUser(null);
        
    }
    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}

        </AuthContext.Provider>
    );

};
export const useAuth = () => useContext(AuthContext);
