import { combineReducers } from 'redux'
import * as AuthActions from '../actions/AuthActions'
import * as ProfileActions from '../actions/ProfileActions'

function user(state = {}, action) {
    switch (action.type) {
        case AuthActions.LOGIN_SUCCESS:
        case AuthActions.VERIFY_SUCCESS:
            return action.user;
        case ProfileActions.UPDATE_ACCOUNT_INFO_SUCCESS:
        case ProfileActions.UPDATE_AUTH_USER_SUCCESS:
            var user = action.user;
            return {...state, ...user};
        case AuthActions.LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

function isAuthenticating(state = false, action) {
    switch (action.type) {
        case AuthActions.LOGIN_START:
        case AuthActions.LOGOUT_START:
            return true;
        case AuthActions.LOGIN_SUCCESS:
        case AuthActions.LOGOUT_SUCCESS:
        case AuthActions.LOGIN_FAILED:
        case AuthActions.LOGOUT_FAILED:
            return false;
        default:
            return state;
    }
}

function isVerifying(state = false, action) {
    switch (action.type) {
        case AuthActions.VERIFY_START:
            return true;
        case AuthActions.VERIFY_SUCCESS:
        case AuthActions.VERIFY_FAILED:
            return false;
        default:
            return state;
    }
}

function isAuthenticated(state = false, action) {
    switch (action.type) {
        case AuthActions.LOGIN_SUCCESS:
        case AuthActions.VERIFY_SUCCESS:
            return true;
        case AuthActions.LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }
}

function isRegistering(state = false, action) {
    switch (action.type) {
        case AuthActions.REGISTER_START:
            return true;
        case AuthActions.REGISTER_SUCCESS:
        case AuthActions.REGISTER_FAILED:
            return false;
        default:
            return state;
    }
}

function isRegistered(state = false, action) {
    switch (action.type) {
        case AuthActions.REGISTER_SUCCESS:
            return true;
        case AuthActions.RESET_PASSWORD_START:
        case AuthActions.RESET_PASSWORD_FAILED:
            return false;
        default:
            return state;
    }
}

function isResetting(state = false, action) {
    switch (action.type) {
        case AuthActions.RESET_PASSWORD_START:
            return true;
        case AuthActions.RESET_PASSWORD_SUCCESS:
        case AuthActions.RESET_PASSWORD_FAILED:
            return false;
        default:
            return state;
    }
}

function isReset(state = false, action) {
    switch (action.type) {
        case AuthActions.RESET_PASSWORD_SUCCESS:
        case AuthActions.RESET_PASSWORD_CONFIRM_SUCCESS:
            return true;
        case AuthActions.RESET_PASSWORD_START:
        case AuthActions.RESET_PASSWORD_FAILED:
        case AuthActions.RESET_PASSWORD_CONFIRM_START:
        case AuthActions.RESET_PASSWORD_CONFIRM_FAILED:
            return false;
        default:
            return state;
    }
}

function error(state = {}, action) {
    switch (action.type) {
        case AuthActions.LOGIN_FAILED:
            var error = action.error;
            if(error.non_field_errors == 'Unable to log in with provided credentials.') {
                error.non_field_errors = 'Wrong username or password';
            }
            return {...state, auth: error};
        case AuthActions.LOGIN_START:
        case AuthActions.LOGIN_SUCCESS:
            return {...state, auth: null};
        case AuthActions.REGISTER_FAILED:
            return {...state, register: action.error};
        case AuthActions.REGISTER_START:
        case AuthActions.REGISTER_SUCCESS:
            return {...state, register: null};
        case AuthActions.RESET_PASSWORD_FAILED:
            return {...state, reset: action.error};
        case AuthActions.RESET_PASSWORD_START:
        case AuthActions.RESET_PASSWORD_SUCCESS:
            return {...state, reset: null};
        case AuthActions.RESET_PASSWORD_CONFIRM_FAILED:
            return {...state, reset_confirm: action.error};
        case AuthActions.RESET_PASSWORD_CONFIRM_START:
        case AuthActions.RESET_PASSWORD_CONFIRM_SUCCESS:
            return {...state, reset_confirm: null};
        default:
            return state;
    }
}

const Auth = combineReducers({
    user,
    isAuthenticating,
    isVerifying,
    isAuthenticated,
    isRegistering,
    isRegistered,
    isResetting,
    isReset,
    error
});

export default Auth;
