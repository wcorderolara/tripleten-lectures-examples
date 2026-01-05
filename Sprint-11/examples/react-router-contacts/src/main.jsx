import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { loader as appLoader, action as appAction } from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import Contact, { loader as contactLoader, action as contactAction} from './routes/Contact.jsx'
import EditContact, { action as editAction} from './routes/EditContact.jsx'
import {action as destroyAction} from './routes/DestroyContact.jsx'
import Home from './routes/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    action: appAction,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
        action: contactAction
      },
      {
        path: '/contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction
      },
      {
        path: '/contacts/:contactId/destroy',
        action: destroyAction
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
