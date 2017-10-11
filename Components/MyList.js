import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import { observer } from "mobx-react";
import {ListView, View,TouchableOpacity} from 'react-native';
import MyHeader from './MyHeader';
import MyDetail from './MyDetail';
import { Link} from 'react-router-native';
import MyStore from '../Store';


  export default observer (class MyList extends Component {
  constructor(props){
    super(props);
    var x = this.props.x;
    this.state={
      url:"http://139.59.119.40/api/list/?format=json",
      nextUrl: "",
      previousUrl: "",
      detailUrl:"",
      editmode: x,
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      }),
    };
  }
  componentWillMount(){
    if (!this.props.store.loaded) {
    this.fetchData();
  } else {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.store.dataSource),
                    nextUrl:this.props.store.nextUrl,
                    previousUrl:this.props.store.previousUrl
                  })

  }
  }


  fetchData(){
    fetch(this.state.url)
    .then((x) => x.json())
    .then((y) => {
      this.setState({nextUrl: y.next,
                    previousUrl: y.previous,
                    dataSource: this.state.dataSource.cloneWithRows(y.results)
                  })
      if (!this.props.store.loaded){
      this.props.store.dataSource = y.results;
      this.props.store.nextUrl = y.next,
      this.props.store.previousUrl = y.previous,
      this.props.store.loaded = true;
    }
    })
    .catch((error) => console.log(error)).done();
  }
  renderItem(object){
    return(
    <ListItem>
      <Text>{object.title} </Text>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

      <TouchableOpacity primary>
      <Link to="/Detail" onPress={this.renderDetail.bind(this,object.detail)}>
      <View>
       <Text>Detail</Text>
     </View>
 </Link>
</TouchableOpacity>
</View>

    </ListItem>
  )
  }


  renderDetail(detailurl){
      this.setState({detailUrl: detailurl, editmode: true});
      MyStore.detailUrl = detailurl
  }
  nextPage(){
    this.setState({url: this.state.nextUrl}, this.fetchData.bind(this))
  }
  previousPage(){
    this.setState({url: this.state.previousUrl}, this.fetchData.bind(this))
  }

  render() {
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

}
)
