import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Form, Item, Input, Label, Button } from 'native-base';
import { observer } from "mobx-react";
import auth from './auth';
import MyHeader from './MyHeader';
import MyContent from './MyContent';


export default observer(class MyLogin extends Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
    }
  };
  ButtonPress(e){
    auth.login(this.state.username, this.state.password)
  }
  componentWillMount(){
    auth.firstLoad();

  }

  render() {


    return (
      <Container>
      <MyHeader headerText={'Login'}/>
      <Form>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input autoCapitalize='none' type='text' onChangeText={ (x) => this.setState({username:x})}/>
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input secureTextEntry={true} type='password' onChangeText={ (x) => this.setState({password:x})}/>
        </Item>
        <Text>
        </Text>
        <Button style={{position:'relative', justifyContent:'space-around', width:350, alignItems:'center', left:8}} rounded onPress={this.ButtonPress.bind(this)}><Text> Login </Text></Button>
      </Form>
      </Container>


    );
  }
}
)
