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
import { Jobs } from '../Pages/Jobs'
import { Applications } from '../Pages/Applications'
import { PrivateRoutes } from './PrivateRoutes'
import { RecruiterRoutes } from './RecruiterRoutes'
export const AllRouters = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<Home />}></Route>
        <Route path='/contact' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/account' element={<PrivateRoutes>
          <Account />
          </PrivateRoutes>}></Route>
        <Route path='/jobposts' element={<RecruiterRoutes><JobPosts /></RecruiterRoutes>}></Route>
        <Route path='/jobposts/:id/applications' element={<RecruiterRoutes><JobPostsApplications /></RecruiterRoutes>}></Route>
        <Route path='/jobposts/create/job' element={<RecruiterRoutes><NewJobPost /></RecruiterRoutes>}></Route>
        <Route path='/jobs' element={<PrivateRoutes><Jobs /></PrivateRoutes>}></Route>
        <Route path='/jobs/:category' element={<PrivateRoutes><Jobs /></PrivateRoutes>}></Route>
        <Route path='/applications' element={<PrivateRoutes><Applications /></PrivateRoutes>}></Route>
        <Route path='/*' element={<PageNotFound />}></Route>
    </Routes>
  )
}
