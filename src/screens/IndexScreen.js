import React, {useContext, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import {Context} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';



const IndexScreen = ({ navigation })=> {

    const {state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(()=>{ // useEffect = is used to make sure that we only run some bit of code ONE time, when a component is first rendered it calls use effect
        getBlogPosts();
        const listener = navigation.addListener('didFocus', ()=>{ getBlogPosts(); } ) // anytime we are on IndexScreen, call blogposts() again to refresh the posts
        return ()=>{ {listener.remove();}} // to avoid memory leak
    }, []); // that empty array defines it calling just one time

    return(
    <View>
        <FlatList 
        data ={state} 
        keyExtractor={(blogPosts)=> blogPosts.title}
        renderItem={({ item })=> {
                return (
                <TouchableOpacity onPress={()=>navigation.navigate('Show', {id: item.id})}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{item.title}-{item.id}</Text>
                        <TouchableOpacity onPress={()=> deleteBlogPost(item.id)}>
                            <Feather style={styles.icon} name="trash" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                        );
        }}
        />
    </View>
    );   };


IndexScreen.navigationOptions = ({ navigation })=>{
    return {
        
        headerRight: <TouchableOpacity onPress={()=> navigation.navigate("Create")}> 
                        <Feather name="plus" style={styles.iconplus} size={30} />
                     </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    row: {
        borderTopWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20, 
        paddingHorizontal: 10
    },
    title: {
        fontSize:18
    },
    icon:{
        fontSize:24
    },
    iconplus:{
        marginRight: 10  
    }
});
export default IndexScreen;