import React, {createContext, useState} from 'react';

export const UpdateProductContext=createContext();

export const UpdateProductContextProvider=(props)=>{
    const [updateProductInfo, setUpdateProductInfo]=useState({
        ProductName:'',
        QuantityInStock:0,
        QuantitySold:0,
        UnitPrice:0,
        Revenue:0,
        ProductId:''  
    })
    const [updateSupplierInfo, setUpdateSupplierInfo]=useState({
        name:'',
        company:'',
        email:'',
        phone:'',
        Id:''  
    })
    
    return (
        <UpdateProductContext.Provider value={[updateProductInfo, setUpdateProductInfo, updateSupplierInfo, setUpdateSupplierInfo]}>
            {props.children}
        </UpdateProductContext.Provider>
    )
}