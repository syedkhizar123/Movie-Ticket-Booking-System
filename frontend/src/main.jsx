import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import { MoviesProvider } from './Contexts/MoviesContext.jsx'
import { AdminAuthProvider } from './Contexts/AdminAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MoviesProvider>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </MoviesProvider>
    </AuthProvider>
  </StrictMode>,
)
