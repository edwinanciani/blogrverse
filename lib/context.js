import {createContext } from 'react'

export const UserContext = createContext({user: null, username: null})

export const PortfolioContext = createContext({portfolio: null, set: null})