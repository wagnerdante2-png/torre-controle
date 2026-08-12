views.salesheat={title:'Vendas por Horário',render:renderSalesHeat};

function renderSalesHeat(){
  const hours=['08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'];
  const days=['SEG','TER','QUA','QUI','SEX','SÁB','DOM'];
  const matrix={
    SEG:[1,2,3,4,5,5,4,4,5,6,7,8,8,6,3],
    TER:[1,2,3,4,5,5,4,4,5,6,7,8,7,6,3],
    QUA:[1,2,3,4,5,5,4,5,5,6,7,8,8,6,3],
    QUI:[1,2,3,4,5,5,4,5,6,7,8,9,9,7,4],
    SEX:[2,3,4,5,6,6,5,6,7,8,9,10,10,8,5],
    SÁB:[3,4,5,6,7,8,7,7,8,9,10,10,9,7,4],
    DOM:[2,3,4,5,6,7,6,6,7,8,8,9,8,6,3]
  };
  const regional=[
    ['Guardiões da Luz',[2,3,4,5,6,6,5,5,6,7,8,9,9,7,4]],
    ['Vento Dourado',[2,3,4,5,5,6,5,5,6,7,8,8,9,7,4]],
    ['Raio Bravo',[1,2,3,4,5,5,4,5,6,7,8,9,10,8,5]],
    ['Oceano Mara',[2,3,4,5,6,7,6,6,7,8,9,10,9,7,4]],
    ['Raízes do Lar',[1,2,3,4,5,5,4,4,5,6,7,8,8,6,3]],
    ['Regional 06',[2,3,4,5,6,6,5,5,6,7,8,9,8,6,3]]
  ];
  content.innerHTML=`<section class="heatmap-shell">
    <div class="detail-header"><div><span class="section-kicker">COMPORTAMENTO DE VENDAS · TEMPO</span><h2>Vendas por horário</h2><p>Mapa de calor conceitual da intensidade de vendas ao longo do dia e da semana. Dados mock até conexão com a fonte oficial.</p></div><div class="legend"><i class="dot cyan"></i> baixa intensidade <i class="dot yellow"></i> alta <i class="dot red"></i> pico</div></div>
    <div class="heat-summary"><div class="kpi"><span>PICO DA REDE</span><b>19h–20h</b><small>maior concentração de vendas</small></div><div class="kpi"><span>DIA MAIS FORTE</span><b>Sábado</b><small>+18% vs média diária</small></div><div class="kpi"><span>JANELA MAIS FRACA</span><b>08h–09h</b><small>menor intensidade da rede</small></div><div class="kpi"><span>VENDA 17h–21h</span><b>46%</b><small>participação no total diário</small></div></div>
    <article class="panel heat-board"><div class="panel-head"><div><span class="section-kicker">REDE · SEMANA</span><h2>Mapa de calor por dia e hora</h2></div><span class="panel-value">INTENSIDADE RELATIVA</span></div><div class="heatmap-wrap"><div class="heat-grid"><div></div>${hours.map(h=>`<div class="heat-label">${h}h</div>`).join('')}${days.map(d=>`<div class="heat-day">${d}</div>${matrix[d].map((v,i)=>`<div class="heat-cell heat-${v}" title="${d} ${hours[i]}h · intensidade ${v}/10">${v>=8?`${v}0%`:''}</div>`).join('')}`).join('')}</div></div><div class="heat-legend"><span>BAIXA</span><i class="heat-1"></i><i class="heat-3"></i><i class="heat-5"></i><i class="heat-7"></i><i class="heat-9"></i><i class="heat-10"></i><span>PICO</span></div></article>
    <article class="panel heat-side"><div class="panel-head"><div><span class="section-kicker">JANELAS CRÍTICAS</span><h2>Top horários de venda</h2></div></div><div class="peak-list">${[['01','Sábado · 19h–20h','R$ 428 mil'],['02','Sexta · 19h–20h','R$ 401 mil'],['03','Sábado · 18h–19h','R$ 389 mil'],['04','Domingo · 19h–20h','R$ 344 mil'],['05','Quinta · 19h–20h','R$ 331 mil']].map(r=>`<div class="peak-row"><div class="peak-rank">${r[0]}</div><div><b>${r[1]}</b><span>janela de maior pressão operacional</span></div><strong>${r[2]}</strong></div>`).join('')}</div></article>
    <article class="panel regional-heat"><div class="panel-head"><div><span class="section-kicker">REGIONAIS</span><h2>Intensidade de vendas por horário</h2></div><span class="panel-value">08h → 22h</span></div><div class="regional-strip">${regional.map(([name,vals])=>`<div class="regional-row"><div class="regional-name">${name}</div>${vals.map(v=>`<div class="region-cell heat-${v}" title="${name} · intensidade ${v}/10"></div>`).join('')}</div>`).join('')}</div></article>
    <div class="hour-focus"><div class="hour-card"><span>IMPACTO OPERACIONAL</span><b>Reforço 17h–21h</b><small>Janela candidata para cruzamento com headcount, absenteísmo, tempo de PDV e abertura de caixas.</small></div><div class="hour-card"><span>OPORTUNIDADE</span><b>Pré-pico 16h–17h</b><small>Reposição, abastecimento e preparação de frente podem ser antecipados antes da maior pressão.</small></div><div class="hour-card"><span>LEITURA DA TORRE</span><b>Venda/hora + equipe</b><small>Esta aba pode futuramente mostrar produtividade, fila, ruptura e perda estimada na mesma célula horária.</small></div></div>
  </section>`;
}
