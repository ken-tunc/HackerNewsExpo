import React, {useEffect, useState} from "react";
import axios from "axios";
import Story from "./Story";
import {FlatList, StyleSheet} from "react-native";

interface IProps {
  storyType: string,
  numStories: number
}

const StoryList: React.FC<IProps> = ({storyType, numStories}) => {

  const [storyIds, setStoryIds] = useState<number[]>([]);

  useEffect(() => {
    const endpoint = `https://hacker-news.firebaseio.com/v0/${storyType}stories.json`;
    axios.get<number[]>(endpoint)
      .then(res => res.data)
      .then(storyIds => storyIds.slice(0, numStories))
      .then(storyIds => setStoryIds(storyIds));
  }, [storyIds]);

  return (
    <FlatList
      data={storyIds}
      renderItem={itemInfo => (
        <Story storyId={itemInfo.item}/>
      )}
      keyExtractor={storyId => `${storyId}`}
      style={styles.list}
      />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingBottom: 10,
  },
});

export default StoryList;
