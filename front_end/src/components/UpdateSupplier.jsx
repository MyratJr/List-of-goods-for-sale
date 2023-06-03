import React, {useContext} from "react";
import {Form, Button, Card} from 'react-bootstrap'
import { UpdateProductContext } from "../UpdateProductContext";
import { useHistory } from 'react-router-dom';

const UpdateSupplier = () => {
    const history = useHistory();
    const [updateSupplierInfo, setUpdateSupplierInfo]=useContext(UpdateProductContext)
    const updateForm=(e)=>{
        setUpdateSupplierInfo({...updateSupplierInfo, [e.target.name]:e.target.value })
    }

    const postData = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:8000/supplier/'+updateSupplierInfo['Id']

        const response=await fetch(url, {
            method:'PUT',
            mode:'cors',
            cache:'no-cache',
            credentials:'same-origin',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:updateSupplierInfo['name'],
                company:updateSupplierInfo['company'],
                email:updateSupplierInfo['email'],
                phone:updateSupplierInfo['phone'],
            })
        })

        response.json().then(resp=>{
            if (resp.status==='ok'){
                alert('Product Updated');
                history.push("/suppliers");
            }
            else{
                alert ('FGailed to update product ')
            }
        })

        setUpdateSupplierInfo({
            name:'',
            company:'',
            email:'',
            phone:'',
            Id:''
        })
    } 

    return (
        <Card>
            <Card.Body style={{backgroundColor: 'rgb(19, 19, 78)' ,color:'white'}}>
                <Form onSubmit={postData}>
                <Form.Group controlId='name'>
                        <Form.Label>Öndüriji ady</Form.Label>
                        <Form.Control type="text" name='name'
                        value={updateSupplierInfo.name} onChange={updateForm}
                        placeholder='Ady'/>
                    </Form.Group>
                    <Form.Group controlId='company'>
                        <Form.Label>Kompaniýa</Form.Label>
                        <Form.Control type="text" name='company'
                        value={updateSupplierInfo.company} onChange={updateForm}
                        placeholder='Kompaniýa'/>
                    </Form.Group>                    
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name='email'
                        value={updateSupplierInfo.email} onChange={updateForm}
                        placeholder='Email'/>
                    </Form.Group>
                    <Form.Group controlId='phone'>
                        <Form.Label>Telefon</Form.Label>
                        <Form.Control type="text" name='phone'
                        value={updateSupplierInfo.phone} onChange={updateForm}
                        placeholder='Telefon'/>
                    </Form.Group>                    
                    <Button variant="primary" type='submit' style={{marginTop:'20px'}}>
                        Ýatda sakla
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default UpdateSupplier;