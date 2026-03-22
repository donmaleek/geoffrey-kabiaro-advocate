'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io, Socket } from 'socket.io-client';
import { format } from 'date-fns';
import { Button } from './ui/Button';

interface Message {
  id: string;
  sender: 'client' | 'lawyer';
  senderName: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatInterfaceProps {
  caseId: string;
}

export function ChatInterface({ caseId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'lawyer',
      senderName: 'Geoffrey Kabiaro',
      content: 'Good morning. I have reviewed your matter and prepared some initial thoughts. Please review the documents I uploaded and let me know if you have any questions.',
      timestamp: new Date(Date.now() - 3600000 * 2),
      status: 'read',
    },
    {
      id: '2',
      sender: 'client',
      senderName: 'You',
      content: 'Thank you for the update. I reviewed the documents. Could you clarify the timeline for the land search process?',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
    },
    {
      id: '3',
      sender: 'lawyer',
      senderName: 'Geoffrey Kabiaro',
      content: 'Certainly. The official search typically takes 3–5 working days at the Lands Registry. We have already lodged the application and will share the results as soon as we receive them.',
      timestamp: new Date(Date.now() - 1800000),
      status: 'read',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    socketRef.current = io(apiUrl, { autoConnect: false });
    socketRef.current.connect();
    socketRef.current.emit('join-case', caseId);

    socketRef.current.on('new-message', (msg: Message) => {
      setMessages((prev) => [...prev, { ...msg, timestamp: new Date(msg.timestamp) }]);
    });

    socketRef.current.on('lawyer-typing', () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [caseId]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const msg: Message = {
      id: Date.now().toString(),
      sender: 'client',
      senderName: 'You',
      content: text,
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, msg]);
    setInput('');
    socketRef.current?.emit('send-message', { caseId, message: msg });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center font-serif font-bold text-gold">
            GK
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-navy" />
        </div>
        <div>
          <div className="font-semibold text-white text-sm">Geoffrey Kabiaro Advocate</div>
          <div className="text-xs text-emerald-400">Online</div>
        </div>
        <div className="ml-auto text-xs text-gray-500">Case: {caseId.slice(0, 8)}…</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-gold/20">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isClient = msg.sender === 'client';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${isClient ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`flex-none w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isClient
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                      : 'bg-gold/20 border border-gold/30 text-gold'
                  }`}
                >
                  {isClient ? 'Y' : 'GK'}
                </div>

                <div className={`max-w-[75%] ${isClient ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isClient
                        ? 'bg-blue-600/30 border border-blue-500/20 text-white rounded-tr-sm'
                        : 'bg-white/8 border border-white/10 text-gray-100 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span>{format(msg.timestamp, 'h:mm a')}</span>
                    {isClient && (
                      <span className={msg.status === 'read' ? 'text-blue-400' : 'text-gray-500'}>
                        {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs font-bold text-gold">
                GK
              </div>
              <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-400"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="pt-4 border-t border-white/10 mt-4">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message… (Enter to send)"
            rows={2}
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold/50 resize-none"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={sendMessage}
            disabled={!input.trim()}
            className="self-end px-4 py-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </Button>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          🔒 Encrypted & protected by attorney-client privilege
        </p>
      </div>
    </div>
  );
}
