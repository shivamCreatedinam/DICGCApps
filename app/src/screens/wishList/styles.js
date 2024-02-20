import { StyleSheet } from 'react-native'
import resources from '../../../res';
const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "#F7F7F8",
    },
    headerIcon:{
        width:20,
        height:20
    },
    flexRow : {
        flexDirection:'row',
    },
    headerTitle : {
        color:"#45454A",
        fontSize:18,
        fontFamily:resources.fonts.regular,
        fontWeight:"500",
        marginLeft:16
    },
});

export default styles;
