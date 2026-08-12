const content = document.getElementById('content');
const title = document.getElementById('pageTitle');

const views = {
  executive: { title: 'Visão Executiva', render: renderExecutive },
  pdv: { title: 'PDV & Cliente', render: () => renderDetail('PDV, CAIXA & EXPERIÊNCIA DO CLIENTE', 'Fluxo, velocidade de atendimento, cancelamentos e comportamento do cliente.', [
    ['Tempo médio PDV','03:42','▼ 8,4%'],['Self-checkout','02:18','▼ 5,1%'],['Clientes','26.482','▲ 3,1%'],['Ticket médio','R$ 145,02','▼ 1,4%'],['Produtos/cupom','5,8','▲ 0,3']
  ], pdvPanels()) },
  commercial: { title: 'Comercial', render: () => renderDetail('VENDAS, PREÇOS & GOVERNANÇA COMERCIAL', 'Venda, curva, preços, descontos e perda estimada em uma única leitura.', [
    ['Venda geral','R$ 3,84 mi','▲ 5,8%'],['Ano x Ano','+5,8%','positivo'],['Diverg. preço','1,9%','▲ 0,2 p.p.'],['Descontos','R$ 91,2k','2,4% venda'],['Venda perdida','R$ 184k','▼ 4,1%']
  ], commercialPanels()) },
  stock: { title: 'Estoque & Logística', render: () => renderDetail('ESTOQUE, LOGÍSTICA & RECEBIMENTO', 'Da chegada do caminhão à disponibilidade para venda, com foco em ruptura e exceções.', [
    ['Recebimento','01:48','▼ 14 min'],['Volume hoje','18.420 cx','▲ 6,2%'],['Liberação venda','00:36','▼ 9 min'],['Ruptura','4,8%','▼ 0,6 p.p.'],['Sem venda +15d','1.248','▼ 6,8%']
  ], stockPanels()) },
  inventory: { title: 'Inventário', render: () => renderDetail('INVENTÁRIOS & ACURACIDADE', 'Controle físico x sistema, perdas, sobras e correções pós-inventário.', [
    ['Acuracidade','98,6%','▲ 0,3 p.p.'],['Diverg. unidades','3.482','▼ 7,1%'],['Diverg. valor','R$ 112k','▼ 2,8%'],['Ajustes pós-inv.','184','▲ 3,2%'],['Lojas auditadas','43/60','71,7%']
  ], inventoryPanels()) },
  people: { title: 'Pessoas', render: () => renderDetail('RH DE LOJA & PRODUTIVIDADE', 'Disponibilidade de equipe, estabilidade, produtividade e pressão de jornada.', [
    ['Headcount','3.018','99,1% quadro'],['Absenteísmo','7,2%','▲ 0,9 p.p.'],['Turnover','4,2%','▼ 0,4 p.p.'],['Horas extras','1.284h','▲ 5,6%'],['Produtividade','R$ 183/h','▲ 3,4%']
  ], peoplePanels()) },
  finance: { title: 'Financeiro', render: () => renderDetail('FECHAMENTO DE CAIXA & RISCO FINANCEIRO', 'Erros, faltas, sobras, ajustes manuais e reincidência por operador.', [
    ['Erro fechamento','R$ 8.420','▲ 12,8%'],['Fech. com erro','37','▲ 6'],['Faltas','29','R$ 6.910'],['Sobras','8','R$ 1.510'],['Ajustes manuais','61','▲ 9,4%']
  ], financePanels()) },
  sac: { title: 'SAC & Eficiência', render: () => renderDetail('SAC, CONSUMO & EFICIÊNCIA OPERACIONAL', 'Reclamações, uso de insumos, quebras e perdas não comerciais.', [
    ['Reclamações','148','▼ 11,2%'],['Sacolas','112 mil','+2,1%'],['Bobinas','8.420','▼ 4,2%'],['Quebra operacional','R$ 76k','▲ 1,7%'],['Perdas não comerciais','R$ 42k','▼ 3,8%']
  ], sacPanels()) }
};

