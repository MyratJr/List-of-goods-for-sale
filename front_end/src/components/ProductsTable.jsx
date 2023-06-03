import React, {useEffect, useContext} from 'react';
import {Table} from 'react-bootstrap';
import { ProductContext } from '../ProductContext';
import ProductsRow from './ProductsRow';
import { UpdateProductContext } from '../UpdateProductContext';
import { useHistory } from 'react-router-dom';

const ProductsTable=()=>{
    const [products, setProducts] = useContext(ProductContext)
    const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateProductContext)
    let history = useHistory()

    const handleDelete = (id) => {
        fetch('http://127.0.0.1:8000/delete_product/'+id, {
            method:"DELETE",
            headers:{
                accept:'application/json'
            }
        })
            .then(resp=>{
                return resp.json()
            })
            .then(result=>{
                if (result.status==='ok'){
                    const filteredProducts=products.data.filter((product)=>product.id!==id);
                    setProducts({data:[...filteredProducts]})
                    alert("Product deleted!")
                }
                else{
                    alert("Product deletion failed")
                }
            })
    }

    const handleUpdate=(id)=>{
        const product=products.data.filter(product=>product.id===id)[0]
        setUpdateProductInfo({
            ProductName:product.name,
            QuantityInStock:product.quantity_in_stock,
            QuantitySold:product.quantity_sold,
            UnitPrice:product.unit_price,
            Revenue:product.revenue,
            Supplier:product.supplier,
            ProductId:id
        })
        history.push("/updateproduct")
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    async function fetchProducts(){
        fetch('http://127.0.0.1:8000/products')
        .then(resp=>{
            return resp.json();
        }).then(results=>{
            console.log(results)
            setProducts({'data':[...results.data]})
    })}


    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr style={{color:'white'}}>
                        <th>Id</th>
                        <th>Önüm ady</th>
                        <th>Satlykda duran sany</th>
                        <th>Satylan sany</th>
                        <th>Bahasy</th>
                        <th>Jem Peýda</th>
                        <th>Öndüriji id</th>
                        <th>Üýtgetmek</th>
                    </tr>
                </thead>
                <tbody>
                    {products.data.map((product)=>(
                        <ProductsRow
                            id={product.id}
                            name={product.name}
                            quantity_in_stock={product.quantity_in_stock}
                            quantity_sold={product.quantity_sold}
                            unit_price={product.unit_price}
                            revenue={product.revenue}
                            supplier={product.supplied_by_id}
                            key={product.id}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductsTable;