const macroView={macro:{title:'Visão Macro',render:renderMacro}}; Object.assign(views,macroView);

function renderMacro(){
  content.innerHTML=`<section class="detail-grid">
    <div class="detail-header"><div><span class="section-kicker">VISÃO SISTÊMICA · COMMAND CENTER</span><h2>Visão Macro da Operação</h2><p>Uma leitura panorâmica da rede: saúde, pressão, correlações, regionais e sinais críticos em uma única superfície.</p></div><div class="legend"><i class="dot green"></i> saudável <i class="dot yellow"></i> atenção <i class="dot red"></i> crítico</div></div>
    <div class="macro-shell">
      <div class="macro-hero">
        <article class="macro-panel">
          <div class="macro-head"><div><span>PULSO DA REDE</span><h2>Mapa lógico de pressão operacional</h2></div><em>60 lojas · 6 regionais</em></div>
          <div class="macro-kpis">
            ${macroKpi('Índice de Saúde','78,4','▲ 2,6 p.p.','macro-up')}
            ${macroKpi('Lojas Críticas','05','▼ 2 vs ontem','macro-up')}
            ${macroKpi('Pressão Média','61/100','▲ 4 pts','macro-warn')}
            ${macroKpi('Alertas Ativos','38','▲ 7','macro-down')}
          </div>
          <div class="macro-network">${macroNetwork()}</div>
        </article>
        <article class="macro-panel">
          <div class="macro-head"><div><span>HEALTH RINGS</span><h2>Dimensões-chave</h2></div><em>score 0—100</em></div>
          <div class="macro-rings">
            ${macroRing('Operação',82,'red')}
            ${macroRing('Comercial',74,'yellow')}
            ${macroRing('Financeiro',59,'yellow')}
            ${macroRing('Pessoas',86,'green')}
          </div>
        </article>
      </div>

      <article class="macro-panel macro-chart"><div class="macro-head"><div><span>EVOLUÇÃO DA REDE</span><h2>Venda, pressão e aderência ao longo do dia</h2></div><em>07h—22h</em></div><canvas id="macroTrend"></canvas></article>
      <article class="macro-panel macro-bars"><div class="macro-head"><div><span>REGIONAIS</span><h2>Saúde operacional por regional</h2></div><em>score composto</em></div><div class="macro-bar-list">${macroBars([['Guardiões da Luz',88],['Vento Dourado',81],['Raio Bravo',77],['Oceano Mara',72],['Raízes do Lar',68],['Chama Central',61]])}</div></article>

      <article class="macro-panel macro-matrix"><div class="macro-head"><div><span>CORRELAÇÕES</span><h2>Matriz de pressão cruzada</h2></div><em>quanto mais quente, maior relação</em></div>${macroMatrix()}</article>
      <article class="macro-panel macro-status"><div class="macro-head"><div><span>RADAR EXECUTIVO</span><h2>5 sinais que merecem atenção agora</h2></div><em>prioridade dinâmica</em></div><div class="macro-status-list">
        ${macroStatus('P1','ML34 · Caixa','Reincidência + ajustes manuais','CRÍTICO','macro-down')}
        ${macroStatus('P2','ML12 · Ruptura','Curva A + venda perdida estimada','CRÍTICO','macro-down')}
        ${macroStatus('P3','ML49 · Pessoas','Absenteísmo acima da regional','ATENÇÃO','macro-warn')}
        ${macroStatus('P4','ML05 · PDV','Tempo de venda pressionado às 18h','ATENÇÃO','macro-warn')}
        ${macroStatus('P5','ML26 · Inventário','Acuracidade acima de 99,5%','SAUDÁVEL','macro-up')}
      </div></article>

      <div class="macro-footer-strip">
        ${macroChip('Venda Hoje','R$ 3,84 mi')}${macroChip('Clientes','26.482')}${macroChip('Ticket Médio','R$ 145,02')}${macroChip('Ruptura','4,8%')}${macroChip('Absenteísmo','7,2%')}${macroChip('Acuracidade','98,6%')}
      </div>
    </div>
  </section>`;
  requestAnimationFrame(drawMacroTrend);
}

