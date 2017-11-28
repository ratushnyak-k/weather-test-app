import {
  takeEvery,
} from 'redux-saga'
import {
  call,
  put,
} from 'redux-saga/effects'
import {
  ApiUrls,
  findBy,
} from '../utils/Constants'
import {
  FETCH_FORECAST,
  SET_SUCCESS_FORECAST,
  SET_ERROR_FORECAST,
} from '../reducers/data'
import Logger from '../utils/Logger'
import API from '../utils/API'


const apiRequest = async (url, data) => {
  try {
    return await API.getData(url, data)
  } catch (error) {
    Logger.error(error)
  }
}

function generateParams(payload) {
  let params = {
    units: payload.units,
  }
  if (payload.findBy === findBy.city) {
    params.q = `${payload.city}${payload.country ? ',' + payload.country : ''}`
  } else {
    params.zip = payload.zip
  }

  params.cnt = payload.period
  return params
}


function* fetchForecast({payload}) {
  try {
    const response = yield call(apiRequest, ApiUrls.future, generateParams(payload))

    yield put({
      type: SET_SUCCESS_FORECAST, payload: {
        list: response.data.list,
        error: false,
      },
    })
  } catch (error) {
    yield put({
      type: SET_ERROR_FORECAST, payload: {
        error: true,
        list: [],
      },
    })
  }
}

function* watcherForecast() {
  yield takeEvery(FETCH_FORECAST, fetchForecast)
}

export default function* rootSaga() {
  yield [
    watcherForecast(),
  ]
}