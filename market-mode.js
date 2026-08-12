const marketViews={
 compare:{title:'De: / Para:',render:renderCompare}
};
Object.assign(views,marketViews);
function renderCompare(){
 const rows=[
 ['ML34','CX-ERR','R$ 1.820','+18,4%','bad'],['ML12','RUP-A','11,4%','+3,1pp','bad'],['ML05','PDV-T','05:12','+22,0%','bad'],['ML26','ACUR','99,7%','+0,8pp','good'],
 ['REDE','VENDA','R$ 3,84M','+5,8%','good'],['REDE','CLIENT','26.482','+3,1%','good'],['ML49','ABS','9,8%','+2,6pp','bad'],['ML29','INV','99,4%','+0,5pp','good'],
 ['ML18','TICKET','R$ 151','+4,2%','good'],['ML07','RUP','3,1%','-1,2pp','good'],['ML31','TURN','6,7%','+1,4pp','bad'],['ML42','DESC','1,8%','-0,3pp','good'],
 ['ML14','SAC','12','-21,0%','good'],['ML55','HE','186h','+16,0%','bad'],['ML03','RECEB','01:21','-18min','good'],['ML22','CANC','7','-31,0%','good']
 ];
 const cols=[rows.slice(0,4),rows.slice(4,8),rows.slice(8,12),rows.slice(12,16)];
 content.innerHTML=`<section class="detail-grid">
 <div class="detail-header"><div><span class="section-kicker">MODO COMPARATIVO · TRADING DESK</span><h2>Transforme indicador em decisão</h2><p>Leitura conceitual de origem → estado atual → impacto operacional, usando a linguagem visual dos painéis de bolsa.</p></div><div class="legend"><i class="dot green"></i> favorável <i class="dot red"></i> desfavorável</div></div>
 <article class="market-tape"><div class="market-tape-head"><h2>OPERATIONS EXCHANGE · LIVE BOARD</h2><small>LOJA · INDICADOR · VALOR · VARIAÇÃO</small></div><div class="quote-grid">${cols.map(c=>`<div class="quote-col">${c.map(r=>`<div class="quote-row"><span class="code">${r[0]}</span><span class="neutral">${r[1]}</span><span class="neutral">${r[2]}</span><span class="${r[4]==='good'?'positive':'negative'}">${r[4]==='good'?'▲':'▼'} ${r[3]}</span></div>`).join('')}</div>`).join('')}</div></article>
 <article class="compare-board">
  <div class="compare-side from"><div class="compare-label">DE: SINAL ISOLADO</div><h3>“Ruptura: 11,4%”</h3><p>O número sozinho informa que existe um problema. Para a torre, porém, falta contexto: tendência, impacto, causa provável, benchmark e prioridade.</p><div class="compare-metrics"><div class="compare-metric bad"><span>ML12 · RUPTURA</span><b>11,4%</b><small>▲ 3,1 p.p.</small></div><div class="compare-metric"><span>CURVA A</span><b>37 SKUs</b><small>sem disponibilidade</small></div><div class="compare-metric"><span>VENDA PERDIDA</span><b>R$ 18,4k</b><small>estimada hoje</small></div><div class="compare-metric"><span>POSIÇÃO REDE</span><b>59 / 60</b><small>ranking operacional</small></div></div><div class="exchange-chart"><svg viewBox="0 0 400 90" preserveAspectRatio="none"><polyline class="line" points="0,65 40,55 80,63 120,42 160,48 200,34 240,39 280,22 320,28 360,15 400,20"/></svg></div></div>
  <div class="compare-arrow"><div>→</div></div>
  <div class="compare-side to"><div class="compare-label">PARA: INTELIGÊNCIA ACIONÁVEL</div><h3>Ruptura crítica com impacto comercial</h3><p>A torre correlaciona sinais e entrega a leitura operacional: onde agir, por que agir e qual dimensão do problema precisa ser atacada primeiro.</p><div class="compare-metrics"><div class="compare-metric bad"><span>SEVERIDADE</span><b>CRÍTICA</b><small>score 91 / 100</small></div><div class="compare-metric good"><span>PRIORIDADE</span><b>#02 REDE</b><small>ação imediata</small></div><div class="compare-metric"><span>CAUSA PROVÁVEL</span><b>Reposição</b><small>recebido, não exposto</small></div><div class="compare-metric"><span>OPORTUNIDADE</span><b>R$ 18,4k</b><small>recuperável / dia</small></div></div><div class="exchange-chart"><svg viewBox="0 0 400 90" preserveAspectRatio="none"><polyline class="line2" points="0,68 40,62 80,55 120,59 160,43 200,47 240,31 280,36 320,20 360,24 400,9"/></svg></div></div>
 </article>
 <div class="compare-context"><div class="context-card"><span>DE: TEMPO PDV</span><b>05:12 → pressão de fila</b><small>PARA: cruzar fluxo horário + headcount + caixas ativos + abandono para apontar a janela e a causa.</small></div><div class="context-card"><span>DE: ERRO DE CAIXA</span><b>R$ 1.820 → risco financeiro</b><small>PARA: reincidência + operador + faixa horária + ajustes manuais para separar evento isolado de padrão.</small></div><div class="context-card"><span>DE: ABSENTEÍSMO</span><b>9,8% → impacto operacional</b><small>PARA: função + escala + produtividade + venda/hora para quantificar efeito real na operação.</small></div></div>
 ${comparisonMatrix()}
 </section>`;
}
function comparisonMatrix(){
 const data=[['PDV & Cliente','Tempo / cancelamentos','Fila + fluxo + HC + abandono','Pressão operacional'],['Comercial','Venda / ticket / preço','Meta + YoY + ruptura + descontos','Oportunidade / risco'],['Estoque','Ruptura / sem venda','Curva + recebimento + exposição','Venda perdida'],['Inventário','Acuracidade / divergência','Valor + ajustes + recorrência','Risco patrimonial'],['Pessoas','Absenteísmo / turnover','Função + produtividade + HE','Capacidade operacional'],['Financeiro','Falta / sobra / ajustes','Operador + horário + reincidência','Risco financeiro'],['SAC','Reclamações','Categoria + loja + tendência','Experiência / causa raiz']];
 return `<article class="panel span-12"><div class="panel-head"><div><span class="section-kicker">ARQUITETURA DE LEITURA</span><h2>Como as demais abas evoluem do dado para a decisão</h2></div></div>${table(['ABA','DE: DADO','PARA: CORRELAÇÃO','SAÍDA DA TORRE'],data)}</article>`;
}

