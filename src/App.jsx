
import { AppFooter } from './cmps/AppFooter';
import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';
export function App() {

    return (
        <section className='main-app'>
            <AppHeader/>

            <main className='container'>
                <Home />
            </main>

            <AppFooter />
        </section>


    )
}

