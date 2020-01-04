import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import StoryList from "./src/components/StoryList";
import Constants from 'expo-constants';

const numStories = 20;
const storyTypes = ["top", "new", "best"];
const initialLayout = {width: Dimensions.get('window').width};

interface IRoute {
  key: string,
  title: string
}

export default () => {

  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<IRoute[]>(storyTypes.map(storyType => {
    return {
      key: storyType,
      title: storyType.toUpperCase()
    }
  }));

  const renderScene = SceneMap(storyTypes.reduce((map, key) => {
    const newMap = Object.assign({}, map);
    newMap[key] = () => (
      <SafeAreaView style={styles.container}>
        <StoryList storyType={key} numStories={numStories}/>
      </SafeAreaView>
    );
    return newMap;
  }, {}));

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        style={styles.tabBar}
      />
    );
  };

  return (
    <TabView
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      navigationState={{index, routes}}
      initialLayout={initialLayout}
      style={styles.tabs}
    />
  );
}

const styles = StyleSheet.create({
  tabs: {
    marginTop: Constants.statusBarHeight,
  },
  tabBar: {
    backgroundColor: '#ff6600',
  },
  container: {
    flex: 1,
  },
});
