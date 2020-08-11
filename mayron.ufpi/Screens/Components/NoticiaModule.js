import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity  } from 'react-native';
import {CheckBox, Input, Icon} from 'react-native-elements';

var {width, height} = Dimensions.get('window');

function tags_filter(tags){
    let iguais = []
    for(let i in tags){
        if(tags[i].checked){
            iguais.push(tags[i].key)
        }
    }
    return iguais
}

function NoticiaModule({state, onTitlePress, onKnowMorePress}){
    let filter = tags_filter(state.tags)
    return(
        <View style={styles.container}>
            <ScrollView>
                {state.Noticias.map((noticia, index) =>{
                    let exibir = true
                    let titulo = noticia.Titulo.toLowerCase(), search = state.search.toLowerCase()
                    let tags_noticia = noticia.tags
                    //Se o titulo for pesquisado
                    if(search !== ''){
                        exibir = String(titulo).includes(search)
                    }
                    //Filtro de Tags
                    if(filter.length > 0 && filter.length < state.tags.length){
                        let finded = false
                        for(let i in filter){
                            for(let j in tags_noticia){
                                if(tags_noticia[j] === filter[i]){
                                    finded = true
                                }
                            }
                        }
                        if(!finded){
                            exibir = false
                        }
                    }
                    return(
                        <View key={index}>
                            {exibir ? (
                                <View style={{borderWidth: 1, borderColor: '#D0D4D2', marginVertical: 3}}>
                                    <TouchableOpacity  style={styles.box_titulo} onPress={()=>{onTitlePress(index)}}>
                                        <Text style={styles.button_title}>{noticia.Titulo}</Text>
                                    </TouchableOpacity>
                                    {state.last_Pressed_Title === index ? (
                                        <View style={styles.box_resumo}>
                                            <Text style={{color: '#A1A2A2', fontSize: 13, paddingHorizontal: 10}}>Autor: {noticia.Autor}</Text>
                                            <Text>{noticia.Resumo}</Text>
                                            <Text
                                                style={styles.button_KnowMore}
                                                onPress={()=>onKnowMorePress(index)}
                                            >Continue a Ler</Text>
                                        </View>
                                    ) : null}
                                </View>
                            ) : null}
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    box_titulo:{
        width: width,
        marginVertical: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    box_resumo:{
        marginHorizontal: 15
    },
    button_title:{
        backgroundColor: 'white',
        color: 'black',
        paddingVertical: 5,
        paddingHorizontal: 15,
        textAlign: 'center',
        fontSize: 20
    },
    button_KnowMore: {
        color: 'blue',
        paddingVertical: 10,
    }
});
export default NoticiaModule;