function macroKpi(a,b,c,cls){return `<div class="macro-kpi"><span>${a}</span><b>${b}</b><small class="${cls}">${c}</small></div>`}
function macroChip(a,b){return `<div class="macro-chip"><span>${a}</span><b>${b}</b></div>`}
function macroStatus(p,t,d,s,cls){return `<div class="macro-status-row"><strong>${p}</strong><div><b>${t}</b><span>${d}</span></div><b class="macro-badge ${cls}">${s}</b></div>`}
function macroBars(items){return items.map(([n,v])=>`<div class="macro-bar"><span>${n}</span><div class="macro-bar-track"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join('')}
function macroRing(label,value,color){const r=42,c=2*Math.PI*r,off=c*(1-value/100);return `<div class="macro-ring"><svg viewBox="0 0 100 100"><circle class="track" cx="50" cy="50" r="42"/><circle class="value ${color}" cx="50" cy="50" r="42" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg><div class="macro-ring-info"><b>${value}</b><span>${label}</span></div></div>`}
function macroNetwork(){
 const nodes=[['REDE',300,145,'ok'],['R1',120,75,'ok'],['R2',200,55,'ok'],['R3',390,55,'warn'],['R4',490,85,'hot'],['R5',455,220,'warn'],['R6',190,230,'ok']];
 const links=[[0,1,'ok'],[0,2,'ok'],[0,3,''],[0,4,'hot'],[0,5,''],[0,6,'ok'],[1,2,''],[3,4,'hot'],[5,6,'']];
 return `<svg viewBox="0 0 600 290" role="img" aria-label="Rede lógica das regionais">${links.map(([a,b,c])=>`<line class="macro-link ${c}" x1="${nodes[a][1]}" y1="${nodes[a][2]}" x2="${nodes[b][1]}" y2="${nodes[b][2]}"/>`).join('')}${nodes.map(([n,x,y,c],i)=>`<circle class="macro-node ${c}" cx="${x}" cy="${y}" r="${i===0?28:20}"/><text class="macro-label" x="${x}" y="${y+4}" text-anchor="middle">${n}</text>`).join('')}</svg>`
}
function macroMatrix(){
 const heads=['','PDV','CX','EST','RH','INV','COM','SAC'];
 const rows=[['PDV','m1','m2','m2','m3','m1','m2','m2'],['Caixa','m2','m1','m1','m2','m1','m3','m2'],['Estoque','m2','m1','m1','m2','m3','m3','m2'],['Pessoas','m3','m2','m2','m1','m1','m2','m2'],['Inventário','m1','m1','m3','m1','m1','m2','m1'],['Comercial','m2','m3','m3','m2','m2','m1','m2'],['SAC','m2','m2','m2','m2','m1','m2','m1']];
 let html='<div class="macro-gridmatrix">'+heads.map(h=>`<div class="mh">${h}</div>`).join('');
 rows.forEach(r=>{html+=`<div class="mh">${r[0]}</div>`; r.slice(1).forEach((c,i)=>html+=`<div class="${c}">${c==='m3'?'ALTA':c==='m2'?'MÉDIA':'BAIXA'}</div>`)}); return html+'</div>'
}
function drawMacroTrend(){
 const canvas=document.getElementById('macroTrend'); if(!canvas)return; const dpr=window.devicePixelRatio||1; const rect=canvas.getBoundingClientRect(); canvas.width=rect.width*dpr;canvas.height=rect.height*dpr; const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr); const w=rect.width,h=rect.height,p=28;
 ctx.strokeStyle='rgba(71,117,151,.18)';ctx.lineWidth=1; for(let i=0;i<6;i++){let y=p+i*(h-2*p)/5;ctx.beginPath();ctx.moveTo(p,y);ctx.lineTo(w-p,y);ctx.stroke()}
 const series=[{v:[22,28,31,37,42,49,56,63,70,76,84,91],c:'#2edcff'},{v:[18,21,26,29,35,43,50,58,64,71,79,86],c:'#7d6cff'},{v:[72,70,69,66,64,63,61,60,58,57,55,54],c:'#ff5368'}];
 series.forEach(s=>{const min=0,max=100;ctx.beginPath();s.v.forEach((v,i)=>{const x=p+i*(w-2*p)/(s.v.length-1),y=h-p-(v-min)/(max-min)*(h-2*p);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle=s.c;ctx.lineWidth=2;ctx.shadowBlur=8;ctx.shadowColor=s.c;ctx.stroke();ctx.shadowBlur=0});
 const labels=['07','09','11','13','15','17','19','21'];ctx.fillStyle='#7089a0';ctx.font='8px JetBrains Mono';labels.forEach((l,i)=>ctx.fillText(l,p+i*(w-2*p)/(labels.length-1)-5,h-8));
}
