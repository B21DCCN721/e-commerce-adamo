import './App.css'
import 'antd/dist/reset.css'; // dùng với antd >= v5
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routers/AppRoutes';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from './components/ScrollToTop';
import { PersistGate } from 'redux-persist/integration/react';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
          <Router>
            <ScrollToTop/>
            <div className="App">
              <AppRoutes />
            </div>
          </Router>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
