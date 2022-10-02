import axios from 'axios';

const loginEmployee = async (inputs) => {
  try {
    const { data } = await axios({
      data: inputs,
      method: 'POST',
      url: '/auth/login',
    })
    console.log(data)
    const { token } = data
    setAxiosHeader(token)
    return data
  } catch (e) {
    console.log('error in login')
    console.log(e.message)
  }
}

const setAxiosHeader = (token) => {
  axios.defaults.headers.common['authorization'] = token
}

export { loginEmployee }