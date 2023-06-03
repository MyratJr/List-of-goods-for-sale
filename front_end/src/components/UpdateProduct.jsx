import React, {useContext} from "react";
import {Form, Button, Card} from 'react-bootstrap'
import { UpdateProductContext } from "../UpdateProductContext";
import { useHistory } from 'react-router-dom';

const UpdateProduct = () => {
    const history = useHistory();
    const [updateProductInfo, setUpdateProductInfo]=useContext(UpdateProductContext)
    const updateForm=(e)=>{
        setUpdateProductInfo({...updateProductInfo, [e.target.name]:e.target.value })
    }

    const postData = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:8000/product/'+updateProductInfo['ProductId']

        const response=await fetch(url, {
            method:'PUT',
            mode:'cors',
            cache:'no-cache',
            credentials:'same-origin',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:updateProductInfo['ProductName'],
                quantity_in_stock:updateProductInfo['QuantityInStock'],
                quantity_sold:updateProductInfo['QuantitySold'],
                unit_price:updateProductInfo['UnitPrice'],
                revenue:updateProductInfo['Revenue']
            })
        })

        response.json().then(resp=>{
            if (resp.status==='ok'){
                alert('Product Updated');
                history.push("/");
            }
            else{
                alert ('FGailed to update product ')
            }
        })

        setUpdateProductInfo({
            ProductName:'',
            QuantityInStock:'',
            QuantitySold:'',
            UnitPrice:'',
            Revenue:'',
            ProductId:'' 
        })
    } 

    return (
        <Card>
            <Card.Body style={{backgroundColor: 'rgb(19, 19, 78)' ,color:'white'}}>
                <Form onSubmit={postData}>
                <Form.Group controlId='ProductName'>
                        <Form.Label>Önüm ady</Form.Label>
                        <Form.Control type="text" name='ProductName'
                        value={updateProductInfo.ProductName} onChange={updateForm}
                        placeholder='Önüm ady'/>
                    </Form.Group>
                    <Form.Group controlId='QuantityInStock'>
                        <Form.Label>Satlykda duran sany</Form.Label>
                        <Form.Control type="number" name='QuantityInStock'
                        value={updateProductInfo.QuantityInStock} onChange={updateForm}
                        placeholder='Satlykda duran sany'/>
                    </Form.Group>                    
                    <Form.Group controlId='QuantitySold'>
                        <Form.Label>Satylan sany</Form.Label>
                        <Form.Control type="number" name='QuantitySold'
                        value={updateProductInfo.QuantitySold} onChange={updateForm}
                        placeholder='Satylan sany'/>
                    </Form.Group>
                    <Form.Group controlId='UnitPrice'>
                        <Form.Label>Bahasy</Form.Label>
                        <Form.Control type="number" name='UnitPrice'
                        value={updateProductInfo.UnitPrice} onChange={updateForm}
                        placeholder='Bahasy'/>
                    </Form.Group>
                    <Form.Group controlId='Revenue'>
                        <Form.Label>Jem Peýda</Form.Label>
                        <Form.Control type="number" name='Revenue'
                        value={updateProductInfo.Revenue} onChange={updateForm}
                        placeholder='Jem Peýda'/>
                    </Form.Group>                    
                    <Form.Group controlId='Supplier'>
                        <Form.Label>Öndüriji</Form.Label>
                        <Form.Control type="number" name='Supplier'
                        value={updateProductInfo.Supplier} onChange={updateForm}
                        placeholder='Öndüriji'/>
                    </Form.Group>
                    <Button variant="primary" type='submit' style={{marginTop:'20px'}}>
                        Ýatda sakla
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default UpdateProduct;