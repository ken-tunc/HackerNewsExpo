import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import axios from 'axios';
import {HNStory} from "../types";

interface IProps {
  storyId: number
}

const Story: React.FC<IProps> = ({storyId}) => {

  const [story, setStory] = useState<HNStory | null>(null);

  useEffect(() => {
    const endpoint = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
    axios.get<HNStory>(endpoint)
      .then(res => res.data)
      .then(story => setStory(story));
  }, [story]);

  if (story == null) {
    return (
      <View style={styles.card}>
        <Text>loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.card}>
      <Text>{story.title}</Text>
      <Text>Score: {story.score}</Text>
      <Text>posted by {story.by} at {convertPostedDate(story.time)}</Text>
    </View>
  )
};

const convertPostedDate = (timestamp: number): String => {
  const date = new Date(timestamp * 1000);
  return date.toDateString();
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
});

export default Story;
