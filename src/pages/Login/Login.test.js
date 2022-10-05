/* eslint-disable */
import '@testing-library/jest-dom'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import API mocking utilities from Mock Service Worker.
import {rest} from 'msw'
import {setupServer} from 'msw/node'
// import testing utilities
import {render, fireEvent, screen} from '@testing-library/react'
import Login from './Login.jsx'

const fakeUserResponse = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzgwOThkM2E4MGJhMmU4MWRhZDljMCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY2NDg5NDQ4Nn0.uu_uI7XW3oxKcjY4AGukdkq7g26rHbXFUCUqY1BIUrU'}

const server = setupServer(
    rest.post('/auth/login', (req, res, ctx) => {
        return res(ctx.json(fakeUserResponse))
    }),
)

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

beforeAll(() => server.listen())


afterEach(() => {
    server.resetHandlers()
    window.localStorage.removeItem('token')
})

test('User loggin successfully', async () => {
    render((<BrowserRouter>
                <Routes>   
                    <Route path="*" element= {<Login policyTypes={false} />}/>
                </Routes>
            </BrowserRouter>)
    )
    
    fireEvent.change(screen.getByLabelText(/username/i), {
        target: {value: 'reyhan'},
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
        target: {value: '12345'},
    })
    fireEvent.click(screen.getByText(/submit/i))
})