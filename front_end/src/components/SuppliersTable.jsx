import React, {useEffect, useContext} from 'react';
import {Table} from 'react-bootstrap';
import { ProductContext } from '../ProductContext';
import SuppliersRow from './SuppliersRow';
import { UpdateProductContext } from '../UpdateProductContext';
import { useHistory } from 'react-router-dom';

const ProductsTable=()=>{
    const [products, setProducts] = useContext(ProductContext)
    const [updateSupplierInfo, setUpdateSupplierInfo] = useContext(UpdateProductContext)
    let history = useHistory()

    const handleDelete = (id) => {
        fetch('http://127.0.0.1:8000/delete/'+id, {
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
                    alert("Supplier deleted!")
                }
                else{
                    alert("Supplier deletion failed")
                }
            })
    }

    const handleUpdate=(id)=>{
        const product=products.data.filter(product=>product.id===id)[0]
        setUpdateSupplierInfo({
            name:product.name,
            company:product.company,
            email:product.email,
            phone:product.phone,
            Id:id
        })
        history.push("/updatesupplier")
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    async function fetchProducts(){
        fetch('http://127.0.0.1:8000/supplier')
        .then(resp=>{
            return resp.json();
        }).then(results=>{
            setProducts({'data':[...results.data]})
    })}


    return (
        <div>
            <Table striped bordered hover style={{width:'80vw'}}>
                <thead>
                    <tr style={{color:'white'}}>
                        <th>Id</th>
                        <th>Ady</th>
                        <th>Kompaniýa</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Üýtgetmek</th>
                    </tr>
                </thead>
                <tbody>
                    {products.data.map((product)=>(
                        <SuppliersRow
                            id={product.id}
                            name={product.name}
                            company={product.company}
                            email={product.email}
                            phone={product.phone}
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