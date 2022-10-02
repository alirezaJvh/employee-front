import axios from 'axios';

const getEmployees = async ({ headers, page = 1, size = 10 }) => {
    // TODO: different url with different roles
    try {
        const url = `/employee?size=${size}&page=${page}`
        const { data } = await axios({ headers, url })
        return data
    } catch (e) {
        console.log('error in getEmployees')
        console.log(e.message)
        return e.message
    }
}

export { getEmployees } 