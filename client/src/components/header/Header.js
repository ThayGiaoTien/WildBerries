import React, {useState} from 'react'
import {Link} from "react-router-dom"

const Header = () => {
    const [search, setSearch]=useState('')
    
    const handleSearch=()=>{
    }
    return (
        <div className= "header">
            <div className="navbar">

                <div className= "navbar__info">
                    <p>Ru</p>
                    <p>Free delivery</p>
                    <div className="navbar__info__sell" >
                        <p >Sell on WildBerries</p>
                    </div>
                </div>

                <div className="navbar__main"> 
                    <div className="navbar__main__logo">
                        <button className= "navbar__main__logo__list-button" >
                            <span className="bi bi-list h1" ></span>
                        </button>
                        <h1>WILDBERRIES</h1>
                    </div>

                    
                    <input 
                    type='text'
                    className="navbar__main__search-input lead"
                    placeholder="I'm searching for..." 
                    aria-label="Search"
                    onChange={e=>setSearch(e.target.value)}
                    onKeyPress={event=>{if(event.key==='Enter'){
                        handleSearch()}}}
                    />
                    
                    <div className="navbar__main__icons">
                        <span className="bi bi-geo-alt h2 "></span>
                        <span className="bi bi-cart-check h2"></span>
                        <span className="bi bi-box-arrow-in-right h2"></span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Header
