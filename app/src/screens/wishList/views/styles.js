import { StyleSheet } from 'react-native';
import { heightScale, isPlatformIOS, myHeight, myWidth, shadow } from '../../../utility/Utils';
import resources from '../../../../res';
const windowWidth = myWidth;
const windowHeight = myHeight;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: resources.colors.white,
    
  },
  nameTextStyle: {
    marginTop: 3,
    color: resources.colors.blueText,
    fontFamily: resources.fonts.bold,
    fontSize: 12,
    marginHorizontal: 7,
    height: 20,
    borderWidth: 0
  },
  priceTextStyle: {
    color: resources.colors.timerColor,
    fontFamily: resources.fonts.medium,
    fontSize: 12,
  },

  heartImageStyle: {
    height: 15,
    width: 15,
  },
  textView: {
    width: '50%',
    textAlignVertical: 'center',
    padding: 10,
    color: resources.colors.timerColor

  },
  cellStyle: {

    height: !isPlatformIOS ? heightScale(210) : 200,
    minWidth: (myWidth / 2) - 25,
    maxWidth: (myWidth / 2) - 25,
    marginHorizontal: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: resources.colors.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  rowDirection: {
    flexDirection: 'row'
  },
  viewPrice: {
    marginTop: 4,
    alignItems: 'center'
  },
  viewOfButton: {
    marginHorizontal: 10,
    marginBottom: 8
  },
  textBtn: {
    fontSize: 11,
    fontFamily: resources.fonts.regular,
    color: resources.colors.blueText,
  },
  btnStyle: {
    borderRadius: 5,
    borderColor: resources.colors.blueText,
    height: 26,
  },
  imageThumbnail: {
    height: !isPlatformIOS ? heightScale(120) : 120,
    width: "100%",
  },
  cornerView: {
    overflow: 'hidden', 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    height: 60,
    position:'absolute',
    zIndex:0
  },
  viewDelete: {
    backgroundColor: 'white',
    width: 30, height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 5,
    ...shadow(2),
  },
  productEmpaty:{
    backgroundColor:'#E5E5E5',
    padding:15,
    height:windowHeight
},
images:{
    marginTop:'10%'
},
product:{
    margin:20
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
    fontSize:16,
    fontFamily:resources.fonts.regular
},
texts:{
  fontSize:16,
  marginTop:10,
  color:'#9A9AA2',
  fontWeight:"400",
  fontFamily:resources.fonts.regular
},
text:{
  fontSize:18,
  marginTop:20,
  fontWeight:'500',
  fontFamily:resources.images.medium
},
time:{
    fontSize:14,
    fontWeight:'600',
    fontFamily:resources.fonts.regular
},
image:{
    width:25,
    height:25,
    marginRight:5
},
price:{
    color:'#9A9AA2',
    fontSize:14,
    textDecorationLine:'line-through'
},
fontSize:{
    fontSize:18,
    fontFamily:resources.fonts.regular
},
flex:{
    flexDirection:'row',
    justifyContent:'space-between'
},
font:{
    color:'#9A9AA2',
    fontSize:16,
    fontFamily:resources.fonts.regular
},
productImage:{
    justifyContent:'center',
    padding:4,
    backgroundColor:'green',
    //width:'30%',
    
    fontWeight:'600',
    fontSize:12,
    color:'white',
    borderRadius:5,
    width:'30%',height:30,
    
},
imageMain:{
    width:windowWidth-40,
    height:windowHeight/2.5,
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
    //alignItems:'center',
    
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
});

export default styles;
