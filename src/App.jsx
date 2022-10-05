import React, { lazy, memo, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login.jsx'
import SingUp from './pages/SingUp/SingUp.jsx'
import { useAuth } from './context/AuthContext';
import AddEmployee from './pages/Dashboard/AddEmployee/AddEmployee.jsx';

const Home = lazy(() => import('./pages/Dashboard/Home/Home.jsx'))
const EmployeeDetail = lazy(() => import('./pages/Dashboard/Employee/EmployeeDetail.jsx'))
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
                    <Route 
                        path='/add-employee' 
                        element={<AddEmployee />}>
                    </Route>
                    <Route 
                        path='/employee/:id' 
                        element={<EmployeeDetail />}
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
