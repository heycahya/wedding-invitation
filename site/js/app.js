(function(g){
'use strict';
var cdTimer=null,gal=[],lbIdx=0;
function $(id){return document.getElementById(id)}
function txt(id,v){var n=$(id);if(n)n.textContent=v||''}
function mk(t,c,v){var n=document.createElement(t);if(c)n.className=c;if(v!=null)n.textContent=v;return n}
function safeUrl(u,rel){
  var s=String(u||'').trim();if(!s)return false;
  if(rel&&(s[0]==='/'||s.indexOf('./')===0||s.indexOf('../')===0))return s.indexOf('//')!==0;
  return /^https?:\/\//i.test(s);
}
function extLink(cls,href,label){var a=mk('a',cls,label);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a}
function toast(msg){var t=$('toast');if(!t)return;t.textContent=msg;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(function(){t.hidden=true},2200)}
function copyTxt(val,btn){
  function ok(){
    toast('Berhasil disalin');if(!btn)return;
    var o=btn.dataset.o||btn.textContent;btn.dataset.o=o;btn.textContent='Berhasil Disalin ✓';
    clearTimeout(btn._t);btn._t=setTimeout(function(){btn.textContent=o},2000);
  }
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(val).then(ok).catch(function(){fbCopy(val,ok)});
  else fbCopy(val,ok);
}
function fbCopy(val,ok){
  var ta=mk('textarea');ta.value=val;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;left:-9999px';
  document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok()}catch(e){}document.body.removeChild(ta);
}
function calUrl(ev,cp){
  var d1=new Date(ev.startDateTimeIso),d2=new Date(ev.endDateTimeIso||ev.startDateTimeIso);
  if(isNaN(d1.getTime()))return '';
  var f=function(d){return d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z')};
  return 'https://calendar.google.com/calendar/render?'+new URLSearchParams({action:'TEMPLATE',text:(ev.title||'Acara')+' — '+cp,dates:f(d1)+'/'+f(isNaN(d2.getTime())?d1:d2),details:ev.address||'',location:[ev.venueName,ev.address].filter(Boolean).join(', ')}).toString();
}
function setupCover(cfg){
  var c=cfg.cover||{},gate=$('section-cover'),img=$('cover-img'),sc=$('cover-scrim'),btn=$('btn-open-invitation');
  txt('cover-subtitle',c.subtitle||'The Wedding of');txt('cover-title',c.title);txt('cover-date',c.dateText);
  txt('cover-guest-prefix',c.guestPrefix||'Kepada Yth. Bapak/Ibu/Saudara/i');txt('cover-btn-text',c.buttonText||'Buka Undangan');
  var raw=String(new URLSearchParams(g.location.search).get('to')||'').trim();
  var name=!raw?(c.defaultGuestLabel||'Tamu Undangan'):(raw.length>60?raw.slice(0,60).trim()+'…':raw);
  txt('guest-name',name);
  if(raw){var r=$('rsvp-name'),gb=$('guestbook-name');if(r&&!r.value)r.value=name;if(gb&&!gb.value)gb.value=name}
  if(safeUrl(c.image,true)&&img&&sc){
    img.src=c.image;img.hidden=false;sc.hidden=false;
    img.onerror=function(){img.hidden=true;sc.hidden=true;gate.classList.add('cover-gate--no-photo')};
  }else if(gate)gate.classList.add('cover-gate--no-photo');
  if(btn&&gate)btn.onclick=function(){
    btn.disabled=true;g.scrollTo(0,0);if(g.WeddingAudio)g.WeddingAudio.play();
    gate.classList.add('is-opening');document.body.classList.remove('is-locked');
    var done=false,hide=function(){if(!done){done=true;gate.hidden=true}};
    gate.addEventListener('transitionend',hide,{once:true});setTimeout(hide,1050);
  };
}
function setupHero(cfg){
  var h=cfg.hero||{},cp=cfg.couple||{},img=$('hero-img'),mono=$('hero-monogram');
  if(mono)mono.textContent=((cp.bride&&cp.bride.shortName)||'A')[0].toUpperCase()+' & '+((cp.groom&&cp.groom.shortName)||'B')[0].toUpperCase();
  txt('hero-subtitle',h.subtitle);txt('hero-title',h.title);txt('hero-date',h.dateDisplay);
  var src=safeUrl(h.image,true)?h.image:(cfg.cover&&safeUrl(cfg.cover.image,true)?cfg.cover.image:'');
  if(src&&img){img.src=src;img.hidden=false;if(mono)mono.hidden=true;img.onerror=function(){img.hidden=true;if(mono)mono.hidden=false}}
}
function setupCouple(cfg){
  var cp=cfg.couple||{},list=$('couple-list');
  txt('couple-greeting-title',cp.greetingTitle);txt('couple-greeting-body',cp.greetingBody);
  if(!list)return;list.textContent='';
  (Array.isArray(cp.order)&&cp.order.length===2?cp.order:['bride','groom']).forEach(function(role,i){
    var p=cp[role];if(!p)return;
    if(i===1)list.appendChild(mk('div','couple-amp reveal','&'));
    var card=mk('article','couple-card reveal'),wrap=mk('div','couple-card__photo-wrap'),init=mk('span','couple-card__initial',(p.shortName||p.fullName||'?')[0].toUpperCase());
    wrap.appendChild(init);
    if(safeUrl(p.photo,true)){
      var img=mk('img','couple-card__photo');img.loading='lazy';img.decoding='async';img.alt=p.fullName||p.shortName||'';img.src=p.photo;init.hidden=true;
      img.onerror=function(){img.hidden=true;init.hidden=false};wrap.appendChild(img);
    }
    card.append(wrap,mk('h3','couple-card__name',p.fullName||p.shortName||''),mk('p','couple-card__parents',p.parentInfo||''));
    if(safeUrl(p.instagram,false))card.appendChild(extLink('btn btn-outline',p.instagram,'Instagram'));
    list.appendChild(card);
  });
}
function setupEvents(cfg){
  var evs=cfg.events||{},list=$('events-list'),t=(cfg.cover&&cfg.cover.title)||'Pernikahan';
  txt('events-title',evs.sectionTitle||'Rangkaian Acara');txt('events-subtitle',evs.sectionSubtitle);
  if(!list)return;list.textContent='';
  (evs.items||[]).forEach(function(ev){
    var card=mk('article','card event-card reveal'),act=mk('div','event-card__actions');
    card.append(mk('h3','event-card__title',ev.title||''),mk('p','event-card__meta',ev.dateDisplay||''),mk('p','event-card__meta',ev.timeDisplay||''),mk('p','event-card__venue',ev.venueName||''),mk('p','event-card__meta',ev.address||''));
    if(safeUrl(ev.mapUrl,false))act.appendChild(extLink('btn',ev.mapUrl,'Petunjuk Lokasi'));
    var cu=calUrl(ev,t);if(cu)act.appendChild(extLink('btn btn-outline',cu,'Simpan ke Kalender'));
    if(act.children.length)card.appendChild(act);list.appendChild(card);
  });
}
function setupCountdown(cfg,on){
  var sec=$('section-countdown'),cd=cfg.countdown||{},iso=cd.targetDateTime||(cfg.events&&cfg.events.items&&cfg.events.items[0]&&cfg.events.items[0].startDateTimeIso)||'',target=new Date(iso).getTime();
  if(!sec)return;if(!on||!iso||isNaN(target)){sec.hidden=true;return}
  sec.hidden=false;txt('countdown-title',cd.title||'Menuju Hari Bahagia');
  var st=$('countdown-status'),pad=function(n){return String(n).padStart(2,'0')};
  function tick(){
    var now=Date.now(),diff=target-now;
    if(diff>0){
      txt('cd-days',pad(Math.floor(diff/864e5)));txt('cd-hours',pad(Math.floor((diff%864e5)/36e5)));
      txt('cd-mins',pad(Math.floor((diff%36e5)/6e4)));txt('cd-secs',pad(Math.floor((diff%6e4)/1e3)));
      if(st)st.hidden=true;
    }else{
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(function(id){txt(id,'00')});
      if(st){st.textContent=(now-target)<864e5?'Acara Sedang Berlangsung — Terima kasih atas kehadiran dan doa restu Anda.':'Acara Telah Terlaksana — Terima kasih telah menjadi bagian dari hari bahagia kami.';st.hidden=false}
      clearInterval(cdTimer);
    }
  }
  clearInterval(cdTimer);tick();cdTimer=setInterval(tick,1000);
}
function setupStory(cfg,on){
  var sec=$('section-story'),list=$('story-list'),st=cfg.story||{},items=Array.isArray(st.items)?st.items:[];
  if(!sec)return;if(!on||!items.length){sec.hidden=true;return}
  sec.hidden=false;txt('story-title',st.sectionTitle||'Kisah Perjalanan Kami');
  if(!list)return;list.textContent='';
  items.forEach(function(it){
    var art=mk('article','story-item card reveal');
    art.append(mk('p','eyebrow',it.period||''),mk('h3','event-card__title',it.title||''),mk('p','section-subtitle',it.description||''));
    if(safeUrl(it.image,true)){var img=mk('img','story-item__img');img.loading='lazy';img.decoding='async';img.alt=it.title||'';img.src=it.image;img.onerror=function(){img.hidden=true};art.appendChild(img)}
    list.appendChild(art);
  });
}
function openLb(i){
  var lb=$('gallery-lightbox'),img=$('lightbox-img');if(!lb||!img||!gal.length)return;
  lbIdx=(i+gal.length)%gal.length;img.src=gal[lbIdx].src;img.alt=gal[lbIdx].alt||'';
  txt('lightbox-counter',(lbIdx+1)+' / '+gal.length);lb.hidden=false;
}
function setupGallery(cfg,on){
  var sec=$('section-gallery'),grid=$('gallery-grid'),vw=$('gallery-video-wrap'),gc=cfg.gallery||{};
  gal=(gc.images||[]).filter(function(i){return safeUrl(i.src,true)});
  if(!sec)return;if(!on||(!gal.length&&!safeUrl(gc.videoUrl,false))){sec.hidden=true;return}
  sec.hidden=false;txt('gallery-title',gc.sectionTitle||'Momen Bahagia');
  if(grid){grid.textContent='';gal.forEach(function(it,idx){
    var b=mk('button','gallery-item reveal');b.type='button';b.setAttribute('aria-label',it.alt||'Foto '+(idx+1));
    var img=mk('img');img.src=it.src;img.alt=it.alt||'';img.loading='lazy';img.decoding='async';b.onclick=function(){openLb(idx)};b.appendChild(img);grid.appendChild(b);
  })}
  if(vw){vw.textContent='';if(safeUrl(gc.videoUrl,false)){vw.appendChild(extLink('btn btn-outline',gc.videoUrl,'Tonton Video'));vw.hidden=false}else vw.hidden=true}
  var lb=$('gallery-lightbox');
  if(lb){
    $('lightbox-prev').onclick=function(){openLb(lbIdx-1)};$('lightbox-next').onclick=function(){openLb(lbIdx+1)};
    $('lightbox-close').onclick=function(){lb.hidden=true};lb.onclick=function(e){if(e.target===lb)lb.hidden=true};
    document.addEventListener('keydown',function(e){if(!lb.hidden&&e.key==='Escape')lb.hidden=true});
  }
}
function setupGift(cfg,on){
  var sec=$('section-gift'),accEl=$('gift-accounts'),qw=$('gift-qris-wrap'),qi=$('gift-qris-img'),aw=$('gift-address-wrap'),
    gf=cfg.gift||{},accs=Array.isArray(gf.accounts)?gf.accounts:[],hasQ=safeUrl(gf.qrisImage,true),hasA=gf.physicalAddress&&gf.physicalAddress.enabled&&gf.physicalAddress.address;
  if(!sec)return;if(!on||(!accs.length&&!hasQ&&!hasA)){sec.hidden=true;return}
  sec.hidden=false;txt('gift-title',gf.sectionTitle||'Tanda Kasih');txt('gift-description',gf.description);
  if(accEl){accEl.textContent='';accs.forEach(function(a){
    var c=mk('div','card reveal'),b=mk('button','btn-outline','Salin Nomor Rekening');b.type='button';b.style.marginTop='var(--space-3)';
    b.onclick=function(){copyTxt(a.accountNumber||'',b)};
    c.append(mk('strong','',a.bankName||''),mk('p','gift-account__num',a.accountNumber||''),mk('p','section-subtitle',a.accountHolder||''),b);accEl.appendChild(c);
  })}
  if(qw&&qi){if(hasQ){qi.src=gf.qrisImage;qw.hidden=false}else qw.hidden=true}
  if(aw){aw.textContent='';if(hasA){
    var p=gf.physicalAddress,t=mk('p','section-subtitle',[p.recipientName,p.phone,p.address].filter(Boolean).join(' — ')),ba=mk('button','btn-outline','Salin Alamat Pengiriman');
    t.style.margin='var(--space-2) 0 var(--space-3)';ba.type='button';ba.onclick=function(){copyTxt(p.address||'',ba)};
    aw.append(mk('strong','','Kirim Kado Fisik'),t,ba);aw.hidden=false;
  }else aw.hidden=true}
}
function setupClosing(cfg){
  var cl=cfg.closing||{},nw=$('closing-notes-wrap'),nl=$('closing-notes-list'),n=cl.notes||{};
  if(nw&&nl){nl.textContent='';if(n.enabled&&Array.isArray(n.items)&&n.items.length){txt('closing-notes-title',n.title||'Informasi Tambahan');n.items.forEach(function(s){nl.appendChild(mk('li','',s))});nw.hidden=false}else nw.hidden=true}
  txt('closing-title',cl.thankYouTitle||'Terima Kasih');txt('closing-message',cl.thankYouMessage);txt('closing-signature',cl.coupleSignature);txt('closing-families',cl.familyNames);
}
function renderAll(cfg){
  var f=cfg.features||{},th=cfg.theme||{},ov=th.overrides||{};
  if(cfg.meta&&cfg.meta.title)document.title=cfg.meta.title;
  if(th.preset)document.documentElement.setAttribute('data-theme',th.preset);
  if(ov.accentPrimary)document.documentElement.style.setProperty('--accent-primary',ov.accentPrimary);
  if(ov.bgPrimary)document.documentElement.style.setProperty('--bg-primary',ov.bgPrimary);
  setupCover(cfg);setupHero(cfg);
  var qSec=$('section-quote'),q=cfg.quote||{};
  if(qSec){qSec.hidden=f.quote===false||!String(q.text||'').trim();txt('quote-text',q.text);txt('quote-source',q.source)}
  setupCouple(cfg);setupEvents(cfg);setupCountdown(cfg,f.countdown!==false);setupStory(cfg,f.story!==false);setupGallery(cfg,f.gallery!==false);
  if($('section-rsvp'))$('section-rsvp').hidden=f.rsvp===false;
  if($('section-guestbook'))$('section-guestbook').hidden=f.guestbook===false;
  setupGift(cfg,f.gift!==false);setupClosing(cfg);
  if(g.WeddingAudio)g.WeddingAudio.init(cfg.audio,f.audio!==false);
  if(g.WeddingAPI)g.WeddingAPI.init(cfg);
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in g))return els.forEach(function(el){el.classList.add('is-visible')});
  var obs=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-visible');obs.unobserve(en.target)}})},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el){obs.observe(el)});
}
document.addEventListener('DOMContentLoaded',function(){
  var err=$('load-error'),retry=$('btn-retry-load');if(retry)retry.onclick=function(){g.location.reload()};
  fetch('./config.json',{cache:'no-cache'}).then(function(r){if(!r.ok)throw 0;return r.json()})
    .then(function(cfg){if(err)err.hidden=true;renderAll(cfg)})
    .catch(function(){if(err)err.hidden=false;if($('section-cover'))$('section-cover').hidden=true;document.body.classList.remove('is-locked')});
});
})(window);
