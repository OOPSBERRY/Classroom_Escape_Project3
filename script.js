'use strict';

/* ══════════════════════════════════════════════════════
   교실 탈출 프로젝트 — 넌 누구냐
   script.js
   ══════════════════════════════════════════════════════

   ★ 이미지 교체 방법:
     1) type: 'placeholder'  →  type: 'image'
     2) src 필드에 base64 데이터 추가
        예) src: `data:image/png;base64,iVBOR...`
     3) answer 필드에 실제 정답 입력

   ★ 텍스트/SVG 문제:
     1) type: 'placeholder'  →  type: 'text'
     2) content 필드에 HTML/SVG 직접 작성
     3) answer 필드에 실제 정답 입력

   ★ note(힌트 박스) 사용법:
     note: '힌트 내용'  →  문제 위에 금색 박스로 표시
     힌트 없으면 note: ''  또는 note 필드 삭제
   ══════════════════════════════════════════════════════ */

/* ── 문제 데이터 ─────────────────────────────────── */
const problems = [
  {
    id: 1,
    title: '1번 문제',
    answer: '공연장',
    type: 'text',
    content: `<p style="font-family:'Noto Serif KR',serif; font-size:clamp(22px,4vw,52px); font-weight:700; letter-spacing:0.06em; line-height:1.8; color:#000; margin:0;">
        공을 늘리면?
      </p>`,
    note: '',
  },
  {
    id: 2,
    title: '2번 문제',
    answer: '미남',
    type: 'text',
    content: `<p style="font-family:'Noto Serif KR',serif; font-size:clamp(18px,3vw,40px); font-weight:700; letter-spacing:0.04em; line-height:2; color:#000; margin:0;">
        아무리 예뻐도<br>미녀라고 못하는 이 사람은?
      </p>`,
    note: '',
  },
  {
    id: 3,
    title: '3번 문제',
    answer: '헐레벌떡',
    type: 'text',
    content: `<p style="font-family:'Noto Serif KR',serif; font-size:clamp(22px,4vw,52px); font-weight:700; letter-spacing:0.06em; line-height:1.8; color:#000; margin:0;">
        급하게 만든 떡은?
      </p>`,
    note: '',
  },
  {
    id: 4,
    title: '4번 문제',
    answer: '신기록',
    type: 'text',
    content: `<p style="font-family:'Noto Serif KR',serif; font-size:clamp(20px,3.5vw,46px); font-weight:700; letter-spacing:0.05em; line-height:2; color:#000; margin:0;">
        깨뜨렸는데<br>칭찬 받는 것은?
      </p>`,
    note: '',
  },
  {
    id: 5,
    title: '5번 문제',
    answer: '커용',
    type: 'text',
    content: `<p style="font-family:'Noto Serif KR',serif; font-size:clamp(22px,4vw,52px); font-weight:700; letter-spacing:0.06em; line-height:1.8; color:#000; margin:0;">
        자가용의 반대말은?
      </p>`,
    note: '',
  },
  {
    id: 6,
    title: '6번 문제',
    answer: '사진',
    type: 'text',
    content: `<p style="font-family:'Noto Serif KR',serif; font-size:clamp(20px,3.5vw,46px); font-weight:700; letter-spacing:0.05em; line-height:2; color:#000; margin:0;">
        오래될수록<br>어려보이는 것은?
      </p>`,
    note: '',
  },
  {
    id: 7,
    title: '7번 문제',
    answer: '영어',
    type: 'text',
    content: `<p style="font-family:'Noto Serif KR',serif; font-size:clamp(22px,4vw,52px); font-weight:700; letter-spacing:0.06em; line-height:1.8; color:#000; margin:0;">
        어린 물고기는?
      </p>`,
    note: '',
  },
  {
    id: 8,
    title: '8번 문제',
    answer: '세대차이',
    type: 'text',
    content: `<p style="font-family:'Noto Serif KR',serif; font-size:clamp(18px,3vw,40px); font-weight:700; letter-spacing:0.04em; line-height:2; color:#000; margin:0;">
        아빠는 차가 5개,<br>아들은 차가 2대인 것은?
      </p>`,
    note: '',
  },
  {
    id: 9,
    title: '9번 문제',
    answer: '45',
    type: 'text',
    content: `<svg viewBox="0 0 540 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;">
      <rect x="0" y="0" width="540" height="500" fill="#1c1c1c" rx="10"/>
      <!-- 세로 구분선 -->
      <line x1="108" y1="0"  x2="108" y2="500" stroke="white" stroke-width="3"/>
      <line x1="432" y1="0"  x2="432" y2="500" stroke="white" stroke-width="3"/>
      <!-- 가로 구분선 -->
      <line x1="0" y1="100" x2="540" y2="100" stroke="white" stroke-width="3"/>
      <line x1="0" y1="200" x2="540" y2="200" stroke="white" stroke-width="3"/>
      <line x1="0" y1="300" x2="540" y2="300" stroke="white" stroke-width="3"/>
      <line x1="0" y1="400" x2="540" y2="400" stroke="white" stroke-width="3"/>
      <!-- 외곽 테두리 -->
      <rect x="1.5" y="1.5" width="537" height="497" fill="none" stroke="white" stroke-width="3" rx="9"/>
      <!-- 1행 -->
      <text x="54"  y="50" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">3</text>
      <text x="270" y="50" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">51</text>
      <text x="486" y="50" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">5</text>
      <!-- 2행 -->
      <text x="54"  y="150" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">8</text>
      <text x="270" y="150" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">46</text>
      <text x="486" y="150" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">8</text>
      <!-- 3행 -->
      <text x="54"  y="250" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">2</text>
      <text x="270" y="250" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">41</text>
      <text x="486" y="250" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">7</text>
      <!-- 4행 -->
      <text x="54"  y="350" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">3</text>
      <text x="270" y="350" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">21</text>
      <text x="486" y="350" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">4</text>
      <!-- 5행 -->
      <text x="54"  y="450" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">6</text>
      <text x="270" y="450" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">?</text>
      <text x="486" y="450" text-anchor="middle" dominant-baseline="central" font-size="52" font-family="Arial Rounded MT Bold, Arial Black, sans-serif" font-weight="900" fill="#9898c0">9</text>
    </svg>`,
    note: '',
  },
];

