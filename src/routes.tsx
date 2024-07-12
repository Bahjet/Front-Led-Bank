import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './pages/404'
import { Error } from './pages/error'
import { Invoices } from './pages/invoices/invoices'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Invoices />,
    errorElement: <Error />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
