import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/Auth'
import { AppRoutes } from './routes/Routes'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        <AppRoutes/>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