/* ── 상수 ─────────────────────────────────────────── */
const TOTAL     = problems.length;
const MAX_LIVES = 15;

/* ── 상태 ─────────────────────────────────────────── */
let cur   = 0;
let lives = MAX_LIVES;

/* ── DOM 참조 ─────────────────────────────────────── */
const $ = id => document.getElementById(id);

const startPanel    = $('startPanel');
const gamePanel     = $('gamePanel');
const startBtn      = $('startBtn');
const resetTopBtn   = $('resetTop');
const qrBtn         = $('qrBtn');
const qrOverlay     = $('qrOverlay');
const qrCloseBtn    = $('qrCloseBtn');
const answerInput   = $('answerInput');
const submitBtn     = $('submitBtn');
const feedbackEl    = $('feedback');
const progressEl    = $('progress');
const lifeText      = $('lifeText');
const heartsEl      = $('hearts');
const problemTitle  = $('problemTitle');
const problemNote   = $('problemNote');
const problemMedia  = $('problemMedia');
const problemNo     = $('problemNo');
const successOverlay= $('successOverlay');

const photoStartBtn   = $('photoStartBtn');
const cameraWrap      = $('cameraWrap');
const cameraVideo     = $('cameraVideo');
const photoShootBtn   = $('photoShootBtn');
const photoCancelBtn  = $('photoCancelBtn');
const photoResult     = $('photoResult');
const photoCanvas     = $('photoCanvas');
const photoDownloadBtn= $('photoDownloadBtn');
const photoRetryBtn   = $('photoRetryBtn');
const horrorOverlay   = $('horrorOverlay');

