const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Body Measurement Tracker</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
<div class="container">
    <div class="left-panel">
        <img src="/images/body.png" alt="Body Measurements">
    </div>
    <div class="right-panel">
        <h1>Body Tracker</h1>
        <div class="latest-card">
            <h2>Latest Measurements</h2>
            <div id="latestData">No data available</div>
        </div>
        <div class="buttons">
            <button id="addBtn">Add Measurements</button>
            <button id="viewBtn">View History</button>
        </div>
    </div>
</div>
<div class="modal" id="measurementModal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Add Measurements</h2>
        <form id="measurementForm">
            <input type="number" id="arm" placeholder="1 - Upper arm (cm)" required>
            <input type="number" id="chest" placeholder="2 - Chest (cm)" required>
            <input type="number" id="abdomen" placeholder="3 - Abdomen (cm)" required>
            <input type="number" id="waist" placeholder="4 - Waist (cm)" required>
            <input type="number" id="lowerHip" placeholder="5 - Lower hip (cm)" required>
            <input type="number" id="thigh" placeholder="6 - Thigh (cm)" required>
            <input type="number" id="weight" placeholder="Weight (kg)" required>
            <button type="submit">Save Measurements</button>
        </form>
    </div>
</div>
<div class="history-section" id="historySection">
    <h2>Measurement History</h2>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>1 - Upper arm</th>
                <th>2 - Chest</th>
                <th>3 - Abdomen</th>
                <th>4 - Waist</th>
                <th>5 - Lower hip</th>
                <th>6 - Thigh</th>
                <th>Weight</th>
            </tr>
        </thead>
        <tbody id="historyTable"></tbody>
    </table>
    <button id="closeHistoryBtn" class="close-history">Close History</button>
</div>
<script src="/script.js"></script>
</body>
</html>`;

const css = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Segoe UI", Roboto, Arial, sans-serif; background: linear-gradient(135deg, #f4f7fb 0%, #eef4ff 100%); margin: 0; color: #1f2937; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.container { display: flex; width: 95vw; max-width: 1400px; height: 90vh; max-height: 900px; padding: 24px; box-sizing: border-box; gap: 24px; }
.left-panel { flex: 1; display: flex; justify-content: center; align-items: center; background: linear-gradient(145deg, #ffffff 0%, #f5f9ff 100%); border-radius: 24px; padding: 32px; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08); }
.left-panel img { width: 77%; max-width: 380px; border-radius: 20px; box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15); }
.right-panel { flex: 1; padding: 48px; background: rgba(255,255,255,0.95); border-radius: 24px; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08); display: flex; flex-direction: column; justify-content: center; }
.right-panel h1 { margin: 0 0 8px; font-size: 2.8rem; font-weight: 800; background: linear-gradient(135deg, #1e40af, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -1px; }
.latest-card { background: linear-gradient(145deg, #ffffff, #f8faff); padding: 28px; border-radius: 20px; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06); border: 1px solid #e2e8f0; margin: 16px 0 24px; }
.latest-card h2 { margin-top: 0; margin-bottom: 16px; font-size: 0.85rem; color: #2563eb; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
#latestData { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
#latestData p { margin: 6px 0; color: #334155; font-size: 0.95rem; }
.buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
button { padding: 14px 28px; border: none; border-radius: 999px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s ease; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.18); flex: 1; min-width: 180px; }
#addBtn { background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; }
#viewBtn { background: linear-gradient(135deg, #475569, #64748b); color: white; }
.modal { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); z-index: 1000; }
.modal-content { width: min(92vw, 450px); margin: 60px auto; background: white; padding: 36px 32px; border-radius: 24px; box-shadow: 0 24px 48px rgba(15, 23, 42, 0.25); position: relative; }
.modal-content input { width: 100%; padding: 12px 14px; margin: 6px 0; border: 2px solid #e2e8f0; border-radius: 12px; }
.modal-content button[type="submit"] { width: 100%; margin-top: 16px; padding: 14px; background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; font-size: 1rem; border-radius: 12px; }
.close { float: right; cursor: pointer; font-size: 28px; color: #94a3b8; }
.history-section { display: none; padding: 32px; margin: 24px auto; width: 95vw; max-width: 1400px; background: white; border-radius: 24px; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08); max-height: 80vh; overflow-y: auto; }
.history-section h2 { margin-top: 0; margin-bottom: 20px; color: #0f172a; font-size: 1.8rem; font-weight: 700; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 14px 12px; text-align: center; }
th { background: linear-gradient(135deg, #eff6ff, #dbeafe); color: #1d4ed8; }
.close-history { margin-top: 20px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; min-width: 120px; flex: 0 1 auto; }
@media (max-width: 1024px) { .container { height: auto; max-height: none; flex-direction: column; padding: 16px; } .left-panel, .right-panel { border-radius: 20px; padding: 24px; } #latestData { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .buttons { flex-direction: column; } button { min-width: 100%; } }`;

