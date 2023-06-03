import React, {createContext, useState} from 'react';

export const UpdateProductContext=createContext();

export const UpdateProductContextProvider=(props)=>{
    const [updateProductInfo, setUpdateProductInfo]=useState({
        name:'',
        company:0,
        email:0,
        phone:0,
        Id:''  
    })
    
    return (
        <UpdateProductContext.Provider value={[updateProductInfo, setUpdateProductInfo]}>
            {props.children}
        </UpdateProductContext.Provider>
    )
}