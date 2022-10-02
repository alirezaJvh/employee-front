import axios from 'axios'

const loginEmployee = async (inputs) => {
    try {
        const { data } = await axios({
            data: inputs,
            method: 'POST',
            url: '/auth/login',
        })
        console.log(data)
        return data
    } catch (e) {
        console.log('error in login')
        console.log(e.message)
    }
}

export { loginEmployee }