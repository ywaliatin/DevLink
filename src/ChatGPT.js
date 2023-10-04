// ChatGPT.js
import React, { useState } from 'react';
import axios from 'axios';

function ChatGPT() {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  
  const sendMessage = async () => {
    if (message.trim() === '') return;
    
    const conversation = [...responses, { role: 'user', content: message.trim() }];
    setResponses(conversation);
    
    try {
      const response = await axios.post(
        '/v1/engines/gpt-3.5-turbo/completions',
        {
          prompt: conversation.map(turn => `${turn.role}: ${turn.content}`).join('\n') + '\nassistant:',
          max_tokens: 100, // You can adjust max_tokens based on your needs.
        },
        { headers: { 'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}` } }

      );

      setResponses([...conversation, { role: 'assistant', content: response.data.choices[0].text.trim() }]);
    } catch (error) {
      console.error('Error querying OpenAI API:', error);
    }
    
    setMessage('');
  };

  return (
    <div>
      <div>
        {responses.map((turn, index) => (
          <div key={index}>
            <b>{turn.role}:</b> {turn.content}
          </div>
        ))}
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatGPT;
