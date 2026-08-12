views.staffing={title:'Quadro Alvo x Atual',render:renderStaffing};

function renderStaffing(){
  const roles=[
    {name:'Gerente de Loja',target:60,current:58,gap:-2,status:'attention',icon:'manager'},
    {name:'Estoquista',target:310,current:286,gap:-24,status:'critical',icon:'stock'},
    {name:'Operador de Loja',target:1820,current:1744,gap:-76,status:'critical',icon:'operator'},
    {name:'Locutor',target:54,current:51,gap:-3,status:'attention',icon:'speaker'}
  ];
  const target=roles.reduce((a,r)=>a+r.target,0), current=roles.reduce((a,r)=>a+r.current,0), gap=current-target, coverage=current/target*100;
  content.innerHTML=`<section class="staffing-shell">
    <div class="detail-header"><div><span class="section-kicker">CAPACIDADE OPERACIONAL · PESSOAS</span><h2>Quadro alvo x quadro atual</h2><p>Leitura conceitual da cobertura de quadro por função. Valores mock até integração com RH/Protheus.</p></div><div class="legend"><i class="dot green"></i> ≥ 98% <i class="dot yellow"></i> 95–97,9% <i class="dot red"></i> &lt; 95%</div></div>
    <div class="staffing-summary">
      <div class="kpi"><span>QUADRO ALVO</span><b>${target.toLocaleString('pt-BR')}</b><small>posições previstas</small></div>
      <div class="kpi"><span>QUADRO ATUAL</span><b>${current.toLocaleString('pt-BR')}</b><small>colaboradores ativos</small></div>
      <div class="kpi"><span>COBERTURA</span><b class="${coverage<95?'critical':coverage<98?'warning':'healthy'}">${coverage.toFixed(1).replace('.',',')}%</b><small>rede consolidada</small></div>
      <div class="kpi"><span>GAP TOTAL</span><b class="critical">${gap}</b><small>vagas abaixo do alvo</small></div>
    </div>
    ${roles.map(roleCard).join('')}
    <div class="deficit-feed">
      <div class="deficit-card negative"><span>MAIOR GAP ABSOLUTO</span><b>Operador de Loja · -76</b><small>principal pressão de capacidade da rede</small></div>
      <div class="deficit-card negative"><span>MAIOR GAP %</span><b>Estoquista · 92,3%</b><small>cobertura abaixo do patamar desejado</small></div>
      <div class="deficit-card positive"><span>MAIOR COBERTURA</span><b>Gerente · 96,7%</b><small>58 de 60 posições ocupadas</small></div>
      <div class="deficit-card"><span>LEITURA DA TORRE</span><b>105 posições abertas</b><small>priorizar lojas com impacto em vendas/hora e ruptura</small></div>
    </div>
    <article class="panel staffing-table-wrap"><div class="panel-head"><div><span class="section-kicker">REGIONAIS</span><h2>Cobertura de quadro por função</h2></div><span class="panel-value">REDE · 95,3%</span></div>${table(['Regional','Gerente','Estoquista','Operador','Locutor','Cobertura','Status'],[
      ['Guardiões da Luz','10/10','51/54','301/316','9/9','95,5%','Atenção'],
      ['Vento Dourado','10/10','48/52','292/304','8/9','94,8%','Crítico'],
      ['Raio Bravo','9/10','45/51','281/299','8/9','92,9%','Crítico'],
      ['Oceano Mara','10/10','49/52','298/307','9/9','96,8%','Atenção'],
      ['Raízes do Lar','10/10','47/51','287/300','9/9','95,4%','Atenção'],
      ['Regional 06','9/10','46/50','285/294','8/9','95,0%','Atenção']
    ])}</article>
  </section>`;
}

function roleCard(r){
  const pct=r.current/r.target*100;
  const status=pct<95?'critical':pct<98?'attention':'';
  const pill=pct<95?'bad':pct<98?'warn':'';
  return `<article class="role-card ${status}"><div class="role-head"><div class="role-title"><div class="people-icon">${roleSvg(r.icon)}</div><div><h3>${r.name}</h3><small>cobertura funcional da rede</small></div></div><div class="coverage-pill ${pill}">${pct.toFixed(1).replace('.',',')}%</div></div><div class="role-body"><div class="headcount-line"><div class="headcount-box"><span>ALVO</span><b>${r.target}</b><small>posições</small></div><div class="headcount-box"><span>ATUAL</span><b>${r.current}</b><small>ativos</small></div><div class="headcount-box"><span>GAP</span><b class="${r.gap<0?'critical':'healthy'}">${r.gap}</b><small>${Math.abs(r.gap)} vagas</small></div></div><div class="staff-bar"><i style="width:${Math.min(pct,100)}%"></i></div><div class="role-foot"><span>0%</span><span>cobertura alvo 100%</span><span>100%</span></div><div class="person-strip">${peopleUnits(pct,status)}</div></div></article>`;
}

function peopleUnits(pct,status){
  const total=20, filled=Math.round(total*Math.min(pct,100)/100);
  return Array.from({length:total},(_,i)=>`<i class="person-unit ${i<filled?'filled':''} ${i>=filled&&status==='critical'?'bad':i>=filled&&status==='attention'?'warn':''}"></i>`).join('');
}

function roleSvg(type){
  const common='<circle cx="16" cy="8" r="5" fill="currentColor"/><path d="M7 27c0-7 4-11 9-11s9 4 9 11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
  if(type==='manager') return `<svg viewBox="0 0 32 32">${common}<path d="M11 20h10M16 16v11" stroke="currentColor" stroke-width="2"/></svg>`;
  if(type==='stock') return `<svg viewBox="0 0 32 32">${common}<rect x="2" y="20" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/><rect x="23" y="20" width="7" height="7" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
  if(type==='speaker') return `<svg viewBox="0 0 32 32">${common}<path d="M24 9l5-3v12l-5-3zM21 10v4" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
  return `<svg viewBox="0 0 32 32">${common}<path d="M5 25h22M8 22h16" stroke="currentColor" stroke-width="2"/></svg>`;
}
