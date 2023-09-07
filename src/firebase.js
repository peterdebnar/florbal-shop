import React from "react"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore/lite"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDU4AYKWcq4aY2XlrME43f9WO9TE2MmwF0",
  authDomain: "florbalshop-3509d.firebaseapp.com",
  projectId: "florbalshop-3509d",
  storageBucket: "florbalshop-3509d.appspot.com",
  messagingSenderId: "826036386319",
  appId: "1:826036386319:web:fb975ad981ab6013ff817a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const auth = getAuth(app)

const itemsCollectionRef = collection(db, "items")

export async function getItems () {
    const querySnapshot = await getDocs(itemsCollectionRef)
    const dataArray = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArray
}

export async function getItem (id) {
    const docRef = doc(db, "items", id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export function postItem (data) {

    addDoc(itemsCollectionRef, data)
    .then((docRef) => {
        console.log("Document written with id: ", docRef.id)
    })
    .catch((error) => {
        console.log("Error: ", error)
    }) 
}

export async function getUserRole (user) {

    if (user){
        
        try {
            
            const docRef = doc(db, "users", user.uid);
            const firestorePromise = getDoc(docRef);

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error("Timeout exceeded"));
                }, 1000);
            });

            const result = await Promise.race([firestorePromise, timeoutPromise]);

            if (result instanceof Error) {
                return null;
            }

            const role = result.data().role;

            return role;          
        }
        catch (error) {
            console.log(error)
        }
        
    }

    return null    
}

export async function addUserRole (uid, role) {

    const data = {
        role: role
    }

    await setDoc(doc(db, "users", uid), data)
    .then(() => console.log("registered"))
    .catch((error) => console.log(error))

}

export async function deleteItem (id) {
    await deleteDoc(doc(db, "items", id));
} 