document.getElementById('nav').addEventListener('click', e => {
  const btn = e.target.closest('.nav-item'); if (!btn) return;
  document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  const key = btn.dataset.view; title.textContent = views[key].title; views[key].render();
});

document.querySelector('.icon-btn').addEventListener('click', () => {
  document.querySelector('.icon-btn').animate([{transform:'rotate(0)'},{transform:'rotate(360deg)'}],{duration:600});
  document.querySelectorAll('.ticker b').forEach(el=>el.animate([{opacity:.4},{opacity:1}],{duration:500}));
});

function renderExecutive(){
  content.innerHTML = document.getElementById('executive-template').innerHTML;
  drawStoreNodes(); drawSparks(); drawSalesChart();
}

function renderDetail(heading, subtitle, kpis, panels){
  content.innerHTML = `<section class="detail-grid">
    <div class="detail-header"><div><span class="section-kicker">ANÁLISE OPERACIONAL</span><h2>${heading}</h2><p>${subtitle}</p></div><div class="legend"><i class="dot green"></i> dentro do padrão <i class="dot yellow"></i> atenção <i class="dot red"></i> crítico</div></div>
    <div class="kpi-strip">${kpis.map(([a,b,c])=>`<div class="kpi"><span>${a}</span><b>${b}</b><small>${c}</small></div>`).join('')}</div>
    ${panels}
  </section>`;
  document.querySelectorAll('.spark').forEach(drawSpark);
  document.querySelectorAll('canvas.line-chart').forEach(drawGenericChart);
}

function pdvPanels(){return `
  ${chartPanel('span-7','CLIENTES POR FAIXA HORÁRIA','Fluxo de clientes x tempo médio de venda','customer')}
  <article class="panel span-5"><div class="panel-head"><div><span class="section-kicker">MOTIVOS</span><h2>Cancelamentos de cupom</h2></div><span class="panel-value">R$ 38,4k</span></div>${bars([['Erro leitura/registro',72],['Cliente desistiu',58],['Erro de preço',43],['Retorno à loja',29],['Desistência',18]])}<div class="section-note">284 cancelamentos · 1,07% dos cupons emitidos</div></article>
  <article class="panel span-6"><div class="panel-head"><h2>Operadores com maior reincidência</h2></div>${table(['Operador','Loja','Cancelamentos','Erro caixa','Status'],[['João M.','ML34','15','R$ 1.120','Crítico'],['Carla S.','ML12','11','R$ 790','Atenção'],['Paulo R.','ML05','10','R$ 620','Atenção'],['Marta L.','ML49','8','R$ 310','Normal']])}</article>
  <article class="panel span-6"><div class="panel-head"><h2>Mapa horário de pressão de atendimento</h2></div>${heatmap()}<div class="section-note">Concentração crítica entre 17h e 20h em 18 lojas.</div></article>`}

function commercialPanels(){return `
  ${chartPanel('span-8','VENDA ACUMULADA','Realizado x meta x ano anterior','sales2')}
  <article class="panel span-4"><div class="panel-head"><h2>Curva A / B / C</h2></div><div class="donut-wrap"><div class="donut"></div><div class="donut-legend"><div><i class="dot cyan"></i> Curva A · 38%</div><div><i class="dot violet"></i> Curva B · 25%</div><div><i class="dot yellow"></i> Curva C · 19%</div><div><i class="dot red"></i> Outros · 18%</div></div></div></article>
  <article class="panel span-6"><div class="panel-head"><h2>Governança de preços</h2></div>${table(['Comprador','Alterações','SKUs recorrentes','Erro preço PDV','Status'],[['Comprador 01','184','28','12','Atenção'],['Comprador 02','142','19','6','Normal'],['Comprador 03','117','31','18','Crítico'],['Comprador 04','96','12','3','Normal']])}</article>
  <article class="panel span-6"><div class="panel-head"><h2>Descontos por motivo</h2></div>${bars([['Promocional',76],['Avaria',48],['Preço errado',31],['Exceção gerencial',17]])}<div class="section-note">2,4% da venda · R$ 91,2 mil aplicados hoje.</div></article>`}

