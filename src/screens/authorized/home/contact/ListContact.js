import React, { Component} from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
//import { DrawerButton} from '../../../../components/DrawerButton';
import { fetchListContact } from '../../../../actions';
class ListContact extends Component{
    static navigationOptions = {
        title: 'Contacts'
    }
    componentWillMount(){
        console.log(this.props);
        this.props.fetchListContact(this.props);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps);
    }

    createDataSource({contacts}){
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1!==r2
        });
        this.dataSource = ds.cloneWithRows(contacts);
    }

    onRowPressed = (friend) =>{
        this.props.navigation.navigate('Conversation', {friend});
    }

    renderRow = ( item ) => {
        return(
            <TouchableOpacity onPress={this.onRowPressed.bind(this, item)} style={styles.row}>
                
                    <Image source={{ uri: item.photoURL}} style={styles.avator}/>
                    <Text style={styles.name}>{item.displayName}</Text>
                
            </TouchableOpacity>
        );
    }
    render(){
        if(this.props.loading){
            return(
                <View style={styles.containerIndecator}>
                    <ActivityIndicator size="large" color="red" animating/>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource} 
                    renderRow = {this.renderRow.bind(this)}
                />
            </View>
        )
    }
}

const styles = {
    container:{
        flex:1
    },
    containerIndecator:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        height:50,
        backgroundColor:'#ccc',
        borderBottomWidth: 1,
        borderBottomColor:'red'
    },
    avator:{
        width:50,
        height:50,
        borderWidth:1
    },
    name:{
        fontSize: 18,
        paddingLeft: 15,
    }
}

export default connect(state => ({ 
    contacts: state.contact.contacts, 
    loading: state.contact.loading,
}), { fetchListContact })(ListContact);