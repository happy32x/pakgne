import React from 'react'
import { 
  Text,
  StyleSheet,
} from 'react-native'

import THEME from '../INFO/THEME'

class HourConverter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
    this.localDate = null
  }

  timeZone = () => {
    let foreignDate = new Date(1578677440262) //1578677440262 -> this.props.publishAt
    let localDateString = foreignDate.toLocaleString("en-US", {timeZone: "Australia/Brisbane"}) //Australia/Brisbane -> this.props.timeZone
    let localDate = new Date(localDateString)
  }
  
  componentDidMount(){

  }

  render() {
    return (
      <Text style={styles.option_area_text}>
        {this.localDate.getHours()}:{}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  option_area_text: {
    color: THEME.TERTIARY.COLOR,
    fontSize: 12,
  },
})

export default HourConverter