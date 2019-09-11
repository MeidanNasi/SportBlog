import React, {useContext} from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import {Context} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';



const IndexScreen = ({ navigation })=> {

    const {state, deleteBlogPost} = useContext(Context);

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