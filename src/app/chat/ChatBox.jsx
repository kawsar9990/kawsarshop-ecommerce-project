'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Kawsarshop_Bot_Brain, Default_Responses } from "@/src/data/botData";


export default function ChatBox(){
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const messagesEndRef = useRef(null);
const inputRef = useRef(null);

const isChatStarted = messages.length > 0;

const scrollToBottom = () => {
 messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
}

useEffect(()=> {
scrollToBottom();  
}, [messages, loading]);


useEffect(() => {
if (inputRef.current) {
  inputRef.current.focus();
}
}, [isChatStarted]);


const handleSendMessage = (e) =>{
 e.preventDefault();
 if (!input.trim() || loading) return; 

 const userText = input.trim();
 const userMessage = { role: "user", parts: [{ text: userText }] };
 setMessages((prev) => [...prev, userMessage]);

 setInput("");
 setLoading(true);


 setTimeout(() => {
  if(inputRef.current){
    inputRef.current.focus();
  }
 }, 200);


 setTimeout(() => {
  const lowerInput = userText.toLowerCase();
  let metcResponse = null;

  for (let item of Kawsarshop_Bot_Brain) {
    const found = item.keywords.some(keyword => lowerInput.includes(keyword.toLowerCase()));
    if(found){
      metcResponse = item.response;
      break;
    }
  }
  if(!metcResponse){
    const randomIndex = Math.floor(Math.random() * Default_Responses.length);
    metcResponse = Default_Responses[randomIndex];
  }

  setMessages((prev) => [...prev, { role: "model", parts: [{ text: metcResponse }] }]);
  setLoading(false);

  setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
  }, 50);

 }, 800);
};

return(
<div className="fixed inset-0 w-full md:h-screen flex flex-col overflow-hidden bg-[#0b0f19]">

<div className="w-full bg-[#131926] border-b border-gray-800/80 px-4 py-3 flex items-center justify-between z-30 shadow-md">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-500/50 bg-[#0b0f19] shrink-0">
<img src="/img/kkks.jpeg" alt="Kawsar Profile" className="w-full h-full object-cover" />
</div>
<div>
<h2 className="text-sm md:text-base font-semibold text-gray-100 tracking-wide">Kawsarshop AI</h2>
<p className="text-[10px] text-green-400 flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
</p>  
</div>
</div>
<Link href="/" 
className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e2536] hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 border border-gray-800 hover:border-indigo-500/40 transition-all duration-300 text-xs md:text-sm font-medium active:scale-95">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
<path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>
<span>Back</span>
</Link>
</div>


 <div className="flex-1 overflow-y-auto px-4 pt-6 md:px-24 space-y-6 pb-32 scrollbar-none relative z-10">
{isChatStarted ? (
<div className="max-w-4xl w-full mx-auto space-y-6">
{messages.map((msg, index) => (
<div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start animate-fade-in"}`}>
<div className={`max-w-[85%] md:max-w-[80%] p-4 rounded-2xl leading-relaxed text-sm whitespace-pre-wrap shadow-md ${msg.role === "user" 
? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none" 
: "bg-[#131926] text-gray-200 rounded-bl-none border border-gray-800"
}`}>
{msg.parts[0].text}
</div>
</div>  
))}

{loading && (
<div className="flex justify-start">
<div className="bg-[#131926] text-gray-400 px-5 py-3 rounded-2xl text-xs border border-gray-800 flex items-center gap-1.5 shadow-md">
  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
</div>  
</div> 
)}
<div ref={messagesEndRef} />
</div>  
) : (
<div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto w-full px-4 space-y-8 animate-fade-in">
<h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent opacity-40 select-none tracking-wider text-center">
Kawsarshop AI
</h1>

<div className="w-full">
<form onSubmit={handleSendMessage} className="relative flex items-center">
<input 
  type="text" 
  ref={inputRef}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  disabled={loading}
  placeholder="Ask anything about Kawsarshop..." 
  className="w-full bg-[#1e2536] text-gray-100 placeholder-gray-500 rounded-full pl-6 pr-14 py-4 text-sm md:text-base border border-gray-800 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-900/40 transition-all duration-300 shadow-2xl placeholder:text-[10px] placeholder:md:text-[13px]"
/>
<button 
  type="submit" 
  disabled={loading || !input.trim()}
  className="absolute right-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-45 -translate-x-0.5 translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
</button>
</form>
</div>
</div>
)}
</div>


{isChatStarted && (
<div className="w-full bg-[#0b0f19] border-t border-gray-800/60 py-4 pb-6 z-20 shadow-[0_-15px_30px_rgba(11,15,25,0.9)] sticky bottom-0 left-0 right-0">
<div className="w-full max-w-3xl mx-auto px-4">
  <form onSubmit={handleSendMessage} className="relative flex items-center">
    <input 
      type="text" 
      ref={inputRef}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      disabled={loading}
      placeholder="Ask anything about Kawsarshop..." 
      className="w-full bg-[#1e2536] text-gray-100 placeholder-gray-500 rounded-full pl-6 pr-14 py-4 text-sm md:text-base border border-gray-800 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-900/40 transition-all duration-300 shadow-2xl"
    />
    <button 
      type="submit" 
      disabled={loading || !input.trim()}
      className="absolute right-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-45 -translate-x-0.5 translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    </button>
  </form>
</div>
</div>
)}


</div>
) 
}