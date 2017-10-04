import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Button, Text } from 'native-base';
import {View} from 'react-native';
import { Checkbox, checkboxStyle } from 'nachos-ui';


export default class MyPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstChecked: true,
      secondChecked: true
    };

  }

  handleSecondCheckboxChange = (secondChecked) => {
    this.setState({ secondChecked })
  }



  render() {
     const checkboxStyle = { margin: 15 }
    return (
      <Container>
        <Header />
        <Content>
          <Item rounded>
            <Input placeholder="Rounded Textbox"/>
          </Item>
          <Item>
            <Input placeholder="Rounded Textbox"/>
          </Item>

        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={checkboxStyle}
            kind='circle'
            checked={this.state.secondChecked}
            onValueChange={this.handleSecondCheckboxChange}
          />

      </View>
      <Button full>
        <Text>Publish</Text>
      </Button>




        </Content>
      </Container>
    );
  }
}
