import { Route, createRoutesFromElements } from 'react-router-dom'

import App from './components/App'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}></Route>
)
