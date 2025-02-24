import { createContext , useEffect, useState } from "react";

export let UserContext = createContext();
export default function UserContextProvider(props){
    const [UserLogin, setUserLogin] = useState(
        localStorage.getItem("UserToken")?localStorage.getItem("UserToken"):null
    
    );
     
   
return( 
<UserContext.Provider value={{UserLogin,setUserLogin}}>
 {props.children}
</UserContext.Provider>
);
}