// WALLBOARD DE ADERÊNCIA DE ESCALA
(function initAdherenceModule(){
 const css=document.createElement('link');css.rel='stylesheet';css.href='adherence-dashboard.css';document.head.appendChild(css);
 const compareBtn=document.querySelector('[data-view="compare"]');
 if(compareBtn && !document.querySelector('[data-view="adherence"]')){
  const btn=document.createElement('button');btn.className='nav-item';btn.dataset.view='adherence';btn.innerHTML='<span>◌</span><b>Aderência de Escala</b>';compareBtn.insertAdjacentElement('afterend',btn);
 }
 views.adherence={title:'Aderência de Escala',render:renderAdherence};
})();

const adherenceStores=[
 ['ML01','Jundiaí Barão de Jundiaí',94.8],['ML02','Várzea Paulista',92.6],['ML03','Jundiaí Praça Rui Barbosa',88.9],['ML04','Kids (Inativa)',null],['ML05','Jundiaí Maxi Shopping',95.91],['ML06','Campinas Barão de Itapura',70.56],['ML07','Itu Centro',91.7],['ML08','Campinas Moraes Sales',89.8],['ML09','Indaiatuba',93.4],['ML10','Capivari',86.9],
 ['ML11','Sorocaba Simus',90.8],['ML12','Americana',92.1],['ML13','Santa Bárbara',87.6],['ML14','Piracicaba',94.2],['ML15','Limeira',95.81],['ML16','Cosmópolis',88.1],['ML17','Sorocaba Esplanada',91.3],['ML18','Araraquara Av. 36',89.2],['ML19','São Carlos',93.8],['ML20','Valinhos',90.1],
 ['ML21','Sertãozinho',95.49],['ML22','Ribeirão Amin Calil',91.9],['ML23','Sorocaba Ipanema',87.2],['ML24','Ribeirão Independência',92.8],['ML25','Sumaré',90.6],['ML26','Itapetininga',96.43],['ML27','Campinas Shopping',93.1],['ML28','Itu Plaza Shopping',89.6],['ML29','Mogi Guaçu',96.25],['ML30','Araraquara Centro',91.1],
 ['ML31','Bauru Duque',77.41],['ML32','Bauru Castelo',86.5],['ML33','Campinas Amoreiras',92.4],['ML34','Jundiaí Multi Modas',88.4],['ML35','Campinas Bandeiras',90.9],['ML36','Lençóis Paulista',93.6],['ML37','Marília',89.1],['ML38','Hortolândia',91.5],['ML39','Campinas Dom Pedro',94.5],['ML40','Leme',87.9],
 ['ML41','Botucatu',92.3],['ML42','Bauru Shopping',90.4],['ML43','Franca',93.7],['ML44','Amparo',88.6],['ML45','Araras',91.8],['ML46','Franca Shopping',94.1],['ML47','Paulínia',89.7],['ML48','Ribeirão Saudade',92.9],['ML49','Botucatu Major',85.8],['ML50','Campinas Saudade',90.2],
 ['ML51','Itatiba',93.2],['ML52','Jaú',88.8],['ML53','Pirassununga',91.4],['ML54','Araçatuba',94.6],['ML55','Jundiaí Pincinato',89.4],['ML56','Catanduva',92.7],['ML57','Caieiras',87.4],['ML58','Salto',90.7],['ML59','Avaré',93.9],['ML60','Barretos',91.6]
];

