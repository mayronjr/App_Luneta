import React, { Component } from 'react'
import {Text, Linking} from 'react-native';


function isArray (value) {
    return value && typeof value === 'object' && value.constructor === Array;
}

class Node extends Component {
    constructor(props){
        super(props)
        this.state = {
            text: props.text,
            links: props.links
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.text, 
            links: nextProps.links
        });
    }

    render() {
        let parte_inicio = null
        if(this.state.text[0] !== undefined){
            parte_inicio = this.state.text[0]
        }else{
            parte_inicio = this.state.text
        }
        let parte_meio = null, link = null
        if(this.state.text[1] !== undefined){
            parte_meio = this.state.text[1]
            for(let i in this.state.links){
                if(this.state.links[i].tag === parte_meio.tag){
                    console.log(this.state.links[i], parte_meio)
                    link = this.state.links[i].link
                }
            }
        }
        let parte_fim = null
        if(this.state.text[2] !== undefined){
            parte_fim = this.state.text[2]
        }

        return (
            <Text>
                {parte_inicio}
                {parte_meio !== null ? (
                    parte_meio.tag === 'b' ? (
                        <Text style={{fontWeight: 'bold'}}>
                            {isArray(parte_meio.parts) ? <Node links={this.state.links} text={parte_meio.parts}/> : parte_meio.parts}
                        </Text>
                    ) : parte_meio.tag === 'i' ? (
                        <Text style={{fontStyle: 'italic'}}>
                            {isArray(parte_meio.parts) ? <Node links={this.state.links} text={parte_meio.parts}/> : parte_meio.parts}
                        </Text>
                    ) : parte_meio.tag === 'u' ? (
                        <Text style={{textDecorationLine: 'underline'}}>
                            {isArray(parte_meio.parts) ? <Node links={this.state.links} text={parte_meio.parts}/> : parte_meio.parts}
                        </Text>
                    ) : parte_meio.tag !== undefined ? (
                        <Text style={{color: 'blue'}}
                            onPress={() => Linking.openURL('http://google.com')}
                        >
                        {isArray(parte_meio.parts) ? <Node text={parte_meio.parts}/> : parte_meio.parts}
                        </Text>
                    ) : <Text>{parte_meio}</Text>
                ) : null}

                {parte_fim !== null ? (
                    parte_fim.tag === 'b' ? (
                        <Text style={{fontWeight: 'bold'}}>
                            {isArray(parte_fim.parts) ? <Node links={this.state.links} text={parte_fim.parts}/> : parte_fim.parts}
                        </Text>
                    ) : parte_fim.tag === 'i' ? (
                        <Text style={{fontStyle: 'italic'}}>
                            {isArray(parte_fim.parts) ? <Node links={this.state.links} text={parte_fim.parts}/> : parte_fim.parts}
                        </Text>
                    ) : parte_fim.tag === 'u' ? (
                        <Text style={{textDecorationLine: 'underline'}}>
                            {isArray(parte_fim.parts) ? <Node links={this.state.links} text={parte_fim.parts}/> : parte_fim.parts}
                        </Text>
                    ) : parte_fim.tag !== undefined ? (
                        <Text style={{color: 'blue'}}
                            onPress={() => Linking.openURL('http://google.com')}
                        >
                            {isArray(parte_fim.parts) ? <Node text={parte_fim.parts}/> : parte_fim.parts}
                        </Text>
                    ) : isArray(parte_fim) ? <Node links={this.state.links} text={parte_fim}/> : parte_fim
                ) : null}
            </Text>
        );
    }
}

export default Node