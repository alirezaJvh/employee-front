import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEmployees } from '../services';

const useEmployees = () => {
    const initEmployeeObj = {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        employees: []
    }
    const [resultObj, setEmployee] = useState(initEmployeeObj)
    const [loading, setLoading] = useState(true)
    const { headers } = useAuth()

    useEffect(() => {
        console.log('useEffect')
        setLoading(true)
        getEmployees({ headers }) 
            .then(setEmployee)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])
    return {...resultObj, loading, setEmployee}
}

export { useEmployees }