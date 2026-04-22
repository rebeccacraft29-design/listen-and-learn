import { useState, useEffect, useRef } from "react";

const SKILLS = [
  {
    id: "followup",
    label: "Follow-Up Questions",
    icon: "💬",
    color: "#E8A87C",
    description: "Responding to what was actually said",
    prompt: `You are a warm, patient conversation practice partner. Today's skill is asking follow-up questions — responding to what someone actually said rather than changing the subject.

Start with a short personal statement (2-3 sentences) about something simple in your day or life. Then wait for the user to respond. 

If they ask a follow-up question about what you said, respond warmly and praise them: "That's a great follow-up question! You really listened." Then continue the conversation naturally.

If they change the subject or talk about themselves instead, gently and kindly point it out: "I noticed you moved to a new topic — that's a really common habit! Try asking me something about what I just shared." Be warm, never harsh.

Keep the conversation going for 4-6 exchanges. At the end, give a short, encouraging summary of how they did.

Start the conversation now with your opening statement.`,
  },
  {
    id: "pause",
    label: "The Pause Practice",
    icon: "⏸️",
    color: "#7CB9E8",
    description: "Letting others finish before responding",
    prompt: `You are a warm conversation practice partner. Today's skill is about pausing — not jumping in before the other person finishes, and not immediately redirecting to yourself.

Share a short story (3-4 sentences) that has a clear ending. Pause. See if the user responds to the content of your story or immediately pivots to themselves.

If they respond to your story first before sharing their own, praise them warmly. If they immediately talk about themselves without acknowledging your story, gently note: "I noticed you jumped straight to your own experience — totally normal! Try acknowledging what I shared first, even briefly."

Keep going for 4-6 exchanges. End with warm, specific feedback on what they did well.

Begin with your story now.`,
  },
  {
    id: "reflect",
    label: "Reflect Back",
    icon: "🪞",
    color: "#A87CE8",
    description: "Showing you heard what was said",
    prompt: `You are a warm conversation coach. Today's skill is reflecting back — showing someone you truly heard them by summarizing or echoing what they said before responding.

Share something that matters to you — a small frustration, a hope, a recent experience (2-4 sentences). Then wait.

If the user reflects back what you said before responding ("It sounds like you felt..." or "So you're saying..."), praise them: "Yes! That's exactly it — I felt really heard just now." 

If they skip the reflection and just respond, gently coach them: "Nice response! Now try starting with what you heard me say first — it makes a big difference."

Do 4-6 exchanges. End with encouraging specific feedback.

Start with your personal share now.`,
  },
  {
    id: "curiosity",
    label: "Get Curious",
    icon: "🔍",
    color: "#7CE8A8",
    description: "Asking questions to understand, not just to respond",
    prompt: `You are a warm, encouraging conversation partner. Today's skill is genuine curiosity — asking questions to understand someone better, not just to fill space or wait for your turn.

Share something about yourself that could be explored in many directions (a hobby, a feeling, a decision you made). Keep it to 2-3 sentences.

Count how many genuine questions the user asks about you before redirecting to themselves. If they ask 2+ questions before talking about themselves, praise them enthusiastically. If they ask 0-1, gently encourage: "You're doing great — now try asking me one more question before sharing your own experience."

Run 4-6 exchanges. Close with warm, specific encouragement.

Open the conversation now.`,
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function StreakDots({ streak }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      {DAYS.map((d, i) => (
        <div key={d} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <div style={{
            width: "10px", height: "10px", borderRadius: "50%",
            background: i < streak ? "#E8A87C" : "rgba(255,255,255,0.15)",
            transition: "background 0.3s",
          }} />
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{d}</span>
        </div>
      ))}
    </div>
  );
}

function SkillCard({ skill, onSelect, isToday }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(skill)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${skill.color}22` : "rgba(255,255,255,0.04)",
        border: `1.5px solid ${isToday ? skill.color : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px",
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 12px 40px ${skill.color}30` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isToday && (
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          background: skill.color, borderRadius: "20px",
          padding: "2px 10px", fontSize: "10px", fontWeight: "700",
          color: "#1a1a2e", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px",
        }}>TODAY</div>
      )}
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>{skill.icon}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", color: "#fff", marginBottom: "6px", fontWeight: "600" }}>
        {skill.label}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.5" }}>
        {skill.description}
      </div>
    </div>
  );
}

function ChatBubble({ msg, isUser }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "12px",
      animation: "fadeUp 0.3s ease",
    }}>
      {!isUser && (
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "linear-gradient(135deg, #E8A87C, #A87CE8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", marginRight: "10px", flexShrink: 0, marginTop: "4px",
        }}>✨</div>
      )}
      <div style={{
        maxWidth: "75%",
        background: isUser ? "linear-gradient(135deg, #E8A87C, #e8956a)" : "rgba(255,255,255,0.07)",
        borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
        padding: "12px 16px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        lineHeight: "1.6",
        color: isUser ? "#1a1a2e" : "rgba(255,255,255,0.88)",
        fontWeight: isUser ? "500" : "400",
      }}>
        {msg.content}
      </div>
    </div>
  );
}

function ConversationView({ skill, onBack, onComplete }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [done, setDone] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    startConversation();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function startConversation() {
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: skill.prompt,
          messages: [{ role: "user", content: "Please start the conversation." }],
        }),
      });
      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      setMessages([{ role: "assistant", content: text }]);
    } catch (e) {
      setMessages([{ role: "assistant", content: "Something went wrong starting the session. Please try again." }]);
    }
    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    const newTurn = turnCount + 1;
    setTurnCount(newTurn);

    const isLast = newTurn >= 5;
    const systemPrompt = isLast
      ? skill.prompt + "\n\nThis is the final exchange. Give warm, specific, encouraging closing feedback and say goodbye with a motivating note about their practice today."
      : skill.prompt;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
      if (isLast) setDone(true);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", animation: "fadeIn 0.4s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.07)", border: "none", borderRadius: "12px",
          padding: "8px 14px", color: "rgba(255,255,255,0.6)", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: "13px", transition: "all 0.2s",
        }}>← Back</button>
        <div style={{
          background: `${skill.color}22`, border: `1px solid ${skill.color}44`,
          borderRadius: "12px", padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span>{skill.icon}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: skill.color, fontWeight: "600" }}>
            {skill.label}
          </span>
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
          {turnCount}/5 exchanges
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", marginBottom: "24px" }}>
        <div style={{
          height: "100%", background: skill.color,
          width: `${(turnCount / 5) * 100}%`,
          borderRadius: "2px", transition: "width 0.5s ease",
        }} />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px", marginBottom: "16px" }}>
        {messages.map((msg, i) => (
          <ChatBubble key={i} msg={msg} isUser={msg.role === "user"} />
        ))}
        {loading && (
          <div style={{ display: "flex", gap: "5px", padding: "12px 16px", alignItems: "center" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #E8A87C, #A87CE8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", marginRight: "10px" }}>✨</div>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "rgba(255,255,255,0.3)",
                animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!done ? (
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your response..."
            rows={2}
            style={{
              flex: 1, background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: "16px", padding: "12px 16px",
              color: "#fff", fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px", resize: "none", outline: "none",
              lineHeight: "1.5", transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = skill.color}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            style={{
              background: input.trim() && !loading ? skill.color : "rgba(255,255,255,0.1)",
              border: "none", borderRadius: "14px", padding: "12px 20px",
              color: input.trim() && !loading ? "#1a1a2e" : "rgba(255,255,255,0.3)",
              cursor: input.trim() && !loading ? "pointer" : "default",
              fontFamily: "'DM Sans', sans-serif", fontWeight: "700",
              fontSize: "14px", transition: "all 0.2s", whiteSpace: "nowrap",
            }}
          >Send →</button>
        </div>
      ) : (
        <button
          onClick={onComplete}
          style={{
            background: "linear-gradient(135deg, #E8A87C, #A87CE8)",
            border: "none", borderRadius: "16px", padding: "16px",
            color: "#1a1a2e", fontFamily: "'Playfair Display', serif",
            fontSize: "16px", fontWeight: "700", cursor: "pointer",
            transition: "all 0.2s", letterSpacing: "0.3px",
          }}
        >
          ✓ Complete Today's Practice
        </button>
      )}
    </div>
  );
}

export default function ListenAndLearn() {
  const [screen, setScreen] = useState("home"); // home | practice | complete
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [streak, setStreak] = useState(3);
  const [completedToday, setCompletedToday] = useState(false);
  const todaySkillIndex = new Date().getDay() % SKILLS.length;

  function handleSelectSkill(skill) {
    setSelectedSkill(skill);
    setScreen("practice");
  }

  function handleComplete() {
    setCompletedToday(true);
    setStreak(s => s + 1);
    setScreen("complete");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f1a; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 20% 20%, #1e1a3a 0%, #0f0f1a 50%, #0a1a1a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          width: "100%", maxWidth: "520px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "32px", padding: "36px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
          minHeight: "600px", display: "flex", flexDirection: "column",
        }}>

          {/* HOME SCREEN */}
          {screen === "home" && (
            <div style={{ animation: "fadeIn 0.5s ease" }}>
              {/* Top bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                <div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "26px", fontWeight: "700", color: "#fff",
                    lineHeight: "1.2", marginBottom: "4px",
                  }}>
                    Listen &<br />Learn
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: "400" }}>
                    Daily conversation practice
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontSize: "28px", fontWeight: "700", color: "#E8A87C",
                    fontFamily: "'Playfair Display', serif", lineHeight: "1",
                  }}>{streak}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>day streak 🔥</div>
                  <StreakDots streak={streak} />
                </div>
              </div>

              {/* Today's featured */}
              {!completedToday && (
                <div
                  onClick={() => handleSelectSkill(SKILLS[todaySkillIndex])}
                  style={{
                    background: `linear-gradient(135deg, ${SKILLS[todaySkillIndex].color}33, ${SKILLS[todaySkillIndex].color}11)`,
                    border: `1.5px solid ${SKILLS[todaySkillIndex].color}66`,
                    borderRadius: "24px", padding: "24px", marginBottom: "24px",
                    cursor: "pointer", transition: "all 0.3s",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute", top: "-20px", right: "-20px",
                    fontSize: "80px", opacity: "0.12",
                    animation: "float 4s ease-in-out infinite",
                  }}>{SKILLS[todaySkillIndex].icon}</div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: SKILLS[todaySkillIndex].color, letterSpacing: "1px", marginBottom: "8px" }}>
                    TODAY'S PRACTICE
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#fff", fontWeight: "600", marginBottom: "6px" }}>
                    {SKILLS[todaySkillIndex].label}
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>
                    {SKILLS[todaySkillIndex].description}
                  </div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: SKILLS[todaySkillIndex].color,
                    borderRadius: "12px", padding: "8px 18px",
                    color: "#1a1a2e", fontWeight: "700", fontSize: "13px",
                  }}>
                    Start Practice →
                  </div>
                </div>
              )}

              {completedToday && (
                <div style={{
                  background: "rgba(126, 232, 168, 0.1)",
                  border: "1.5px solid rgba(126, 232, 168, 0.3)",
                  borderRadius: "20px", padding: "20px", marginBottom: "24px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎉</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#7CE8A8", fontWeight: "600" }}>
                    Today's practice complete!
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
                    Come back tomorrow to keep your streak going.
                  </div>
                </div>
              )}

              {/* All skills */}
              <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.3)", letterSpacing: "1px", marginBottom: "14px" }}>
                ALL SKILLS
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {SKILLS.map((skill, i) => (
                  <SkillCard key={skill.id} skill={skill} onSelect={handleSelectSkill} isToday={i === todaySkillIndex} />
                ))}
              </div>
            </div>
          )}

          {/* PRACTICE SCREEN */}
          {screen === "practice" && selectedSkill && (
            <ConversationView
              skill={selectedSkill}
              onBack={() => setScreen("home")}
              onComplete={handleComplete}
            />
          )}

          {/* COMPLETE SCREEN */}
          {screen === "complete" && (
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              textAlign: "center", animation: "fadeIn 0.5s ease",
            }}>
              <div style={{ fontSize: "64px", marginBottom: "20px", animation: "float 3s ease-in-out infinite" }}>🌟</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px", color: "#fff", fontWeight: "700",
                marginBottom: "10px", lineHeight: "1.3",
              }}>
                Well done!
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "8px", lineHeight: "1.6" }}>
                You completed today's practice.
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "40px", color: "#E8A87C", fontWeight: "700", marginBottom: "4px",
              }}>{streak}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "36px" }}>
                day streak 🔥
              </div>
              <StreakDots streak={streak} />
              <div style={{ marginTop: "36px", width: "100%" }}>
                <button
                  onClick={() => setScreen("home")}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px", padding: "14px",
                    color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
                  }}
                >← Back to Home</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}