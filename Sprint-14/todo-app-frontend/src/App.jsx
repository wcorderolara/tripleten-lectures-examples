import { AuthProvider } from './contexts';
import { RouterProvider } from 'react-router';
import { router } from './router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;