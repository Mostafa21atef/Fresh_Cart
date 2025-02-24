import React, { useContext, useState } from 'react'
import Logo from '../../assets/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let{nOfcart}=useContext(CartContext)
let {UserLogin,setUserLogin} = useContext(UserContext)
let navigate=useNavigate();
function signout(){
  localStorage.removeItem("UserToken");
  setUserLogin(null);
  navigate("/Login")
}  
  return <>
  
  <div>
    
  <nav className="bg-slate-300 border-gray-200 fixed top-0 right-0 left-0 z-50">
      <div className="flex flex-wrap gap-4 justify-between items-center mx-auto max-w-screen-xl p-4">
        
        <div className="flex items-center gap-5">
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
          </Link>
        </div>
        
        {/* Hamburger icon for small screens */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden p-2 text-slate-600">
          <i className="fas fa-bars"></i> {/* Use Font Awesome or any icon library */}
        </button>

        {/* Menu items for large screens */}
        <div className="hidden lg:flex items-center gap-4">
          {UserLogin ? (
            <ul className="flex gap-4 justify-center items-center">
              <li><Link className="text-slate-600" to="">Home</Link></li>
              <li><Link className="text-slate-600 relative" to="cart">
                Cart <div className='absolute top-[-15px] end-[-10px] size-5 bg-emerald-600 rounded-full text-white flex items-center justify-center'>
                {nOfcart}
                </div>
              </Link></li>
              <li><Link className="text-slate-600" to="products">Products</Link></li>
              <li><Link className="text-slate-600" to="wishlist">WhishList</Link></li>
              <li><Link className="text-slate-600" to="categories">Categories</Link></li>
              <li><Link className="text-slate-600" to="brands">Brands</Link></li>
            </ul>
          ) : null}
        </div>
        
        {/* Social icons for all screens */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <ul className="flex gap-4 items-center justify-center">
            <li><i className="fab fa-facebook"></i></li>
            <li><i className="fab fa-instagram"></i></li>
            <li><i className="fab fa-linkedin"></i></li>
            <li><i className="fab fa-youtube"></i></li>
          </ul>
          
          <ul className="flex gap-4 items-center justify-center">
            {UserLogin ? (
              <li>
                <span onClick={signout} className="cursor-pointer">Signout</span>
              </li>
            ) : (
              <>
                <li>
                  <Link to="login">Login</Link>
                </li>
                <li>
                  <Link to="register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Menu for small screens */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-slate-300 p-4 flex flex-col items-center">
          {/* Close button */}
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="absolute top-4 right-4 p-2 text-slate-600">
            <i className="fas fa-times"></i> {/* Close icon */}
          </button>

          {UserLogin ? (
            <ul className="flex flex-col gap-4">
              <li><Link className="text-slate-600" to="">Home</Link></li>
              <li><Link className="text-slate-600 relative" to="cart">
                Cart <div className="absolute top-[-15px] end-[-10px] size-5 bg-emerald-600 rounded-full text-white flex items-center justify-center">
                  {nOfcart}
                </div>
              </Link></li>
              <li><Link className="text-slate-600" to="products">Products</Link></li>
              <li><Link className="text-slate-600" to="wishlist">WhishList</Link></li>
              <li><Link className="text-slate-600" to="categories">Categories</Link></li>
              <li><Link className="text-slate-600" to="brands">Brands</Link></li>
            </ul>
          ) : null}

          <ul className="flex flex-col gap-4 items-center mt-4">
            <li><i className="fab fa-facebook"></i></li>
            <li><i className="fab fa-instagram"></i></li>
            <li><i className="fab fa-linkedin"></i></li>
            <li><i className="fab fa-youtube"></i></li>
          </ul>
          
          <ul className="flex flex-col gap-4 items-center mt-4">
            {UserLogin ? (
              <li>
                <span onClick={signout} className="cursor-pointer">Signout</span>
              </li>
            ) : (
              <>
                <li>
                  <Link to="login">Login</Link>
                </li>
                <li>
                  <Link to="register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>


    </div>
    </>
}
