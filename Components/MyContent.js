import { Container, Header, Content, Footer, FooterTab, Button, Text, Left, Right, Icon, Body, Title, Form, Item, Label, Input, List, Badge } from 'native-base';
import React, { Component } from 'react';
import { observer } from "mobx-react";
import {NativeRouter, Route, Link} from 'react-router-native';
import {View} from 'react-native';
import MyList from './MyList';
import MyLogin from './MyLogin';
import MyPost from './MyPost';




export default observer (class MyContent extends Component {

  render() {
    return (
      <NativeRouter>
      <Container>
        <Content>

          <Route path="/x" component={MyLogin} />
          <Route path="/y" component={MyPost} />
            <Route path="/z" component={MyList}/>


        </Content>
        <Footer>
         <FooterTab>
           <Button badge vertical>
             <Link to="/x">
             <View>
             <Badge><Text>2</Text></Badge>
             <Icon name="apps" />
             <Text>Login</Text>
             </View>
           </Link>
           </Button>


           <Button vertical>
             <Link to="/y">
             <View>
             <Icon name="camera" />
             <Text>Create</Text>
             </View>
           </Link>
           </Button>

           <Button active badge vertical>
             <Link to="/z">
             <View>
             <Badge ><Text>51</Text></Badge>
             <Icon active name="navigate" />
             <Text>List</Text>
             </View>
           </Link>
           </Button>

           <Button vertical>
             <Link to="/a">
             <View>
             <Icon name="person" />
             <Text>Contact</Text>
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
