import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";

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
            background: i < (streak % 7) ? "#E8A87C" : "rgba(255,255,255,0.15)",
            transition: "background 0.3s",
          }} />
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{d}</span>
        </div>
      ))}
    </div>
  );
}

function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    if (!email || !password) return;
    setLoading(true);
    setMessage("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Check your email to confirm your account!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 20%, #1e1a3a 0%, #0f0f1a 50%, #0a1a1a 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
    }}>
      <div style={{
        width: "100%", maxWidth: "400px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "32px", padding: "40px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>✨</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
            Listen & Learn
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            Daily conversation practice
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKey}
            style={{
              width: "100%", background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: "14px", padding: "14px 16px",
              color: "#fff", fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px", outline: "none", marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKey}
            style={{
              width: "100%", background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: "14px", padding: "14px 16px",
              color: "#fff", fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px", outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {message && (
          <div style={{
            background: "rgba(126,232,168,0.1)", border: "1px solid rgba(126,232,168,0.3)",
            borderRadius: "12px", padding: "12px", marginBottom: "16px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#7CE8A8", textAlign: "center",
          }}>{message}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          style={{
            width: "100%", background: "linear-gradient(135deg, #E8A87C, #A87CE8)",
            border: "none", borderRadius: "14px", padding: "14px",
            color: "#1a1a2e", fontFamily: "'Playfair Display', serif",
            fontSize: "16px", fontWeight: "700", cursor: "pointer",
            marginBottom: "16px", opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "..." : isSignUp ? "Create Account" : "Sign In"}
        </button>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => { setIsSignUp(!isSignUp); setMessage(""); }}
            style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.4)",
              fontFamily: "'DM Sans', sans-serif", fontSize: "13px", cursor: "pointer",
            }}
          >
            {isSignUp ? "Already have an account? Sign in" : "New here? Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill, onSelect, isToday, completed }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(skill)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${skill.color}22` : "rgba(255,255,255,0.04)",
        border: `1.5px solid ${isToday ? skill.color : completed ? `${skill.color}66` : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px", padding: "24px", cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 12px 40px ${skill.color}30` : "none",
        position: "relative", overflow: "hidden",
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
      {completed && !isToday && (
        <div style={{ position: "absolute", top: "12px", right: "12px", fontSize: "14px" }}>✓</div>
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

function ChatBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "12px", animation: "fadeUp 0.3s ease",
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
        fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: "1.6",
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

  useEffect(() => { startConversation(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function startConversation() {
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
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
      setMessages([{ role: "assistant", content: "Something went wrong. Please try again." }]);
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
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
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
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.07)", border: "none", borderRadius: "12px",
          padding: "8px 14px", color: "rgba(255,255,255,0.6)", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
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

      <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", marginBottom: "24px" }}>
        <div style={{
          height: "100%", background: skill.color,
          width: `${(turnCount / 5) * 100}%`,
          borderRadius: "2px", transition: "width 0.5s ease",
        }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px", marginBottom: "16px" }}>
        {messages.map((msg, i) => <ChatBubble key={i} msg={msg} />)}
        {loading && (
          <div style={{ display: "flex", gap: "5px", padding: "12px 16px", alignItems: "center" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #E8A87C, #A87CE8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", marginRight: "10px" }}>✨</div>
            {[0, 1, 2].map(i => (
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

      {!done ? (
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <textarea
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
              fontSize: "14px", resize: "none", outline: "none", lineHeight: "1.5",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            style={{
              background: input.trim() && !loading ? skill.color : "rgba(255,255,255,0.1)",
              border: "none", borderRadius: "14px", padding: "12px 20px",
              color: input.trim() && !loading ? "#1a1a2e" : "rgba(255,255,255,0.3)",
              cursor: input.trim() && !loading ? "pointer" : "default",
              fontFamily: "'DM Sans', sans-serif", fontWeight: "700", fontSize: "14px",
            }}
          >Send →</button>
        </div>
      ) : (
        <button
          onClick={onComplete}
          style={{
            width: "100%", background: "linear-gradient(135deg, #E8A87C, #A87CE8)",
            border: "none", borderRadius: "16px", padding: "16px",
            color: "#1a1a2e", fontFamily: "'Playfair Display', serif",
            fontSize: "16px", fontWeight: "700", cursor: "pointer",
          }}
        >
          ✓ Complete Today's Practice
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [screen, setScreen] = useState("home");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [streak, setStreak] = useState(0);
  const [completedSkills, setCompletedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const todaySkillIndex = new Date().getDay() % SKILLS.length;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadUserData(session.user.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadUserData(session.user.id);
      else setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function loadUserData(userId) {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];

    // Load or create profile
    let { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!profile) {
      await supabase.from("profiles").insert({ id: userId, streak: 0, last_practice_date: null });
      profile = { streak: 0, last_practice_date: null };
    }

    // Check if streak should reset
    if (profile.last_practice_date) {
      const last = new Date(profile.last_practice_date);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate - last) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        await supabase.from("profiles").update({ streak: 0 }).eq("id", userId);
        profile.streak = 0;
      }
    }

    setStreak(profile.streak || 0);

    // Load today's completed skills
    const { data: sessions } = await supabase
      .from("practice_sessions")
      .select("skill_id")
      .eq("user_id", userId)
      .eq("practice_date", today);

    setCompletedSkills(sessions ? sessions.map(s => s.skill_id) : []);
    setLoading(false);
  }

  async function handleComplete() {
    const userId = session.user.id;
    const today = new Date().toISOString().split("T")[0];

    // Save session
    await supabase.from("practice_sessions").insert({
      user_id: userId,
      skill_id: selectedSkill.id,
      practice_date: today,
    });

    // Update streak
    const newStreak = streak + 1;
    await supabase.from("profiles").update({
      streak: newStreak,
      last_practice_date: today,
    }).eq("id", userId);

    setStreak(newStreak);
    setCompletedSkills(prev => [...prev, selectedSkill.id]);
    setScreen("complete");
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setSession(null);
    setScreen("home");
    setStreak(0);
    setCompletedSkills([]);
  }

  if (!session) return <AuthScreen />;

  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#0f0f1a",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
        Loading...
      </div>
    </div>
  );

  const completedToday = completedSkills.includes(SKILLS[todaySkillIndex].id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f1a; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 20% 20%, #1e1a3a 0%, #0f0f1a 50%, #0a1a1a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
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

          {/* HOME */}
          {screen === "home" && (
            <div style={{ animation: "fadeIn 0.5s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: "700", color: "#fff", lineHeight: "1.2", marginBottom: "4px" }}>
                    Listen &<br />Learn
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>Daily conversation practice</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "#E8A87C", fontFamily: "'Playfair Display', serif", lineHeight: "1" }}>{streak}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>day streak 🔥</div>
                  <StreakDots streak={streak} />
                </div>
              </div>

              {!completedToday ? (
                <div
                  onClick={() => { setSelectedSkill(SKILLS[todaySkillIndex]); setScreen("practice"); }}
                  style={{
                    background: `linear-gradient(135deg, ${SKILLS[todaySkillIndex].color}33, ${SKILLS[todaySkillIndex].color}11)`,
                    border: `1.5px solid ${SKILLS[todaySkillIndex].color}66`,
                    borderRadius: "24px", padding: "24px", marginBottom: "24px",
                    cursor: "pointer", position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "80px", opacity: "0.12", animation: "float 4s ease-in-out infinite" }}>
                    {SKILLS[todaySkillIndex].icon}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: SKILLS[todaySkillIndex].color, letterSpacing: "1px", marginBottom: "8px" }}>TODAY'S PRACTICE</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#fff", fontWeight: "600", marginBottom: "6px" }}>{SKILLS[todaySkillIndex].label}</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>{SKILLS[todaySkillIndex].description}</div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: SKILLS[todaySkillIndex].color, borderRadius: "12px", padding: "8px 18px",
                    color: "#1a1a2e", fontWeight: "700", fontSize: "13px",
                  }}>Start Practice →</div>
                </div>
              ) : (
                <div style={{
                  background: "rgba(126, 232, 168, 0.1)", border: "1.5px solid rgba(126, 232, 168, 0.3)",
                  borderRadius: "20px", padding: "20px", marginBottom: "24px", textAlign: "center",
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎉</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#7CE8A8", fontWeight: "600" }}>Today's practice complete!</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Come back tomorrow to keep your streak going.</div>
                </div>
              )}

              <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.3)", letterSpacing: "1px", marginBottom: "14px" }}>ALL SKILLS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                {SKILLS.map((skill, i) => (
                  <SkillCard
                    key={skill.id} skill={skill}
                    onSelect={(s) => { setSelectedSkill(s); setScreen("practice"); }}
                    isToday={i === todaySkillIndex}
                    completed={completedSkills.includes(skill.id)}
                  />
                ))}
              </div>

              <button
                onClick={handleSignOut}
                style={{
                  background: "none", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "10px", width: "100%",
                  color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px", cursor: "pointer",
                }}
              >Sign out</button>
            </div>
          )}

          {/* PRACTICE */}
          {screen === "practice" && selectedSkill && (
            <ConversationView
              skill={selectedSkill}
              onBack={() => setScreen("home")}
              onComplete={handleComplete}
            />
          )}

          {/* COMPLETE */}
          {screen === "complete" && (
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              textAlign: "center", animation: "fadeIn 0.5s ease",
            }}>
              <div style={{ fontSize: "64px", marginBottom: "20px", animation: "float 3s ease-in-out infinite" }}>🌟</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#fff", fontWeight: "700", marginBottom: "10px" }}>Well done!</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>You completed today's practice.</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", color: "#E8A87C", fontWeight: "700", marginBottom: "4px" }}>{streak}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "24px" }}>day streak 🔥</div>
              <StreakDots streak={streak} />
              <div style={{ marginTop: "36px", width: "100%" }}>
                <button
                  onClick={() => setScreen("home")}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px", padding: "14px",
                    color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", cursor: "pointer",
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