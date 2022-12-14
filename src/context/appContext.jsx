import React, { useContext, useReducer } from 'react'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  IMPORT_REPO_BEGIN,
  IMPORT_REPO_SUCCESS,
  IMPORT_REPO_ERROR,
  GET_REPOS_BEGIN,
  GET_REPOS_SUCCESS,
  GET_DETAIL_BEGIN,
  GET_DETAIL_SUCCESS,
  DELETE_REPO_BEGIN,
  DELETE_REPO_SUCCESS,
  CHANGE_PAGE,
  CLEAR_FILTERS,
  TOGGLE_SIDEBAR,
  SET_SELECTEDLIST,
  GET_DETAILS_BEGIN,
  GET_DETAILS_SUCCESS
} from './actions'
import axios from 'axios'
import reducer from './reducer'

const user = localStorage.getItem('user')

export const initialState = {
  isLoading: false,
  showAlert: false,
  user: user ? JSON.parse(user) : null,
  alertText: '',
  alertType: '',
  showSidebar: false,
  repos: [],
  detail: {},
  totalRepos: 0,
  viewMyRepos: false,
  page: 1,
  numOfPages: 1,
  search: '',
  selectedList: [],
  details: [] // 选中的列表的信息
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: 'http://localhost:4538/'
  })

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT
    })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT
      })
    }, 3000)
  }

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value }
    })
  }

  const registerUser = async currentUser => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const { data } = await authFetch.post('/register', currentUser)
      const { name } = data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { name }
      })

      addUserToLocalStorage({ userName: name, email: currentUser.email })
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const loginUser = async currentUser => {
    dispatch({ type: LOGIN_USER_BEGIN })
    console.log(currentUser)
    try {
      const { data } = await authFetch.post('/login', currentUser)
      const { name } = data
      const email = currentUser.email
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { name }
      })

      addUserToLocalStorage({ userName: name, email })
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const addUserToLocalStorage = ({ userName, email }) => {
    localStorage.setItem('user', JSON.stringify({ userName, email }))
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
  }
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const importRepo = async repoInfo => {
    dispatch({ type: IMPORT_REPO_BEGIN })
    try {
      const { user } = state
      const { owner, repoName } = repoInfo

      authFetch
        .post('/import', {
          owner,
          repoName,
          user
        })
        .then(res => {
          console.log('成功', res)
          dispatch({
            type: IMPORT_REPO_SUCCESS
          })
          getRepos()
        })
        .catch(err => {
          console.log('失败', err)
          dispatch({
            type: IMPORT_REPO_ERROR,
            payload: { msg: err?.response?.data?.response?.data?.message }
          })
          clearAlert()
        })
    } catch (error) {
      dispatch({
        type: IMPORT_REPO_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const getRepos = async () => {
    dispatch({ type: GET_REPOS_BEGIN })
    try {
      const { search } = state
      const { data } = await authFetch.post('/search', { search })
      const { repos } = data
      dispatch({
        type: GET_REPOS_SUCCESS,
        payload: {
          repos
        }
      })
    } catch (error) {
      // logoutUser()
    }
  }

  const getDashBoard = async id => {
    dispatch({ type: GET_DETAIL_BEGIN })
    try {
      let myDetail = null
      state.details.forEach(item => {
        if (item._id === id) {
          myDetail = item
        }
      })
      if (!myDetail) {
        const { data } = await authFetch.post('/dashboard', { id })
        const { detail } = data
        myDetail = detail
      }
      dispatch({
        type: GET_DETAIL_SUCCESS,
        payload: {
          detail: myDetail
        }
      })
    } catch (error) {
      // logoutUser()
    }
  }

  const deleteRepo = async id => {
    dispatch({ type: DELETE_REPO_BEGIN })
    try {
      const { data } = await authFetch.post('/delete', { id })
      dispatch({ type: DELETE_REPO_SUCCESS })
    } catch (error) {
      // logoutUser()
    }
    getRepos()
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const changePage = page => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const setSelectedRepos = selectedList => {
    console.log('分发值', selectedList)
    dispatch({
      type: SET_SELECTEDLIST,
      payload: {
        selectedList
      }
    })
  }

  const getAllSelectedReposInfo = async () => {
    console.log('请求获取信息', state.details)

    try {
      dispatch({ type: GET_DETAILS_BEGIN })
      const details = state.details

      state.selectedList.forEach(async item => {
        let flag = true
        state.details.forEach(it => {
          console.log('对比', it._id, item.key)
          if (it._id === item.key) {
            flag = false
          }
        })
        if (flag) {
          const { data } = await authFetch.post('/dashboard', { id: item.key })
          const { detail } = data
          details.push(detail)
        }
      })
      dispatch({
        type: GET_DETAILS_SUCCESS,
        payload: {
          details
        }
      })
    } catch (error) {
      // logoutUser()
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        registerUser,
        loginUser,
        logoutUser,
        importRepo,
        getRepos,
        getDashBoard,
        deleteRepo,
        toggleSidebar,
        changePage,
        clearFilters,
        setSelectedRepos,
        getAllSelectedReposInfo
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
