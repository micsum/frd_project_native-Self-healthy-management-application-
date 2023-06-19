import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { Text } from "native-base";
import { Domain } from "@env";

export function ChatRoomScreen({ route }: any) {
  const { id } = route.params;
  useEffect(() => {
    axios.get(Domain + `/chatgpt/history/${id}`).then(function (response) {
      console.log(response.data);
    });
  }, []);

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <>
      <Text>{id}</Text>
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
