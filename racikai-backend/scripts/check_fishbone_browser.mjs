// Optional local Edge smoke test using a fresh, isolated browser profile.
import {spawn} from 'node:child_process';
import {readFile, writeFile, mkdtemp, mkdir} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';

const outputDir=resolve('data/processed/capa_v1');
const profile=await mkdtemp(join(outputDir,'edge-qa-'));
const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ['--headless=new','--disable-gpu','--no-first-run','--disable-background-networking','--disable-sync',
   '--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
let socket;
try {
  let port;
  for(let i=0;i<100;i++){
    try{port=(await readFile(join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0];break}catch{}
    await new Promise(r=>setTimeout(r,100));
  }
  assert.ok(port,'Edge debugging port unavailable');
  const file=pathToFileURL(join(outputDir,'rca_fishbone_explorer.html')).href;
  const target=await (await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(file)}`,{method:'PUT'})).json();
  socket=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})});
  let id=0;const pending=new Map();const errors=[];
  socket.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.id){const pair=pending.get(message.id);if(pair){pending.delete(message.id);message.error?pair.reject(new Error(JSON.stringify(message.error))):pair.resolve(message.result)}}if(message.method==='Runtime.exceptionThrown')errors.push(message.params)});
  const call=(method,params={})=>new Promise((resolve,reject)=>{const current=++id;const timer=setTimeout(()=>{pending.delete(current);reject(new Error(`Timeout: ${method}`))},10000);pending.set(current,{resolve:r=>{clearTimeout(timer);resolve(r)},reject:e=>{clearTimeout(timer);reject(e)}});socket.send(JSON.stringify({id:current,method,params}))});
  const evaluate=async expression=>{const result=await call('Runtime.evaluate',{expression,returnByValue:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value};
  await call('Runtime.enable');await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1100,deviceScaleFactor:1,mobile:false});
  for(let i=0;i<50;i++){if(await evaluate("document.getElementById('report-id')?.textContent==='CAPA-PTI-26-001'"))break;await new Promise(r=>setTimeout(r,100))}
  assert.equal(await evaluate("document.querySelectorAll('#cases button').length"),100);
  await evaluate("document.querySelector('#cases button[data-id=\"CAPA-PTI-26-003\"]').click()");
  assert.equal(await evaluate("document.getElementById('report-id').textContent"),'CAPA-PTI-26-003');
  assert.ok(await evaluate("document.getElementById('diagram').textContent.includes('grinding pigmen')"));
  assert.ok(!await evaluate("document.getElementById('diagram').textContent.includes('setpoint chiller terlalu rendah')"));
  await evaluate("document.getElementById('status').value='Open';document.getElementById('status').dispatchEvent(new Event('change'))");
  assert.equal(await evaluate("document.querySelectorAll('#cases button').length"),20);
  await evaluate("document.getElementById('query').value='NONEXISTENT_CASE';document.getElementById('query').dispatchEvent(new Event('input'))");
  assert.equal(await evaluate("document.getElementById('selected').hidden"),true);
  assert.equal(await evaluate("document.querySelectorAll('#diagram svg').length"),0);
  await evaluate("document.getElementById('status').value='';document.getElementById('query').value='';document.getElementById('query').dispatchEvent(new Event('input'))");
  await evaluate("document.querySelector('#cases button[data-id=\"CAPA-PTI-26-003\"]').click()");
  await evaluate("document.getElementById('branches').querySelector('summary').click()");
  assert.equal(await evaluate("document.getElementById('branches').querySelector('details').open"),true);
  await evaluate("document.getElementById('zoom').click()");
  assert.equal(await evaluate("document.getElementById('diagram').classList.contains('full')"),true);
  await evaluate("document.getElementById('zoom').click()");
  // Check actual rendered SVG text bounds against canvas; no screenshots are altered.
  assert.equal(await evaluate("[...document.querySelectorAll('#diagram text')].every(t=>{const b=t.getBBox();const v=t.ownerSVGElement.viewBox.baseVal;return b.x>=0&&b.y>=0&&b.x+b.width<=v.width&&b.y+b.height<=v.height})"),true);
  const downloads=join(profile,'downloads');await mkdir(downloads);
  await call('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:downloads});
  await evaluate("document.getElementById('download').click()");
  let downloaded='';
  for(let i=0;i<50;i++){try{downloaded=await readFile(join(downloads,'fishbone_CAPA-PTI-26-003.svg'),'utf8');break}catch{}await new Promise(r=>setTimeout(r,100))}
  assert.ok(downloaded.includes('CAPA-PTI-26-003')&&downloaded.includes('grinding pigmen'),'Downloaded SVG must match selected case');
  const screenshot=await call('Page.captureScreenshot',{format:'png'});
  await writeFile(join(outputDir,'fishbone_viewer_preview.png'),Buffer.from(screenshot.data,'base64'));
  assert.equal(errors.length,0,'Browser JavaScript errors');
  console.log('PASS: 100 cases, switch case 001 to 003, Open filter, empty state, expand details, zoom, SVG text bounds and selected-case download; screenshot saved.');
  await call('Browser.close').catch(()=>{});
} finally {socket?.close();browser.kill()}
