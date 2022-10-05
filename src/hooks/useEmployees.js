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

    const getEmployeePage = async (page = 1) => {
        try {
            setLoading(true)
            const resultObj = await getEmployees({ headers, page})
            setEmployee(resultObj)
        } catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log('useEffect')
        getEmployeePage()
        // setLoading(true)
        // getEmployees({ headers }) 
        //     .then(setEmployee)
        //     .catch(console.error)
        //     .finally(() => setLoading(false))
    }, [])
    return {
        ...resultObj, 
        loading, 
        setEmployee, 
        getEmployeePage
    }
}

export { useEmployees }