import './App.scss';
import '../src/components/style/fonts.scss';
import Header from './components/header/Header';
import Main from './components/main/Main';
import PageCrypto from './components/PageCrypto/PageCrypto';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import '../src/components/style/button.scss'
import { Page404 } from './components/Page404/Page404';
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
            <Route path={`/currency/:id`} element={id ? <PageCrypto id={id} /> : null} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
