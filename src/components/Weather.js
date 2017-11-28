import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import {
  Card,
  CardHeader,
  CardText,
  Divider,
} from 'material-ui'
import { ApiUrls } from '../utils/Constants'
import List from './List'


const Weather = (props) => {
  return (
    <div>
      <div className="form-wrap">
        <Form
          query={props.location.query}
          router={props.router}
        />
        <List
          dataKey="history"
          router={props.router}
        />
        <List
          dataKey="favorites"
          router={props.router}
        />
      </div>

      <Divider className="divider" />

      <div className="weather-list">
        {
          props.error ?
            <div>Not Found</div> :
            props.list.map((item) => {
              return (
                <Card
                  key={item.dt}
                  className="list-item"
                >
                  <CardHeader
                    title={new Date(item.dt * 1000).toLocaleDateString()}
                    subtitle={item.weather[0].description}
                    avatar={ApiUrls.imgUrl(item.weather[0].icon)}
                  />
                  <CardText>
                    <div className="bold">Temperature:</div>
                    <div>Morning {item.temp.morn}°</div>
                    <div>Day {item.temp.day}°</div>
                    <div>Evening {item.temp.eve}°</div>
                    <div>Night {item.temp.night}°</div>
                  </CardText>
                </Card>
              )
            })
        }
      </div>
    </div>
  )
}


export default connect(
  state => ({
    query: state.routing.locationBeforeTransitions.query,
    list: state.data.list,
    error: state.data.error,
    state,
  }),
  dispatch => ({}),
)(Weather)