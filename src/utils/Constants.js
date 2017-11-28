export const apiConstants = {
  weather: {
    baseURL: '//api.openweathermap.org/data/2.5/',
    apiKey: '1a648b6737568f3f8f510d09f689c6c5',
  },
}

export const ApiUrls = {
  future: 'forecast/daily/',
  imgUrl: (id) => `http://openweathermap.org/img/w/${id}.png`
}

export const periods = [
  {
    text: 'Today',
    value: '1',
  },
  {
    text: 'Tomorrow',
    value: '2',
  },
  {
    text: 'One week',
    value: '7',
  },
  {
    text: 'Two weeks',
    value: '14',
  },
]

export const findBy = {
  city: 'city',
  zip: 'zip',
}

export const units = {
  metric: 'metric',
  imperial: 'imperial',
}