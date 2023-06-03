import React, {useState} from "react";
import {Form, Button, Card} from 'react-bootstrap'

const AddProduct = () => {
    const [productInfo, setProductinfo]=useState(
        {
            ProductName:'',
            QuantityInStock:'',
            QuantitySold:'',
            UnitPrice:'',
            Revenue:'',
            Supplier:''
        }
    )

    const updateForm=(e)=>{
        setProductinfo(
            {...productInfo,[e.target.name]:e.target.value}
        )
    }
    const postData=async(e)=>{
        e.preventDefault();
        const url='http://127.0.0.1:8000/product/'+productInfo['Supplier']
        const response = await fetch(
            url,{
                method:'POST',
                mode:'cors',
                cache:'no-cache',
                credentials:'same-origin',
                headers:{
                    'Content-Type':'application/json'
                },
                redirect:'follow',
                referrerPolicy:'no-referrer',
                body:JSON.stringify({
                    'name':productInfo['ProductName'],
                    'quantity_in_stock':productInfo['QuantityInStock'],
                    'quantity_sold':productInfo['QuantitySold'],
                    'unit_price':productInfo['UnitPrice'],
                    'revenue':productInfo['Revenue'],
                })
            });
            response.json().then(response=>{
                if (response.status==='ok'){
                    alert('Product added successfully!!!')
                }else{
                    alert('Failed to add product')
                }
            });
            setProductinfo({
                ProductName:'',
                QuantityInStock:'',
                QuantitySold:'',
                UnitPrice:'',
                Revenue:'',
                Supplier:''  
            });
    };

    return(
        <Card>
            <Card.Body style={{backgroundColor: 'rgb(19, 19, 78)' ,color:'white'}}>
                <Form onSubmit={postData}>
                    <Form.Group controlId='ProductName'>
                        <Form.Label>Önüm ady</Form.Label>
                        <Form.Control type="text" name='ProductName'
                        value={productInfo.ProductName} onChange={updateForm}
                        placeholder='Önüm ady'/>
                    </Form.Group>
                    <Form.Group controlId='QuantityInStock'>
                        <Form.Label>Satlykda duran sany</Form.Label>
                        <Form.Control type="number" name='QuantityInStock'
                        value={productInfo.QuantityInStock} onChange={updateForm}
                        placeholder='Satlykda duran sany'/>
                    </Form.Group>                    
                    <Form.Group controlId='QuantitySold'>
                        <Form.Label>Satylan sany</Form.Label>
                        <Form.Control type="number" name='QuantitySold'
                        value={productInfo.QuantitySold} onChange={updateForm}
                        placeholder='Satylan sany'/>
                    </Form.Group>
                    <Form.Group controlId='UnitPrice'>
                        <Form.Label>Bahasy</Form.Label>
                        <Form.Control type="number" name='UnitPrice'
                        value={productInfo.UnitPrice} onChange={updateForm}
                        placeholder='Bahasy'/>
                    </Form.Group>
                    <Form.Group controlId='Revenue'>
                        <Form.Label>Jem Peýda</Form.Label>
                        <Form.Control type="number" name='Revenue'
                        value={productInfo.Revenue} onChange={updateForm}
                        placeholder='Jem Peýda'/>
                    </Form.Group>                    
                    <Form.Group controlId='Supplier'>
                        <Form.Label>Öndüriji</Form.Label>
                        <Form.Control type="number" name='Supplier'
                        value={productInfo.Supplier} onChange={updateForm}
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

export default AddProduct