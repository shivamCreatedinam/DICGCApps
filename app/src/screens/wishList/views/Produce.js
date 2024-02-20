import React, { Component } from 'react'
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Produce = () => {
    return (
    <ScrollView>
    <View style={styles.product}>
        <ImageBackground imageStyle={{ borderRadius: 5}} style={styles.imageMain} source={{uri:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}}>
            <Text style={styles.productImage}>
                <Image source={require('../../../../res/images/Image/newProduct.png')}/>NEW LAUNCH
            </Text>
        </ImageBackground>
        <View style={styles.flex}>
            <View>
                <View style={styles.likeMain}>
                    <Text style={styles.font}>
                        Jade Queen Size Double Bed
                    </Text>
                    <TouchableOpacity>
                        {/* <Image width={70} height={70} source={require('../../../../res/images/Image/likeRed.png')}/> */}
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonMain}>
                    <View>
                        <Text style={styles.fontSize}>₹720 / month</Text>
                        <Text style={styles.price}>₹729 / month</Text>
                    </View>
                   <TouchableOpacity style={styles.button}>
                        {/* <Image style={styles.image} source={require('../../../../res/images/Image/blackTruck.png')}/> */}
                        <Text style={styles.time}>4-5 days</Text>
                   </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.mainButton}>
            <TouchableOpacity style={styles.removeButton}>
                <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.add}>Remove</Text>
            </TouchableOpacity>
        </View>
    </View>
    <View style={styles.productEmpaty}>
        {/* <Image width={70} height={70} style={styles.images} source={require('../../../../res/images/Image/heart.png')}/> */}
        <Text style={styles.text}>Haven’t made any wish yet?</Text>
        <Text style={styles.texts}>Explore our products and put the one’s you like in the Wishlist</Text>
        <TouchableOpacity style={styles.explorButton}>
                <Text style={styles.explor}>Explore products</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    productEmpaty:{
        backgroundColor:'#E5E5E5',
        padding:15,
        height:windowHeight-50
    },
    images:{
        marginTop:'10%'
    },
    product:{
        margin:10
    },
    explorButton:{
        width:'50%',
        borderRadius:10,
        borderColor:'#222222',
        borderWidth:2,
        borderStyle:'solid',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        margin:2,
        marginTop:40,
    },
    explor:{
        color:'#222222',
        fontSize:16
    },
    texts:{
      fontSize:16,
      marginTop:10,
      color:'#9A9AA2',
    },
    text:{
      fontSize:22,
      marginTop:20,
      fontWeight:'700'
    },
    time:{
        fontSize:14,
        fontWeight:'600'
    },
    image:{
        width:25,
        height:25,
        marginRight:5
    },
    price:{
        color:'#9A9AA2',
        fontSize:16
    },
    fontSize:{
        fontSize:20
    },
    flex:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    font:{
        color:'#9A9AA2',
        fontSize:16
    },
    productImage:{
        padding:5,
        backgroundColor:'green',
        width:'30%',
        height:'8%',
        fontWeight:'600',
        fontSize:12,
        color:'white',
        borderRadius:5
    },
    imageMain:{
        width:windowWidth-20,
        height:windowHeight/2,
        flexDirection:'row'
    },
    likeMain:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'89%',
        marginBottom:10,
        marginTop:10
    },
    button:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#E3E1DC',
        width:'auto',
        padding:7,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:50
    },
    buttonMain:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'89%',
    },
    mainButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },
    removeButton:{
        width:'50%',
        borderRadius:10,
        borderColor:'#E5E5E5',
        borderWidth:2,
        borderStyle:'solid',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        margin:2
    },
    remove:{
        color:'#71717A',
        fontSize:16
    },
    addButton:{
        width:'50%',
        borderRadius:10,
        borderColor:'#E5E5E5',
        borderWidth:2,
        borderStyle:'solid',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        margin:2,
        backgroundColor:'#48678B'
    },
    add:{
        color:'white',
        fontSize:16
    }
})

export default Produce
