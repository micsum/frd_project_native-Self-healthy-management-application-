import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

import { Domain } from "@env";
import { Messages } from "../utils/type";

export function ChatRoomScreen({ route }: any) {
  useEffect(() => {
    axios.get(Domain + `/chatgpt/history`).then(function (response) {
      console.log(response.data);
    });
  }, []);

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages: Messages[] = []) => {
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    axios
      .post(`${Domain}/chatgpt`, {
        question: messages[0].text,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => {
          onSend(messages);
        }}
        user={{
          _id: 1,
        }}
      />
    </>
  );
}
