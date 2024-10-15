"use client"
const { useState, createContext, useEffect } = require("react");
export const StoreContext = createContext()
export const UserStoreProvider = ({ children }) => {
    const [stores, setStores] = useState(null)
    const [error, setError] = useState(null);
  
useEffect(() => {
        try {
            fetch('/api/store',{cache: 'no-store'
           }).then(data=> data.json()).then(jres=>{
               if (jres.success) {
                   setStores(jres.data)
               }
               else{
                   setError(jres.message)
               } 
           })
       } catch (error) {
           setError(error.message)
       }
}, [setStores])
return(
    <StoreContext.Provider value={{stores, error, setStores}}>
        {children}
    </StoreContext.Provider>
)

  
  };