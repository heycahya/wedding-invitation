(function(g){
'use strict';
var cfg=null,guests=[],tpls={},defTpls={},filter='all',query='';
function $(id){return document.getElementById(id)}
function mk(t,c,v){var n=document.createElement(t);if(c)n.className=c;if(v!=null)n.textContent=v;return n}
var gKey=function(){return 'wedding_wa_guests_'+(cfg.slug||'default')};
var tKey=function(){return 'wedding_wa_templates_'+(cfg.slug||'default')};
function toast(m){var el=$('toast');if(!el)return;el.textContent=m;el.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(function(){el.hidden=true},2e3)}
function normPhone(r){var d=String(r||'').replace(/[^0-9+]/g,'');if(!d)return '';if(d.indexOf('+62')===0)return '62'+d.slice(3);if(d.indexOf('62')===0)return d;if(d[0]==='0')return '62'+d.slice(1);return d.replace(/^\+/,'')}
function mkLink(n){return String(cfg.baseUrl||(g.location.origin+'/')).replace(/\/?$/,'/')+'?to='+encodeURIComponent(String(n||'').trim()).replace(/%20/g,'+')}
function fmtMsg(t,n){return String(t||'').replace(/\{\{nama\}\}/g,n).replace(/\{\{link\}\}/g,mkLink(n))}
function save(){
  try{localStorage.setItem(gKey(),JSON.stringify(guests))}catch(e){}
  var s=guests.filter(function(x){return x.sent}).length;
  $('stat-total').textContent=String(guests.length);$('stat-sent').textContent=String(s);$('stat-pending').textContent=String(guests.length-s);
  render();
}
function copyTxt(t){
  if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(t).then(function(){toast('Pesan disalin')});
  var ta=mk('textarea');ta.value=t;ta.style.cssText='position:fixed;left:-9999px';document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy');toast('Pesan disalin')}catch(e){}document.body.removeChild(ta);
}
function addBulk(raw,cat){
  var added=0;
  String(raw||'').split(/\r?\n/).forEach(function(l){
    var s=l.trim();if(!s)return;
    var p=s.split(/[,;\t]/),n=String(p[0]||'').replace(/^"|"$/g,'').trim(),ph=p[1]?normPhone(p[1]):'';
    if(!n||n.toLowerCase()==='nama')return;
    guests.push({id:'g_'+Date.now()+'_'+Math.random().toString(36).slice(2,6),name:n,phone:ph,category:cat,sent:false,sentAt:null});added++;
  });
  if(added)save();toast(added+' tamu ditambahkan');
}
function render(){
  var wrap=$('guest-queue');if(!wrap)return;wrap.textContent='';
  var q=query.toLowerCase(),list=guests.filter(function(x){if(filter==='sent'&&!x.sent)return false;if(filter==='pending'&&x.sent)return false;return !q||x.name.toLowerCase().indexOf(q)!==-1});
  if(!list.length){wrap.appendChild(mk('p','section-subtitle',guests.length?'Tidak ada tamu sesuai filter.':'Belum ada daftar tamu.'));return}
  var cats=(cfg.whatsappTemplates&&cfg.whatsappTemplates.categories)||{};
  list.forEach(function(it){
    var row=mk('article','guest-row'),top=mk('div','guest-row__top'),info=mk('div'),ctrl=mk('div','sender-actions'),sel=mk('select');
    info.append(mk('strong','',it.name),mk('div','section-subtitle',it.phone||'Tanpa Nomor — Salin Manual'));
    top.append(info,mk('span','badge'+(it.sent?' badge--sent':''),it.sent?'Sudah Dikirim':'Belum Dikirim'));
    sel.style.width='auto';
    Object.keys(cats).forEach(function(k){var o=mk('option','',cats[k].label||k);o.value=k;if(k===it.category)o.selected=true;sel.appendChild(o)});
    sel.onchange=function(){it.category=sel.value;save()};
    var msg=fmtMsg(tpls[it.category]||tpls.formal||'',it.name),wa=mk('a','btn','Kirim WA');
    wa.target='_blank';wa.rel='noopener noreferrer';
    wa.href=it.phone?'https://wa.me/'+encodeURIComponent(it.phone)+'?text='+encodeURIComponent(msg):'https://wa.me/?text='+encodeURIComponent(msg);
    var cp=mk('button','btn-outline','Salin Pesan');cp.type='button';cp.onclick=function(){copyTxt(msg)};
    var tg=mk('button','btn-outline',it.sent?'Batal Tandai':'Tandai Terkirim');tg.type='button';
    tg.onclick=function(){it.sent=!it.sent;it.sentAt=it.sent?new Date().toISOString():null;save()};
    var rm=mk('button','btn-outline','×');rm.type='button';rm.setAttribute('aria-label','Hapus '+it.name);
    rm.onclick=function(){guests=guests.filter(function(x){return x.id!==it.id});save()};
    ctrl.append(sel,wa,cp,tg,rm);row.append(top,ctrl);wrap.appendChild(row);
  });
}
function exportCsv(){
  if(!guests.length)return toast('Daftar tamu masih kosong');
  var esc=function(v){var s=String(v||'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
  var rows=['name,phone,category,sent,sentAt'].concat(guests.map(function(x){return [esc(x.name),esc(x.phone),esc(x.category),esc(x.sent),esc(x.sentAt||'')].join(',')}));
  var a=mk('a');a.href=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv;charset=utf-8;'}));a.download=(cfg.slug||'tamu')+'-wa-guests.csv';a.click();URL.revokeObjectURL(a.href);
}
function initTpls(){
  var tSel=$('template-category'),dSel=$('sender-category-default'),ed=$('template-editor'),pv=$('template-preview'),
    cats=(cfg.whatsappTemplates&&cfg.whatsappTemplates.categories)||{},def=(cfg.whatsappTemplates&&cfg.whatsappTemplates.defaultCategory)||'formal';
  Object.keys(cats).forEach(function(k){
    defTpls[k]=cats[k].template||'';
    var o1=mk('option','',cats[k].label||k);o1.value=k;dSel.appendChild(o1);
    var o2=mk('option','',cats[k].label||k);o2.value=k;tSel.appendChild(o2);
  });
  tpls=Object.assign({},defTpls);
  try{var s=JSON.parse(localStorage.getItem(tKey())||'null');if(s&&s.customTemplates)tpls=Object.assign({},defTpls,s.customTemplates);if(s&&s.selectedCategory&&tpls[s.selectedCategory])def=s.selectedCategory}catch(e){}
  dSel.value=def;tSel.value=def;
  function sync(){var k=tSel.value;ed.value=tpls[k]||'';pv.textContent=fmtMsg(ed.value,'Budi Santoso')}
  tSel.onchange=sync;
  ed.oninput=function(){tpls[tSel.value]=ed.value;pv.textContent=fmtMsg(ed.value,'Budi Santoso');try{localStorage.setItem(tKey(),JSON.stringify({selectedCategory:tSel.value,customTemplates:tpls}))}catch(e){}};
  $('btn-reset-templates').onclick=function(){tpls=Object.assign({},defTpls);try{localStorage.removeItem(tKey())}catch(e){}sync();render();toast('Template direset ke bawaan')};
  sync();
}
document.addEventListener('DOMContentLoaded',function(){
  fetch('../config.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(c){
    cfg=c;if(c.theme&&c.theme.preset)document.documentElement.setAttribute('data-theme',c.theme.preset);
    $('sender-heading').textContent='Pengirim WA — '+((c.cover&&c.cover.title)||c.slug||'Undangan');
    try{guests=JSON.parse(localStorage.getItem(gKey())||'[]');if(!Array.isArray(guests))guests=[]}catch(e){guests=[]}
    initTpls();save();
    $('btn-add-guests').onclick=function(){var ta=$('sender-bulk-input');addBulk(ta.value,$('sender-category-default').value);ta.value=''};
    $('input-csv-file').onchange=function(ev){var f=ev.target.files&&ev.target.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){addBulk(rd.result,$('sender-category-default').value)};rd.readAsText(f)};
    if('contacts' in navigator&&'ContactsManager' in g){
      var cb=$('btn-import-contacts');cb.hidden=false;
      cb.onclick=function(){navigator.contacts.select(['name','tel'],{multiple:true}).then(function(pk){
        var txt=pk.map(function(x){var n=(x.name&&x.name[0])||'',t=(x.tel&&x.tel[0])||'';return n?(t?n+', '+t:n):''}).filter(Boolean).join('\n');
        if(txt)addBulk(txt,$('sender-category-default').value);
      }).catch(function(){})};
    }
    $('search-guest').oninput=function(e){query=e.target.value||'';render()};
    document.querySelectorAll('#filter-tabs .tab-btn').forEach(function(b){b.onclick=function(){
      document.querySelectorAll('#filter-tabs .tab-btn').forEach(function(x){x.classList.remove('is-active')});
      b.classList.add('is-active');filter=b.dataset.filter||'all';render();
    }});
    $('btn-export-csv').onclick=exportCsv;
    $('btn-clear-all').onclick=function(){if(guests.length&&g.confirm('Hapus seluruh daftar tamu di browser ini?')&&g.confirm('Yakin hapus permanen?')){guests=[];save()}};
  }).catch(function(){$('sender-heading').textContent='Gagal memuat ../config.json'});
});
})(window);
