import {
  findBy,
  units,
} from '../utils/Constants'

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'

const initData = [
  {
    city: 'Odessa',
    country: 'UA',
    period: '14',
    units: units.metric,
    zip: '',
    findBy: findBy.city
  },
  {
    city: 'Kiev',
    country: 'UA',
    period: '14',
    units: units.metric,
    zip: '',
    findBy: findBy.city
  },
  {
    city: 'Lviv',
    country: 'UA',
    period: '14',
    units: units.metric,
    zip: '',
    findBy: findBy.city
  },
]

export default function reducer(state = initData, {type, payload}) {
  switch (type) {
    case ADD_TO_FAVORITES:
      return [{...payload}, ...state]
    default:
      return state
  }
}
