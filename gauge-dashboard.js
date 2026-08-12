views.gauges={title:'Velocímetros',render:renderGauges};

function renderGauges(){
 const gauges=[
  {title:'Estresse Operacional',value:82,display:'82 / 100',min:'0',max:'100',tone:'danger',status:'CRÍTICO',trend:'▲ 7 pts',note:'PDV + absenteísmo + turnover + cancelamentos'},
  {title:'Risco Comercial',value:68,display:'68 / 100',min:'0',max:'100',tone:'warn',status:'ATENÇÃO',trend:'▲ 4 pts',note:'Preço + ruptura + desconto + sem venda'},
  {title:'Risco Financeiro',value:41,display:'41 / 100',min:'0',max:'100',tone:'good',status:'CONTROLADO',trend:'▼ 3 pts',note:'Fechamento + ajustes + faltas + exceções'},
  {title:'Saúde Operacional da Rede',value:74,display:'74%',min:'0',max:'100',tone:'cyan',status:'ESTÁVEL',trend:'▲ 2,8%',note:'Índice composto de operação, cliente, estoque e pessoas'},
  {title:'Acuracidade de Inventário',value:98.6,display:'98,6%',min:'90',max:'100',tone:'good',status:'FORTE',trend:'▲ 0,3 p.p.',note:'Físico x sistema'},
  {title:'Ruptura Operacional',value:48,display:'4,8%',min:'0%',max:'10%',tone:'warn',status:'ATENÇÃO',trend:'▼ 0,6 p.p.',note:'Normalizado em escala de risco de 0 a 10%'},
  {title:'Absenteísmo',value:72,display:'7,2%',min:'0%',max:'10%',tone:'danger',status:'ALTO',trend:'▲ 0,9 p.p.',note:'Pressão sobre capacidade operacional'},
  {title:'Produtividade',value:83,display:'R$ 183/h',min:'R$ 120',max:'R$ 200',tone:'good',status:'FORTE',trend:'▲ 3,4%',note:'Venda por hora trabalhada'},
  {title:'Tempo Médio PDV',value:62,display:'03:42',min:'02:00',max:'05:00',tone:'warn',status:'ATENÇÃO',trend:'▼ 8,4%',note:'Velocidade média de atendimento'},
  {title:'Recebimento de Caminhão',value:36,display:'01:48',min:'01:00',max:'03:00',tone:'good',status:'BOM',trend:'▼ 14 min',note:'Tempo médio de recebimento'},
  {title:'Pressão de Caixa',value:77,display:'77 / 100',min:'0',max:'100',tone:'danger',status:'ALTA',trend:'▲ 11 pts',note:'Erros + ajustes + reincidência + exceções'},
  {title:'Experiência do Cliente',value:71,display:'71 / 100',min:'0',max:'100',tone:'cyan',status:'ESTÁVEL',trend:'▲ 5 pts',note:'Fila + SAC + abandono + ticket + cancelamentos'}
 ];
 content.innerHTML=`<section class="detail-grid">
  <div class="gauge-page">
   <article class="gauge-hero"><div class="gauge-hero-top"><div><span class="section-kicker">SALA DE INSTRUMENTOS</span><h2>Velocímetros da operação</h2><p>Leitura instantânea de pressão, risco, saúde e desempenho da rede em uma linguagem de cockpit.</p></div><div class="legend"><i class="dot green"></i> saudável <i class="dot yellow"></i> atenção <i class="dot red"></i> crítico</div></div></article>
   <div class="gauge-summary"><div class="gauge-summary-card"><span>INDICADORES EM ZONA CRÍTICA</span><b class="critical">03</b><small>Estresse, absenteísmo e pressão de caixa</small></div><div class="gauge-summary-card"><span>INDICADORES EM ATENÇÃO</span><b class="warning">03</b><small>Comercial, ruptura e tempo de PDV</small></div><div class="gauge-summary-card"><span>INDICADORES SAUDÁVEIS</span><b class="healthy">06</b><small>Inventário, produtividade, recebimento e demais sinais</small></div></div>
   <div class="gauge-grid">${gauges.map(g=>gaugeCard(g)).join('')}</div>
  </div>
 </section>`;
 requestAnimationFrame(animateGaugeNeedles);
}

function gaugeCard(g){
 return `<article class="gauge-card" data-tone="${g.tone}">
  <div class="gauge-title"><span>${g.title}</span><b>${g.status}</b></div>
  <div class="gauge-shell">
   <svg class="gauge-svg" viewBox="0 0 200 125" role="img" aria-label="${g.title}: ${g.display}">
    <path class="gauge-track" d="M30 100 A70 70 0 0 1 170 100"/>
    <path class="gauge-zone red" pathLength="100" stroke-dasharray="28 72" d="M30 100 A70 70 0 0 1 170 100"/>
    <path class="gauge-zone yellow" pathLength="100" stroke-dasharray="34 66" stroke-dashoffset="-28" d="M30 100 A70 70 0 0 1 170 100"/>
    <path class="gauge-zone green" pathLength="100" stroke-dasharray="38 62" stroke-dashoffset="-62" d="M30 100 A70 70 0 0 1 170 100"/>
    <line class="gauge-needle" data-value="${Math.max(0,Math.min(100,g.value))}" x1="100" y1="100" x2="100" y2="42"/>
    <circle class="gauge-hub" cx="100" cy="100" r="5"/>
   </svg>
   <div class="gauge-value"><strong>${g.display}</strong><small>${g.note}</small></div>
   <div class="gauge-scale"><span>${g.min}</span><span>${g.max}</span></div>
  </div>
  <div class="gauge-footer"><span>VARIAÇÃO</span><b class="${g.tone==='danger'?'bad':g.tone==='warn'?'warn':'good'}">${g.trend}</b></div>
 </article>`;
}

function animateGaugeNeedles(){
 document.querySelectorAll('.gauge-needle').forEach(n=>{
  const v=Number(n.dataset.value)||0;
  const angle=-90+(v*1.8);
  n.style.transform=`rotate(${angle}deg)`;
 });
}
