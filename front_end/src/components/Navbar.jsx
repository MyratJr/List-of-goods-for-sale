import React, {useContext,useState} from 'react'
import {Navbar, Form, FormControl, Badge} from 'react-bootstrap'
import {Link} from "react-router-dom"
import '../App.css'
import { ProductContext } from '../ProductContext'

const NavBar = () => {
    const [search, setSearch] = useState("")
    const [products,setProducts] = useContext(ProductContext)
    const updateSearch = (e) => {
        setSearch(e.target.value)
    }
    const filterProduct = (e) => {
        e.preventDefault()
        if (search.toLowerCase().length===0){
            window.location.reload(false)
        }
        else{
            const product=products.data.filter(product => product.name.toLowerCase().includes(
            search.toLowerCase()));
            setProducts({"data" : product})}
    }
    if (products.data['0']) {
        if ('email' in products.data['0']) {
            return(
                <Navbar style={{backgroundColor:"rgb(1, 1, 40)"}} expand='lg' variant='dark'>
                <Navbar.Brand href='#home'>Haryt öndüriji kompaniýalar.</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Navbar className='mr-auto'>
                        <Badge className='mt-2' variant='primary'>Sanawdaky öndürijileriň sany {products.data.length}</Badge>
                    </Navbar>
                        <Link to='/suppliers' className='btn btn-primary btn-sm mr-2'>Öndürijiler</Link>
                        <Link to='/' className='btn btn-primary btn-sm mr-2'>Önümler</Link>
                        <Link to='/addsupplier' className='btn btn-primary btn-sm mr-2'>Öndüriji goşmak</Link>
                        <Link to='/addproduct' className='btn btn-primary btn-sm mr-2'>Önüm goşmak</Link>
                    <Form onSubmit={filterProduct}>
                        <FormControl value={search} onChange={updateSearch} type='text' placeholder='Gözleg' className='mr-sm-2 fas fa-search'/>
                    </Form>
                </Navbar.Collapse>
                </Navbar>
            )
        } else {
            return(
                <Navbar style={{backgroundColor:"rgb(1, 1, 40)"}} expand='lg' variant='dark'>
                <Navbar.Brand href='#home'>Haryt satylşynyň tertibi.</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Navbar className='mr-auto'>
                        <Badge className='mt-2' variant='primary'>Sanawdaky harytlaryň sany {products.data.length}</Badge>
                    </Navbar>
                        <Link to='/suppliers' className='btn btn-primary btn-sm mr-2'>Öndürijiler</Link>
                        <Link to='/' className='btn btn-primary btn-sm mr-2'>Önümler</Link>
                        <Link to='/addsupplier' className='btn btn-primary btn-sm mr-2'>Öndüriji goşmak</Link>
                        <Link to='/addproduct' className='btn btn-primary btn-sm mr-2'>Önüm goşmak</Link>
                    <Form onSubmit={filterProduct}>
                        <FormControl value={search} onChange={updateSearch} type='text' placeholder='Gözleg' className='mr-sm-2 fas fa-search'/>
                    </Form>
                </Navbar.Collapse>
                </Navbar>
            )
        }
      } else {
        console.log('No data found');
      }
}

export default NavBar
