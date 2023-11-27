import React from 'react'
import {Routes,  Route} from 'react-router-dom'
import { Home } from '../Pages/Home'
import { Register } from '../Pages/Register'
import { Login } from '../Pages/Login'
import { PageNotFound } from '../Pages/PageNotFound'
import { Account } from '../Pages/Account'
import { JobPosts } from '../Pages/JobPosts'
import { NewJobPost } from '../Pages/NewJobPost'
import { JobPostsApplications } from '../Pages/JobPostsApplications'
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
        <Route path='/jobposts' element={<JobPosts />}></Route>
        <Route path='/jobposts/:id/applications' element={<JobPostsApplications />}></Route>
        <Route path='/jobposts/create/job' element={<NewJobPost />}></Route>
        <Route path='/*' element={<PageNotFound />}></Route>
    </Routes>
  )
}
