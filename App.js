import React, { Component } from 'react';
import { Container} from 'native-base';
import { observer } from "mobx-react";
import {NativeRouter} from 'react-router-native';
import MyContent from './Components/MyContent';
import MyPost from './Components/MyPost';
import MyList from './Components/MyList';
import MyLogin from './Components/MyLogin';
import MyStore from './Store';

export default observer (class App extends Component {

  render() {
    if(MyStore.authenticated){
    return (
      <Container>
        <MyContent store={MyStore}/>
      </Container>
    );
  }
    else{
    return (
      <Container>
        <MyLogin store={MyStore}/>
      </Container>
    );
  }

  }
}
);
