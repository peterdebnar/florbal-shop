
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    User,
    UserCredential
} from "firebase/auth"
import { auth, getUserRole, addUserRole } from "../firebase" 

interface UserContextType {
    createUser: (email: string, password: string) => Promise<UserCredential>;
    user: User | null;
    logout: () => Promise<void>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    userRole: string | null;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export function AuthContextProvider ({ children }: AuthContextProviderProps) {       
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [userRole, setUserRole] = useState<string | null>(null)

    async function createUser (email: string, password: string) {

        const userImpl = await createUserWithEmailAndPassword(auth, email, password)
        await addUserRole(userImpl.user.uid, "normal")

        return userImpl
    }
    
    function signIn (email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    function logout () {
        return signOut(auth)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            async function getRole () {
                const role = await getUserRole(currentUser)
                setUserRole(role)
            }

            if (!currentUser) {
                setTimeout(() => {
                    console.log("Delayed for 1 second.");
                }, 1000);
            }
            
            setUser(currentUser)
            getRole()

            setLoading(false)
        })

        return () => { 
            unsubscribe() 
        }
    }, [user])

    if (loading){
        return null
    }

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn, userRole }}>
            { children }
        </UserContext.Provider>
    ) 

}

export function UserAuth () {
    return useContext(UserContext)
}