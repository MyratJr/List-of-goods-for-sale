import React, {useState} from "react";
import {Form, Button, Card} from 'react-bootstrap'

const AddProduct = () => {
    const [productInfo, setProductinfo]=useState(
        {
            name:'',
            company:'',
            email:'',
            phone:''
        }
    )

    const updateForm=(e)=>{
        setProductinfo(
            {...productInfo,[e.target.name]:e.target.value}
        )
    }
    const postData=async(e)=>{
        e.preventDefault();
        const url='http://127.0.0.1:8000/supplier'
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
                    'name':productInfo['name'],
                    'company':productInfo['company'],
                    'email':productInfo['email'],
                    'phone':productInfo['phone']
                })
            });
            response.json().then(response=>{
                if (response.status==='ok'){
                    alert('Supplied added successfully!!!')
                }else{
                    alert('Failed to add product')
                }
            });
            setProductinfo({
                name:'',
                company:'',
                email:'',
                phone:''  
            });
    };

    return(
        <Card>
            <Card.Body style={{backgroundColor: 'rgb(19, 19, 78)' ,color:'white'}}>
                <Form onSubmit={postData}>
                <Form.Group controlId='name'>
                        <Form.Label>Öndüriji ady</Form.Label>
                        <Form.Control type="text" name='name'
                        value={productInfo.name} onChange={updateForm}
                        placeholder='Ady'/>
                    </Form.Group>
                    <Form.Group controlId='company'>
                        <Form.Label>Kompaniýa</Form.Label>
                        <Form.Control type="text" name='company'
                        value={productInfo.company} onChange={updateForm}
                        placeholder='Kompaniýa'/>
                    </Form.Group>                    
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name='email'
                        value={productInfo.email} onChange={updateForm}
                        placeholder='Email'/>
                    </Form.Group>
                    <Form.Group controlId='phone'>
                        <Form.Label>Telefon</Form.Label>
                        <Form.Control type="text" name='phone'
                        value={productInfo.phone} onChange={updateForm}
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

export default AddProduct