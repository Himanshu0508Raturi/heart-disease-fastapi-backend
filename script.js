const form = document.getElementById('predictForm');
const resultSection = document.getElementById('result');
const resultContent = document.getElementById('resultContent');
const submitBtn = document.getElementById('submitBtn');

// Change this URL if you need to point to a different path
const PREDICT_URL = 'https://heart-disease-fastapi-backend.onrender.com/predict';

function showResult(label, confidence){
  resultSection.classList.remove('hidden');
  const cls = label.toLowerCase().includes('present') ? 'present' : 'absent';

  // update small result content
  resultContent.innerHTML = `<p><strong>Prediction:</strong> <span class="status ${cls}">${label}</span></p>`;

  // update big badge with animated heart SVG
  const badge = document.getElementById('resultBadge');
  const fillColor = cls === 'present' ? '#ff5a6e' : '#34d399';
  const glowColor = cls === 'present' ? 'rgba(255,90,110,0.18)' : 'rgba(52,211,153,0.12)';
  badge.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="pulse">
      <defs>
        <linearGradient id="hb" x1="0" x2="1">
          <stop offset="0" stop-color="${fillColor}" stop-opacity="0.95" />
          <stop offset="1" stop-color="#ff2d55" stop-opacity="0.95" />
        </linearGradient>
      </defs>
      <path d="M12 21s-6-4.35-6-9a6 6 0 0112 0c0 4.65-6 9-6 9z" fill="url(#hb)" style="filter: drop-shadow(0 10px 22px ${glowColor});" />
    </svg>
    <div style="position:absolute;left:0;right:0;bottom:8px;text-align:center;font-weight:700;color:#0f172a">${label}</div>
  `;

  // update gauge
  const gauge = document.getElementById('gaugeFill');
  const confText = document.getElementById('confText');
  const confNum = Number(confidence);
  confText.textContent = `${confNum}% confidence`;

  // determine color gradient depending on confidence
  let bg;
  if (confNum >= 65) {
    bg = 'linear-gradient(90deg,#2f855a,#38a169)';
  } else if (confNum >= 40) {
    bg = 'linear-gradient(90deg,#f6c23c,#f6a419)';
  } else {
    bg = 'linear-gradient(90deg,#e53e3e,#c53030)';
  }
  gauge.style.background = bg;
  // animate fill
  requestAnimationFrame(() => {
    gauge.style.width = Math.max(1, Math.min(100, confNum)) + '%';
  });
}

function showError(msg){
  resultSection.classList.remove('hidden');
  resultContent.innerHTML = `<p style="color:#b91c1c"><strong>Error:</strong> ${msg}</p>`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Predicting...';
  resultSection.classList.add('hidden');

  try{
    const fd = new FormData(form);
    const payload = {};
    for (const [k,v] of fd.entries()){
      // convert numeric-looking fields to numbers
      const num = Number(v);
      payload[k] = isNaN(num) ? v : (k === 'oldpeak' ? parseFloat(v) : parseInt(num));
    }

    const resp = await fetch(PREDICT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!resp.ok){
      const text = await resp.text();
      throw new Error(`Request failed: ${resp.status} ${text}`);
    }

    const data = await resp.json();

    // Expected response: {label: string, confidence: number}
    if (data.label && (typeof data.confidence !== 'undefined')){
      const conf = Number(data.confidence).toFixed(4);
      // animate and show
      showResult(data.label, conf);
    } else {
      showError('Unexpected response format');
      console.warn('Response JSON:', data);
    }

  }catch(err){
    showError(err.message);
  }finally{
    submitBtn.disabled = false;
    submitBtn.textContent = 'Predict';
  }
});
