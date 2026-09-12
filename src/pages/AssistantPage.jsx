import React, { useState } from 'react';
import { useFactory } from '../context/FactoryContext';
import {
    Bot,
    Send,
    User,
    Sparkles,
    ShieldCheck,
    Flame,
    ArrowRight,
    RefreshCw,
    Lightbulb
} from 'lucide-react';

export const AssistantPage = () => {
    const { factory, recommendations, rejectedOptions, industrialInputs } = useFactory();

    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: '1',
            sender: 'bot',
            text: `Hello! I am your **EcoForge Industrial Decarbonization Copilot** for **${factory?.name || 'EcoPlast Manufacturing'}**. 

I have analyzed your baseline emissions (**1,284 tCO2e/yr**) and cross-referenced 100 potential decarbonization options against your specific technical constraints.

How can I assist your engineering and operational teams today?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    const quickPrompts = [
        "What is our highest-impact feasible action?",
        "Why was biomass heat rejected for our factory?",
        "How can we reduce grid electricity emissions by 30%?",
        "Compare recycled PP vs solar rooftop payback."
    ];

    const handleSend = (textToSend) => {
        const query = textToSend || inputMessage;
        if (!query.trim()) return;

        // Add user message
        const userMsg = {
            id: String(Date.now()),
            sender: 'user',
            text: query,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        if (!textToSend) setInputMessage('');
        setIsTyping(true);

        // Simulate AI response logic
        setTimeout(() => {
            let replyText = "";
            const lower = query.toLowerCase();

            if (lower.includes("highest-impact") || lower.includes("highest impact")) {
                replyText = `Based on your factory's technical constraints, your **#1 Highest-Impact Feasible Action** is:

**Replace 30% Virgin PP with Post-Consumer Recycled PP**
- **CO2 Reduction:** **84.4 tCO2e/yr** (6.6% total factory shift)
- **Technical Feasibility:** **96% Pass** (MFI: 12 g/10min, Tensile: 28 MPa - satisfies injection molding specs)
- **Annual Savings:** **₹6.2 Lakhs/yr**
- **Payback:** **8 Months**

Would you like me to add this action to your **Action Roadmap**?`;
            } else if (lower.includes("biomass") || lower.includes("rejected")) {
                replyText = `**Biomass Heat Generator (Option #42)** was **REJECTED** by EcoForge Technical Feasibility Filter.

**Reason for Rejection:**
- **Failed Requirement:** Thermal Temperature & Flue Gas Emission Standards.
- **Required Spec:** Operating Temperature > 240°C & Zero Particulate < 15 mg/Nm³.
- **Candidate Spec:** Biomass Unit outputs ~180°C with 45 mg/Nm³ particulate without electrostatic precipitator.
- **Feasibility Score:** **0% (FAIL)**

*Note:* Technical feasibility is a hard requirement. EcoForge filtered this out to prevent operational downtime.`;
            } else if (lower.includes("input") || lower.includes("feedstock") || lower.includes("raw material") || lower.includes("plastics") || lower.includes("gas") || lower.includes("coal")) {
                const inputsList = (industrialInputs || []).map(i => `- **${i.name}**: ${i.quantity} ${i.unit}/yr (${i.selectedUseCases.join(', ')})`).join('\n');
                replyText = `Here is your factory's current **Industrial Input & Sector Use Case Configuration**:

${inputsList || 'No industrial inputs configured yet.'}

**Master Input Intelligence:**
- Industrial inputs are mapped to 15 master categories with reference CO2 benchmark ranges.
- Activity data (e.g. ${industrialInputs?.[0]?.quantity || 850} ${industrialInputs?.[0]?.unit || 'tonnes'}) is multiplied by verified emission factors for carbon accounting.

Would you like to simulate replacing primary feedstock with recycled/low-carbon alternatives?`;
            } else if (lower.includes("electricity") || lower.includes("grid")) {
                replyText = `To achieve a **30% Reduction in Grid Electricity Emissions (126 tCO2e saved)**, we recommend a 2-step combined strategy:

1. **Solar Rooftop Expansion (Option #03):** 350 kWp solar PV array yields **52 tCO2e/yr** reduction. Payback: 22 months.
2. **Open Access Green Power PPA (Option #08):** Contract 40% renewable power from grid, yielding **74 tCO2e/yr** reduction.

**Combined Impact:** **126 tCO2e/yr saved** | Total Payback: **14 Months**.`;
            } else {
                replyText = `I have logged your query regarding: "*${query}*".

Current baseline summary for **${factory?.name || 'EcoPlast Manufacturing'}**:
- **Total Baseline Emissions:** **1,284 tCO2e/yr**
- **Feasible Reduction Opportunity:** **-312 tCO2e/yr** (24.3%)
- **Top Evaluated Options:** 37 Feasible Actions validated.

Feel free to ask me to analyze specific machines, material blends, or financial payback timelines!`;
            }

            const botMsg = {
                id: String(Date.now() + 1),
                sender: 'bot',
                text: replyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 900);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">Domain AI Engineering Agent</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                            ECOFORGE v2.4 ONLINE
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-0.5 tracking-tight">AI Decarbonization Assistant</h1>
                    <p className="text-xs text-slate-400 mt-1">Ask questions about technical feasibility, carbon calculations, and intervention ROI.</p>
                </div>
            </div>

            {/* QUICK PRESET PROMPTS */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Suggested Queries:
                </span>
                {quickPrompts.map((prompt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="px-3 py-1.5 rounded-xl bg-[#101320] hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-colors text-left"
                    >
                        {prompt}
                    </button>
                ))}
            </div>

            {/* CHAT CONTAINER */}
            <div className="bg-[#101320] border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col h-[580px] overflow-hidden">
                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${msg.sender === 'user'
                                ? 'bg-indigo-950 border-indigo-700 text-indigo-300'
                                : 'bg-emerald-950 border-emerald-700 text-emerald-300'
                                }`}>
                                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-400" />}
                            </div>

                            {/* Message Box */}
                            <div className={`max-w-[80%] rounded-2xl p-4 text-xs font-sans leading-relaxed shadow-md ${msg.sender === 'user'
                                ? 'bg-indigo-700 text-white rounded-tr-none'
                                : 'bg-[#141726] border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                                }`}>
                                {/* Render simple markdown bold lines */}
                                {msg.text.split('\n').map((paragraph, pIdx) => (
                                    <p key={pIdx} className="whitespace-pre-wrap">
                                        {paragraph}
                                    </p>
                                ))}

                                <span className="text-[9px] font-mono text-slate-400 block text-right mt-1 opacity-75">
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
                                <Bot className="w-4 h-4 animate-bounce" />
                            </div>
                            <div className="px-4 py-3 rounded-2xl bg-[#141726] border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                                <span>EcoForge AI reasoning over operational parameters...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Bar */}
                <div className="p-4 bg-[#0b0d14] border-t border-slate-800/80">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex items-center gap-3"
                    >
                        <input
                            type="text"
                            placeholder="Ask EcoForge AI about emissions, technical feasibility, or ROI..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-1 bg-[#101320] border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-slate-100 font-sans focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
                        />
                        <button
                            type="submit"
                            disabled={!inputMessage.trim()}
                            className="px-5 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-md shadow-indigo-950 transition-all"
                        >
                            <span>Send</span>
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
