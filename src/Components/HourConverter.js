import React from 'react'
import Moment from 'react-moment'
import { Text } from 'react-native'
import 'moment/locale/fr'

class HourConverter extends React.Component {
  render() {
    return (
      <Moment
        //locale="fr"
        element={Text}
        format="hh:mm"
        unix       
      >
        {this.props.publishAt}
      </Moment>
    )
  }
}

export default HourConverter
