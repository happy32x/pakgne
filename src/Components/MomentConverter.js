import React from 'react'
import Moment from 'react-moment'
import { Text } from 'react-native'
import 'moment/locale/fr'

class MomentConverter extends React.Component {
  render() {
    return (
      <Moment locale="fr" element={Text} fromNow>{this.props.publishAt}</Moment>
    )
  }
}

export default MomentConverter
