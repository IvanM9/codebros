import { Route, Switch } from 'wouter'
import Landing from './pages/Landing'
import Register from './pages/Register'

function App() {
  return (
    <Switch>
      <Route path='/' component={Landing} />
      <Route path='/register' component={Register} />
    </Switch>
  )
}

export default App
