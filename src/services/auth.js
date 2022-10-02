import axios from 'axios'

const loginEmployee = async (inputs) => {
    try {
        const { data } = await axios.post('auth/login', {...inputs})
        return Promise.resolve(data) 
    } catch (e) {
        console.log(e.message)
        return Promise.reject(e)
    }
}

const signupEmployee = async (inputs) => {
    try {
        const { data } = await axios.post('auth/register', {...inputs})
        return Promise.resolve(data)
    } catch (e) {
        console.log(e.message)
        return Promise.reject(e)
    }
}

export { loginEmployee, signupEmployee }