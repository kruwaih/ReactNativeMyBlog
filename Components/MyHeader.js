import { Container, Header, Content, Footer, FooterTab, Button, Text, Left, Right, Icon, Body, Title, Form, Item, Label, Input } from 'native-base';
import React, { Component } from 'react';
import { observer } from "mobx-react";

export default observer (class MyHeader extends Component {
  componentDidMount(){
    console.log('hi')
  }
  render() {
    return (

        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>

        </Header>


    );
  }
}
);
