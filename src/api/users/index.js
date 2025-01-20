import callApi from '@/api/callApi'
import {
  changePassWordUser,
  changePassWordUserFail,
  changePassWordUserSuccess,
  changeStatusUser,
  changeStatusUserFail,
  changeStatusUserSuccess,
  createUser,
  createUserFail,
  createUserSuccess,
  deleteUser,
  deleteUserFail,
  deleteUserSuccess,
  getDetailUser,
  getDetailUserFailure,
  getDetailUserSuccess,
  getListUser,
  getListUserFailure,
  getListUserSuccess,
  updateUser,
  updateUserFail,
  updateUserSuccess,
} from '@/states/modules/user'
import _ from 'lodash'

export const getListUsers = () => async (dispatch, getState) => {
  const dataFilter = getState().user.dataFilter
  let path = `users?per_page=${dataFilter.perPage}&page=${dataFilter.page}`
  
  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`
  }
  
  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`
  }
  
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      getListUser,
      getListUserSuccess,
      getListUserFailure
    ],
    variables: {},
    dispatch,
    getState,
  })
}

export const getDetailUsers = (id) => (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `users/${id}`,
    actionTypes: [
      getDetailUser,
      getDetailUserSuccess,
      getDetailUserFailure
    ],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleCreateUser = (data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  }
  
  return callApi({
    method: 'post',
    apiPath: 'users',
    actionTypes: [
      createUser,
      createUserSuccess,
      createUserFail
    ],
    variables: {...data},
    dispatch,
    getState,
    headers,
  })
}

export const handleUpdateUser = (id, data) => async (dispatch, getState) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  }
  
  let dataUser = _.cloneDeep(data)
  delete dataUser?._id
  
  if (dataUser.avatar !== '' && typeof dataUser.avatar === 'string') {
    delete dataUser.avatar
  }
  
  return callApi({
    method: 'put',
    apiPath: `users/${id}`,
    actionTypes: [
      updateUser,
      updateUserSuccess,
      updateUserFail
    ],
    variables: {...dataUser},
    dispatch,
    getState,
    headers,
  })
}

export const handleChangeStatusUser = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `users/${id}/update-status`,
    actionTypes: [
      changeStatusUser,
      changeStatusUserSuccess,
      changeStatusUserFail
    ],
    variables: {
      status: data,
    },
    dispatch,
    getState,
  })
}

export const handleChangePassUser = (id, data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `users/${id}/reset-password`,
    actionTypes: [
      changePassWordUser,
      changePassWordUserSuccess,
      changePassWordUserFail
    ],
    variables: {
      ...data,
    },
    dispatch,
    getState,
  })
}

export const handleDeleteUser = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `users/${id}`,
    actionTypes: [
      deleteUser,
      deleteUserSuccess,
      deleteUserFail
    ],
    variables: {},
    dispatch,
    getState,
  })
}
