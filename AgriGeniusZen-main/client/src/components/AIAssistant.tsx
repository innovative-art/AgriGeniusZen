import { useState, useRef, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  suggestions?: string[];
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Good morning! Your rice crop looks healthy today. Any questions about your farm?',
      sender: 'bot',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { isListening, startListening, stopListening, transcript } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot response (in real app, this would be an API call)
    setTimeout(() => {
      const botResponses: Record<string, Message> = {
        fertilizer: {
          id: Date.now().toString(),
          text: "Based on your soil moisture and crop stage (45 days), I'd recommend applying nitrogen-rich fertilizer in 5 days. Your soil shows slight nitrogen deficiency.",
          sender: 'bot',
          suggestions: ['Best fertilizer options', 'Application technique']
        },
        weather: {
          id: Date.now().toString(),
          text: "The forecast shows sunny conditions for the next 3 days with a chance of light rain on Friday. Perfect time for field maintenance!",
          sender: 'bot',
          suggestions: ['Weather forecast', 'Crop protection tips']
        },
        default: {
          id: Date.now().toString(),
          text: "I'm analyzing your question. Would you like me to check soil conditions, pest risks, or market prices to help answer that?",
          sender: 'bot',
          suggestions: ['Soil analysis', 'Pest risks', 'Market prices']
        }
      };
      
      const lowerInput = inputValue.toLowerCase();
      let responseMessage;
      
      if (lowerInput.includes('fertilizer') || lowerInput.includes('nutrient')) {
        responseMessage = botResponses.fertilizer;
      } else if (lowerInput.includes('weather') || lowerInput.includes('rain') || lowerInput.includes('forecast')) {
        responseMessage = botResponses.weather;
      } else {
        responseMessage = botResponses.default;
      }
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <section className="mb-8">
      <div className="glass rounded-2xl p-5 shadow-glass">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-light to-accent flex items-center justify-center">
            <i className="ri-robot-line text-white"></i>
          </div>
          <div>
            <h3 className="font-quicksand font-medium text-secondary-dark">FarmSage AI</h3>
            <p className="text-xs text-secondary-dark opacity-75">Your farming companion</p>
          </div>
        </div>
        
        <div 
          className="bg-white/60 rounded-xl p-4 h-64 overflow-y-auto mb-4" 
          ref={chatContainerRef}
        >
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex gap-3 mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-accent-light/50 flex-shrink-0 flex items-center justify-center">
                  <i className="ri-robot-line text-accent-dark"></i>
                </div>
              )}
              
              <div>
                <div 
                  className={`${
                    message.sender === 'bot' 
                      ? 'glass rounded-xl rounded-tl-none p-3' 
                      : 'bg-primary/10 rounded-xl rounded-tr-none p-3'
                  } max-w-xs sm:max-w-md`}
                >
                  <p className={`text-sm ${message.sender === 'bot' ? 'text-secondary-dark' : 'text-primary-dark'}`}>
                    {message.text}
                  </p>
                </div>
                
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button 
                        key={index}
                        className="px-3 py-1 bg-white/80 rounded-full text-primary-dark text-xs font-medium shadow-sm hover:shadow transition-all"
                        onClick={() => {
                          setInputValue(suggestion);
                          setTimeout(() => {
                            const inputElement = document.getElementById('chat-input');
                            if (inputElement) {
                              inputElement.focus();
                            }
                          }, 0);
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-natural-stone flex-shrink-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <i className="ri-user-line text-green-700"></i>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input 
              id="chat-input"
              type="text" 
              placeholder="Ask FarmSage about your crops..." 
              className="w-full rounded-full py-3 px-5 pr-10 border-none ring-1 ring-gray-200 focus:ring-primary focus:outline-none text-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full ${isListening ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary-light/10'} transition-colors`}
              onClick={toggleListening}
            >
              <i className="ri-mic-line"></i>
            </button>
          </div>
          <button 
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-sm hover:shadow-md transition-all"
            onClick={handleSendMessage}
          >
            <i className="ri-send-plane-fill"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
