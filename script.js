(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],N=id=>+$(id).value;
const SH={daun:[[0,0],[.5,.7],[.55,1.5],[0,2.4],[-.55,1.5],[-.5,.7]],kelopak:[[0,0],[.4,.9],[.3,1.8],[0,2.3],[-.3,1.8],[-.4,.9]],ketupat:[[0,0],[.8,1.2],[0,2.4],[-.8,1.2]],tumpal:[[-.8,0],[.8,0],[0,2]],gapura:[[-.8,0],[-.8,1.4],[-.4,1.4],[-.4,1.8],[0,2.3],[.4,1.8],[.4,1.4],[.8,1.4],[.8,0]],kentongan:[[-.35,0],[.35,0],[.45,1.8],[-.45,1.8]],api:[[0,0],[.55,.5],[.45,1.3],[.1,1.8],[.2,2.6],[-.3,1.9],[-.5,1.1],[-.45,.5]]};
const TL=['Tantangan','Bentuk','Koordinat','Transformasi','Pola','Gabungan','Analisis','Budaya','Lingkungan','Presentasi'];
const INSP={none:{n:'Mulai dari nol',d:'Rancang sendiri tanpa contoh.'},
sewu:{n:'Sewu Sendang (daun jati bertingkat)',d:'Terinspirasi motif Bojonegoroan bertema daun jati dan tembakau. Dilatasi memberi daun ukuran bertingkat.',sh:'daun',st:[{t:'D',p:[0,0,1.35],rep:2}],lay:'grid'},
seko:{n:'Seko Sinampir Sekar (kelopak berputar)',d:'Terinspirasi motif bunga dan keris. Rotasi berulang membentuk bunga berkelopak enam.',sh:'kelopak',st:[{t:'O',p:[0,0,60],rep:5}],lay:'bata'},
oklik:{n:'Oklik Pring Aji (kentongan berderet)',d:'Terinspirasi alat musik bambu. Translasi membentuk barisan kentongan.',sh:'kentongan',st:[{t:'T',p:[1.4,0],rep:3}],lay:'cermin'},
agni:{n:'Agni Amerta Kahyangan (api seimbang)',d:'Terinspirasi api abadi Kayangan Api. Refleksi memberi pasangan api yang seimbang.',sh:'api',x0:.3,st:[{t:'R',k:'y',p:[0],rep:1}],lay:'bata'},
waduk:{n:'Waduk Gongseng (gapura berulang)',d:'Terinspirasi gapura di Waduk Gongseng. Translasi membentuk deretan gapura.',sh:'gapura',st:[{t:'T',p:[2,0],rep:2}],lay:'grid'}};
const S={step:1,poly:SH.daun.map(p=>[...p]),steps:[],alt:null,tab:1},P_=Math.PI/180;
const LAB={T:['a (geser x)','b (geser y)',''],R:['nilai h atau k','',''],O:['pusat x','pusat y','sudut (°)'],D:['pusat x','pusat y','faktor k']},DEF={T:[2,0,0],R:[0,0,0],O:[0,0,60],D:[0,0,1.5]};
const base=()=>S.poly.map(p=>[p[0]*N('#size')+N('#x0'),p[1]*N('#size')+N('#y0')]);
function ap(s,P){const[a,b,c]=s.p;return P.map(([x,y])=>{if(s.t=='T')return[x+a,y+b];if(s.t=='R'){const k=s.k;return k=='x'?[x,-y]:k=='y'?[-x,y]:k=='d'?[y,x]:k=='e'?[-y,-x]:k=='h'?[2*a-x,y]:[x,2*a-y]}
if(s.t=='O'){const t=c*P_,u=x-a,v=y-b;return[a+u*Math.cos(t)-v*Math.sin(t),b+u*Math.sin(t)+v*Math.cos(t)]}return[a+c*(x-a),b+c*(y-b)]})}
const chain=st=>{let c=base();const o=[c];st.forEach(s=>{for(let r=0;r<s.rep;r++){c=ap(s,c);o.push(c)}});return o};
const area=P=>Math.abs(P.reduce((s,p,i)=>{const q=P[(i+1)%P.length];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
const nm=s=>({T:`Translasi (${s.p[0]}, ${s.p[1]})`,R:'Refleksi '+({x:'sumbu x',y:'sumbu y',d:'y = x',e:'y = −x',h:'x = '+s.p[0],v:'y = '+s.p[0]})[s.k],O:`Rotasi ${s.p[2]}° pusat (${s.p[0]}, ${s.p[1]})`,D:`Dilatasi k = ${s.p[2]} pusat (${s.p[0]}, ${s.p[1]})`})[s.t]+(s.rep>1?` ×${s.rep}`:'');
const A=i=>i?'A'+(i<4?'′'.repeat(i):`⁽${i}⁾`):'A';
// kanvas koordinat
const cv=$('#cv'),g=cv.getContext('2d'),SC=28,OX=cv.width/2,OY=cv.height/2,X=x=>OX+x*SC,Y=y=>OY-y*SC;
function poly(c,P,f,s,d,sc,ox,oy){c.beginPath();P.forEach((p,i)=>c[i?'lineTo':'moveTo'](X(p[0]),Y(p[1])));c.closePath();c.fillStyle=f;c.fill();c.setLineDash(d||[]);c.strokeStyle=s;c.lineWidth=2;c.stroke();c.setLineDash([])}
function drawC(){g.clearRect(0,0,cv.width,cv.height);g.font='11px Figtree,sans-serif';g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);
for(let i=-10;i<=10;i++){g.strokeStyle=i?'#e8e1cd':'#14213d';g.lineWidth=i?1:2;g.beginPath();g.moveTo(X(i),0);g.lineTo(X(i),cv.height);g.moveTo(0,Y(i));g.lineTo(cv.width,Y(i));g.stroke();if(i&&i%2==0){g.fillStyle='#8a5a2b';g.fillText(i,X(i)+2,Y(0)+12);g.fillText(i,X(0)+3,Y(i)-2)}}
const sh=chain(S.steps);sh.forEach((P,i)=>poly(g,P,i?N('#c2')>0?hex($('#c2').value,.45):'#0002':hex($('#c1').value,.75),i?$('#c2').value:$('#c1').value,i?[5,3]:0));
if(S.alt)poly(g,S.alt,'#7a3cff22','#7a3cff',[3,3]);
g.strokeStyle='#14213d';g.setLineDash([3,3]);g.beginPath();sh.forEach((P,i)=>i?g.lineTo(X(P[0][0]),Y(P[0][1])):g.moveTo(X(P[0][0]),Y(P[0][1])));g.stroke();g.setLineDash([]);
sh.forEach((P,i)=>{g.fillStyle='#14213d';g.beginPath();g.arc(X(P[0][0]),Y(P[0][1]),4,0,7);g.fill();g.fillText(A(i),X(P[0][0])+6,Y(P[0][1])-6)});
base().forEach((p,i)=>{g.fillStyle='#fff';g.strokeStyle='#14213d';g.beginPath();g.arc(X(p[0]),Y(p[1]),S.step==3?6:3,0,7);g.fill();g.stroke();if(i)g.fillText(String.fromCharCode(65+i),X(p[0])+7,Y(p[1])+12)})}
const hex=(h,a)=>{const n=parseInt(h.slice(1),16);return`rgba(${n>>16},${n>>8&255},${n&255},${a})`};
// kain
const fab=$('#fab');
function motif(){const sh=chain(S.steps),all=sh.flat(),xs=all.map(p=>p[0]),ys=all.map(p=>p[1]),x0=Math.min(...xs),y0=Math.min(...ys);return{sh,x0,y0,w:Math.max(...xs)-x0,h:Math.max(...ys)-y0}}
function place(m){const u=N('#cmu')||5,W=N('#cw')/u,H=N('#chh')/u,gap=N('#gap'),lay=$('#lay').value,dx=m.w+gap,dy=m.h+gap,o=[];
for(let j=0;(j+1)*dy-gap<=H+1e-9;j++){const off=lay=='bata'&&j%2?dx/2:0;for(let i=0;i*dx+off+m.w<=W+1e-9;i++)o.push([i*dx+off,j*dy,lay=='cermin'&&i%2,lay=='cermin'&&j%2])}return{o,W,H,u,gap}}
function paint(c,mono){const m=motif(),pl=place(m),w=c.canvas.width,h=c.canvas.height,s=Math.min((w-20)/pl.W,(h-20)/pl.H),ox=(w-pl.W*s)/2,oy=(h-pl.H*s)/2;
c.fillStyle=mono?'#fff':'#e9e2cf';c.fillRect(0,0,w,h);c.fillStyle=mono?'#fff':$('#bg').value;c.fillRect(ox,oy,pl.W*s,pl.H*s);
pl.o.forEach(([px,py,fx,fy])=>m.sh.forEach((P,i)=>{c.beginPath();P.forEach(([x,y],k)=>{let u=x-m.x0,v=y-m.y0;if(fx)u=m.w-u;if(fy)v=m.h-v;const cx=ox+(px+u)*s,cy=oy+(pl.H-(py+v))*s;c[k?'lineTo':'moveTo'](cx,cy)});c.closePath();c.fillStyle=mono?'#000':hex(i?$('#c2').value:$('#c1').value,i?.85:.95);c.fill()}));
if(!mono){c.strokeStyle='#14213d';c.lineWidth=2;c.strokeRect(ox,oy,pl.W*s,pl.H*s)}return{m,pl,ox,oy,s}}
function metrics(){const r=paint(fab.getContext('2d'),0),o=document.createElement('canvas');o.width=fab.width;o.height=fab.height;const c=o.getContext('2d');const q=paint(c,1),d=c.getImageData(Math.round(q.ox),Math.round(q.oy),Math.max(1,Math.round(q.pl.W*q.s)),Math.max(1,Math.round(q.pl.H*q.s))).data;let k=0;for(let i=0;i<d.length;i+=4)if(d[i]<128)k++;const cov=100*k/(d.length/4);
const a0=area(base()),at=chain(S.steps).reduce((s,P)=>s+area(P),0);return{n:r.pl.o.length,cov,a0,at,m:r.m,pl:r.pl,sisa:100-cov}}
// panel
const types=()=>new Set(S.steps.map(s=>s.t));
function plHTML(){return S.steps.length?S.steps.map((s,i)=>`<li>${nm(s)} <button data-u="${i}" aria-label="naik">↑</button><button data-d="${i}" aria-label="turun">↓</button><button data-x="${i}" aria-label="hapus">✕</button></li>`).join(''):'<li>Belum ada langkah. Tambahkan di 9.4.</li>'}
function vt(){$('#vt tbody').innerHTML=base().map((p,i)=>`<tr><td>${String.fromCharCode(65+i)}</td><td><input type="number" step=".5" data-v="${i}" data-a="0" value="${+p[0].toFixed(2)}"></td><td><input type="number" step=".5" data-v="${i}" data-a="1" value="${+p[1].toFixed(2)}"></td></tr>`).join('')}
function info(){const sh=chain(S.steps);$('#so').textContent=N('#size');
$('#read').textContent=S.tab==1?`Bangun: ${sh.length} (1 asli + ${sh.length-1} bayangan). Titik A: `+sh.map((P,i)=>`${A(i)}(${+P[0][0].toFixed(2)}, ${+P[0][1].toFixed(2)})`).slice(0,4).join(' → ')+(sh.length>4?' …':''):(()=>{const t=metrics();return`${t.n} motif di atas kain; kain tertutup motif ${t.cov.toFixed(1)}%.`})();
$('#pl').innerHTML=$('#pl2').innerHTML=plHTML();
const l=LAB[$('#tt').value];[0,1,2].forEach(i=>{$('#l'+i).parentNode.style.display=l[i]?'':'none';$('#l'+i).textContent=l[i]});$('#rkl').style.display=$('#tt').value=='R'?'':'none';
const t=$('#tt').value,k=$('#rk').value;$('#rule').textContent=({T:'(x, y) → (x + a, y + b)',O:'Berlawanan jarum jam bila sudut positif',D:'(x, y) → (cx + k(x − cx), cy + k(y − cy))',R:({x:'(x, y) → (x, −y)',y:'(x, y) → (−x, y)',d:'(x, y) → (y, x)',e:'(x, y) → (−y, −x)',h:'(x, y) → (2h − x, y)',v:'(x, y) → (x, 2k − y)'})[k]})[t];
if(S.step==7)an();if(S.step==9)li();if(S.step==10)rs()}
function an(){const m=metrics(),c={};S.steps.forEach(s=>c[s.t]=(c[s.t]||0)+s.rep);const N_={T:'translasi',R:'refleksi',O:'rotasi',D:'dilatasi'};
const b=[['Kreator: ≥ 2 jenis transformasi',types().size>=2],['Komposer: ≥ 2 langkah berurutan',S.steps.length>=2],['Penghemat: sisa kain ≤ 25%',m.n>0&&m.sisa<=25],['Penjaga budaya: makna ≥ 30 huruf',$('#makna').value.length>=30]];
$('#an').innerHTML=`<div class="met"><div><b>${chain(S.steps).length}</b>bangun per motif</div><div><b>${m.n}</b>motif di kain</div><div><b>${m.a0.toFixed(2)}</b>luas bangun dasar (satuan²)</div><div><b>${m.at.toFixed(2)}</b>luas seluruh motif (satuan²)</div><div><b>${m.cov.toFixed(1)}%</b>kain tertutup</div><div><b>${m.sisa.toFixed(1)}%</b>sisa kain</div></div>
<p>Transformasi dipakai: ${Object.keys(c).map(k=>N_[k]+' ('+c[k]+'×)').join(', ')||'belum ada'}.</p><p>Perhatikan: dilatasi dengan faktor k mengalikan luas dengan k². Bandingkan luas bangun dasar dan luas seluruh motif.</p>${b.map(x=>`<span class="badge ${x[1]?'on':''}">${x[1]?'✓ ':''}${x[0]}</span>`).join('')}`}
function li(){const m=metrics(),u=N('#cmu')||5,cw=N('#cw'),ch=N('#chh'),sisa=m.sisa/100*cw*ch,cols=Math.floor((m.pl.W+m.pl.gap)/(m.m.w+m.pl.gap)),lebih=m.pl.W-(cols*(m.m.w+m.pl.gap)-m.pl.gap),k=(lebih-m.pl.gap)/m.m.w,ok=m.sisa<=25,luasCm=m.at*u*u*m.n;
$('#li').innerHTML=`<div class="met"><div><b>${sisa.toFixed(0)}</b>cm² kain tersisa</div><div><b>${luasCm.toFixed(0)}</b>cm² luas semua motif</div></div><p>Indikator "sisa kain ≤ 25%": <b>${ok?'tercapai':'belum tercapai'}</b> (sisa ${m.sisa.toFixed(1)}%).</p><p>${k>0.15?`Sisa lebar ${lebih.toFixed(1)} satuan. Motif yang diperkecil dengan faktor skala k ≈ ${k.toFixed(2)} dapat mengisi tepi kain.`:'Lebar kain sudah terpakai rapat.'}</p><p>Jika pewarna sebanding luas motif, memperbesar motif dengan k menambah kebutuhan pewarna k² kali. Pikirkan: apakah rancanganmu sudah secukupnya, tidak berlebihan?</p>`}
const rubrik=['Bentuk dan koordinat jelas','Transformasi benar dan berurutan','Pola tertata rapi di kain','Terhubung dengan budaya dan nilai','Hemat bahan dan dijelaskan dengan angka'];
function rs(){const m=metrics(),sh=$('#shape').selectedOptions[0].text;$('#resep').textContent=`${$('#nama').value||'Motif tanpa nama'}\nInspirasi: ${INSP[$('#insp').value].n}\nBentuk dasar: ${sh}, ukuran ${N('#size')}, posisi (${N('#x0')}, ${N('#y0')})\nTitik sudut: ${base().map((p,i)=>String.fromCharCode(65+i)+'('+(+p[0].toFixed(1))+', '+(+p[1].toFixed(1))+')').join(' ')}\nResep:\n${S.steps.map((s,i)=>(i+1)+'. '+nm(s)).join('\n')||'(belum ada)'}\nTata letak: ${$('#lay').selectedOptions[0].text}; kain ${N('#cw')}×${N('#chh')} cm\nHasil: ${m.n} motif, kain tertutup ${m.cov.toFixed(1)}%, sisa ${m.sisa.toFixed(1)}%\nMakna: ${$('#makna').value||'-'}`}
function refresh(){S.alt=null;draw()}
function draw(){drawC();if(S.tab==2||S.step==5)paint(fab.getContext('2d'),0);info()}
function show(n){S.step=Math.min(10,Math.max(1,n));$$('.st').forEach(e=>e.classList.toggle('on',+e.dataset.s==S.step));$('#nav').innerHTML=TL.map((t,i)=>`<button class="${i+1==S.step?'on':i+1<S.step?'done':''}" data-n="${i+1}">9.${i+1} ${t}</button>`).join('');
$('#pos').textContent=`Langkah ${S.step} dari 10`;tab([5,7,9].includes(S.step)?2:1);if(S.step==3)vt()}
function tab(n){S.tab=n;$('#cv').hidden=n!=1;$('#fab').hidden=n!=2;$('#t1').classList.toggle('on',n==1);$('#t2').classList.toggle('on',n==2);draw()}
// peristiwa
$('#nav').onclick=e=>e.target.dataset.n&&show(+e.target.dataset.n);$('#prev').onclick=()=>show(S.step-1);$('#next').onclick=()=>show(S.step+1);$$('[data-go]').forEach(b=>b.onclick=()=>show(+b.dataset.go));$('#t1').onclick=()=>tab(1);$('#t2').onclick=()=>tab(2);
$('#shape').onchange=e=>{S.poly=SH[e.target.value].map(p=>[...p]);refresh();if(S.step==3)vt()};['#size','#x0','#y0','#c1','#c2','#bg','#lay','#cw','#chh','#cmu','#gap','#makna','#nama','#rk','#tt'].forEach(i=>$(i).oninput=()=>{if(i=='#tt')DEFS();refresh();if(['#size','#x0','#y0'].includes(i)&&S.step==3)vt()});
function DEFS(){const t=$('#tt').value;DEF[t].forEach((v,i)=>$('#p'+i).value=v)}
$('#add').onclick=()=>{const t=$('#tt').value;S.steps.push({t,k:$('#rk').value=='v'?'v':$('#rk').value,p:[N('#p0'),N('#p1'),N('#p2')],rep:Math.max(1,Math.min(12,N('#rep')||1))});refresh()};
document.addEventListener('click',e=>{const d=e.target.dataset,i=+(d.u??d.d??d.x);if(d.u!==undefined&&i>0)[S.steps[i-1],S.steps[i]]=[S.steps[i],S.steps[i-1]];else if(d.d!==undefined&&i<S.steps.length-1)[S.steps[i+1],S.steps[i]]=[S.steps[i],S.steps[i+1]];else if(d.x!==undefined)S.steps.splice(i,1);else return;refresh()});
$('#swap').onclick=()=>{const n=S.steps.length;if(n<2){$('#swapout').textContent='Tambahkan minimal dua langkah di 9.4.';return}const t=S.steps.slice();[t[n-2],t[n-1]]=[t[n-1],t[n-2]];const a=chain(S.steps).pop(),b=chain(t).pop(),dd=Math.max(...a.map((p,i)=>Math.hypot(p[0]-b[i][0],p[1]-b[i][1])));draw();S.alt=b;drawC();
$('#swapout').textContent=dd<1e-6?'Hasil SAMA: untuk dua langkah ini urutan tidak berpengaruh.':`Hasil BERBEDA (selisih titik hingga ${dd.toFixed(2)} satuan). Bentuk putus-putus ungu adalah hasil setelah ditukar: urutan berpengaruh.`};
$('#vt').oninput=e=>{const d=e.target.dataset;if(d.v===undefined)return;const s=N('#size')||1,p=S.poly[+d.v];p[+d.a]=(+e.target.value-(d.a==0?N('#x0'):N('#y0')))/s;refresh()};
let drag=-1;const wp=e=>{const r=cv.getBoundingClientRect(),k=cv.width/r.width;return[((e.clientX-r.left)*k-OX)/SC,(OY-(e.clientY-r.top)*k)/SC]};
cv.onpointerdown=e=>{if(S.step!=3)return;const[x,y]=wp(e);drag=base().findIndex(p=>Math.hypot(p[0]-x,p[1]-y)<.5);if(drag>=0)cv.setPointerCapture(e.pointerId)};
cv.onpointermove=e=>{if(drag<0)return;const[x,y]=wp(e),s=N('#size')||1;S.poly[drag]=[(Math.round(x*2)/2-N('#x0'))/s,(Math.round(y*2)/2-N('#y0'))/s];S.alt=null;draw();vt()};cv.onpointerup=()=>drag=-1;
$('#insp').innerHTML=Object.entries(INSP).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join('');$('#insp').onchange=()=>{$('#inspd').textContent=INSP[$('#insp').value].d;rs()};
$('#load').onclick=()=>{const v=INSP[$('#insp').value];if(!v.sh)return;$('#shape').value=v.sh;S.poly=SH[v.sh].map(p=>[...p]);$('#x0').value=v.x0||0;$('#y0').value=0;S.steps=v.st.map(s=>({...s,p:[...s.p],k:s.k||'x'}));$('#lay').value=v.lay;refresh()};
$('#rub').innerHTML=rubrik.map((t,i)=>`<label><input type="checkbox" class="rb"> ${t}</label>`).join('');$('#rub').onchange=()=>{const n=$$('.rb:checked').length;$('#rubo').textContent=`Skor penilaian diri: ${n} dari 5`};
$('#png').onclick=()=>{paint(fab.getContext('2d'),0);const a=document.createElement('a');a.download='motif-batikku.png';a.href=fab.toDataURL();a.click()};$('#copy').onclick=()=>{rs();navigator.clipboard&&navigator.clipboard.writeText($('#resep').textContent)};$('#prn').onclick=()=>{rs();tab(2);print()};
DEFS();$('#inspd').textContent=INSP.none.d;show(1)})();
