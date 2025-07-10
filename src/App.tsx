import './App.css'
import 'antd/dist/reset.css'; // dùng với antd >= v5
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routers/AppRoutes';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
        <Router>
          <ScrollToTop/>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default App
