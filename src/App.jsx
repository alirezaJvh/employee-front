import React, { lazy, memo, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login.jsx'
import SingUp from './pages/SingUp.jsx'
import { useAuth } from './context/AuthContext';
import Home from './pages/Dashboard/Home/Home.jsx';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.jsx'))

function App() {
    const {isAuth, dispatch} = useAuth()
    const { pathname } = useLocation()
    if ((!isAuth) && (pathname !== '/signup')) {
        return <Login dispatch={dispatch}/>
    }

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Routes>
                {/* <Route path="/" element={<DashboardLayout />}></Route> */}
                <Route 
                    path='/' 
                    element={<Dashboard />}
                >
                    <Route
                        path='/'
                        element={<Home />}
                    >
                    </Route>
                </Route>
                <Route 
                    path="signup" 
                    element={ <SingUp dispatch={dispatch}/> }
                >
                </Route>
            </Routes>
        </Suspense>
    );
}

export default memo(App);
