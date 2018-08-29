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
import { fetchListGroup } from '../../../../actions';
class ListGroup extends Component{
    static navigationOptions = {
        title: 'Group'
    }
    componentWillMount(){
       
        this.props.fetchListGroup(this.props);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
       
        this.createDataSource(nextProps);
    }

    createDataSource({groups}){
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1!==r2
        });
        this.dataSource = ds.cloneWithRows(groups);
    }

    onRowPressed = (groupDetail) =>{
        //console.log('friend', friend);
        // if(){

        // }else{

        // }
        this.props.navigation.navigate('viewgroup', { groupDetail });
    }

    renderRow = ( item ) => {
        return(
            <TouchableOpacity onPress={this.onRowPressed.bind(this, item)} style={styles.row}>
                
                    <Image source={{ uri: item.photoURL}} style={styles.avator}/>
                    <Text style={styles.name}>{item.Name}</Text>
                
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
        borderBottomWidth: 1,
        borderBottomColor:'red'
    },
    avator:{
        width:50,
        height:50,
        borderWidth:1
    },
    name:{
        // fontSize: 18,
        paddingLeft: 15,
    }
}
const mapStateToProps = (state) => {
    console.log('mapStateToProps Group', state);
    return {
        groups: state.group.groups,
        loading: state.group.loading,
    };
};

export default connect(mapStateToProps, { fetchListGroup })(ListGroup);