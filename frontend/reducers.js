import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import createReducers from './utils/createReducers'

import api from './services/api/reducers'
import app from './views/app/reducers'
import register from './views/register/reducers'
import auth from './views/login/reducers'

const reducers = createReducers({
    api,
    app,
    register,
    auth
})

export default combineReducers(Object.assign(reducers, {
    router: routerStateReducer
}))
