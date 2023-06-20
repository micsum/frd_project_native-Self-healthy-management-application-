import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { Domain } from "@env";

import { getFromSecureStore } from "../storage/secureStore";

export function ChatRoomScreen() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  async function getHistory() {
    const token = await getFromSecureStore("token");
    let history = await axios.get(Domain + `/chatgpt/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log({ history: history.data });

    history.data.map((message: any) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random(),
            text: message.question,
            createdAt: message.created_at,
            user: {
              _id: 1,
              name: "React Native",
            },
          },
          {
            _id: Math.random(),
            text: message.answer,
            createdAt: message.created_at,
            user: {
              _id: 2,
              name: "React Native",
              avatar:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png",
            },
          },
        ])
      );
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Math.random(),
          text: "Older message",
          createdAt: new Date(),
          system: true,
        },
      ])
    );

    setTimeout(() => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random(),
            text: "What kind of advise do you want me to offer?",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png",
            },
          },
        ])
      );
    }, 80);
  }
  useEffect(() => {
    getHistory();
  }, []);

  const onSend = async (messages: any[] = []) => {
    const token = await getFromSecureStore("token");
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setIsTyping(true);
    let res = await axios.post(
      `${Domain}/chatgpt/question`,
      {
        question: messages[0].text,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("res.data:", res.data);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Math.random(),
          text: res.data.answer,
          createdAt: new Date(),
          renderFooter: true,
          user: {
            _id: 2,
            name: "React Native",
            avatar:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png",
          },
        },
      ])
    );
    setIsTyping(false);
  };

  return (
    <>
      <GiftedChat
        isTyping={isTyping}
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
