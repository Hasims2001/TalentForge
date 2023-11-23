import React from 'react'
import {Routes,  Route} from 'react-router-dom'
import { Home } from '../Pages/Home'
import { Register } from '../Pages/Register'
import { Login } from '../Pages/Login'
import { PageNotFound } from '../Pages/PageNotFound'
import { Account } from '../Pages/Account'
export const AllRouters = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/jobs' element={<Home />}></Route>
        <Route path='/about' element={<Home />}></Route>
        <Route path='/contact' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route path='/*' element={<PageNotFound />}></Route>
    </Routes>
  )
}