const intro1Panel     = $('intro1Panel');
const intro1NextBtn   = $('intro1NextBtn');
const intro2Panel     = $('intro2Panel');
const dialogueText    = $('introDialogueText');
const dialogCursor    = $('dialogueCursor');
const dialogueDots    = $('dialogueDots');
const introNextBtn    = $('introNextBtn');
const silhouetteWrap  = $('silhouetteWrap');

/* ── 인트로 대화 ──────────────────────────────────── */
const DIALOGUES = [
  '계단 끝, 누군가 서 있었다.',
  '움직이지 않았다. 그냥... 바라보고 있을 뿐이었다.',
  '얼굴도, 이름도, 아무것도 알 수 없다.',
  '하지만 분명히 느꼈다 — 이 사람은 모든 걸 알고 있다고.',
  '그가 누구인지 밝혀내야 한다. 단서는 이미 곳곳에 흩어져 있다.',
];

/* ══════════════════════════════════════════════════════
   인트로 1 — 타이틀 화면
   ══════════════════════════════════════════════════════ */
intro1NextBtn.addEventListener('click', () => {
  intro1Panel.classList.remove('active');
  intro2Panel.classList.add('active');
  runDialogue(0);
});

/* ══════════════════════════════════════════════════════
   인트로 2 — 교실 장면 + 타이핑 대화
   ══════════════════════════════════════════════════════ */
let dlgIdx    = 0;
let typeTimer = null;

function runDialogue(idx) {
  dlgIdx = idx;
  syncDots(idx);

  /* ── 실루엣: 2번째 대사(idx=1)에서 등장, 다른 대사에서 퇴장 ── */
  if (idx === 1) {
    silhouetteWrap.classList.remove('sil-hide');
    void silhouetteWrap.offsetWidth;
    silhouetteWrap.classList.add('sil-show');
  } else if (silhouetteWrap.classList.contains('sil-show')) {
    silhouetteWrap.classList.remove('sil-show');
    silhouetteWrap.classList.add('sil-hide');
  }

  typeWriter(DIALOGUES[idx]);
}

function typeWriter(text) {
  dialogueText.textContent = '';
  dialogCursor.classList.remove('hidden');
  introNextBtn.style.display = 'none';
  let i = 0;
  clearInterval(typeTimer);
  typeTimer = setInterval(() => {
    dialogueText.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(typeTimer);
      dialogCursor.classList.add('hidden');
      const isLast = (dlgIdx === DIALOGUES.length - 1);
      introNextBtn.textContent   = isLast ? '수사 시작 ▶' : '다음 ▶';
      introNextBtn.style.display = 'inline-block';
    }
  }, 50);
}

function syncDots(idx) {
  dialogueDots.querySelectorAll('span').forEach((s, i) => {
    s.classList.toggle('active', i === idx);
  });
}

introNextBtn.addEventListener('click', () => {
  clearInterval(typeTimer);
  if (dlgIdx < DIALOGUES.length - 1) {
    runDialogue(dlgIdx + 1);
  } else {
    intro2Panel.classList.remove('active');
    startPanel.classList.add('active');
  }
});

/* ══════════════════════════════════════════════════════
   시작 패널
   ══════════════════════════════════════════════════════ */
startBtn.addEventListener('click', () => {
  startPanel.classList.remove('active');
  gamePanel.classList.add('active');
  initGame();
});

resetTopBtn.addEventListener('click', () => {
  if (confirm('처음으로 돌아가시겠습니까?')) location.reload();
});

qrBtn.addEventListener('click',      () => qrOverlay.classList.add('show'));
qrCloseBtn.addEventListener('click', () => qrOverlay.classList.remove('show'));
qrOverlay.addEventListener('click',  e => { if (e.target === qrOverlay) qrOverlay.classList.remove('show'); });

/* ══════════════════════════════════════════════════════
   게임 로직
   ══════════════════════════════════════════════════════ */
function initGame() {
  cur   = 0;
  lives = MAX_LIVES;
  renderHearts();
  loadProblem();
}

