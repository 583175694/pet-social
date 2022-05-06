/*
 * @Author: kyroswu
 * @Date: 2022-03-10 11:07:30
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-05-06 13:01:49
 * @Desc: 模板
 */

import React, { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react';
import { View, Text, SafeAreaView, Image, TextInput } from '@fower/react-native';
import NavBar from '../components/nav-bar';
import { RenderContactItem, RenderDrawerItem, RenderReturnItem, RenderTitleItem } from '../components/nav-bar-menu';
import Colors from '../utils/colors';
import { applyRoom } from '../api/store/room/apply-room';
import { getAccount, getAuthorization } from '../utils/storage';

function RenderMessageLeft({ data }) {
  return (
    <View row mb-30>
      <Image w-32 h-32 rounded-32 mr-8 source={require('../assets/avatar_default.png')} />
      <View p-8 rounded-8 border-1 borderColor={Colors.border} maxw-255>
        <Text text-10 color={Colors.title}>
          {data}
        </Text>
      </View>
    </View>
  );
}

function RenderMessageRight({ data }) {
  return (
    <View toRight mb-30>
      <View p-8 rounded-8 border-1 borderColor="rgba(255, 98, 101, 0.5)" maxw-255>
        <Text text-10 color={Colors.title}>
          {data}
        </Text>
      </View>
      <Image w-32 h-32 rounded-32 ml-8 source={require('../assets/avatar_default.png')} />
    </View>
  );
}

function RenderMessage({ websocket, send, userId }) {
  const [msgList, setMsgList] = useState([]);
  const [msg, setMsg] = useState('');
  const sendMsg = () => {
    send(msg);
    setMsg('');
  };

  useEffect(() => {
    websocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);
      setMsgList([...msgList, data]);
    };
  }, [msgList, websocket]);

  return (
    <View flex={1}>
      <View p-16>
        {msgList &&
          msgList.map((res, index) => {
            return (
              <View>
                {res.userId !== userId && <RenderMessageLeft data={res.message} />}
                {res.userId === userId && <RenderMessageRight data={res.message} />}
              </View>
            );
          })}
      </View>
      <RenderInput
        state={msg}
        setState={setMsg}
        placeholder="Atlanta, CA"
        icon={require('../assets/icon_location.png')}
        onSubmitEditing={() => sendMsg()}
      />
    </View>
  );
}

function RenderInput({ state, setState, placeholder, icon, onSubmitEditing }) {
  return (
    <View absolute left-8 bottom-8 w-359 p-12 pl-16 rounded-8 border-1 borderColor={Colors.border} toCenterY mb-32>
      <TextInput
        text-10
        w-248
        multiline
        numberOfLines={4}
        onChangeText={(text) => setState(text)}
        placeholder={placeholder}
        placeholderTextColor={Colors.subtitle}
        value={state}
        editable
        maxLength={800}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={true}
      />
      <View flex={1} toRight mr-18>
        <Image opacity-50 w-20 h-20 source={icon} />
      </View>
    </View>
  );
}

const connectSocket = ({ roomId, token }) => {
  let websocket = null;
  websocket = new WebSocket(`ws://www.pet-app.club/pet-app/singleChatRoom/${roomId}?authorization=${token}`);

  // 连接发生错误的回调方法
  websocket.onerror = function () {
    setMessageInnerHTML('发生错误');
  };

  // 连接成功建立的回调方法
  websocket.onopen = function (event) {
    setMessageInnerHTML('打开连接');
  };

  // 接收到消息的回调方法
  websocket.onmessage = function (event) {
    setMessageInnerHTML(event.data);
  };

  // 连接关闭的回调方法
  websocket.onclose = function () {
    setMessageInnerHTML('关闭连接');
  };

  // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
  window.onbeforeunload = function () {
    websocket.close();
  };

  // 将消息显示在网页上
  function setMessageInnerHTML(innerHTML) {
    console.log(innerHTML);
  }

  // 关闭连接
  function closeWebSocket() {
    websocket.close();
  }

  // 发送消息
  function send(msg) {
    websocket.send(msg);
  }

  return { websocket, send };
};

export default function ChatRoom({ navigation }) {
  const [ws, setWs] = useState(null);
  const [user, setUser] = useState(0);
  useEffect(() => {
    async function fetchData() {
      // 获取用户ID
      const data = JSON.parse(await getAccount());
      setUser(data);

      // 获取房间号
      const roomData = await applyRoom({ receiverUserId: 10 });
      const socket = connectSocket({ roomId: roomData.data.id, token: data.token });
      setWs(socket);
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView flex={1}>
      <NavBar
        titleItem={() => RenderTitleItem('Chat Room')}
        leftItem={() => RenderReturnItem({ navigation })}
        rightItem={() => RenderContactItem({ navigation })}
      />
      {ws && <RenderMessage websocket={ws.websocket} send={ws.send} userId={user.userId} />}
    </SafeAreaView>
  );
}
