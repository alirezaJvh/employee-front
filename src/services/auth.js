import axios from 'axios'

const loginEmployee = async (inputs) => {
    try {
        const { data } = await axios.post('auth/login', {...inputs})
        return Promise.resolve(data) 
    } catch (e) {
        console.log(e.message)
        return Promise.reject(e.response)
    }
}

const signupEmployee = async (inputs) => {
    try {
        const { data } = await axios.post('auth/register', {...inputs})
        return Promise.resolve(data)
    } catch (e) {
        console.log(e.message)
        return Promise.reject(e.response)
    }
}

export { loginEmployee, signupEmployee }