/* 하트 렌더링 */
function renderHearts() {
  heartsEl.innerHTML = '';
  for (let i = 0; i < MAX_LIVES; i++) {
    const span = document.createElement('span');
    span.className   = 'heart' + (i >= lives ? ' off' : '');
    span.textContent = '❤';
    heartsEl.appendChild(span);
  }
  lifeText.textContent = `정답 도전 횟수 ${lives} / ${MAX_LIVES}`;
}

/* 문제 불러오기 */
function loadProblem() {
  const p = problems[cur];

  progressEl.textContent   = `문제 ${cur + 1} / ${TOTAL}`;
  problemTitle.textContent = p.title;
  problemNo.textContent    = `문제 번호 ${p.id}`;
  answerInput.value        = '';
  clearFeedback();

  /* 노트(힌트 박스) */
  if (p.note) {
    problemNote.textContent   = p.note;
    problemNote.style.display = 'block';
  } else {
    problemNote.style.display = 'none';
  }

  /* 미디어 영역 */
  problemMedia.innerHTML = '';

  if (p.type === 'image') {
    /* ── 이미지 문제 ── */
    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.title;
    problemMedia.appendChild(img);

  } else if (p.type === 'text') {
    /* ── 텍스트/SVG 문제 ── */
    const box = document.createElement('div');
    box.className = 'fake5';
    box.innerHTML = p.content;
    problemMedia.appendChild(box);

  } else {
    /* ── 이미지 준비 중 (placeholder) ── */
    const box = document.createElement('div');
    box.className = 'fake5';
    box.innerHTML = `
      <p style="color:var(--muted);">
        🖼&nbsp;이미지 준비 중<br>
        <span style="font-size:13px; opacity:0.55;">${p.title}</span>
      </p>`;
    problemMedia.appendChild(box);
  }

  answerInput.focus();
}

/* 정답 제출 */
function checkAnswer() {
  const val = answerInput.value.trim();
  if (!val) return;

  if (val === problems[cur].answer) {
    showFeedback('ok', '✅ 정답입니다! 다음 단서로 이동합니다...');
    setTimeout(() => {
      cur++;
      if (cur >= TOTAL) {
        showSuccess();
      } else {
        loadProblem();
      }
    }, 1200);
  } else {
    lives--;
    renderHearts();
    if (lives <= 0) {
      showFeedback('reset', '❌ 도전 횟수를 모두 소진했습니다. 처음부터 다시 시작합니다...');
      setTimeout(() => location.reload(), 2000);
    } else {
      showFeedback('bad', `❌ 틀렸습니다. 남은 도전 횟수: ${lives}회`);
    }
  }
}

submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

/* 피드백 표시 */
function showFeedback(type, msg) {
  feedbackEl.className   = `feedback show ${type}`;
  feedbackEl.textContent = msg;
}
function clearFeedback() {
  feedbackEl.className   = 'feedback';
  feedbackEl.textContent = '';
}

/* ══════════════════════════════════════════════════════
   성공 오버레이
   ══════════════════════════════════════════════════════ */
function showSuccess() {
  stopBGM();
  successOverlay.classList.add('show');
  launchFireworks();
}

/* ══════════════════════════════════════════════════════
   인증샷 기능
   ══════════════════════════════════════════════════════ */
let cameraStream = null;

photoStartBtn.addEventListener('click', async () => {
  photoStartBtn.style.display = 'none';
  cameraWrap.style.display    = 'flex';
  photoResult.style.display   = 'none';
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    cameraVideo.srcObject = cameraStream;
  } catch (err) {
    alert('카메라 접근이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해 주세요.');
    resetPhotoUI();
  }
});

