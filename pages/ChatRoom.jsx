import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Send } from "lucide-react"
import axios from "axios"

import { formatZAR, timeAgo } from "../lib/utils-marketplace"

const QUICK_REPLIES = [
  "Is this still available?",
  "Wat is die prys?",
  "Can I collect today?",
  "Where exactly?",
]

export default function ChatRoom() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [conversation, setConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState("")
  const [sending, setSending] = useState(false)
  const [user, setUser] = useState(null)

  const bottomRef = useRef(null)

  // Load data
  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("access_token")

        // Get user
        const { data: me } = await axios.get("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(me)

        // Get conversation
        const { data: conv } = await axios.get(`/api/conversations/${id}`)
        setConversation(conv)

        // Get messages
        const { data: msgs } = await axios.get(
          `/api/conversations/${id}/messages`
        )
        setMessages(msgs)
      } catch (error) {
        console.error("Failed to load chat:", error)
      }
    }

    load()
  }, [id])

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send message
  async function sendMessage(text) {
    const content = text || newMsg
    if (!content.trim() || !user) return

    try {
      setSending(true)
      setNewMsg("")

      const token = localStorage.getItem("access_token")

      await axios.post(
        `/api/conversations/${id}/messages`,
        { content: content.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      // Reload messages
      const { data: msgs } = await axios.get(
        `/api/conversations/${id}/messages`
      )
      setMessages(msgs)
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setSending(false)
    }
  }

  if (!conversation) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">

      {/* Header */}
      <div className="flex items-center gap-3 py-3 border-b">
        <button onClick={() => navigate("/messages")}>
          <ArrowLeft className="w-5 h-5" />
        </button>

        <Link
          to={`/listing/${conversation.listing_id}`}
          className="flex items-center gap-3 flex-1"
        >
          {conversation.listing_image && (
            <img
              src={conversation.listing_image}
              alt=""
              className="w-9 h-9 rounded-lg object-cover"
            />
          )}

          <div>
            <p className="text-sm font-medium truncate">
              {conversation.listing_title}
            </p>
            <p className="text-xs text-green-600 font-semibold">
              {formatZAR(conversation.listing_price_cents)}
            </p>
          </div>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender_id === user?.id

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  isMe
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-[10px] opacity-60 mt-1">
                  {timeAgo(msg.created_at)}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {messages.length === 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {QUICK_REPLIES.map((text) => (
            <button
              key={text}
              onClick={() => sendMessage(text)}
              className="px-3 py-1.5 rounded-full bg-gray-100 text-xs hover:bg-gray-200"
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 py-3 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 h-10 px-4 rounded-full border text-sm focus:outline-none"
        />

        <button
          onClick={() => sendMessage()}
          disabled={!newMsg.trim() || sending}
          className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
