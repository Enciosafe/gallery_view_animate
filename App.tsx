import * as React from 'react';
import {useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const images = [
    {id: 1, url: require('./assets/images/1.jpeg')},
    {id: 2, url: require('./assets/images/2.jpeg')},
    {id: 3, url: require('./assets/images/3.jpeg')},
    {id: 4, url: require('./assets/images/4.jpeg')},
    {id: 5, url: require('./assets/images/5.jpeg')},
    {id: 6, url: require('./assets/images/6.jpeg')},
    {id: 7, url: require('./assets/images/7.jpeg')},
    {id: 8, url: require('./assets/images/8.jpeg')},
    {id: 9, url: require('./assets/images/9.jpeg')},
    {id: 10, url: require('./assets/images/10.jpeg')},
]

const IMAGE_SIZE = 80
const SPACING = 10
const { width, height } = Dimensions.get('screen');


export default () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const topRef = useRef()
    const thumbRef = useRef()

    const scrollToActiveIndex = (index: any) => {
        setActiveIndex(index)
        // @ts-ignore
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true
        })
        if (index *(IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            // @ts-ignore
            thumbRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true
            })
        } else {
            // @ts-ignore
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }
    }

    if(!images) {
    return <Text>Loading...</Text>
  }

    return (
      <View style={styles.container}>
        <FlatList
            ref={topRef}
            keyExtractor={item => item.id.toString()}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
                scrollToActiveIndex(Math.floor(event.nativeEvent.contentOffset.x / width))
            }}
            renderItem={({item}) => {
              return <View style={{width, height}}>
                <Image
                    source={item.url}
                    style={[StyleSheet.absoluteFillObject]}
                />
              </View>

            }}
        />
          <FlatList
              ref={thumbRef}
              keyExtractor={item => item.id.toString()}
              data={images}
              horizontal
              style={{
                  position: 'absolute',
                  bottom: IMAGE_SIZE,
          }}
              contentContainerStyle={{
                  paddingHorizontal: SPACING
          }}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                  return <TouchableOpacity
                      onPress={() => scrollToActiveIndex(index)}
                  >
                      <Image
                          source={item.url}
                          style={{
                              width: IMAGE_SIZE,
                              height: IMAGE_SIZE,
                              borderRadius: 12,
                              marginRight: SPACING,
                              borderWidth: 2,
                              borderColor: activeIndex === index ? '#fff' : 'transparent'
                          }}
                      />
                  </TouchableOpacity>


              }}
          />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