photoShootBtn.addEventListener('click', () => {
  const video  = cameraVideo;
  const canvas = photoCanvas;
  const W = video.videoWidth  || 640;
  const H = video.videoHeight || 480;
  canvas.width  = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');

  /* 좌우 반전 (셀카 자연스럽게) */
  ctx.save();
  ctx.scale(-1, 1);
  ctx.drawImage(video, -W, 0, W, H);
  ctx.restore();

  /* 하단 텍스트 바 */
  const barH = Math.round(H * 0.13);
  ctx.fillStyle = 'rgba(0,0,0,0.62)';
  ctx.fillRect(0, H - barH, W, barH);

  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  /* 큰 텍스트 */
  const bigSize = Math.round(barH * 0.42);
  ctx.font      = `700 ${bigSize}px "Noto Serif KR", serif`;
  ctx.fillStyle = '#e8c875';
  ctx.fillText('🎉 교실 탈출 성공!', W / 2, H - barH * 0.65);

  /* 작은 텍스트 */
  const smallSize = Math.round(barH * 0.26);
  ctx.font        = `500 ${smallSize}px "Noto Sans KR", sans-serif`;
  ctx.fillStyle   = 'rgba(247,244,239,0.75)';
  ctx.fillText('교실 탈출 프로젝트 3편 — 넌 누구냐', W / 2, H - barH * 0.25);

  /* 다운로드 링크 연결 */
  photoDownloadBtn.href = canvas.toDataURL('image/png');

  stopCamera();
  cameraWrap.style.display  = 'none';
  photoResult.style.display = 'flex';

  /* 사진 본 뒤 공포 텍스트 등장 */
  setTimeout(() => {
    horrorOverlay.classList.add('show');
    setTimeout(() => horrorOverlay.classList.remove('show'), 4600);
  }, 1800);
});

photoCancelBtn.addEventListener('click', resetPhotoUI);
photoRetryBtn.addEventListener('click', () => {
  photoResult.style.display = 'none';
  photoStartBtn.style.display = 'block';
});

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
  cameraVideo.srcObject = null;
}

function resetPhotoUI() {
  stopCamera();
  cameraWrap.style.display    = 'none';
  photoResult.style.display   = 'none';
  photoStartBtn.style.display = 'block';
}

/* ══════════════════════════════════════════════════════
   불꽃 효과
   ══════════════════════════════════════════════════════ */
function launchFireworks() {
  const canvas = $('fireworks');
  const ctx    = canvas.getContext('2d');
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const COLORS    = ['#b8963e', '#a01c1c', '#f0ece3', '#c94040', '#e8c875', '#ffffff'];
  const particles = [];

  function burst(x, y) {
    for (let i = 0; i < 45; i++) {
      const a = (Math.PI * 2 * i) / 45;
      const s = 1.5 + Math.random() * 3.5;
      particles.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        r: 1.5 + Math.random() * 2,
      });
    }
  }

  let frame = 0;
  (function tick() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (frame % 32 === 0) {
      burst(
        canvas.width  * (0.15 + Math.random() * 0.7),
        canvas.height * (0.05 + Math.random() * 0.55),
      );
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x    += p.vx;
      p.y    += p.vy;
      p.vy   += 0.07;
      p.life -= 0.016;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    frame++;
    if (frame < 320) requestAnimationFrame(tick);
  })();
}

/* ══════════════════════════════════════════════════════
   BGM — Web Audio API
   정체불명 분위기 — 긴장감 있는 단조 멜로디
   ══════════════════════════════════════════════════════ */
let bgmCtx     = null;
let bgmNodes   = [];
let bgmRunning = false;

function startBGM() {
  if (bgmRunning) return;
  bgmRunning = true;
  bgmCtx = new (window.AudioContext || window.webkitAudioContext)();

  /* ── 마스터 게인 ── */
  const master = bgmCtx.createGain();
  master.gain.setValueAtTime(0, bgmCtx.currentTime);
  master.gain.linearRampToValueAtTime(0.17, bgmCtx.currentTime + 3);
  master.connect(bgmCtx.destination);

  /* ── 리버브 ── */
  const convolver = bgmCtx.createConvolver();
  const revLen = bgmCtx.sampleRate * 3.5;
  const revBuf = bgmCtx.createBuffer(2, revLen, bgmCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = revBuf.getChannelData(ch);
    for (let i = 0; i < revLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / revLen, 2.2);
  }
  convolver.buffer = revBuf;
  const revGain = bgmCtx.createGain();
  revGain.gain.value = 0.42;
  convolver.connect(revGain);
  revGain.connect(master);

  /* ── 드론(지속 저음) ── */
  function makeDrone(freq, vol) {
    const osc = bgmCtx.createOscillator();
    const g   = bgmCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    g.gain.value = vol;
    osc.connect(g); g.connect(master); g.connect(convolver);
    osc.start();
    bgmNodes.push(osc, g);
  }
  makeDrone(49,  0.11);  // G1
  makeDrone(73,  0.07);  // D2
  makeDrone(98,  0.04);  // G2

  /* ── 멜로디 음표 (Dm 스케일 — 더 음침한 분위기) ── */
  // D3=147, E3=165, F3=175, G3=196, A3=220, Bb3=233, C4=262, D4=294
  const scale = [147, 165, 175, 196, 220, 233, 262, 294];
  const melody = [
    [0,1,2],[2,1,1.5],[4,1,1],[3,1,2],
    [5,1,1.5],[4,1,1],[2,1,2],[0,1,1.5],
    [1,1,1],[3,1,2],[5,1,1.5],[6,1,1],
    [4,1,2],[2,1,1.5],[0,1,1],[3,1,2],
  ];
  const BPM  = 58;
  const BEAT = 60 / BPM;

  function scheduleNote(freq, start, dur) {
    const osc  = bgmCtx.createOscillator();
    const gain = bgmCtx.createGain();
    const filt = bgmCtx.createBiquadFilter();
    filt.type = 'lowpass'; filt.frequency.value = 850;
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.20, start + 0.09);
    gain.gain.setValueAtTime(0.16, start + dur * 0.6);
    gain.gain.linearRampToValueAtTime(0, start + dur + 0.18);
    osc.connect(filt); filt.connect(gain);
    gain.connect(master); gain.connect(convolver);
    osc.start(start);
    osc.stop(start + dur + 0.35);
    bgmNodes.push(osc, gain, filt);
  }

  function scheduleMelody(loopStart) {
    let t = loopStart;
    melody.forEach(([idx, oct, beats]) => {
      scheduleNote(scale[idx] * oct, t, beats * BEAT * 0.82);
      t += beats * BEAT;
    });
    return t;
  }

  /* ── 아르페지오 반주 ── */
  const arpNotes = [98, 123, 147, 196, 147, 123];
  function scheduleArp(loopStart, totalBeats) {
    const arpBeat = BEAT * 0.72;
    let t = loopStart;
    while (t < loopStart + totalBeats * BEAT) {
      const freq = arpNotes[Math.floor((t - loopStart) / arpBeat) % arpNotes.length];
      const osc  = bgmCtx.createOscillator();
      const gain = bgmCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.065, t + 0.04);
      gain.gain.linearRampToValueAtTime(0, t + arpBeat * 0.75);
      osc.connect(gain); gain.connect(master); gain.connect(convolver);
      osc.start(t); osc.stop(t + arpBeat);
      bgmNodes.push(osc, gain);
      t += arpBeat;
    }
  }

  /* ── 루프 스케줄러 ── */
  let loopTime = bgmCtx.currentTime + 0.5;
  function loop() {
    const totalBeats = melody.reduce((s, n) => s + n[2], 0);
    const end = scheduleMelody(loopTime);
    scheduleArp(loopTime, totalBeats);
    loopTime = end;
    if (bgmRunning) setTimeout(loop, (totalBeats * BEAT - 1) * 1000);
  }
  loop();
}

function stopBGM() {
  bgmRunning = false;
  bgmNodes.forEach(n => { try { n.stop ? n.stop() : n.disconnect(); } catch(_) {} });
  bgmNodes = [];
  if (bgmCtx) { bgmCtx.close(); bgmCtx = null; }
}

/* BGM은 첫 사용자 인터랙션 시 시작 */
document.addEventListener('click', function startOnce() {
  startBGM();
  document.removeEventListener('click', startOnce);
}, { once: true });
