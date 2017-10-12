import { Container, Header, Content, Footer, FooterTab, Button, Text, Left, Right, Icon, Body, Title, Form, Item, Label, Input, List, Badge } from 'native-base';
import React, { Component } from 'react';
import { observer } from "mobx-react";
import {NativeRouter, Route, Link} from 'react-router-native';
import {View} from 'react-native';
import MyList from './MyList';
import MyLogin from './MyLogin';
import MyPost from './MyPost';
import MyDetail from './MyDetail';




export default observer (class MyContent extends Component {

  render() {
    return (
      <NativeRouter>
      <Container style= {{ backgroundColor: '#fff5ee' }}>
        <Content>

          <Route path="/x" component={MyLogin} />
          <Route path="/y" render={
          ()=> <MyPost store ={this.props.store}/>} />
          <Route path="/z" render={
          ()=> <MyList x={false} store ={this.props.store}/>} />
          <Route path="/Detail" component={MyDetail} />


        </Content>
        <Footer>
         <FooterTab>
           <Button vertical>
             <Link to="/x">
             <View>
             <Icon style={{left:8}} name="contact" />
             <Text>Login</Text>
             </View>
           </Link>
           </Button>


           <Button vertical>
             <Link to="/y">
             <View>
             <Icon style={{left:15}} name="create" />
             <Text>Create</Text>
             </View>
           </Link>
           </Button>

           <Button vertical>
             <Link to="/z">
             <View>
             <Icon style={{left:5}} name="list" />
             <Text>List</Text>
             </View>
           </Link>
           </Button>

         </FooterTab>
       </Footer>
        </Container>
        </NativeRouter>



    );
  }
}
)
// const styles = StyleSheet.create({
// backgroundColor:"#cd853f"
// });
