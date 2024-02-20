import React from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import resources from '../../../../res/'
import { isPlatformIOS, heightScale } from '../../../utility/Utils'


function CategoriesView(props) {
    const { onPressItem, serverData, } = props
    return (
        <View style={styles.mainContainer}>
            {serverData.length > 0 ?
                <FlatList

                    style={{ paddingHorizontal: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={serverData}
                    renderItem={({ item, index }) =>
                        <Item
                            data={item}
                            itemKey={index}
                            onPressItem={onPressItem} />
                    }
                    numColumns={3}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => index.toString()}
                /> :
                renderEmptyListView()}
        </View>

    )
}
function Item(props) {
    const { onPressItem, data } = props
    // console.log("data.imgUrl ", data.imgUrl)
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cellStyle} onPress={() => {
                onPressItem(data)
            }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={styles.imgStyle}
                resizeMode={'contain'}
                    source={data.imgUrl ? { uri: data.imgUrl } : resources.images.img_placeholer_small} />
                <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={styles.label}>{data.cat_name}</Text>
            </View>
        </TouchableOpacity>)
}



function renderEmptyListView() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Text>{"Your Wishlist is empty."}</Text> */}
        </View>
    )
}

export { CategoriesView }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: resources.colors.white,
    },
    cellStyle: {
        height: isPlatformIOS ? 80 : heightScale(85),
        flex: 1,
        marginHorizontal: 14,
        shadowColor: "rgba(0, 0, 0, 0.5)",
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
        borderWidth: 0,
        justifyContent: 'space-between',
        marginVertical: 14,

    },
    label: {
        marginTop: 2, color: resources.colors.textBlack,
        fontFamily: resources.fonts.regular,
        fontWeight: '400',
        fontSize: 12,
        marginHorizontal: 7,
        textAlign: 'center'
    },
    imgStyle: { height: 30, width: 30, borderWidth: 0 }
})