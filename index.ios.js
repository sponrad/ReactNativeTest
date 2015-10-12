/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";

var FirstProject = React.createClass({
  getInitialState: function() {
    return {
      background: '#F5FCFF',
    };
  },

  componentWillMount: function(){
    fetch('http://alignthebeat.appspot.com')
      .then(res => res.json())
      .then(res => this.setState({ epoch: res.epoch }));
  },

  render: function(){
    if (!this.state.epoch){
      return this.renderLoadingView();
    }
    return (
      <View
      style={[styles.columncontainer, {background: this.state.background}]}
      >
      
      <View style={styles.item}>
      <Text>Main screen</Text>
      </View>

      <View style={styles.item}>
      <Text>Server Epoch: {this.state.epoch}</Text>
      </View>
      
      <View style={styles.item}>
      <Text style={styles.button}>Change Background</Text>
      </View>

      <View style={styles.item}>
      <Text style={styles.button}>Revert Background</Text>
      </View>

      </View>
    );
  },

  renderLoadingView: function(){
    return(
      <View style={styles.container}>
      <Text>
      Fetching data...
      </Text>
      </View>
    );
  },

});
  
var MovieList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderMovie}
      style={styles.listView}
      />
    );  
  },

  renderLoadingView: function(){
    return(
      <View style={styles.container}>
      <Text>
      Loading movies...
      </Text>
      </View>
    );
  },

  _onPressButton: function(){
    return(
      <View>
      <Text>
      Button
      </Text>
      </View>
    );
  },
  
  renderMovie: function(movie) {
    return (
      <View style={styles.container}>

      <Image
      source={{uri: movie.posters.thumbnail}}
      style={styles.thumbnail}
      />

      <View style={styles.rightContainer}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.year}>{movie.year}</Text>
      </View>
      
      </View>
    );
  },
  
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listview: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  button: {
    flex: 1,
    backgroundColor: '#5555FC',
    width: 175,
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 15,
    color: '#FAFAFA',
  },
  columncontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginBottom: 20,
  },
});

AppRegistry.registerComponent('FirstProject', () => FirstProject);
