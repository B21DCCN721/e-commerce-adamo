import './App.css'
import 'antd/dist/reset.css'; // dùng với antd >= v5
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routers';
import { Provider } from 'react-redux';
import { store } from '../src/store';

function App() {

  return (
  <Provider store={store}>
     <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route key={index} path={route.path} element={<Page/>}/>
              )
            })}
          </Routes>
        </div>
     </Router>
  </Provider>
  )
}

export default App
