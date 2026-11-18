(function(g){
'use strict';
var CD_MS=30000,items=[],vis=10,step=10,slug='',api='';
function $(id){return document.getElementById(id)}
function mk(t,c,v){var n=document.createElement(t);if(c)n.className=c;if(v!=null)n.textContent=v;return n}
function fb(el,msg,err){if(!el)return;el.textContent=msg;el.className='form-feedback '+(err?'form-feedback--error':'form-feedback--success');el.hidden=false}
function remCd(k){try{var d=CD_MS-(Date.now()-Number(localStorage.getItem(k)||0));return d>0?Math.ceil(d/1000):0}catch(e){return 0}}
function setCd(k){try{localStorage.setItem(k,String(Date.now()))}catch(e){}}
function post(b){return fetch(api,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(b),redirect:'follow'}).then(function(r){return r.json()})}
function fmtDate(iso){if(!iso)return '';var d=new Date(iso);return isNaN(d.getTime())?'':d.toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}

function renderList(){
  var list=$('guestbook-list'),more=$('guestbook-load-more-wrap');if(!list)return;list.textContent='';
  if(!items.length){var p=mk('p','section-subtitle','Jadilah yang pertama menuliskan doa dan ucapan selamat untuk kedua mempelai.');p.style.textAlign='center';list.appendChild(p);if(more)more.hidden=true;return}
  items.slice(0,vis).forEach(function(it){
    var card=mk('article','guestbook-item'),head=mk('div','guestbook-item__head');
    head.append(mk('span','guestbook-item__name',it.name||''),mk('span','guestbook-item__date',fmtDate(it.createdAt)));
    card.append(head,mk('p','guestbook-item__msg',it.message||''));list.appendChild(card);
  });
  if(more)more.hidden=items.length<=vis;
}

function loadGb(){
  var list=$('guestbook-list');if(!list)return;
  if(!api){items=[];renderList();return}
  list.textContent='';for(var i=0;i<3;i++)list.appendChild(mk('div','skeleton'));
  fetch(api+(api.indexOf('?')===-1?'?':'&')+'slug='+encodeURIComponent(slug),{redirect:'follow'})
    .then(function(r){return r.json()})
    .then(function(d){if(!d||!d.ok||!Array.isArray(d.items))throw 0;items=d.items;renderList()})
    .catch(function(){
      list.textContent='';var box=mk('div');box.style.textAlign='center';
      var b=mk('button','btn-outline','Muat Ulang Ucapan');b.type='button';b.onclick=loadGb;
      box.append(mk('p','section-subtitle','Ucapan belum dapat dimuat saat ini.'),b);list.appendChild(box);
    });
}

function initRsvp(maxPax){
  var form=$('form-rsvp'),saved=$('rsvp-saved-box'),edit=$('btn-edit-rsvp'),att=$('rsvp-attendance'),paxW=$('rsvp-pax-wrap'),pax=$('rsvp-pax'),f=$('rsvp-feedback'),btn=$('btn-submit-rsvp');
  if(!form||!att||!pax)return;
  pax.textContent='';
  for(var i=1;i<=Math.min(10,Math.max(1,Number(maxPax)||4));i++){var o=mk('option','',i+' Orang');o.value=String(i);pax.appendChild(o)}
  var sync=function(){if(paxW)paxW.hidden=att.value==='tidak_hadir'};
  att.addEventListener('change',sync);sync();
  var sKey='rsvp_sent_'+slug;
  try{if(localStorage.getItem(sKey)==='1'&&saved){form.hidden=true;saved.hidden=false}}catch(e){}
  if(edit&&saved)edit.onclick=function(){saved.hidden=true;form.hidden=false};

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=String($('rsvp-name').value||'').trim(),notes=String($('rsvp-notes').value||'').trim(),hp=String($('rsvp-hp').value||''),a=att.value,p=a==='tidak_hadir'?0:Number(pax.value||1);
    if(name.length<2)return fb(f,'Mohon lengkapi nama Anda minimal 2 karakter.',true);
    if(!api)return fb(f,'Endpoint backend belum dikonfigurasi pada config.json.',true);
    var cdKey='rsvp_cooldown_'+slug,rem=remCd(cdKey);
    if(rem>0)return fb(f,'Kiriman baru saja kami terima. Mohon tunggu '+rem+' detik.',true);
    btn.disabled=true;btn.textContent='Mengirim konfirmasi...';if(f)f.hidden=true;
    post({slug:slug,type:'rsvp',hp_field:hp,payload:{name:name,attendance:a,pax:p,notes:notes}})
      .then(function(d){
        if(!d||!d.ok)return fb(f,(d&&d.message)||'Konfirmasi gagal diproses.',true);
        setCd(cdKey);try{localStorage.setItem(sKey,'1')}catch(ex){}
        if(saved){form.hidden=true;saved.hidden=false}else fb(f,'Terima kasih! Konfirmasi kehadiran Anda telah kami terima.',false);
      })
      .catch(function(){fb(f,'Gagal mengirim konfirmasi. Periksa koneksi internet Anda lalu coba lagi.',true)})
      .finally(function(){btn.disabled=false;btn.textContent='Kirim Konfirmasi'});
  });
}

function initGb(){
  var form=$('form-guestbook'),msg=$('guestbook-message'),cnt=$('guestbook-char-count'),f=$('guestbook-feedback'),btn=$('btn-submit-guestbook'),more=$('btn-load-more-guestbook');
  if(msg&&cnt)msg.addEventListener('input',function(){cnt.textContent=msg.value.length+'/500'});
  if(more)more.onclick=function(){vis+=step;renderList()};
  if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=String($('guestbook-name').value||'').trim(),txt=String(msg.value||'').trim(),hp=String($('guestbook-hp').value||'');
    if(name.length<2||txt.length<3)return fb(f,'Mohon lengkapi nama dan isi ucapan minimal 3 karakter.',true);
    if(!api)return fb(f,'Endpoint backend belum dikonfigurasi pada config.json.',true);
    var cdKey='gb_cooldown_'+slug,rem=remCd(cdKey);
    if(rem>0)return fb(f,'Mohon tunggu '+rem+' detik sebelum mengirim ucapan lagi.',true);
    btn.disabled=true;btn.textContent='Mengirim ucapan...';if(f)f.hidden=true;
    post({slug:slug,type:'guestbook',hp_field:hp,payload:{name:name,message:txt}})
      .then(function(d){
        if(!d||!d.ok)return fb(f,(d&&d.message)||'Ucapan belum berhasil dikirim.',true);
        setCd(cdKey);items.unshift({id:'local_'+Date.now(),name:name,message:txt,createdAt:new Date().toISOString()});
        renderList();msg.value='';if(cnt)cnt.textContent='0/500';fb(f,'Terima kasih atas doa dan ucapan hangat yang Anda kirimkan.',false);
      })
      .catch(function(){fb(f,'Maaf, pengiriman belum berhasil. Periksa koneksi internet Anda lalu coba lagi.',true)})
      .finally(function(){btn.disabled=false;btn.textContent='Kirim Ucapan'});
  });
}

g.WeddingAPI={init:function(cfg){
  slug=String(cfg.slug||'default');var a=cfg.api||{},ft=cfg.features||{};
  api=String(a.endpointUrl||'').trim();step=Math.min(50,Math.max(5,Number(a.guestbookPageSize)||10));vis=step;
  if(ft.rsvp!==false)initRsvp(a.maxPax);
  if(ft.guestbook!==false){initGb();loadGb()}
}};
})(window);
