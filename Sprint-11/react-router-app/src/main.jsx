import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root, {loader as rootLoader, action as rootAction} from './routes/root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error-page'
import Contact, {loader as contactLoader} from './routes/contact'
import EditContact, {action as editAction} from './routes/edit'
import {action as destroyAction} from './routes/destroy'
import Index from './routes/index'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Index/>
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
