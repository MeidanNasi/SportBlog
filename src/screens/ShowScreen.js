import React, { useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Context} from '../context/BlogContext';
import {EvilIcons} from '@expo/vector-icons';



const ShowScreen = ( {navigation} )=>{

    const id = navigation.getParam('id'); // getting the id of the blogpost we tapped on
    const {state} = useContext(Context); // getting the list of the blogpost

    const blogPost = state.find((blogPost)=> blogPost.id === id); // looking for the right blogpost we tapped on 

    return(
        <View>

            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>

        </View>


    );
};

ShowScreen.navigationOptions = ({ navigation })=>{
    return {
        
        headerRight: <TouchableOpacity onPress={()=> navigation.navigate("Edit", { id : navigation.getParam('id')})}> 
                        <EvilIcons name="pencil" style={styles.iconplus} size={40} />
                     </TouchableOpacity>
    };
};




const styles = StyleSheet.create({});
export default ShowScreen;