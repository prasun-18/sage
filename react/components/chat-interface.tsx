"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mic, MicOff, MessageSquare, Phone, LogOut, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SageAvatar } from "@/components/sage-avatar"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer T }
  ? T
  : typeof window.webkitSpeechRecognition

interface ChatInterfaceProps {
  onLogout: () => void
}

type Mode = "chat" | "voice"

export function ChatInterface({ onLogout }: ChatInterfaceProps) {
  const [mode, setMode] = useState<Mode>("chat")
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Text-to-speech for responses
  useEffect(() => {
    if (mode === "voice" && voiceEnabled && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "assistant" && !isLoading) {
        const text = lastMessage.parts
          .filter((p) => p.type === "text")
          .map((p) => (p as { type: "text"; text: string }).text)
          .join(" ")
        speakText(text)
      }
    }
  }, [messages, isLoading, mode, voiceEnabled])

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        // Auto-send in voice mode
        if (mode === "voice") {
          sendMessage({ text: transcript })
          setInput("")
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.start()
      setIsListening(true)
    } else {
      alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.")
    }
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary/30 via-background to-secondary/20">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SageAvatar size="sm" isThinking={isLoading} />
            <div>
              <h1 className="font-bold text-foreground">Sage</h1>
              <p className="text-xs text-muted-foreground">{isLoading ? "Thinking..." : "Online"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <div className="flex bg-secondary rounded-full p-1">
              <button
                onClick={() => setMode("chat")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === "chat" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>
              <button
                onClick={() => setMode("voice")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === "voice"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Phone className="w-4 h-4" />
                Voice
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 overflow-y-auto">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center"
          >
            <SageAvatar size="lg" />
            <h2 className="text-2xl font-bold text-foreground mt-6">Namaste! I am Sage</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Your wise and calm AI teacher. Ask me anything about your studies, homework, or any topic you want to
              learn about!
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Help me with math", "Explain photosynthesis", "History questions", "Writing tips"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion)
                      sendMessage({ text: suggestion })
                      setInput("")
                    }}
                    className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.role === "assistant" && (
                    <SageAvatar size="sm" isThinking={isLoading && message.id === messages[messages.length - 1]?.id} />
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border text-card-foreground rounded-bl-md"
                    }`}
                  >
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return (
                          <p key={i} className="whitespace-pre-wrap leading-relaxed">
                            {part.text}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium text-sm">
                      You
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {mode === "chat" ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Sage anything..."
                  className="w-full px-4 py-3 pr-12 rounded-2xl bg-secondary border-2 border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isListening ? <MicOff className="w-5 h-5 text-destructive" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`p-3 rounded-full ${voiceEnabled ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}
                >
                  {voiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </button>

                <motion.button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-6 rounded-full transition-colors ${
                    isListening ? "bg-destructive" : "bg-primary"
                  } text-primary-foreground`}
                  animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: isListening ? Number.POSITIVE_INFINITY : 0 }}
                >
                  {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </motion.button>

                {isSpeaking && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="p-3 rounded-full bg-accent text-accent-foreground"
                  >
                    <Volume2 className="w-6 h-6" />
                  </motion.div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {isListening
                  ? "Listening... Speak now!"
                  : isSpeaking
                    ? "Sage is speaking..."
                    : "Tap the microphone to talk with Sage"}
              </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
