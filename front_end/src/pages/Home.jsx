import React from 'react'
import {Link} from "react-router-dom"
import pizzaimg from "../assets/pizza.jpg"
function Home() {
  return (
    <div className='home'>
      <div className='headerContainer' style={{backgroundImage:`url(${pizzaimg})`}}>
        <h1> Myrat's Pizza </h1>
        <p> PIZZA TO FIT ANY TASTE </p>
        <Link to="/menu">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
  )
}

export default Home