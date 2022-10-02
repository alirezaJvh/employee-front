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

export { getEmployees } 