const js = `const modal = document.getElementById('measurementModal');
const addBtn = document.getElementById('addBtn');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('measurementForm');
const historySection = document.getElementById('historySection');
const historyTable = document.getElementById('historyTable');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');

addBtn.onclick = () => { modal.style.display = 'block'; document.body.style.overflow = 'hidden'; };
closeBtn.onclick = () => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; };
window.onclick = (e) => { if (e.target === modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; } };

function getLocalMeasurements() { try { return JSON.parse(localStorage.getItem('measurements')) || []; } catch { return []; } }
function saveLocalMeasurements(data) { localStorage.setItem('measurements', JSON.stringify(data)); }

async function getMeasurements() { return getLocalMeasurements(); }
async function saveMeasurements(data) { const existing = getLocalMeasurements(); existing.push(data); saveLocalMeasurements(existing); return existing; }

async function updateLatest() {
  const data = await getMeasurements();
  if (data.length === 0) {
    document.getElementById('latestData').innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #94a3b8; padding: 20px 0;">No measurements recorded yet.<br>Click "Add Measurements" to get started!</p>';
    return;
  }
  const latest = data[data.length - 1];
  document.getElementById('latestData').innerHTML = '<p><b>Date:</b> ' + latest.date + '</p><p><b>1 - Upper arm:</b> ' + latest.arm + ' cm</p><p><b>2 - Chest:</b> ' + latest.chest + ' cm</p><p><b>3 - Abdomen:</b> ' + latest.abdomen + ' cm</p><p><b>4 - Waist:</b> ' + latest.waist + ' cm</p><p><b>5 - Lower hip:</b> ' + (latest.lowerHip || latest.thigh || '') + ' cm</p><p><b>6 - Thigh:</b> ' + (latest.thigh || latest.lowerHip || '') + ' cm</p><p><b>Weight:</b> ' + latest.weight + ' kg</p>';
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const newEntry = { date: new Date().toLocaleDateString(), arm: document.getElementById('arm').value, chest: document.getElementById('chest').value, abdomen: document.getElementById('abdomen').value, waist: document.getElementById('waist').value, lowerHip: document.getElementById('lowerHip').value, thigh: document.getElementById('thigh').value, weight: document.getElementById('weight').value };
  await saveMeasurements(newEntry);
  await updateLatest();
  form.reset();
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = '✓ Saved!';
});

document.getElementById('viewBtn').addEventListener('click', async () => {
  const data = await getMeasurements();
  if (data.length === 0) {
    historyTable.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #94a3b8;">No measurements recorded yet.</td></tr>';
    historySection.style.display = 'block';
    return;
  }
  historyTable.innerHTML = '';
  data.forEach(item => {
    historyTable.innerHTML += '<tr><td><b>' + item.date + '</b></td><td>' + item.arm + '</td><td>' + item.chest + '</td><td>' + item.abdomen + '</td><td>' + item.waist + '</td><td>' + (item.lowerHip || item.thigh || '') + '</td><td>' + (item.thigh || item.lowerHip || '') + '</td><td>' + item.weight + '</td></tr>';
  });
  historySection.style.display = 'block';
});

if (closeHistoryBtn) {
  closeHistoryBtn.addEventListener('click', () => {
    historySection.style.display = 'none';
  });
}

updateLatest();`;

const measurements = [];

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/measurements') {
      if (request.method === 'POST') {
        try {
          const entry = await request.json();
          measurements.push(entry);
          return jsonResponse({ success: true, measurements });
        } catch {
          return jsonResponse({ success: false, error: 'Invalid JSON' }, 400);
        }
      }
      if (request.method === 'GET') {
        return jsonResponse(measurements);
      }
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
          }
        });
      }
    }

    if (path === '/script.js') {
      return new Response(js, { headers: { 'Content-Type': 'application/javascript; charset=utf-8' } });
    }

    if (path === '/style.css') {
      return new Response(css, { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
    }

    if (path === '/images/body.png') {
      return new Response(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#e0f2fe"/><circle cx="200" cy="135" r="70" fill="#93c5fd"/><rect x="135" y="205" width="130" height="120" rx="24" fill="#60a5fa"/></svg>`, { headers: { 'Content-Type': 'image/svg+xml' } });
    }

    if (path === '/favicon.ico') {
      return new Response('', { status: 204 });
    }

    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
};
