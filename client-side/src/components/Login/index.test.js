import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { shallow, mount, configure } from 'enzyme';
import wait from 'waait';
import AuthContext from '../../context/Provider/AuthContext';
import Adapter from 'enzyme-adapter-react-16';
import Login from './index';

configure({adapter: new Adapter()});

const mockConsoleMethod = (realConsoleMethod) => {
  const ignoredMessages = [
    'test was not wrapped in act(...)',
    'A component is changing an uncontrolled input'
  ]

  return (message, ...args) => {
    const containsIgnoredMessage = ignoredMessages.some(ignoredMessage => message.includes(ignoredMessage))

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args)
    }
  }
}

console.warn = jest.fn(mockConsoleMethod(console.warn))
console.error = jest.fn(mockConsoleMethod(console.error))

const formValues = {
  email: 'fdw@mailinator.com',
  password: 'test123',
};
const authProps = {
  isAuthenticated: false,
  user: {},
  setUser: jest.fn(),
};

let wrapper;
wrapper = mount(
  <AuthContext.Provider value={{ auth: authProps }}>
    <Login {...formValues}/>
  </AuthContext.Provider>
);

describe('Login', ()=>{
  it('render without error', async () => {
    console.log(wrapper)
  });
});
