import React from 'react'
import { Image } from 'react-bootstrap'
import logoHa from './logohaha.png'

function Header() {
    return (
        <div className='header'>
            <Image className='headerLogo' style={{height: "65%"}} src={logoHa} />
        </div>
    )
}

export default Header