function stockPanels(){return `
  ${chartPanel('span-7','RECEBIMENTO','Tempo médio de caminhão e liberação para venda','stock')}
  <article class="panel span-5"><div class="panel-head"><h2>Produtos sem venda</h2></div>${bars([['+7 dias',88],['+15 dias',61],['+30 dias',34],['Curva A',22]])}<div class="section-note">Filtro parametrizável por período e curva.</div></article>
  <article class="panel span-12"><div class="panel-head"><h2>Lojas com maior pressão logística</h2></div>${table(['Loja','Tempo receb.','Volume','Liberação','Ruptura','Reentregas','Status'],[['ML12','02:44','524 cx','00:58','11,4%','4','Crítico'],['ML34','02:31','418 cx','00:49','8,7%','3','Atenção'],['ML49','02:12','381 cx','00:41','7,2%','2','Atenção'],['ML05','01:46','452 cx','00:32','4,1%','1','Normal'],['ML26','01:29','491 cx','00:28','3,2%','0','Normal']])}</article>`}

function inventoryPanels(){return `
  ${chartPanel('span-7','ACURACIDADE DA REDE','Evolução das últimas 12 medições','inventory')}
  <article class="panel span-5"><div class="panel-head"><h2>Divergência por origem</h2></div>${bars([['Perdas inventário',64],['Sobras',38],['Erro cadastro',29],['Ajuste manual',21]])}<div class="section-note">Divergência líquida estimada: R$ 112 mil.</div></article>
  <article class="panel span-12"><div class="panel-head"><h2>Ranking de acuracidade</h2></div>${table(['Loja','Acuracidade','Diverg. un.','Diverg. R$','Ajustes','Status'],[['ML26','99,7%','42','R$ 1.120','2','Normal'],['ML29','99,4%','58','R$ 1.940','3','Normal'],['ML12','96,8%','284','R$ 18.200','17','Crítico'],['ML34','97,1%','218','R$ 14.480','13','Atenção']])}</article>`}

function peoplePanels(){return `
  ${chartPanel('span-7','PRODUTIVIDADE','Venda por hora trabalhada x absenteísmo','people')}
  <article class="panel span-5"><div class="panel-head"><h2>Absenteísmo por função</h2></div>${bars([['Caixa',82],['Reposição',68],['Liderança',31],['Estoque',47],['Fiscal',36]])}<div class="section-note">Maior concentração: frente de caixa, 9,8%.</div></article>
  <article class="panel span-6"><div class="panel-head"><h2>Turnover por função</h2></div>${table(['Função','HC','Turnover','Tempo casa','HE','Status'],[['Caixa','884','6,1%','1,4 ano','426h','Atenção'],['Reposição','742','4,8%','1,9 ano','318h','Atenção'],['Liderança','284','2,1%','4,2 anos','164h','Normal'],['Estoque','521','3,7%','2,3 anos','251h','Normal']])}</article>
  <article class="panel span-6"><div class="panel-head"><h2>Medidas disciplinares e pressão de jornada</h2></div>${bars([['Advertências',59],['Suspensões',18],['HE > 10h',42],['6º dia consecutivo',23]])}<div class="section-note">Indicadores devem ser usados como sinal operacional, não isoladamente para decisão disciplinar.</div></article>`}

function financePanels(){return `
  ${chartPanel('span-7','ERRO DE FECHAMENTO','Valor diário de faltas e sobras','finance')}
  <article class="panel span-5"><div class="panel-head"><h2>Composição das exceções</h2></div>${bars([['Faltas de caixa',82],['Ajustes manuais',63],['Sobras',29],['Cancelamentos atípicos',44]])}<div class="section-note">Risco financeiro sintético atual: 41 / 100.</div></article>
  <article class="panel span-12"><div class="panel-head"><h2>Exceções por loja</h2></div>${table(['Loja','Erro R$','% faturamento','Fech. c/ erro','Ajustes','Reincidência','Status'],[['ML34','R$ 1.820','0,58%','7','12','Alta','Crítico'],['ML12','R$ 1.290','0,41%','5','9','Alta','Crítico'],['ML05','R$ 880','0,25%','4','7','Média','Atenção'],['ML26','R$ 110','0,03%','1','1','Baixa','Normal']])}</article>`}

