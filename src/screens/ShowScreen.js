import React, { useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Context} from '../context/BlogContext';



const ShowScreen = ( {navigation} )=>{

    const id = navigation.getParam('id'); // getting the id of the blogpost we tapped on
    const {state} = useContext(Context); // getting the list of the blogpost

    const blogPost = state.find((blogPost)=> blogPost.id === id); // looking for the right blogpost we tapped on 

    return(
        <View>

            <Text>{blogPost.title}</Text>

        </View>


    );
};

const styles = StyleSheet.create({});
export default ShowScreen;