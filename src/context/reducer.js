import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  IMPORT_REPO_BEGIN,
  IMPORT_REPO_SUCCESS,
  IMPORT_REPO_ERROR,
  GET_REPOS_BEGIN,
  GET_REPOS_SUCCESS,
  GET_DETAIL_BEGIN,
  GET_DETAIL_SUCCESS,
  DELETE_REPO_BEGIN,
  DELETE_REPO_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  SET_SELECTEDLIST,
  GET_DETAILS_BEGIN,
  GET_DETAILS_SUCCESS
} from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'error',
      alertText: 'Please provide all values!'
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }

  if (action.type === HANDLE_CHANGE) {
    // page will become important later
    return { ...state, page: 1, [action.payload.name]: action.payload.value }
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.name,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...'
    }
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg
    }
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...'
    }
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null
    }
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar }
  }

  if (action.type === IMPORT_REPO_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === IMPORT_REPO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Repo import successfully!'
    }
  }
  if (action.type === IMPORT_REPO_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg
    }
  }

  if (action.type === GET_REPOS_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === GET_REPOS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      repos: action.payload.repos
    }
  }

  if (action.type === GET_DETAIL_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === GET_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      detail: action.payload.detail
    }
  }

  if (action.type === GET_DETAILS_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === GET_DETAILS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      details: action.payload.details
    }
  }

  if (action.type === DELETE_REPO_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === DELETE_REPO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Repo delete successfully!'
    }
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page }
  }

  if (action.type === CLEAR_FILTERS) {
    return { ...state, search: '', searchStatus: 'all', searchType: 'all' }
  }
  if (action.type === SET_SELECTEDLIST) {
    return { ...state, selectedList: new Set([...action.payload.selectedList]) }
  }

  throw new Error(`no such action : ${action}`)
}

export default reducer
