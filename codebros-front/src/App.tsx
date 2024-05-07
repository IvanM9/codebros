import { Route, Switch } from 'wouter'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <Switch>
      <Route path='/' component={Landing} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
    </Switch>
  )
}

export default App
