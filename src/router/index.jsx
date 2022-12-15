
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from '../pages/root'
const config = [
    {
        index:true,
        element:<Root/>
    }
]

const router = createBrowserRouter(config)

export default router