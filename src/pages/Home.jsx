import React, { memo } from 'react'
import { useEmployees } from '../hooks/useEmployees'

function Home() {
  const { employees } = useEmployees()
  {console.log('Home')}
  {console.log(employees)}
  return (
    <div>
      this is home page
      {employees.map(employee => <div key={employee.id}>{employee.username}</div>)}
    </div>
  )
}

export default memo(Home)