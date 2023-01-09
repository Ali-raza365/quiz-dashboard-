import ACTIONS from './index'
import axios from 'axios'
import { GET_USER_API } from '@/api'

export const dispatchLogin = (token) => {
    return {
        type: ACTIONS.LOGIN,
        payload:token,
    }
}

export const fetchUser = async (token) => {
    const res = await axios({
        method: 'post',
        url: GET_USER_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: {
          token: token
        }
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}