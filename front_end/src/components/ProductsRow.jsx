import React from 'react';

const ProductRow=({id,name,quantity_in_stock,quantity_sold,unit_price,revenue,supplier,handleDelete,handleUpdate})=>{
    return (
        <tr style={{color:'white'}}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{quantity_in_stock}</td>
            <td>{quantity_sold}</td>
            <td>{unit_price}</td>
            <td>{revenue}</td>
            <td>{supplier}</td>
            <td>
                <button onClick={()=>handleUpdate(id)} className='btn btn-primary btn-sm ml-1 mr-2'>Üýtgetmek</button>
                <button onClick={()=>handleDelete(id)} className='btn btn-danger btn-sm mr-2'>Ýok etmek</button>
            </td>
        </tr>
    )
}

export default ProductRow;