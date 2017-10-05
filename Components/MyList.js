import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { observer } from "mobx-react";
import {ListView} from 'react-native';


  export default observer (class MyList extends Component {
  constructor(props){
    super(props);
    this.state={
      url:"http://139.59.119.40/api/list/?format=json",
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      }),
    };
  }
  componentDidMount(){
    if (!this.props.store.loaded) {
    this.fetchData();
  } else {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.store.dataSource)})
  }
  }


  fetchData(){
    fetch(this.state.url)
    .then((x) => x.json())
    .then((y) => {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(y.results)})
      this.props.store.dataSource = y.results;
      this.props.store.loaded = true;
    })
    .catch((error) => console.log(error)).done();
  }
  renderItem(object){
    return(
    <ListItem>
      <Text>{object.title}</Text>
    </ListItem>
  )
  }
  render() {
    return (
      <Container>
          <List>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderItem} />

          </List>
      </Container>
    );
  }
}
)
