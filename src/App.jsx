import React, { lazy, memo, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login.jsx'
import SingUp from './pages/SingUp.jsx'
import { useAuth } from './context/AuthContext';
const Home = lazy(() => import('./pages/Home.jsx'))

function App() {
    const {isAuth, dispatch} = useAuth()
    const { pathname } = useLocation()
    if ((!isAuth) && (pathname !== '/signup')) {
        {console.log( pathname )}
        return <Login dispatch={dispatch}/>
    }

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Routes>
                {/* <Route path="/" element={<}></Route> */}
                <Route index element={<Home />}></Route>
                <Route path="signup" element={<SingUp />}></Route>
            </Routes>
        </Suspense>
    );
}

export default memo(App);
