export const FETCH_FORECAST = 'FETCH_FORECAST'
export const SET_SUCCESS_FORECAST = 'SET_SUCCESS_FORECAST'
export const SET_ERROR_FORECAST = 'SET_ERROR_FORECAST'

const initData = {
  list: [],
  error: false,
}

export default function reducer(state = initData, {type, payload}) {
  switch (type) {
    case SET_SUCCESS_FORECAST:
      return payload
    case SET_ERROR_FORECAST:
      return payload
    default:
      return state
  }
}
