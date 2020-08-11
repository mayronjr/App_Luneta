import React, { Component } from 'react';
import {WebView} from 'react-native-webview';
import { StyleSheet, View, Text, Dimensions, ScrollView, Image, YellowBox, AsyncStorage} from 'react-native';
import FirebaseService from './Components/FirebaseService'

import findTags from './Components/findTags'
import Node from './Components/Node'

var {width, height} = Dimensions.get('window');

/*eslint-disable*/
YellowBox.ignoreWarnings(['Setting a timer'])

function isArray (value) {
    return value && typeof value === 'object' && value.constructor === Array;
}

function formatDate(data){
    let date = new Date(data)
    let dd = date.getDate().toString()
    if(dd.length == 1){
        dd = '0' + dd
    }
    let MM = (date.getMonth() + 1).toString()
    if(MM.length == 1){
        MM = '0' + MM
    }
    let yyyy = date.getFullYear().toString()
    let hh = date.getHours().toString()
    if(hh.length == 1){
        hh = '0' + hh
    }
    let mm = date.getMinutes().toString()
    if(mm.length == 1){
        mm = '0' + mm
    }
    let ss = date.getSeconds().toString()
    if(ss.length == 1){
        ss = '0' + ss
    }
    return dd + '/' + MM + '/' + yyyy + ' (' + hh + ':' + mm + ':' + ss + ')'
}

class Reader_Screen extends Component {
    state={
        Links: [],
        Conteudo: []
    }
    componentDidMount = async() =>{
        let key = await AsyncStorage.getItem('luneta_Key')
        await FirebaseService.getNoticiaData(key, async(dataReceived)=>{
            for(let i in dataReceived.Conteudo){
                if(dataReceived.Conteudo[i].type === 1){
                    findTags(
                        dataReceived.Conteudo[i].cont,
                        dataReceived.Links,
                        0,
                        (result)=>{
                            if(result.length !== 1){
                                dataReceived.Conteudo[i].cont = result
                            }
                        }
                    )
                }
                if(dataReceived.Conteudo[i].type === 0){
                    await FirebaseService.downloadImage(dataReceived.Conteudo[i].cont, (url)=>{
                        dataReceived.Conteudo[i].cont = url
                    })
                }
            }
            this.setState(dataReceived)
        })
    }
    render(){
        var {width, height} = Dimensions.get('window');
        let date1 = formatDate(this.state.Data_Criacao)
        let date2 = formatDate(this.state.Ultima_Edicao)
        return (
        <View style={styles.container}>
            <Text style={styles.Titulo}>{this.state.Titulo}</Text>
            <ScrollView>
                <Text style={styles.Datas}>Data de Criação: {date1}</Text>
                <Text style={styles.Datas}>Data da Ultima Edição: {date2}</Text>
                <Text style={styles.Resumo}>{this.state.Resumo}</Text>
                {this.state.Conteudo.map((paragrafo, index) =>{
                    if(paragrafo.type === 1){
                        if(!isArray(paragrafo.cont)){
                            return(
                                <Text style={styles.Conteudo} key={index}>{paragrafo.cont}</Text>
                            )
                        }else{
                            return(
                                <Text key={index}>
                                    <Node links={this.state.Links} text={paragrafo.cont}/>
                                </Text>
                                
                            )
                        }
                    }
                    if(paragrafo.type === 0){
                        return(
                            <View key={index}>
                                <Text style={{color: 'red', fontWeight: 'bold'}}>Devido a erros não identificados, as imagens carregados do banco de dados não estão a ser exibidos</Text>
                                <Image source={{uri: paragrafo.cont}}/>
                                <Text style={styles.Datas}>{paragrafo.legenda}</Text>
                            </View>
                        )
                    }
                    if(paragrafo.type === 2){
                        return(
                            <View key={index}>
                                <Text style={{color: 'red', fontWeight: 'bold'}}>Devido a erros não identificados, as imagens carregados da internet não estão a ser exibidos</Text>
                                <Image source={{uri: paragrafo.cont}}/>
                                <Text style={styles.Datas}>{paragrafo.legenda}</Text>
                            </View>
                        )
                    }
                    if(paragrafo.type === 3){
                        console.log("Link de video", paragrafo)
                        return(
                            <View key={index}>
                                <WebView
                                    style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    source={{uri: paragrafo.cont }}
                                />
                                <Text>Aqui tem um puta video da internet</Text>
                                <Text style={styles.Datas}>{paragrafo.legenda}</Text>
                            </View>
                        )
                    }
                })}
            </ScrollView>
        </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  Titulo:{
    fontSize: 21,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  Resumo:{
    fontWeight: 'bold',
    marginVertical: 10,
  },
  Datas:{
    fontSize: 13,
    color: '#A1A2A2'
  },
  Conteudo:{
    marginBottom: 10,
  }
});
export default Reader_Screen;