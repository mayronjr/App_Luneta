import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import {CheckBox, Input, Icon} from 'react-native-elements';

function SearchModule({tags, searchBar}){
    return(
        <View style={styles.container}>
            <View style={styles.tagsBar}>
                <ScrollView horizontal={true}>
                    {tags.list.map((tag, index)=>{
                        return(
                            <View key={index}>
                                <CheckBox
                                    title={tag.Nome}
                                    checked={tag.checked}
                                    onPress={() => tags.checked(tag.key)}
                                />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={styles.searchBar}>
                <Input
                    placeholder="Barra de Pesquisa"
                    leftIcon={<Icon name='search' size={24} color="black"/>}
                    onChangeText={(value)=>searchBar(value)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tagsBar:{
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    searchBar:{
        height: 60,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
});
export default SearchModule;