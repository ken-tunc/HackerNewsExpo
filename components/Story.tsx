import React, {useEffect, useState} from "react";
import {Alert, Linking, StyleSheet, Text} from "react-native";
import {Button, Card} from "react-native-elements";
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
      <Card
        title="loading..."
        containerStyle={styles.cardContainer}/>
    );
  }

  return (
    <Card
      title={story.title}
      containerStyle={styles.cardContainer}>
      <Text style={styles.cardText}>
        {story.score} points by {story.by} {convertPostedDate(story.time)}
      </Text>
      <Button
        icon={{name: 'open-in-browser'}}
        title="Open in Browser"
        type="outline"
        onPress={() => {
          openUrl(story.url)
        }}
      />
    </Card>
  )
};

const convertPostedDate = (timestamp: number): String => {
  const date = new Date(timestamp * 1000);
  return date.toDateString();
};

const openUrl = (url: string) => {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Can't open the website.");
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#f6f6ef'
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Story;
