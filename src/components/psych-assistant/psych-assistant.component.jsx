import React, { useState, useRef, useEffect } from 'react';
import './psych-assistant.component.css';
import axios from 'axios';


import owly from './owly.png'; // Import the student image

const ChatBubble = ({ message, isUser }) => (
  <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
    <p>{message}</p>
  </div>
);

const PsychologyAssistantChat = () => {
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    debugger
    CompletionAPICall(message);
  }, [message]);

  const CompletionAPICall = async (message) => {
    debugger
    if (message.role === "user"){
      try{
        const response = await axios.post(
          'https://openaiapigateway.azurewebsites.net/api/CompletionAPI',
          {
            messages: [...messages, {...message}],
            engine: 'gpt-3.5-turbo-0301',
            max_tokens: 100,
            role_description: 'You are a professional clinical psychologist. You are equal parts professional, caring and empathetic. You are a good listener. You are able to provide a safe space for your patients to talk about their problems.',
          },
        );

        const messsageResult = response.data;
        setMessages([...messages, { content: messsageResult, role: "system"}]);
      }
      catch(error){
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }


  const sendMessage =  async (e) => {
    setLoading(true);
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { content: input, role: "user"}]);
      setMessage({ content: input, role:"user" });
      setInput('');
    }
  };

  return (
    <div className="psychology-assistant-chat">
      <div style={{ textAlign: 'center', margin: '1rem' }}>
        <img src={owly} alt="Student" style={{ maxWidth: '20%', height: 'auto' }} />
      </div>
      <div className="chat-header">
        <h1>Psych-owl-ogy Helper</h1>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.content} isUser={msg.role === "user"} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <form className="chat-input-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        {!loading ? <button type="submit">Send</button> : <p>Loading...</p>}
      </form>
      <button style={{ textAlign: 'center', margin: '1rem' }}>
        <a
          href="mailto:louwnasteen@yahoo.com?subject=Inquiry%20about%20acquiring%20Vuna%20Vita%20Psychology%20site"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Inquire about acquiring this site
        </a>
      </button>
      <p>or email <strong>louwnasteen@yahoo.com</strong></p>
    </div>
  );
};

export default PsychologyAssistantChat;
