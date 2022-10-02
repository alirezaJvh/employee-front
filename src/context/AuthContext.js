import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN': {
    console.log('login action')
    console.log(action)
    const obj = saveToken(state, action)
    return obj
  }
  case 'LOGOUT': {
    const obj = clearToken()
    return obj
  }
  default:
    return state
  }
}

const initAuthState = () => {
  const token = localStorage.getItem('token')
  let employee = localStorage.getItem('employee')
  employee = JSON.parse(employee)
  return {
    token,
    employee,
    isAuth: !!token,
  }
}

const saveToken = (state, { payload }) => {
  const {employee, token} = payload
  localStorage.setItem('employee', JSON.stringify(employee))
  localStorage.setItem('token', JSON.stringify(token))
  return {
    ...state,
    employee,
    token,
    isAuth: true,
  }
}

const clearToken = () => {
  localStorage.clear()
  return {
    isAuth: false,
    user: null,
    token: null,
  }
}

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initAuthState())
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider }