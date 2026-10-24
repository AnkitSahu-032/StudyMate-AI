const $=id=>document.getElementById(id);
let summary='', remaining=1500, interval=null;
const notes=$('notes'); notes.value=localStorage.getItem('studymate_notes')||'';
notes.addEventListener('input',()=>localStorage.setItem('studymate_notes',notes.value));
function sentences(text){return (text.match(/[^.!?\n]+[.!?]?/g)||[]).map(s=>s.trim()).filter(s=>s.length>18)}
function summarize(){const lines=sentences(notes.value);if(!lines.length){$('summary').textContent='Paste at least one complete sentence first.';return}const tokens=(notes.value.toLowerCase().match(/[a-z]{4,}/g)||[]);const freq={};tokens.forEach(w=>freq[w]=(freq[w]||0)+1);const scored=lines.map((s,i)=>({s,i,score:(s.toLowerCase().match(/[a-z]{4,}/g)||[]).reduce((n,w)=>n+(freq[w]||0),0)/Math.sqrt(s.length)}));const selected=scored.sort((a,b)=>b.score-a.score).slice(0,Math.min(4,Math.max(1,Math.ceil(lines.length*.4)))).sort((a,b)=>a.i-b.i);summary=selected.map(x=>'• '+x.s).join('\n');$('summary').textContent=summary;localStorage.setItem('studymate_summary',summary)}
$('summarize').onclick=summarize;summary=localStorage.getItem('studymate_summary')||'';if(summary)$('summary').textContent=summary;
function speak(text){if(!('speechSynthesis'in window)){alert('Speech synthesis unavailable in this browser.');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.rate=.95;speechSynthesis.speak(u)}
$('readNotes').onclick=()=>speak(summary||'Generate a summary first.');$('speakWelcome').onclick=()=>speak('Welcome to StudyMate AI. You can summarize notes, practice recall, and plan your study.');$('stopSpeech').onclick=()=>speechSynthesis.cancel();
function escapeHtml(t){return t.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function buildQuiz(){const lines=sentences(notes.value).slice(0,5);if(!lines.length){$('quizList').textContent='Add notes with complete sentences first.';return 'Add notes first.'}const stop=new Set(['about','which','their','there','these','those','where','while','because','using','image','digital','study']);const html=lines.map((s,i)=>{const candidates=(s.match(/\b[A-Za-z]{5,}\b/g)||[]).filter(w=>!stop.has(w.toLowerCase()));const answer=candidates.sort((a,b)=>b.length-a.length)[0];if(!answer)return `<details><summary>Q${i+1}: Explain: ${escapeHtml(s.slice(0,85))}</summary><p>${escapeHtml(s)}</p></details>`;const question=s.replace(new RegExp('\\b'+answer+'\\b','i'),'________');return `<details><summary>Q${i+1}: Fill in the blank: ${escapeHtml(question)}</summary><p>Answer: <strong>${escapeHtml(answer)}</strong></p></details>`}).join('');$('quizList').innerHTML=html;return 'Generated '+lines.length+' practice questions. Open the Quick Quiz panel to answer them.'}
$('makeQuiz').onclick=buildQuiz;
let tasks=JSON.parse(localStorage.getItem('studymate_tasks')||'[]');function renderTasks(){$('tasks').innerHTML='';tasks.forEach((t,i)=>{const li=document.createElement('li');li.className=t.done?'done':'';const span=document.createElement('span');span.textContent=t.text+(t.date?' · '+t.date:'');const toggle=document.createElement('button');toggle.textContent=t.done?'Undo':'Done';toggle.onclick=()=>{tasks[i].done=!tasks[i].done;save()};const del=document.createElement('button');del.textContent='×';del.setAttribute('aria-label','Delete task');del.onclick=()=>{tasks.splice(i,1);save()};li.append(span,toggle,del);$('tasks').append(li)});$('mission').textContent=tasks.find(t=>!t.done)?.text||'One small step toward your goal.'}function save(){localStorage.setItem('studymate_tasks',JSON.stringify(tasks));renderTasks()}$('taskForm').onsubmit=e=>{e.preventDefault();tasks.push({text:$('task').value.trim(),date:$('date').value,done:false});$('task').value='';save()};renderTasks();
// StudyMate AI - Focus Timer

function showTimer() {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {
    if (interval !== null) return;

    document.getElementById("startFocus").textContent =
        "⏸ Pause focus";

    interval = setInterval(() => {
        remaining--;

        if (remaining <= 0) {
            clearInterval(interval);
            interval = null;
            remaining = 0;
            showTimer();

            speak("Focus session completed!");
            document.getElementById("startFocus").textContent =
                "▶ Start focus";
            return;
        }

        showTimer();
    }, 1000);
}

// Start / Pause Timer
document.getElementById("startFocus").onclick = () => {
    if (interval !== null) {
        clearInterval(interval);
        interval = null;

        document.getElementById("startFocus").textContent =
            "▶ Resume focus";
    } else {
        if (remaining <= 0) remaining = 1500;
        startTimer();
    }
};

// Reset Timer
document.getElementById("resetFocus").onclick = () => {
    clearInterval(interval);
    interval = null;

    remaining = 1500;

    showTimer();

    document.getElementById("startFocus").textContent =
        "⏱ Start 25-min focus";
};

// Initialize timer display
showTimer();const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
function replyTo(input){const q=input.toLowerCase().trim();if(!q)return 'Type a question first.';if(/\b(help|commands)\b/.test(q))return 'Try: summarize notes, make quiz, show tasks, start focus, or ask a keyword from your pasted notes.';if(/summar|read notes/.test(q)){if(!notes.value.trim())return 'Paste notes in Notes Studio first.';summarize();return summary||'Could not summarize these notes.'}if(/quiz|question|test me/.test(q))return buildQuiz();if(/task|plan|todo/.test(q))return tasks.filter(t=>!t.done).map(t=>t.text).join('; ')||'No pending tasks.';if(/focus|timer|pomodoro/.test(q)){if(!interval)startTimer();return 'Your 25-minute focus timer is running.'}if(/hello|hi|hey/.test(q))return 'Hi! I can help you review the notes you paste here. Ask me about a concept in your notes.';const lines=sentences(notes.value);if(!lines.length)return 'I work offline using your notes. Paste notes first, then ask about a topic or try “help”.';const stop=new Set(['what','when','where','which','explain','define','about','does','with','from','this','that','your','tell','please','could','would','meaning']);const words=(q.match(/[a-z]{4,}/g)||[]).filter(w=>!stop.has(w));if(!words.length)return 'Try asking about a specific keyword from your notes.';const matches=lines.map(s=>({s,score:words.reduce((n,w)=>n+(s.toLowerCase().includes(w)?1:0),0)})).sort((a,b)=>b.score-a.score);return matches[0]?.score?matches.slice(0,2).filter(x=>x.score>0).map(x=>x.s).join(' '):'I could not find that in your notes. Try a keyword present in the Notes Studio.'}
function addChat(role,message){const d=document.createElement('div');d.className='chat-message '+role;d.textContent=(role==='user'?'You: ':'StudyMate: ')+message;$('chatHistory').append(d);$('chatHistory').scrollTop=$('chatHistory').scrollHeight}
function sendChat(message,voice=false){addChat('user',message);const answer=replyTo(message);addChat('bot',answer);if(voice)speak(answer)}
$('chatForm').onsubmit=e=>{e.preventDefault();const input=$('chatInput');sendChat(input.value);input.value=''};
function listenFor(callback){if(!SpeechRecognition){$('voiceStatus').textContent='Speech recognition unavailable. Use Chrome or type your message.';return}const r=new SpeechRecognition();r.lang='en-IN';r.onresult=e=>{const command=e.results[0][0].transcript;$('voiceStatus').textContent='Heard: '+command;callback(command)};r.onerror=e=>$('voiceStatus').textContent='Voice error: '+e.error;r.start()}
$('listen').onclick=()=>listenFor(command=>sendChat(command,true));$('chatMic').onclick=()=>listenFor(command=>sendChat(command,true));
addChat('bot','Welcome! Paste your notes and ask me a question. I run without a paid AI API.');
