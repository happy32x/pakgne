import React from 'react'
import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import { Constants } from 'expo'

export default class Sample extends React.Component {
  render() {
    return(
      <View style={styles.listItem}>
                <View style={styles.imageWrapper}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={{
                      uri: this.props.data.icon_img === '' ||
                        this.props.data.icon_img === null
                        ? 'https://via.placeholder.com/70x70.jpg'
                        : this.props.data.icon_img,
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>
                    {this.props.data.display_name}
                  </Text>
                  <Text style={styles.subtitle}>
                    {this.props.data.public_description}
                  </Text>
                </View>
              </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 6,
  },
  imageWrapper: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 6,
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'left',
    margin: 6,
  },
});