function sacPanels(){return `
  ${chartPanel('span-7','RECLAMAÇÕES SAC','Volume de reclamações e tendência','sac')}
  <article class="panel span-5"><div class="panel-head"><h2>Consumo de insumos</h2></div>${bars([['Sacolas',84],['Bobinas',56],['Etiquetas',48],['Papel',34],['Café/açúcar/chá',27]])}<div class="section-note">Consumo normalizado por 1.000 clientes.</div></article>
  <article class="panel span-6"><div class="panel-head"><h2>Quebra e perdas não comerciais</h2></div>${table(['Loja','Quebra op.','Perda não comercial','Consumo/cliente','Status'],[['ML12','R$ 8.920','R$ 4.210','Alto','Crítico'],['ML34','R$ 7.440','R$ 3.880','Alto','Atenção'],['ML05','R$ 4.110','R$ 2.160','Médio','Normal'],['ML26','R$ 2.480','R$ 1.120','Baixo','Normal']])}</article>
  <article class="panel span-6"><div class="panel-head"><h2>SAC por categoria</h2></div>${bars([['Atendimento',72],['Preço divergente',58],['Fila',51],['Produto indisponível',46],['Troca/devolução',22]])}<div class="section-note">148 reclamações no período selecionado.</div></article>`}

function chartPanel(span,kicker,heading,type){return `<article class="panel ${span}"><div class="panel-head"><div><span class="section-kicker">${kicker}</span><h2>${heading}</h2></div><span class="live-tag">LIVE</span></div><div class="chart-wrap"><canvas class="line-chart" data-type="${type}"></canvas></div></article>`}
function bars(items){return `<div class="bar-list">${items.map(([n,v])=>`<div class="bar-row"><span>${n}</span><div class="bar-track"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join('')}</div>`}
function table(headers,rows){return `<div style="overflow:auto"><table class="data-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td>${i===r.length-1?badge(c):`<b>${i===0?c:''}</b>${i===0?'':c}`}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function badge(v){const cls=v==='Crítico'?'red':v==='Atenção'?'yellow':'green';return `<span class="badge ${cls}">${v}</span>`}
function heatmap(){const vals=[1,1,1,2,2,3,4,4,3,2,2,1,1,2,2,2,3,3,4,4,4,3,2,2,1,1,2,3,3,4,4,4,3,2,2,1];return `<div class="heatmap">${vals.map((v,i)=>`<i class="l${v}" data-v="${8+(i%12)}h"></i>`).join('')}</div>`}

function drawStoreNodes(){
  const pts=[[135,316,0],[170,214,1],[220,348,0],[253,187,0],[300,276,1],[347,121,0],[376,252,0],[421,163,1],[454,286,0],[486,217,2],[511,325,0],[542,176,1],[570,282,2],[601,236,0],[624,312,1],[525,376,0],[445,390,0],[341,365,1],[257,318,0],[203,132,0],[589,132,2],[468,115,0],[119,242,0],[308,86,1],[649,199,0]];
  const g=document.getElementById('storeNodes'); if(!g)return;
  pts.forEach((p,i)=>{const color=p[2]===2?'#ff4d67':p[2]===1?'#ffd34f':'#5cff9d';const el=document.createElementNS('http://www.w3.org/2000/svg','g');el.setAttribute('class','store-node');el.innerHTML=`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${color}" filter="url(#glow)"/><circle cx="${p[0]}" cy="${p[1]}" r="2" fill="#07111e"/>`;el.addEventListener('mouseenter',ev=>showStore(ev,i,p));el.addEventListener('mouseleave',()=>document.getElementById('storeTooltip').classList.add('hidden'));g.appendChild(el)});
}
function showStore(ev,i,p){const tip=document.getElementById('storeTooltip');tip.innerHTML=`<b>ML${String(i+1).padStart(2,'0')} · Loja Operacional</b><span>Venda: R$ ${(28+i*1.7).toFixed(1)} mil</span><span>Ticket: R$ ${(132+i%7*3.4).toFixed(2)}</span><span>Status: ${p[2]===2?'Crítico':p[2]===1?'Atenção':'Normal'}</span>`;const box=ev.currentTarget.ownerSVGElement.getBoundingClientRect();tip.style.left=`${Math.min(box.width-180,ev.clientX-box.left+15)}px`;tip.style.top=`${Math.max(10,ev.clientY-box.top-25)}px`;tip.classList.remove('hidden')}