function adherenceColor(score){if(score==null)return '#607080';if(score>=95)return '#4dff8b';if(score>=90)return '#25e3ff';if(score>=80)return '#ffd34f';return '#ff4d67'}
function adherenceStatus(score){if(score==null)return 'INATIVA';if(score>=95)return 'EXCELENTE';if(score>=90)return 'ADERENTE';if(score>=80)return 'ATENÇÃO';return 'CRÍTICO'}
function renderAdherence(){
 const active=adherenceStores.filter(s=>s[2]!=null),avg=active.reduce((a,s)=>a+s[2],0)/active.length;
 const excellent=active.filter(s=>s[2]>=95).length,adherent=active.filter(s=>s[2]>=90&&s[2]<95).length,attention=active.filter(s=>s[2]>=80&&s[2]<90).length,critical=active.filter(s=>s[2]<80).length;
 const sorted=[...active].sort((a,b)=>b[2]-a[2]);
 content.innerHTML=`<section class="detail-grid"><div class="detail-header"><div><span class="section-kicker">WORKFORCE · SCORE DE EXECUÇÃO</span><h2>Aderência de escala · 60 lojas</h2><p>Wallboard único para leitura instantânea da aderência de cada unidade. Valores desta tela são conceituais/mock até a conexão com a fonte oficial.</p></div><div class="adh-filterline"><span class="adh-chip active">Todas</span><span class="adh-chip">≥95%</span><span class="adh-chip">90–94,9%</span><span class="adh-chip">80–89,9%</span><span class="adh-chip">&lt;80%</span></div></div>
 <div class="adh-shell"><div class="adh-summary"><div class="adh-summary-card"><span>ADERÊNCIA MÉDIA DA REDE</span><b>${avg.toFixed(1).replace('.',',')}%</b><small>59 lojas ativas · ML04 inativa</small></div><div class="adh-summary-card good"><span>EXCELENTE ≥95%</span><b>${excellent}</b><small>lojas</small></div><div class="adh-summary-card"><span>ADERENTE 90–94,9%</span><b>${adherent}</b><small>lojas</small></div><div class="adh-summary-card warn"><span>ATENÇÃO 80–89,9%</span><b>${attention}</b><small>lojas</small></div><div class="adh-summary-card bad"><span>CRÍTICO &lt;80%</span><b>${critical}</b><small>lojas</small></div></div>
 <article class="adh-board"><div class="adh-board-head"><h2>PAINEL GERAL · SCORE POR LOJA</h2><div class="legend"><i class="dot green"></i> ≥95 <i class="dot cyan"></i> 90–94,9 <i class="dot yellow"></i> 80–89,9 <i class="dot red"></i> &lt;80</div></div><div class="adh-store-grid">${adherenceStores.map(([code,name,score])=>{const c=adherenceColor(score),inactive=score==null;return `<div class="adh-store ${inactive?'inactive':''}" style="--adh-color:${c}" title="${code} · ${name}"><div class="adh-code"><b>${code}</b><i></i></div><div class="adh-name">${name}</div><div class="adh-score"><strong>${inactive?'—':score.toFixed(score%1?2:0).replace('.',',')+'%'}</strong><span>${adherenceStatus(score)}</span></div><div class="adh-track"><i style="width:${inactive?0:score}%"></i></div></div>`}).join('')}</div><div class="adh-note">Wallboard conceitual · preparado para receber o score real da fonte de aderência.</div></article>
 <div class="adh-ranking"><article class="adh-rank-panel"><div class="adh-rank-head">TOP 5 · MAIOR ADERÊNCIA</div>${sorted.slice(0,5).map((s,i)=>`<div class="adh-rank-row top"><span class="pos">#${String(i+1).padStart(2,'0')}</span><div><b>${s[0]} · ${s[1]}</b><small>acima da média da rede</small></div><strong>${s[2].toFixed(2).replace('.',',')}%</strong></div>`).join('')}</article><article class="adh-rank-panel"><div class="adh-rank-head">BOTTOM 5 · PRIORIDADE DE ATUAÇÃO</div>${sorted.slice(-5).reverse().map((s,i)=>`<div class="adh-rank-row bottom"><span class="pos">#${String(60-i).padStart(2,'0')}</span><div><b>${s[0]} · ${s[1]}</b><small>requer leitura de causa e tendência</small></div><strong>${s[2].toFixed(2).replace('.',',')}%</strong></div>`).join('')}</article></div></div></section>`;
}
