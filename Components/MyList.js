import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import { observer } from "mobx-react";
import {ListView} from 'react-native';
import MyHeader from './MyHeader';


  export default observer (class MyList extends Component {
  constructor(props){
    super(props);
    this.state={
      url:"http://139.59.119.40/api/list/?format=json",
      nextUrl: "",
      previousUrl: "",
      detailUrl:"",
      editmode: false,
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      }),
    };
  }
  componentWillMount(){
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
      this.setState({nextUrl: y.next, previousUrl: y.previous, dataSource: this.state.dataSource.cloneWithRows(y.results)})
      this.props.store.dataSource = y.results;
      this.props.store.loaded = true;
    })
    .catch((error) => console.log(error)).done();
  }
  renderItem(object){
    return(
    <ListItem>
      <Text>{object.title}</Text>
       <Button primary onPress={this.renderDetail.bind(this,object.detail)}><Text> Detail </Text></Button>

    </ListItem>
  )
  }
  renderDetail(detailurl){
      this.setState({detailUrl: detailurl, editmode: true});

  }
  nextPage(){
    this.setState({url: this.state.nextUrl}, this.fetchData.bind(this))
  }
  previousPage(){
    this.setState({url: this.state.previousUrl}, this.fetchData.bind(this))
  }

  render() {
    if (!this.state.editmode){
    return (
      <Container>
        <MyHeader headerText={'List'}/>
        <Text>{this.state.detailUrl}</Text>
          <List>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderItem.bind(this)} />
              <Button primary onPress={this.nextPage.bind(this)}><Text> Next </Text></Button>
               <Button primary onPress={this.previousPage.bind(this)}><Text> Previous </Text></Button>

          </List>
      </Container>
    );
  }
  else {
    <EditComponent url={this.state.detailUrl} />
  }
}

}
)
