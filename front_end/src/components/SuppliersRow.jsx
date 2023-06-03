import React from 'react';

const SupplierRow=({id,name,company,email,phone,handleDelete,handleUpdate})=>{
    return (
        <tr style={{color:'white'}}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{company}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button onClick={()=>handleUpdate(id)} className='btn btn-primary btn-sm ml-1 mr-2'>Üýtgetmek</button>
                <button onClick={()=>handleDelete(id)} className='btn btn-danger btn-sm mr-2'>Ýok etmek</button>
            </td>
        </tr>
    )
}

export default SupplierRow;