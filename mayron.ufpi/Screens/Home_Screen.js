import React, { Component } from 'react';
import { StyleSheet, View, LogBox, AsyncStorage } from 'react-native';
import FirebaseService from './Components/FirebaseService'

import SearchModule from './Components/SearchModule'
import NoticiaModule from './Components/NoticiaModule'


/*eslint-disable*/
LogBox.ignoreLogs(['Setting a timer'])

class Home_Screen extends Component {
  state ={
    tags: [],
    Noticias: [],
    search: "",
    last_Pressed_Title: null
  }
  checked = (key) =>{
    let tags = this.state.tags
    for(let i in tags){
      if(tags[i].key === key){
        tags[i].checked = !tags[i].checked
      }
    }
    this.setState({tags: tags})
  }
  onKnowMorePress = async(index) =>{
    try{
      await AsyncStorage.setItem('luneta_Key', this.state.Noticias[index].id)
    }catch(error){
      console.log(error)
    }
    this.props.navigation.navigate('Reader')
  }
  componentDidMount = async() =>{
    await FirebaseService.getAllTagData((dataReceived) =>{this.setState({tags: dataReceived})})
    await FirebaseService.getAllNoticiaData((dataReceived) =>{this.setState({Noticias: dataReceived})})
  }
  render(){
    return (
      <View style={styles.container}>
        <SearchModule
          tags={{list: this.state.tags, checked: this.checked}}
          searchBar={(text) =>{this.setState({search: text})}}
        />
        <NoticiaModule
          state={this.state}
          onTitlePress={(index)=>{
            if(index !== this.state.last_Pressed_Title){
              this.setState({last_Pressed_Title: index})
            }else{
              this.setState({last_Pressed_Title: null})
            }
          }}
          onKnowMorePress={this.onKnowMorePress}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
export default Home_Screen;