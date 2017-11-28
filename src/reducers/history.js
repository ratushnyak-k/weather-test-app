export const ADD_TO_HISTORY = 'ADD_TO_HISTORY'

const initData = []

export default function reducer(state = initData, {type, payload}) {
  switch (type) {
    case ADD_TO_HISTORY:
      return [{...payload}, ...state]
    default:
      return state
  }
}
