import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Item, Button, Input } from 'native-base';
import { observer } from "mobx-react";
import {ListView} from 'react-native';
import MyHeader from './MyHeader';
import MyStore from '../Store';



  export default observer (class MyDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      dataSource: "",
      title: "",
      content: "",
      publish: "",
      slug: "",
      comment:"",
      object_pk:"",
      author: "",
      datacomment: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      }),
    };
  }
  componentWillMount(){
    this.fetchData()
  }


  fetchData(){
    fetch(MyStore.detailUrl)
    .then((x) => x.json())
    .then((y) => {
      this.setState({title: y.title,
                    content:y.content,
                    publish:y.publish,
                    slug:y.slug,
                    author:y.author,
                    datacomment: this.state.datacomment.cloneWithRows(y.comments),
                    object_pk:y.id,

      }, console.log(y.comments));
    })
    .catch((error) => console.log(error)).done();

  }

  handlePostEdit(){
    fetch('http://139.59.119.40/api/update/'+ this.state.slug+"/" ,{
    method: 'PUT',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': 'JWT ' + MyStore.token,
  },
    body: JSON.stringify({
      // "author": "1",
      "title": this.state.title,
      "slug": this.state.slug,
      "content": this.state.content,
      "publish": this.state.publish
    })})
    .then((res) => {console.log(res);})
    .catch((error) => {console.log(error)}).done();
}

  createComment(){
    console.log(this.state.comment)
    fetch('http://139.59.119.40/api/comment/create/' ,{
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': 'JWT ' + MyStore.token,
  },
    body: JSON.stringify({
      "comment": this.state.comment,
      "object_pk": this.state.object_pk
    })})
    .then((res) => {console.log(res);})
    .catch((error) => {console.log(error)}).done();
  }


  deleteItem(){
    fetch('http://139.59.119.40/api/delete/'+ this.state.slug+"/" ,{
    method: 'DELETE',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': 'JWT ' + MyStore.token,
  },
    body: JSON.stringify({
      // "author": "1",
      "title": this.state.title,
      "slug": this.state.slug,
      "content": this.state.content,
      "publish": this.state.publish
    })})

  }
  renderComment(object){
    if (object.comment) {
    return(
    <ListItem>
      <Text>{object.comment}</Text>
       {/* <Button primary onPress={this.renderDetail.bind(this,object.detail)}><Text> Detail </Text></Button> */}

    </ListItem>
  )
}}

  render() {
    if(MyStore.username===this.state.author.username){
    return (
      <Container>
        <MyHeader headerText={'Detail'}/>
        <Item floatingLabel>
        <Input  type='text' value={this.state.title} onChangeText={ (x) => this.setState({title:x})}/>
        </Item>
        <Item>
          <Input type='text' value={this.state.content} onChangeText={ (x) => this.setState({detail:x})}/>
        </Item>
        <Item floatingLabel last>
          <Input  type='date' value={this.state.publish} onChangeText={ (x) => this.setState({publish:x})}/>
        </Item>
        <Button primary onPress={this.deleteItem.bind(this)}><Text> Delete </Text></Button>
        <Button primary onPress={this.handlePostEdit.bind(this)}><Text> Edit </Text></Button>
        <List>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.datacomment}
          renderRow={this.renderComment.bind(this)} />
        </List>
        <Item>
          <Input type='text' value={this.state.comment} onChangeText={ (x) => this.setState({comment:x})}/>
        </Item>
        <Button primary onPress={this.createComment.bind(this)}><Text> Create </Text></Button>
        {/* <List>
        <ListView
          datacomment={this.state.datacomment}
          renderRow={this.renderComment.bind(this)} />
        </List> */}

        {/* <Input autoCapitalize='none' type='text' onChangeText={ (x) => this.setState({username:x})}/> */}

      </Container>
    );}
    else{
      return(
      <Container>
        <MyHeader headerText={'Detail'}/>
        <Item floatingLabel>
        <Input  type='text' value={this.state.title}/>
        </Item>
        <Item>
          <Input type='text' value={this.state.content}/>
        </Item>
        <Item floatingLabel last>
          <Input  type='date' value={this.state.publish}/>
        </Item>
        <List>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.datacomment}
          renderRow={this.renderComment.bind(this)} />
        </List>
        <Item>
          <Input type='text' value={this.state.comment} onChangeText={ (x) => this.setState({comment:x})}/>
        </Item>
        <Button primary onPress={this.createComment.bind(this)}><Text> Create </Text></Button>


      </Container>
    )
    }
  }
}
)
