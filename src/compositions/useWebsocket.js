import { useState, useRef, useEffect, useCallback } from 'react';

const useWebsocket = ({ url, verify }) => {
  const ws = useRef(null);
  const [wsData, setMessage] = useState('');
  const [readyState, setReadyState] = useState({ key: 0, value: '正在链接中' });

  // 创建 WebSocket
  const creatWebSocket = useCallback(() => {
    const stateArr = [
      { key: 0, value: '正在链接中' },
      { key: 1, value: '已经链接并且可以通讯' },
      { key: 2, value: '连接正在关闭' },
      { key: 3, value: '连接已关闭或者没有链接成功' },
    ];
    try {
      ws.current = new WebSocket(url);
      ws.current.onopen = (_e) => setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onclose = (e) => {
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };
      ws.current.onerror = (e) => {
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      };

      ws.current.onmessage = (e) => {
        setMessage(e.data);
      };
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  // 初始化 WebSocket
  const webSocketInit = useCallback(() => {
    if (!ws.current || ws.current.readyState === 3) {
      creatWebSocket();
    }
  }, [creatWebSocket]);

  //  关闭 WebSocket
  const closeWebSocket = () => {
    ws.current?.close();
  };

  // 重连 WebSocket
  const reconnect = () => {
    try {
      closeWebSocket();
      ws.current = null;
      creatWebSocket();
    } catch (e) {
      console.log(e);
    }
  };

  // 发送消息
  const sendMsg = (msg) => {
    ws.send(msg);
  };

  useEffect(() => {
    verify && webSocketInit();
    return () => {
      ws.current?.close();
    };
  }, [ws, verify, webSocketInit]);

  return {
    wsData,
    readyState,
    closeWebSocket,
    reconnect,
    sendMsg,
  };
};
export default useWebsocket;
