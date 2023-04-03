import './App.scss';
import '../src/components/style/fonts.scss';
import '../src/components/style/loader.scss';
import Header from './components/header/Header';
import Main from './pages/main/Main';
import PageCrypto from './pages/pageCrypto/PageCrypto';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import '../src/components/style/button.scss'
import { Page404 } from './pages/page404/Page404';
import { useParams } from 'react-router-dom';


function App() {
  const { id } = useParams<{ id: string | undefined }>();

  return (
    <div className="App">
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/currency/:id" element={<PageCrypto />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
