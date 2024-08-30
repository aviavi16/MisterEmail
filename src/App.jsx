
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { AppFooter } from './cmps/AppFooter';
import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Settings } from './pages/Settings';

import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './cmps/EmailDetails';
import { EmailEdit } from './cmps/EmailEdit';

export function App() {

    return (
        <Router>
            <AppHeader />

            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/email' element={<EmailIndex />} > 
                        <Route path='/email/edit/:id?' element={ <EmailEdit /> } />
                    </Route>
                    <Route path='/email/:id' element={<EmailDetails />} />
                </Routes>

            </main>

            <AppFooter />
        </Router>


    )
}

