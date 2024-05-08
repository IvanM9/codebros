import { ToastContainer } from 'react-toastify'
import { Route, Switch } from 'wouter'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Switch>
        <Route path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>

      <ToastContainer />
    </>
  )
}

export default App
