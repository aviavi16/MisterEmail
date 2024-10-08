
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { AppFooter } from './cmps/AppFooter';
import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Settings } from './pages/Settings';

import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './cmps/EmailDetails';
import { EmailEdit } from './cmps/EmailEdit';
import { UserMsg } from './cmps/UserMsg';

export function App() {

    return (
        <Router>
            <AppHeader />

            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/email/:folder' element={<EmailIndex />} >
                    <Route
                            path='/email/:folder/:mailId'
                            element={<EmailDetails />} 
                            />
                    </ Route >
                </Routes>

            </main>

            <AppFooter />
            <UserMsg />
        </Router>


    )
}

