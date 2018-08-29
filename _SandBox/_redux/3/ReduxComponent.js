import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text, View } from 'react-native'

export default class ReduxComponent extends React.Component {
    constructor(props) {
        super(props)
        this.incrementAsync = this.incrementAsync.bind(this)
        this.incrementIfOdd = this.incrementIfOdd.bind(this)
    }

    incrementIfOdd() {
        this.props.value % 2 !== 0 ? this.props.onIncrement() : null
    }

    incrementAsync() {
        setTimeout(this.props.onIncrement, 1000)
    }

    render() {
        const {value, onIncrement, onDecrement} = this.props
        return (
			<View>
                <Text>Clicked: {value} times</Text>
                <Button title='+' onPress={onIncrement} /> 
                <Button title='-' onPress={onDecrement} /> 
                <Button title='+odd' onPress={this.incrementIfOdd} /> 
                <Button title='+async' onPress={this.incrementAsync} /> 
            </View>
        )
    }
}

ReduxComponent.propTypes = {
    value: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
}
