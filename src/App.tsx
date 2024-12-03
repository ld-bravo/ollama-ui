import './App.scss'
import { generateChatCompletion, generateCompletion } from './services/api'
import { useState } from 'react'
import AppLayout from './components/AppLayout/AppLayout';
import ReactMarkdown from 'react-markdown';
import useStore from './services/useStore';
import { Message } from './interfaces/Message';

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const {runningModel, addMessage, messages} = useStore();

  const sendQuestion = async () => {
    setIsGenerating(true);
    const response = await generateCompletion(prompt, runningModel);
    setPrompt("");
    setResponse(response);
    setIsGenerating(false);
  }

  const sendChatQuestion = async () => {
    setIsGenerating(true);
    const response = await generateChatCompletion(prompt, runningModel);
    
    const message: Message = {role: "user", content: prompt};
    addMessage(message);
    
    setResponse(response.message.content);
    addMessage(response.message);
    
    setPrompt("");
    setIsGenerating(false);
  }

  return (
    <>
      <AppLayout>
        <div style={{ textAlign: "right" }}>
          <textarea
            style={{
              width: "calc(100% - 20px)", 
              borderRadius: "8px", 
              padding: "10px",
              fontSize: 15 
            }}
            name=""
            id=""
            cols={30}
            rows={5}
            value={prompt}
            onChange={(event) => setPrompt(event?.target?.value)}>
          </textarea>
          {/* <button onClick={sendQuestion} disabled={isGenerating}>Send</button> */}
          <button onClick={sendChatQuestion} disabled={isGenerating}>Send</button>
        </div>
        <div>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </AppLayout>
    </>
  )
}

export default App
