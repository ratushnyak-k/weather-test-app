import React from 'react'
import { connect } from 'react-redux'
import {
  Divider,
  List as MUIList,
  ListItem,
  Subheader,
} from 'material-ui'
import {
  findBy,
  periods,
  units,
} from '../utils/Constants'


const List = ({list, router, dataKey}) => {
  const renderText = (item) => {
    const isCity = item.findBy === findBy.city
    const city = `${item.city}${item.country ? ',' + item.country : ''}`
    const zip = `ZIP - ${item.zip}`
    const period = periods.filter((option) => {
      return option.value === item.period
    })[0].text
    const thisUnits = item.units === units.metric ? '°C' : '°F'

    return `${isCity ? city : zip} - ${period}. ${thisUnits}`
  }
  return (
    <div className="list-wrap">
      <Subheader>{dataKey} list</Subheader>
      <MUIList className="list">
        {
          list.map((item, i) => {
            return [
              <ListItem
                key={i + '-list-' + dataKey}
                primaryText={renderText(item)}
                onClick={() => {
                  router.push({
                    ...router.location,
                    query: item,
                  })
                }}
              />,
              <Divider key={item.id + '-divider'} />,
            ]
          })
        }
      </MUIList>
    </div>
  )
}


export default connect(
  (state, ownProps) => ({
    list: state[ownProps.dataKey],
  }),
)(List)