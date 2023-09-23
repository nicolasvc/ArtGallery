import  { useState } from 'react';



const useExample = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [number, setNumber] = useState<number>(0);

    //nunca usar set aca xd

    //logica    
    return {loading,number,setLoading,setNumber}
}




export default useExample