import axios from 'axios';

const getEmployees = async ({ headers, page = 1, size = 10 }) => {
    // TODO: different url with different roles
    try {
        const url = `/employee?size=${size}&page=${page}`
        const { data } = await axios({ headers, url })
        return Promise.resolve(data)
    } catch (e) {
        console.log(e.message)
        return Promise.reject(e)
    }
}

const addEmployees = async ({ headers, data }) => {
    try {
        const msg = await axios({
            headers,
            data,
            url: '/employee'
        })
        return Promise.resolve(msg)
    } catch (e) {
        console.log(e.message)
        return Promise.reject(e)
    }
}

const editEmployees = async ({headers, data}) => {
    try {
        const res = await axios({ 
            headers, 
            data, 
            url: '/employee',
            method: 'PUT' 
        })
        return Promise.resolve(res)
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

const deleteEmployee = async ({headers, data}) => {
    try {
        const res = await axios({
            headers,
            data,
            url: '/employee',
            method: 'DELETE',
        })
        return Promise.resolve(res)
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

export { 
    getEmployees, 
    addEmployees,
    editEmployees,
    deleteEmployee,
} 