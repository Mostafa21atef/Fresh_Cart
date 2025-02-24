import React, { useEffect, useState } from 'react'
import logo from '../../assets/freshcart-logo.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Categories() {
  const [GetCategories, setGetCategories] = useState([])

  function getCategories() {
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => setGetCategories(res.data.data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="row mt-5 justify-center items-center">
      {GetCategories.map((category) => (
        <Link key={category._id} to={`/`}>
          <div
            className="w-full text-center rounded-sm p-3 cursor-pointer"
          >
            <img
              src={category.image}
              alt="category"
              className="w-full h-[250px] object-cover"
            />
            <h3>{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