function drawSparks(){document.querySelectorAll('.spark').forEach(drawSpark)}
function drawSpark(el){const pts=(el.dataset.points||'12,18,15,22,20,26,24,29,27,31').split(',').map(Number);const w=200,h=35,min=Math.min(...pts),max=Math.max(...pts);const coords=pts.map((v,i)=>`${i*(w/(pts.length-1))},${h-3-(v-min)/(max-min||1)*(h-8)}`).join(' ');el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#35d8ff" stop-opacity=".28"/><stop offset="1" stop-color="#35d8ff" stop-opacity="0"/></linearGradient></defs><polygon points="0,35 ${coords} 200,35" fill="url(#sg)"/><polyline points="${coords}" fill="none" stroke="#35d8ff" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`}

function drawSalesChart(){document.querySelectorAll('canvas.line-chart').forEach(drawGenericChart)}
function drawGenericChart(canvas){
  const type=canvas.dataset.type||'sales', dataSets={
    sales:[[12,18,23,29,31,38,45,50,58,69,77,86],[11,16,21,27,33,39,46,53,60,67,75,83]],
    customer:[[18,21,28,42,58,64,71,83,92,78,62,39],[28,27,26,28,31,35,38,42,48,44,36,30]],
    sales2:[[14,19,25,31,38,46,55,64,72,81,89,97],[13,18,23,29,35,42,49,57,65,73,81,89]],
    stock:[[66,62,58,55,52,49,45,43,41,38,36,33],[48,46,44,42,40,39,37,36,35,34,33,31]],
    inventory:[[84,86,87,88,90,91,91,93,94,95,97,99],[82,83,85,86,86,88,89,90,91,92,93,94]],
    people:[[48,50,52,53,56,58,60,63,65,66,69,72],[28,31,30,35,38,36,42,44,48,45,43,41]],
    finance:[[22,35,28,51,43,62,38,49,71,53,46,32],[18,21,24,28,31,34,38,40,42,45,47,49]],
    sac:[[62,58,61,55,51,48,50,44,41,39,36,32],[55,54,52,50,48,46,44,42,40,38,36,34]]
  };
  const sets=dataSets[type]||dataSets.sales;const rect=canvas.getBoundingClientRect();const dpr=devicePixelRatio||1;canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;const c=canvas.getContext('2d');c.scale(dpr,dpr);const w=rect.width,h=rect.height,pad=18;
  c.strokeStyle='rgba(66,93,123,.18)';c.lineWidth=1;for(let i=0;i<5;i++){const y=pad+i*(h-2*pad)/4;c.beginPath();c.moveTo(pad,y);c.lineTo(w-pad,y);c.stroke()}
  const colors=['#35d8ff','#9c63ff'];sets.forEach((data,si)=>{const min=0,max=100;const pts=data.map((v,i)=>[pad+i*(w-2*pad)/(data.length-1),h-pad-(v-min)/(max-min)*(h-2*pad)]);const grad=c.createLinearGradient(0,pad,0,h);grad.addColorStop(0,si===0?'rgba(53,216,255,.18)':'rgba(156,99,255,.09)');grad.addColorStop(1,'rgba(0,0,0,0)');c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));if(si===0){c.lineTo(pts.at(-1)[0],h-pad);c.lineTo(pts[0][0],h-pad);c.closePath();c.fillStyle=grad;c.fill()}c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=colors[si];c.lineWidth=2;c.shadowColor=colors[si];c.shadowBlur=8;c.stroke();c.shadowBlur=0;pts.forEach(([x,y])=>{c.beginPath();c.arc(x,y,2,0,Math.PI*2);c.fillStyle=colors[si];c.fill()})})
}

window.addEventListener('resize',()=>document.querySelectorAll('canvas.line-chart').forEach(drawGenericChart));
renderExecutive();