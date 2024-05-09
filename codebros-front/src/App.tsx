import { ToastContainer } from 'react-toastify'
import { Route, Switch } from 'wouter'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css'
import ConsultDash from './pages/ConsultDash'
import AdminDash from './pages/AdminDash'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Switch>
        <Route path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <ProtectedRoute>
          <Route path='/consultant-dashboard' component={ConsultDash} />
          <Route path='/admin-dashboard' component={AdminDash} />
        </ProtectedRoute>
      </Switch>
      <ToastContainer />
    </>
  )
}

export default App
