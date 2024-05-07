import { Route, Switch } from 'wouter'
import Landing from './pages/Landing'

import './App.css'

function App() {
  return (
    <Switch>
      <Route path='/' component={Landing} />
    </Switch>
  )
}

export default App
