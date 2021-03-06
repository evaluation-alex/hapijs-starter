import { pushState } from 'redux-router'
import { loggedIn } from '../app/actions'

export function registrationRequest() {
    return {
        type: 'REGISTER_REQUEST',
    }
}

export function registrationSuccess(user) {
    return {
        type: 'REGISTER_SUCCESS',
        payload: user
    }
}

export function registrationFailure(validationErrors) {
    return {
        type: 'REGISTER_FAILURE',
        payload: validationErrors
    }
}

let validateUser = function(user) {
    let validationErrors = []

    if (user.username.length < 5) {
        validationErrors.push({
            path: 'username',
            message: 'Must be at least 5 characters long'
        })
    }

    if (user.password.length < 5) {
        validationErrors.push({
            path: 'password',
            message: 'Must be at least 5 characters long'
        })
    }

    if (user.repeatPassword !== user.password) {
        validationErrors.push({
            path: 'repeatPassword',
            message: 'Passwords need to match'
        })
    }

    return validationErrors
}

export function registerUser(user) {

    return function(dispatch) {
        dispatch(registrationRequest())

        let validationErrors = validateUser(user)

        if (validationErrors.length > 0) {
            dispatch(registrationFailure(validationErrors))
            return
        }

        dispatch({
            type: 'API_POST',
            uri: '/api/users',
            payload: user,
            onSuccess: (dispatch, result) => {
                dispatch(registrationSuccess(result))
                dispatch(loggedIn(result))
                dispatch(pushState(null, '/'))
            },
            onError: (dispatch, error) => {
                dispatch(registrationFailure(error.validationErrors))
            }
        })
    }
}
