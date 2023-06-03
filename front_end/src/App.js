// import React from "react"
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
// import NavBar from './components/Navbar'
// import ProductsTable from './components/ProductsTable'
// import {ProductProvider} from './ProductContext'
// import AddProduct from './components/AddProduct'

// function App(){
//     return(
//         <div>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={
//                         <ProductProvider>
//                             <NavBar/>
//                             <div className="row">
//                                 <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
//                                     <ProductsTable/>
//                                 </div>
//                             </div>
//                         </ProductProvider>
//                     }/>
//                     <Route path='/addproduct' element={<AddProduct/>} />
//                 </Routes>
//             </Router>
//         </div>
//     )
// } 

// export default App;

import React from "react"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import NavBar from './components/Navbar'
import ProductsTable from './components/ProductsTable'
import {ProductProvider} from './ProductContext'
import AddProduct from './components/AddProduct'
import AddSupplier from './components/AddSupplier'
import UpdateProduct from "./components/UpdateProduct"
import UpdateSupplier from "./components/UpdateSupplier"
import { UpdateProductContextProvider } from "./UpdateProductContext"
import SuppliersTable from './components/SuppliersTable'

function App(){
    return(
        <div>
            <Router>
                <Switch>
                    <ProductProvider>
                        <NavBar/>
                        <div className="row">
                            <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                                <UpdateProductContextProvider>
                                    <Route exact path='/' component={ProductsTable}/>
                                    <Route exact path='/suppliers' component={SuppliersTable}/>
                                    <Route exact path='/updateproduct' component={UpdateProduct}/>
                                    <Route exact path='/updatesupplier' component={UpdateSupplier}/>
                                    <Route exact path='/addproduct' component={AddProduct} />
                                    <Route exact path='/addsupplier' component={AddSupplier} />
                                </UpdateProductContextProvider>
                            </div>
                        </div>
                    </ProductProvider>
                </Switch>
            </Router>
        </div>
    )
} 

export default App;