import React from 'react'
import {
  IconButton,
  MenuItem,
  RadioButton,
  RaisedButton,
  SelectField,
  TextField,
} from 'material-ui'
import { connect } from 'react-redux'
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

import {
  findBy,
  periods,
  units,
} from '../utils/Constants'
import {
  FETCH_FORECAST,
} from '../reducers/data'
import { ADD_TO_HISTORY } from '../reducers/history'
import { ADD_TO_FAVORITES } from '../reducers/favorites'

class Form extends React.Component {
  state = {
    city: this.props.query.city || '',
    country: this.props.query.country || '',
    period: this.props.query.period || '1',
    units: this.props.query.units || units.metric, // or imperial
    zip: this.props.query.zip || '',
    findBy: this.props.query.findBy || findBy.city // or findBy.zip
  }

  componentDidMount() {
    if (this.state.city || this.state.zip) {
      this.onSubmit()
      this.props.fetchForecast(this.state)
      this.props.addToHistory(this.state)
    }
  }

  componentWillReceiveProps(nextProps) {
    const thisPropsJSON = JSON.stringify(this.props.query)
    const nextPropsJSON = JSON.stringify(nextProps.query)
    if (thisPropsJSON !== nextPropsJSON) {
      this.setState(() => {
          return Object.assign({}, this.state, nextProps.query)
        },
        () => {
          this.onSubmit()
          nextProps.fetchForecast(this.state)
          nextProps.addToHistory(this.state)
        })
    }

  }

  updateForm = (name, value) => {
    this.setState(() => {
      return {
        [name]: value,
      }
    })
  }

  onChange = (e, value) => {
    this.updateForm(e.target.name, value)
  }

  onSelect = (e, index, value) => {
    this.updateForm('period', value)
  }

  onSubmit = (e) => {
    e && e.preventDefault()

    if (e) {
      this.props.router.push({
        ...this.props.router.location,
        query: this.state,
      })
    }
  }

  addToFavorites = () => {
    this.props.addToFavorites(this.state)
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className="form"
      >
        <div>
          <div>
            <RadioButton
              name="findBy"
              checked={this.state.findBy === findBy.city}
              onCheck={this.onChange}
              value={findBy.city}
              label="Check by city and country"
            />
          </div>
          <div className="inline-field-wrap">
            <div className="inline-field">
              <TextField
                fullWidth={true}
                className="inline-field"
                floatingLabelText="City"
                name="city"
                onChange={this.onChange}
                value={this.state.city}
                disabled={this.state.findBy !== findBy.city}
              />
            </div>
            <div className="inline-field">
              <TextField
                fullWidth={true}
                floatingLabelText="Country Code"
                hintText="e.g. UA"
                onChange={this.onChange}
                name="country"
                value={this.state.country}
                disabled={this.state.findBy !== findBy.city}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <RadioButton
              name="findBy"
              value={findBy.zip}
              checked={this.state.findBy === findBy.zip}
              label="Check by ZIP"
              onCheck={this.onChange}
            />
          </div>
          <div>
            <TextField
              fullWidth={true}
              floatingLabelText="ZIP"
              hintText="e.g. UA"
              onChange={this.onChange}
              name="zip"
              value={this.state.zip}
              disabled={this.state.findBy !== findBy.zip}
            />
          </div>
        </div>
        <SelectField
          fullWidth={true}
          value={this.state.period}
          onChange={this.onSelect}
          name="period"
        >
          {
            periods.map((period) => {
              return <MenuItem
                key={period.value}
                value={period.value}
                primaryText={period.text}
              />
            })
          }
        </SelectField>
        <div className="inline-field-wrap">
          <div className="inline-field">
            <RadioButton
              name="units"
              value={units.metric}
              checked={this.state.units === units.metric}
              label="°C"
              onCheck={this.onChange}
            />
          </div>
          <div className="inline-field">
            <RadioButton
              name="units"
              value={units.imperial}
              checked={this.state.units === units.imperial}
              label="°F"
              onCheck={this.onChange}
            />
          </div>
        </div>
        <div className="btn-wrap">
          <div className="submit">
            <RaisedButton
              fullWidth={true}
              primary={true}
              type="submit"
              label="Submit"
            />
          </div>
          <div className="star">
            {
              this.props.isFavorite(this.state) ?

                <IconButton
                  tooltip="Already added to favorite list">
                  <Star color="gold" />
                </IconButton> :
                <IconButton
                  onClick={this.addToFavorites}
                  tooltip="Add to Favorite list"
                >
                  <StarBorder color="gold" />:
                </IconButton>
            }
          </div>
        </div>
      </form>
    )
  }
}

export default connect(
  state => ({
    form: state.form,
    isFavorite: (currentState) => {
      return !!state.favorites.filter((item) => {
        return JSON.stringify(item) === JSON.stringify(currentState)
      }).length
    },
  }),
  (dispatch, ownProps) => ({
    addToHistory: (payload) => {
      dispatch({type: ADD_TO_HISTORY, payload})
    },
    addToFavorites: (payload) => {
      dispatch({type: ADD_TO_FAVORITES, payload})
    },
    fetchForecast: (payload) => {
      dispatch({type: FETCH_FORECAST, payload})
    },
  }),
)(Form)
