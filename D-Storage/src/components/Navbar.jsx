import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand text-white">D-Storage</a>
                    {/* <button class="btn btn-outline-light" onClick={() => toggleMode()}>{mode == 'dark' ? 'Dark' : 'Light'}</button> */}
                </div>
            </nav>
        </div>
    )
}

export default Navbar