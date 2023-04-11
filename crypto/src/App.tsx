import './App.scss';
import '../src/ui/fonts/fonts.scss';
import '../src/ui//loader/loader.scss';
import '../src/ui/button/button.scss';
import '../src/ui/adaptive/adaptive.scss';
import Header from './components/header/Header';
import Main from './pages/main/Main';
import PageCrypto from './pages/pageCrypto/PageCrypto';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { Page404 } from './pages/page404/Page404';

function App() {
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
    );
}

export default App;
