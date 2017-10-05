import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Button, Text } from 'native-base';
import {View} from 'react-native';
import { Checkbox, checkboxStyle } from 'nachos-ui';
import { observer } from "mobx-react";

export default observer (class MyPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      secondChecked: true,
      title: "",
      detail: "",
      publish: ""

    };

  }

  handleSecondCheckboxChange = (secondChecked) => {
    this.setState({ secondChecked })


  }

  handlePostSubmit(e){
  fetch('http://139.59.119.40/api/create/',{
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
    Authorization: 'JWT ' + this.props.store.token
  },
    body: JSON.stringify({
      "title": this.state.title,
      "content": this.state.detail,
      "publish": this.state.publish
      // "draft": this.post_draft.value

    })})

  }
  // success:function(res){ console.log(res) },
  // error: function(xhr,status,err){console.log(err)}

  render() {
//     const postForm = (
//   <form onSubmit={this.handlePostSubmit.bind(this)}>
//     <label>Title</label>
//     <input type='text' placeholder='title' onChange='post_title'/>
//     <div></div>
//     <label>Content</label>
//     <input type='password' placeholder='content' onChange='post_contet'/>
//     <label>Publish</label>
//     <input type='date' placeholder='date' ref='post_publish'/>
//     <input type='submit'/>
//   </form>
// )
     const checkboxStyle = { margin: 15 }
    return (
      <Container>
        <Header />
        <Content>
          <Item floatingLabel>
          <Input  type='text' placeholder="Title" onChangeText={ (x) => this.setState({title:x})}/>
          </Item>
          <Item>
            <Input type='text' placeholder="Content" onChangeText={ (x) => this.setState({detail:x})}/>
          </Item>
          <Item floatingLabel last>
            <Input  type='date' placeholder="Publish Date" onChangeText={ (x) => this.setState({publish:x})}/>
          </Item>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={checkboxStyle}
            kind='circle'
            checked={this.state.secondChecked}
            onValueChange={this.handleSecondCheckboxChange}

          />

      </View>
      <Button full onPress={this.handlePostSubmit.bind(this)}>
        <Text>Publish</Text>
      </Button>




        </Content>
      </Container>
    );
  }
}
)
