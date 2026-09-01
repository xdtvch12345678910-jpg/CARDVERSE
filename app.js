/* CARDVERSE V29 — stable core */
const CARDS=[
{id:'changli',name:'Changli',game:'Wuthering Waves',rarity:'LEGENDARY',stars:5,price:2150,atk:97,element:'FUSION',artBase:'Changli_Card'},
{id:'jinhsi',name:'Jinhsi',game:'Wuthering Waves',rarity:'LEGENDARY',stars:5,price:2200,atk:98,element:'SPECTRO',artBase:'Jinhsi_Card'},
{id:'yinlin',name:'Yinlin',game:'Wuthering Waves',rarity:'LEGENDARY',stars:5,price:2050,atk:96,element:'ELECTRO',artBase:'Yinlin_Card'},
{id:'lingyang',name:'Lingyang',game:'Wuthering Waves',rarity:'EPIC',stars:4,price:1250,atk:86,element:'GLACIO',artBase:'Lingyang_Card'},
{id:'carlotta',name:'Carlotta',game:'Wuthering Waves',rarity:'EPIC',stars:4,price:1450,atk:92,element:'GLACIO',artBase:'Carlotta_Card'},
{id:'jianxin',name:'Jianxin',game:'Wuthering Waves',rarity:'EPIC',stars:4,price:1350,atk:89,element:'AERO',artBase:'Jianxin_Card'},
{id:'shorekeeper',name:'Shorekeeper',game:'Wuthering Waves',rarity:'LEGENDARY',stars:5,price:2250,atk:99,element:'SPECTRO',artBase:'Shorekeeper_Card'},
{id:'hiyuki',name:'Hiyuki',game:'Wuthering Waves',rarity:'RARE',stars:3,price:850,atk:78,element:'GLACIO',artBase:'Hiyuki_Card'},
{id:'suisui',name:'Suisui',game:'Wuthering Waves',rarity:'RARE',stars:3,price:820,atk:76,element:'AERO',artBase:'Suisui_Card'},
{id:'denia',name:'Denia',game:'Wuthering Waves',rarity:'RARE',stars:3,price:800,atk:75,element:'HAVOC',artBase:'Denia_Card'},
{id:'qingxiao',name:'Qingxiao',game:'Wuthering Waves',rarity:'EPIC',stars:4,price:1300,atk:88,element:'SPECTRO',artBase:'Qingxiao_Card'},
{id:'aemeath',name:'Aemeath',game:'Wuthering Waves',rarity:'EPIC',stars:4,price:1400,atk:90,element:'HAVOC',artBase:'Aemeath_Card'},
{id:'baizhi',name:'Baizhi',game:'Wuthering Waves',rarity:'COMMON',stars:2,price:70,atk:54,element:'GLACIO',artBase:'Baizhi_Card'},
{id:'chixia',name:'Chixia',game:'Wuthering Waves',rarity:'COMMON',stars:2,price:90,atk:57,element:'FUSION',artBase:'Chixia_Card'},
{id:'yuanwu',name:'Yuanwu',game:'Wuthering Waves',rarity:'COMMON',stars:2,price:80,atk:55,element:'ELECTRO',artBase:'Yuanwu_Card'},
{id:'aalto',name:'Aalto',game:'Wuthering Waves',rarity:'COMMON',stars:2,price:110,atk:59,element:'AERO',artBase:'Aalto_Card'},
{id:'taoqi',name:'Taoqi',game:'Wuthering Waves',rarity:'COMMON',stars:2,price:130,atk:61,element:'HAVOC',artBase:'Taoqi_Card'}
];
const SELL_VALUES={COMMON:15,RARE:90,EPIC:180,LEGENDARY:400};
const ART_EXTS=['.png','.jpg','.jpeg','.webp','.gif','.svg','.PNG','.JPG','.JPEG','.WEBP','.GIF','.SVG'];
const ART_FALLBACKS={
  Changli_Card:'changli.svg',
  Jinhsi_Card:'jinhsi.svg',
  Yinlin_Card:'yinlin.svg',
  Lingyang_Card:'jiyan.svg',
  Carlotta_Card:'phrolova.svg',
  Jianxin_Card:'rover.svg',
  Shorekeeper_Card:'shorekeeper.svg',
  Hiyuki_Card:'jinhsi.svg',
  Suisui_Card:'changli.svg',
  Denia_Card:'phrolova.svg',
  Qingxiao_Card:'shorekeeper.svg',
  Aemeath_Card:'yinlin.svg',
  Baizhi_Card:'rover.svg',
  Chixia_Card:'jiyan.svg',
  Yuanwu_Card:'rover.svg',
  Aalto_Card:'jiyan.svg',
  Taoqi_Card:'phrolova.svg'
};
function artCandidates(base){
  const clean=String(base||'').trim();
  const stem=clean.replace(/\\/g,'/').split('/').pop().replace(/\\.[^.\\/]+$/,'');
  const names=[clean,stem];
  const out=[];
  for(const n of [...new Set(names)]){
    if(/\\.[a-z0-9]+$/i.test(n)){
      out.push(n,`assets/cards/${n}`,`assets/${n}`);
    }else{
      for(const ext of ART_EXTS){
        out.push(`${n}${ext}`,`assets/cards/${n}${ext}`,`assets/${n}${ext}`);
      }
    }
  }
  const fallback=ART_FALLBACKS[stem];
  if(fallback){out.push(`assets/cards/${fallback}`,`assets/${fallback}`);}
  return [...new Set(out)];
}
function setArt(img,base){
  if(!img)return;
  img.dataset.artBase=base;
  img.dataset.candidates=artCandidates(base).join('|');
  img.dataset.try='0';
  img.classList.remove('missing-art');
  artFallback(img);
}
function artFallback(img){
  if(!img)return;
  const list=(img.dataset.candidates||'').split('|').filter(Boolean);
  const i=Number(img.dataset.try||0);
  if(i<list.length){
    img.dataset.try=String(i+1);
    img.onerror=()=>artFallback(img);
    img.src=list[i];
    return;
  }
  img.classList.add('missing-art');
  img.onerror=null;
  img.src='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><rect width="400" height="600" fill="#080b13"/><rect x="14" y="14" width="372" height="572" rx="24" fill="none" stroke="#79e5ff" stroke-opacity=".35"/><text x="200" y="280" text-anchor="middle" fill="#79e5ff" font-size="22" font-family="Arial">CARD ART</text><text x="200" y="318" text-anchor="middle" fill="#8993aa" font-size="14" font-family="Arial">Upload your card image</text></svg>');
}
function artAttrs(c){return `src="" data-art-base="${c.artBase}" data-candidates="${artCandidates(c.artBase).join('|')}" data-try="0" onerror="artFallback(this)"`}

const KEY='cardverse-v11';
const DEFAULT={coins:0,owned:[],seen:[],daily:null,lang:'th',pity:0,totalPulls:0,profileName:'CARD COLLECTOR',profileAvatar:'Jinhsi_Card',profileAvatarData:'',profileAvatarPosX:50,profileAvatarPosY:50,profileAvatarZoom:1,profileTitle:'CARD COLLECTOR',profileAccent:'#a27bff',profileFrame:'holo',mainCard:'yinlin',mainCardCustomData:'',mainCardCustomName:'My Card',mainCardCustomGame:'Custom',mainCardCustomRarity:'LEGENDARY',mainCardCustomPosX:50,mainCardCustomPosY:50,mainCardCustomZoom:1,musicOn:true,duelWins:0,duelLosses:0,econReset:'',profileShowcase:[],ownedFrames:['clean','gold','neon','holo'],profileBg:'',profileBgCustomData:'',profileBgCustomPosX:50,profileBgCustomPosY:50,profileBgCustomZoom:1,musicVolume:.55,questDailyDate:'',questDaily:{packs:0,duelWins:0,buys:0},questDailyClaimed:[],questWeekDate:'',questWeek:{packs:0,duelWins:0,fusions:0},questWeekClaimed:[]};
const ECON_RESET_VERSION='v27-economy';
const I18N={th:{home:'หน้าแรก',market:'ตลาด',gacha:'สุ่มการ์ด',collection:'คลังการ์ด',profile:'โปรไฟล์',balance:'ยอดเงิน',buy:'ซื้อ',sell:'ขาย',notEnough:'เหรียญไม่พอ 💸',notEnoughPack:'เหรียญไม่พอสำหรับสุ่มแพ็ก',bought:'ซื้อสำเร็จ',sold:'ขายสำเร็จ',noCard:'ยังไม่มีการ์ดใบนี้',dailyDone:'วันนี้รับ Daily ไปแล้ว',dailyPlus:'รับ Daily +300 Coins ✦',open:'เปิดแพ็ก',pity:'การันตี Epic+ ทุก 10 pulls',summon:'กำลังอัญเชิญ...',reveal:'เปิดการ์ด',music:'เพลง',play:'เล่นเพลง',pause:'หยุดเพลง',saveProfile:'บันทึกโปรไฟล์',name:'ชื่อผู้เล่น',chooseAvatar:'เลือกรูปโปรไฟล์',search:'ค้นหาตัวละคร...',allRarity:'ทุกระดับ',homeTitle:'ไล่ล่าการ์ดแรร์',homeDesc:'เริ่มจาก 0 Coins รับ Daily แล้วเลือกซื้อการ์ดหรือเสี่ยงดวงใน Gacha',shopTitle:'ซื้อการ์ด',shopDesc:'เลือกซื้อการ์ดตรง ๆ หรือเก็บ Coins ไว้ลุ้น Gacha',collectionTitle:'คลังการ์ด',collectionDesc:'ขายการ์ดซ้ำเพื่อหมุน Coins ต่อ',gachaTitle:'Gacha Terminal',gachaDesc:'สุ่ม 3 ใบในครั้งเดียว พร้อมแอนิเมชันเปิดแพ็กและระบบ Pity',empty:'ยังไม่มีการ์ดใน Collection',daily:'รางวัลรายวัน',claim:'รับ +300',stats:'สถิติ',owned:'มีอยู่',player:'โปรไฟล์ผู้เล่น',customizer:'ปรับแต่งโปรไฟล์',profileTitle:'ฉายาโปรไฟล์',accent:'สีโปรไฟล์',frame:'กรอบการ์ด',upload:'อัปโหลดรูปของฉัน',preview:'ตัวอย่างโปรไฟล์',goldFrame:'ทอง',neonFrame:'นีออน',cleanFrame:'คลีน',holoFrame:'โฮโล',noMusic:'ยังไม่ได้เลือกเพลง',duel:'ดวลการ์ด',duelTitle:'สังเวียนดวลการ์ด',duelDesc:'เลือกการ์ดจากคลัง วางเดิมพัน แล้วประลองกับคู่ต่อสู้สุ่ม',pickCard:'เลือกการ์ด',bet:'เดิมพัน',winChance:'โอกาสชนะ',fight:'เริ่มดวล ⚔️',duelWin:'ชนะดวล! ได้เหรียญคืน',duelLose:'แพ้ดวล เสียเดิมพัน',needCardForDuel:'ต้องมีการ์ดในคลังก่อนถึงจะดวลได้',duelWins:'ชนะ',duelLosses:'แพ้',fusion:'อัปเกรดการ์ด',fusionTitle:'ห้องอัปเกรดการ์ด',fusionDesc:'รวมการ์ดซ้ำระดับเดียวกัน 3 ใบ เพื่ออัปเกรดเป็นการ์ดระดับสูงขึ้น',fuse:'รวมการ์ด (ใช้ 3 ใบ)',fusionNotEnough:'มีการ์ดระดับนี้ไม่ครบ 3 ใบ',fusionSuccess:'อัปเกรดสำเร็จ ✓ ได้',fusionMaxed:'Legendary คือระดับสูงสุดแล้ว แลกเป็นโบนัสเหรียญแทน ✓ ได้ +',haveCount:'มีอยู่',frameShop:'ร้านกรอบ',frameShopTitle:'ร้านค้ากรอบการ์ด',frameShopDesc:'ปลดล็อกกรอบการ์ดใหม่ด้วยเหรียญ ใช้ได้ทั้งเว็บทุกหน้า',owned2:'มีแล้ว',equip:'ใช้กรอบนี้',equipped:'กำลังใช้อยู่',editProfile:'แก้ไขโปรไฟล์',showcase:'การ์ดโชว์เคส',pickShowcase:'เลือกการ์ดที่จะโชว์บนโปรไฟล์ (สูงสุด 3 ใบ)',noShowcase:'ยังไม่ได้เลือกการ์ดโชว์เคส',cardsCollected:'สะสมการ์ดแล้ว',quests:'ภารกิจ',questsTitle:'ภารกิจประจำวัน & ประจำสัปดาห์',questsDesc:'ทำภารกิจให้ครบเพื่อรับเหรียญเพิ่ม รีเซ็ตอัตโนมัติตามรอบ',dailyQuests:'ภารกิจประจำวัน',weeklyQuests:'ภารกิจประจำสัปดาห์',claimReward:'รับรางวัล',claimed:'รับแล้ว',leaderboard:'อันดับ',leaderboardTitle:'สถิติของฉัน',leaderboardDesc:'สถิติส่วนตัวบนเครื่องนี้ — ยังไม่มีระบบเซิร์ฟเวอร์เปรียบเทียบกับผู้เล่นอื่น',bestCard:'การ์ดที่มีค่ามากที่สุด',settings:'ตั้งค่า',settingsTitle:'ตั้งค่า',musicVolume:'ระดับเสียงเพลง',resetProgress:'รีเซ็ตข้อมูลทั้งหมด',resetWarning:'จะลบเหรียญ การ์ด โปรไฟล์ และทุกอย่างทิ้งถาวร กู้คืนไม่ได้',resetConfirm:'ยืนยันการรีเซ็ต — พิมพ์ "RESET" ด้านล่างเพื่อยืนยัน',resetButton:'ลบข้อมูลทั้งหมด'},en:{home:'HOME',market:'MARKET',gacha:'GACHA',collection:'COLLECTION',profile:'PROFILE',balance:'BALANCE',buy:'BUY',sell:'SELL',notEnough:'Not enough coins 💸',notEnoughPack:'Not enough coins for a pack',bought:'Bought',sold:'Sold',noCard:'You do not own this card',dailyDone:'Daily already claimed today',dailyPlus:'Daily +300 Coins ✦',open:'OPEN PACK',pity:'Guaranteed Epic+ every 10 pulls',summon:'SUMMONING...',reveal:'REVEAL CARDS',music:'MUSIC',play:'PLAY',pause:'PAUSE',saveProfile:'SAVE PROFILE',name:'Player name',chooseAvatar:'Choose avatar',search:'Search character...',allRarity:'All rarities',homeTitle:'CHASE THE RARE DROP',homeDesc:'Start with 0 Coins. Claim Daily, then shop cards or risk it in Gacha.',shopTitle:'BUY CARDS',shopDesc:'Buy cards directly or save Coins for Gacha.',collectionTitle:'COLLECTION',collectionDesc:'Sell duplicate cards to keep your economy moving.',gachaTitle:'GACHA TERMINAL',gachaDesc:'Open 3 cards at once with pack animation and Pity.',empty:'No cards in your Collection yet',daily:'DAILY REWARD',claim:'CLAIM +300',stats:'STATS',owned:'Owned',player:'PLAYER PROFILE',customizer:'PROFILE CUSTOMIZER',profileTitle:'Profile title',accent:'Profile accent',frame:'Card frame',upload:'Upload my image',preview:'Profile preview',goldFrame:'Gold',neonFrame:'Neon',cleanFrame:'Clean',holoFrame:'Holo',noMusic:'No music selected',duel:'DUEL',duelTitle:'Duel Arena',duelDesc:'Pick a card from your collection, place a bet, and face a random opponent',pickCard:'Choose card',bet:'Bet',winChance:'Win chance',fight:'FIGHT ⚔️',duelWin:'You won the duel! Coins returned',duelLose:'You lost the duel. Bet forfeited',needCardForDuel:'You need at least one card in your collection to duel',duelWins:'Wins',duelLosses:'Losses',fusion:'FUSION',fusionTitle:'Fusion Lab',fusionDesc:'Combine 3 duplicate cards of the same rarity to upgrade into a higher tier',fuse:'Fuse (uses 3)',fusionNotEnough:'You need 3 cards of this rarity',fusionSuccess:'Upgrade successful ✓ Got',fusionMaxed:'Legendary is the max tier already — converted to a coin bonus instead ✓ +',haveCount:'Have',frameShop:'FRAME SHOP',frameShopTitle:'Frame Shop',frameShopDesc:'Unlock new card frames with coins — applies sitewide',owned2:'Owned',equip:'Equip',equipped:'Equipped',editProfile:'Edit Profile',showcase:'Showcase cards',pickShowcase:'Pick up to 3 cards to feature on your profile',noShowcase:'No showcase cards selected yet',cardsCollected:'Cards collected',quests:'QUESTS',questsTitle:'Daily & Weekly Quests',questsDesc:'Complete quests for bonus coins. Resets automatically on schedule.',dailyQuests:'Daily quests',weeklyQuests:'Weekly quests',claimReward:'Claim',claimed:'Claimed',leaderboard:'STATS',leaderboardTitle:'My Stats',leaderboardDesc:'Personal stats on this device — no server to compare against other players yet.',bestCard:'Most valuable card',settings:'SETTINGS',settingsTitle:'Settings',musicVolume:'Music volume',resetProgress:'Reset all progress',resetWarning:'Permanently deletes coins, cards, profile, and everything else. Cannot be undone.',resetConfirm:'Confirm reset — type "RESET" below to confirm',resetButton:'Delete everything'}};
const PROFILE_IMG_KEY='cardverse-profile-image';
const MAIN_IMG_KEY='cardverse-main-card-image';
const PROFILE_BG_IMG_KEY='cardverse-profile-bg-image';

/* CARDVERSE V29 — CORE FUNCTIONS (were referenced everywhere but never defined: this is why
   gacha, daily coins, buy/sell, language switch and profile rendering all did nothing) */
let _toastTimer=null;
function toast(msg){
  const el=document.getElementById('toast');if(!el)return;
  el.textContent=msg;el.classList.remove('show');void el.offsetWidth;el.classList.add('show');
  clearTimeout(_toastTimer);_toastTimer=setTimeout(()=>el.classList.remove('show'),2400);
}
function t(key){
  const s=state();
  return (I18N[s.lang]&&I18N[s.lang][key])||I18N.th[key]||key;
}
function setLang(lang){
  if(!I18N[lang])return;
  const s=state();s.lang=lang;save(s);
}
function applyI18n(){
  const s=state();
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const val=t(el.dataset.i18n);
    if(el.tagName==='INPUT')el.placeholder=val;else el.textContent=val;
  });
  document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===s.lang));
}
function initArtImages(){
  document.querySelectorAll('img[data-art-base]').forEach(img=>{
    if(!img.dataset.candidates)setArt(img,img.dataset.artBase);
  });
}
function updateCoins(){
  const s=state();
  document.querySelectorAll('[data-coins]').forEach(e=>e.textContent=s.coins);
}
function applyProfileMini(){
  const s=state();
  document.querySelectorAll('[data-profile-name]').forEach(e=>e.textContent=s.profileName||'CARD COLLECTOR');
  document.querySelectorAll('[data-profile-avatar]').forEach(img=>{
    if(s.profileAvatarData){img.onerror=null;img.src=s.profileAvatarData;}
    else if(!img.dataset.candidates||img.dataset.artBase!==(s.profileAvatar||'Jinhsi_Card')){setArt(img,s.profileAvatar||'Jinhsi_Card');}
  });
}
function applyProfileStyle(){
  const s=state();
  document.body.className=document.body.className.replace(/\bframe-\S+\b/g,'').trim();
  document.body.classList.add('frame-'+(s.profileFrame||'holo'));
  document.documentElement.style.setProperty('--profile-accent',s.profileAccent||'#a27bff');
}
function cardHTML(c,opts={}){
  const owned=state().owned.includes(c.id);
  let buyrow='';
  if(opts.price){
    buyrow=`<div class="buyrow"><span class="muted">🪙 ${c.price}</span><button class="buy" onclick="buyCard('${c.id}')">${t('buy')}</button></div>`;
  }else if(opts.sell){
    buyrow=`<div class="buyrow"><span class="muted">🪙 ${SELL_VALUES[c.rarity]||0}</span><button class="sell" onclick="sellCard('${c.id}')">${t('sell')}</button></div>`;
  }
  return `<div class="card rarity-${c.rarity.toLowerCase()}">
    <div class="art"><img ${artAttrs(c)} alt="${escapeHtml(c.name)}" loading="lazy"><span class="art-game">${escapeHtml(c.game)}</span><div class="shine"></div></div>
    <div class="card-body">
      <div class="card-top"><span class="rarity">${c.rarity}</span><span>★${c.stars}</span></div>
      <h3>${escapeHtml(c.name)}</h3>
      <div class="game-name">${escapeHtml(c.game)} • ${escapeHtml(c.element)}</div>
      <div class="stats"><span>ATK ${c.atk}</span><span>${owned?'✓ '+t('owned'):''}</span></div>
      ${buyrow}
    </div>
  </div>`;
}
function buyCard(id){
  const c=CARDS.find(x=>x.id===id);if(!c)return;
  const s=state();
  if(s.coins<c.price){toast(t('notEnough'));return;}
  s.coins-=c.price;s.owned=[...s.owned,c.id];s.questDaily.buys=(s.questDaily.buys||0)+1;save(s);
  toast(`${t('bought')} ${c.name} ✓`);
  if(typeof render==='function'){try{render()}catch(e){}}
}
function sellCard(id){
  const c=CARDS.find(x=>x.id===id);if(!c)return;
  const s=state();
  const idx=s.owned.indexOf(id);
  if(idx===-1){toast(t('noCard'));return;}
  s.owned=[...s.owned];s.owned.splice(idx,1);
  s.coins+=SELL_VALUES[c.rarity]||0;save(s);
  toast(`${t('sold')} ${c.name} ✓`);
  if(typeof render==='function'){try{render()}catch(e){}}
}
function daily(){
  const s=state();
  const today=new Date().toDateString();
  if(s.daily===today){toast(t('dailyDone'));return;}
  s.coins+=300;s.daily=today;save(s);
  toast(t('dailyPlus'));
  const owned=document.getElementById('owned');if(owned)owned.textContent=s.owned.length;
}
function openPack(cost=300){
  const s=state();
  if(s.coins<cost){toast(t('notEnoughPack'));return [];}
  s.coins-=cost;
  const results=[];
  for(let i=0;i<3;i++){
    s.pity++;
    let rarity;
    if(s.pity>=10){rarity=Math.random()<0.5?'LEGENDARY':'EPIC';}
    else{
      const r=Math.random()*100;
      rarity=r<3?'LEGENDARY':r<15?'EPIC':r<45?'RARE':'COMMON';
    }
    let pool=CARDS.filter(x=>x.rarity===rarity);
    if(!pool.length)pool=CARDS;
    const picked=pool[Math.floor(Math.random()*pool.length)];
    if(picked.rarity==='EPIC'||picked.rarity==='LEGENDARY')s.pity=0;
    results.push(picked.id);
    s.owned=[...s.owned,picked.id];
    s.totalPulls=(s.totalPulls||0)+1;
  }
  s.questDaily.packs=(s.questDaily.packs||0)+1;
  s.questWeek.packs=(s.questWeek.packs||0)+1;
  save(s);
  return results;
}

/* ================= CARDVERSE V29: DUEL ARENA + FUSION LAB ================= */
function duelWinChance(card){
  if(!card)return .28;
  return Math.min(.72,.28+(card.atk-55)*.009);
}
function duelFight(cardId,bet){
  const c=CARDS.find(x=>x.id===cardId);if(!c)return null;
  const s=state();
  if(!s.owned.includes(cardId)){toast(t('noCard'));return null;}
  if(s.coins<bet){toast(t('notEnough'));return null;}
  s.coins-=bet;
  const chance=duelWinChance(c);
  const win=Math.random()<chance;
  let payout=0;
  if(win){payout=Math.round(bet*1.8);s.coins+=payout;s.duelWins=(s.duelWins||0)+1;s.questDaily.duelWins=(s.questDaily.duelWins||0)+1;s.questWeek.duelWins=(s.questWeek.duelWins||0)+1;}
  else{s.duelLosses=(s.duelLosses||0)+1;}
  save(s);
  return {win,chance,card:c,bet,payout};
}
const FUSION_NEXT={COMMON:'RARE',RARE:'EPIC',EPIC:'LEGENDARY'};
const FUSION_LEGENDARY_BONUS=800;
function ownedCountByRarity(rarity){
  const s=state();
  return s.owned.filter(id=>{const c=CARDS.find(x=>x.id===id);return c&&c.rarity===rarity}).length;
}
function fuseCards(rarity){
  const s=state();
  const owned=[...s.owned];
  const idxOfRarity=[];
  owned.forEach((id,i)=>{const c=CARDS.find(x=>x.id===id);if(c&&c.rarity===rarity)idxOfRarity.push(i);});
  if(idxOfRarity.length<3){toast(t('fusionNotEnough'));return null;}
  idxOfRarity.slice(0,3).sort((a,b)=>b-a).forEach(i=>owned.splice(i,1));
  const nextRarity=FUSION_NEXT[rarity];
  let resultCard=null,coinBonus=0;
  if(nextRarity){
    const pool=CARDS.filter(x=>x.rarity===nextRarity);
    resultCard=pool[Math.floor(Math.random()*pool.length)];
    owned.push(resultCard.id);
  }else{
    coinBonus=FUSION_LEGENDARY_BONUS;
    s.coins+=coinBonus;
  }
  s.owned=owned;
  s.questWeek.fusions=(s.questWeek.fusions||0)+1;
  save(s);
  return {resultCard,coinBonus,rarity};
}

/* ================= CARDVERSE V29: FRAME SHOP + SHOWCASE PROFILE ================= */
const FRAMES=[
  {id:'clean',name:'Clean',price:0,desc:'เรียบง่าย ไม่มีลวดลาย'},
  {id:'gold',name:'Gold',price:0,desc:'กรอบทองคลาสสิก'},
  {id:'neon',name:'Neon',price:0,desc:'แสงไซแอนเรืองแสงรอบขอบ'},
  {id:'holo',name:'Holo',price:0,desc:'ไล่สีทอง-ม่วง-ฟ้า'},
  {id:'prism',name:'Prism',price:600,desc:'ปริซึมหลากสีสะท้อนแสง'},
  {id:'void',name:'Void',price:800,desc:'ขอบมืดพร้อมแสงแดงเรืองในเงา'},
  {id:'aurora',name:'Aurora',price:900,desc:'แสงเหนือไล่เฉดเขียว-ฟ้า'},
  {id:'ember',name:'Ember',price:750,desc:'ประกายไฟส้ม-แดงลุกโชน'}
];
function buyFrame(id){
  const f=FRAMES.find(x=>x.id===id);if(!f)return;
  const s=state();
  if((s.ownedFrames||[]).includes(id)){toast('มีกรอบนี้อยู่แล้ว');return;}
  if(s.coins<f.price){toast(t('notEnough'));return;}
  s.coins-=f.price;s.ownedFrames=[...(s.ownedFrames||[]),id];save(s);
  toast(`ซื้อกรอบ ${f.name} สำเร็จ ✓`);
  if(typeof renderFrameShop==='function')renderFrameShop();
}
function equipFrame(id){
  const s=state();
  if(!(s.ownedFrames||[]).includes(id)){toast('ยังไม่ได้ซื้อกรอบนี้');return;}
  s.profileFrame=id;save(s);toast('เปลี่ยนกรอบแล้ว ✓');
  applyProfileStyle();
  if(typeof renderFrameShop==='function')renderFrameShop();
  document.querySelectorAll('.style-choice[data-frame]').forEach(x=>x.classList.toggle('selected',x.dataset.frame===id));
}
function renderFramePicker(){
  const host=document.getElementById('frameChoices');if(!host)return;
  const s=state();
  const owned=s.ownedFrames||['clean','gold','neon','holo'];
  host.innerHTML=FRAMES.filter(f=>owned.includes(f.id)).map(f=>
    `<button type="button" class="style-choice" data-frame="${f.id}" onclick="document.querySelectorAll('.style-choice[data-frame]').forEach(x=>x.classList.remove('selected'));this.classList.add('selected')">${f.name}</button>`
  ).join('')+'<a href="frames.html" class="style-choice" style="text-decoration:none;color:var(--cyan);display:inline-flex;align-items:center">+ '+t('frameShop')+'</a>';
  document.querySelectorAll('.style-choice[data-frame]').forEach(x=>x.classList.toggle('selected',x.dataset.frame===(s.profileFrame||'holo')));
}
function toggleShowcaseCard(id){
  const s=state();
  let arr=[...(s.profileShowcase||[])];
  if(arr.includes(id)){arr=arr.filter(x=>x!==id);}
  else{
    if(arr.length>=3){toast('เลือกการ์ดโชว์เคสได้สูงสุด 3 ใบ');return;}
    arr.push(id);
  }
  s.profileShowcase=arr;save(s);
  renderShowcasePicker();
}
function renderShowcasePicker(){
  const host=document.getElementById('showcasePicker');if(!host)return;
  const s=state();
  const ownedIds=[...new Set(Array.isArray(s.owned)?s.owned:[])];
  if(!ownedIds.length){host.innerHTML=`<p class="muted">ยังไม่มีการ์ดในคลัง ไปสุ่มการ์ดก่อนนะ</p>`;return;}
  host.innerHTML=ownedIds.map(id=>{
    const c=CARDS.find(x=>x.id===id);if(!c)return'';
    const sel=(s.profileShowcase||[]).includes(id);
    return `<button type="button" class="main-card-choice ${sel?'selected':''}" onclick="toggleShowcaseCard('${id}')">
      <div class="main-card-choice-art"><img ${artAttrs(c)} alt="${c.name}" loading="lazy">${sel?'<span class="selected-badge">✓</span>':''}</div>
      <div class="main-card-choice-info"><b>${c.name}</b><small>${c.rarity}</small></div>
    </button>`;
  }).join('');
  initArtImages();
}
/* ================= CARDVERSE V29: QUESTS ================= */
function getWeekKey(d=new Date()){
  const onejan=new Date(d.getFullYear(),0,1);
  const week=Math.ceil((((d-onejan)/86400000)+onejan.getDay()+1)/7);
  return `${d.getFullYear()}-W${week}`;
}
function ensureQuestPeriods(s){
  const today=new Date().toDateString();
  if(s.questDailyDate!==today){s.questDailyDate=today;s.questDaily={packs:0,duelWins:0,buys:0};s.questDailyClaimed=[];}
  const wk=getWeekKey();
  if(s.questWeekDate!==wk){s.questWeekDate=wk;s.questWeek={packs:0,duelWins:0,fusions:0};s.questWeekClaimed=[];}
  return s;
}
const QUESTS_DAILY=[
  {id:'d_pack',label:'เปิดแพ็กการ์ด 1 ครั้ง',key:'packs',target:1,reward:50},
  {id:'d_duel',label:'ชนะดวลการ์ด 1 ครั้ง',key:'duelWins',target:1,reward:80},
  {id:'d_buy',label:'ซื้อการ์ดจากตลาด 1 ใบ',key:'buys',target:1,reward:40}
];
const QUESTS_WEEKLY=[
  {id:'w_pack',label:'เปิดแพ็กการ์ด 5 ครั้ง',key:'packs',target:5,reward:300},
  {id:'w_duel',label:'ชนะดวลการ์ด 5 ครั้ง',key:'duelWins',target:5,reward:400},
  {id:'w_fusion',label:'อัปเกรดการ์ด (Fusion) 1 ครั้ง',key:'fusions',target:1,reward:250}
];
function claimQuest(period,id){
  const s=state();
  const list=period==='daily'?QUESTS_DAILY:QUESTS_WEEKLY;
  const q=list.find(x=>x.id===id);if(!q)return;
  const progress=(period==='daily'?s.questDaily:s.questWeek)[q.key]||0;
  const claimed=period==='daily'?s.questDailyClaimed:s.questWeekClaimed;
  if(claimed.includes(id)){toast('รับรางวัลนี้ไปแล้ว');return;}
  if(progress<q.target){toast('ยังทำภารกิจนี้ไม่ครบ');return;}
  s.coins+=q.reward;
  if(period==='daily')s.questDailyClaimed=[...s.questDailyClaimed,id];
  else s.questWeekClaimed=[...s.questWeekClaimed,id];
  save(s);
  toast(`รับรางวัลภารกิจ +${q.reward} 🪙`);
  if(typeof renderQuests==='function')renderQuests();
}

function collectorTitle(s){
  const uniq=new Set(s.owned).size;
  const tier=1+Math.floor(uniq/4);
  return `RANK ${tier} COLLECTOR`;
}
function getProfileBg(){
  const s=state();
  if(s.profileBg==='custom' && s.profileBgCustomData)return{custom:true,artData:s.profileBgCustomData,name:'Custom'};
  if(s.profileBg){const c=CARDS.find(x=>x.id===s.profileBg);if(c)return c;}
  return null;
}
function setProfileBg(id){
  const s=state();
  const c=CARDS.find(x=>x.id===id);if(!c)return;
  s.profileBg=c.id;save(s);renderProfileBgPicker();toast(`ตั้ง ${c.name} เป็นพื้นหลังโปรไฟล์แล้ว ✓`);
}
function removeProfileBg(){
  const s=state();s.profileBg='';save(s);renderProfileBgPicker();toast('รีเซ็ตพื้นหลังโปรไฟล์เป็นค่าเริ่มต้นแล้ว');
}
function handleProfileBgUpload(input){
  const file=input.files?.[0];if(!file)return;
  if(!file.type.startsWith('image/')){toast('กรุณาเลือกไฟล์รูปภาพ');return;}
  const reader=new FileReader();
  reader.onload=()=>{const im=new Image();im.onload=()=>{
    const maxW=1200,maxH=1500,scale=Math.min(1,maxW/im.width,maxH/im.height),w=Math.max(1,Math.round(im.width*scale)),h=Math.max(1,Math.round(im.height*scale));
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.drawImage(im,0,0,w,h);
    const s=state();s.profileBgCustomData=canvas.toDataURL('image/jpeg',.86);s.profileBg='custom';s.profileBgCustomPosX=50;s.profileBgCustomPosY=50;s.profileBgCustomZoom=1;
    try{save(s)}catch(e){toast('รูปใหญ่เกินไปสำหรับพื้นที่เก็บข้อมูลของเบราว์เซอร์');return;}
    renderProfileBgPicker();syncProfileBgControls();toast('✓ อัปโหลดพื้นหลังโปรไฟล์แล้ว');input.value='';
  };im.onerror=()=>toast('เปิดรูปนี้ไม่ได้');im.src=reader.result;};reader.readAsDataURL(file);
}
function updateProfileBgPosition(axis,val){
  const s=state();const n=Number(val);
  if(axis==='x')s.profileBgCustomPosX=n;if(axis==='y')s.profileBgCustomPosY=n;if(axis==='z')s.profileBgCustomZoom=n;
  save(s);syncProfileBgControls();
}
function syncProfileBgControls(){
  const s=state();
  const ids={x:'profileBgPosX',y:'profileBgPosY',z:'profileBgZoom'};
  for(const [k,id] of Object.entries(ids)){const e=document.getElementById(id);if(e)e.value=k==='x'?s.profileBgCustomPosX:k==='y'?s.profileBgCustomPosY:s.profileBgCustomZoom;}
  const vals={x:'profileBgPosXVal',y:'profileBgPosYVal',z:'profileBgZoomVal'};
  for(const [k,id] of Object.entries(vals)){const e=document.getElementById(id);if(e)e.textContent=k==='x'?`${Math.round(s.profileBgCustomPosX)}%`:k==='y'?`${Math.round(s.profileBgCustomPosY)}%`:`${Number(s.profileBgCustomZoom).toFixed(2)}x`;}
}
function renderProfileBgPicker(){
  const host=document.getElementById('profileBgPicker');if(!host)return;
  const s=state();
  const ownedIds=[...new Set(Array.isArray(s.owned)?s.owned:[])];
  const current=s.profileBg;
  let html='';
  if(s.profileBgCustomData){
    html+=`<button type="button" class="main-card-choice ${current==='custom'?'selected':''}" onclick="setProfileBgCustom()" title="ใช้รูปที่อัปโหลดเอง">
      <div class="main-card-choice-art"><img src="${s.profileBgCustomData}" alt="Custom"><span class="selected-badge">${current==='custom'?'✓ ใช้อยู่':'CUSTOM'}</span></div>
      <div class="main-card-choice-info"><b>รูปที่อัปโหลด</b><small>Custom</small></div>
    </button>`;
  }
  if(!ownedIds.length){
    host.innerHTML=html||'<p class="muted">ยังไม่มีการ์ดในคลัง ไปสุ่มการ์ดก่อน หรืออัปโหลดรูปเองได้เลย</p>';
    return;
  }
  html+=ownedIds.map(id=>{
    const c=CARDS.find(x=>x.id===id);if(!c)return'';
    const selected=current===c.id;
    return `<button type="button" class="main-card-choice ${selected?'selected':''}" onclick="setProfileBg('${c.id}')">
      <div class="main-card-choice-art"><img ${artAttrs(c)} alt="${c.name}" loading="lazy">${selected?'<span class="selected-badge">✓ ใช้อยู่</span>':''}</div>
      <div class="main-card-choice-info"><b>${c.name}</b><small>${c.rarity}</small></div>
    </button>`;
  }).join('');
  host.innerHTML=html;
  initArtImages();
}
function setProfileBgCustom(){
  const s=state();
  if(!s.profileBgCustomData){toast('กรุณาอัปโหลดรูปพื้นหลังก่อน');return;}
  s.profileBg='custom';save(s);renderProfileBgPicker();toast('ใช้รูปที่อัปโหลดเป็นพื้นหลังแล้ว ✓');
}

function state(){
  let parsed={};
  try{parsed=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{}
  const s={...DEFAULT,...parsed};
  try{
    const p=localStorage.getItem(PROFILE_IMG_KEY);
    const mc=localStorage.getItem(MAIN_IMG_KEY);
    const bg=localStorage.getItem(PROFILE_BG_IMG_KEY);
    if(p)s.profileAvatarData=p;
    else if(parsed.profileAvatarData){s.profileAvatarData=parsed.profileAvatarData;try{localStorage.setItem(PROFILE_IMG_KEY,parsed.profileAvatarData)}catch{}}
    if(mc)s.mainCardCustomData=mc;
    else if(parsed.mainCardCustomData){s.mainCardCustomData=parsed.mainCardCustomData;try{localStorage.setItem(MAIN_IMG_KEY,parsed.mainCardCustomData)}catch{}}
    if(bg)s.profileBgCustomData=bg;
    else if(parsed.profileBgCustomData){s.profileBgCustomData=parsed.profileBgCustomData;try{localStorage.setItem(PROFILE_BG_IMG_KEY,parsed.profileBgCustomData)}catch{}}
  }catch{}
  if(s.econReset!==ECON_RESET_VERSION){
    s.coins=0;s.musicOn=true;s.econReset=ECON_RESET_VERSION;
    try{const n={...s};n.profileAvatarData='';n.mainCardCustomData='';n.profileBgCustomData='';localStorage.setItem(KEY,JSON.stringify(n));}catch{}
  }
  ensureQuestPeriods(s);
  return s;
}
function save(s){
  const n={...s};
  try{
    if(n.profileAvatarData)localStorage.setItem(PROFILE_IMG_KEY,n.profileAvatarData);else localStorage.removeItem(PROFILE_IMG_KEY);
    if(n.mainCardCustomData)localStorage.setItem(MAIN_IMG_KEY,n.mainCardCustomData);else localStorage.removeItem(MAIN_IMG_KEY);
    if(n.profileBgCustomData)localStorage.setItem(PROFILE_BG_IMG_KEY,n.profileBgCustomData);else localStorage.removeItem(PROFILE_BG_IMG_KEY);
    n.profileAvatarData='';n.mainCardCustomData='';n.profileBgCustomData='';
    localStorage.setItem(KEY,JSON.stringify(n));
  }catch(e){
    try{localStorage.setItem(KEY,JSON.stringify({...n,profileAvatarData:'',mainCardCustomData:'',profileBgCustomData:''}));}
    catch(err){throw e;}
  }
  updateCoins();applyProfileMini();applyI18n();
}
function getCustomMainCard(){
  const s=state();
  return {id:'custom',name:s.mainCardCustomName||'My Card',game:s.mainCardCustomGame||'Custom',rarity:s.mainCardCustomRarity||'LEGENDARY',stars:5,custom:true,artData:s.mainCardCustomData};
}
function getMainCard(){
  const s=state();
  if(s.mainCard==='custom' && s.mainCardCustomData)return getCustomMainCard();
  return CARDS.find(c=>c.id===s.mainCard) || CARDS.find(c=>s.owned.includes(c.id)) || CARDS[0];
}
function applyMainCardImage(img,c){
  if(!img||!c)return;
  img.classList.remove('missing-art');
  if(c.custom){
    img.onerror=null;
    img.dataset.artBase='__custom__';
    img.src=c.artData;
  }else{
    setArt(img,c.artBase);
  }
  const s=state();
  if(c.custom){
    img.style.objectPosition=`${Number(s.mainCardCustomPosX??50)}% ${Number(s.mainCardCustomPosY??50)}%`;
    img.style.transform=`scale(${Math.max(.75,Math.min(2,Number(s.mainCardCustomZoom??1)))})`;
  }else{
    img.style.objectPosition='center center';
    img.style.transform='scale(1)';
  }
  img.style.transformOrigin='center center';
}
function setMainCard(id){
  const s=state();
  if(id==='custom'){
    if(!s.mainCardCustomData){toast('กรุณาอัปโหลดรูปการ์ดของคุณก่อน');return;}
    s.mainCard='custom';
    save(s); renderMainCard(); renderMainCardPicker(); toast('ตั้งการ์ดของคุณเป็นการ์ดหน้าหลักแล้ว ✓'); return;
  }
  const c=CARDS.find(x=>x.id===id);
  if(!c)return;
  s.mainCard=c.id;
  save(s); renderMainCard(); renderMainCardPicker(); toast(`ตั้ง ${c.name} เป็นการ์ดหน้าหลักแล้ว ✓`);
}
function renderMainCard(){
  const c=getMainCard();
  document.querySelectorAll('[data-main-card-name]').forEach(e=>e.textContent=c.name);
  document.querySelectorAll('[data-main-card-game]').forEach(e=>e.textContent=c.game);
  document.querySelectorAll('[data-main-card-rarity]').forEach(e=>e.textContent=c.rarity);
  document.querySelectorAll('[data-main-card-art]').forEach(e=>{applyMainCardImage(e,c);e.alt=c.name;});
  const custom=state().mainCard==='custom' && !!state().mainCardCustomData;
  document.querySelectorAll('[data-custom-main-name]').forEach(e=>e.value=state().mainCardCustomName||'My Card');
  document.querySelectorAll('[data-custom-main-game]').forEach(e=>e.value=state().mainCardCustomGame||'Custom');
  document.querySelectorAll('[data-custom-main-rarity]').forEach(e=>e.value=state().mainCardCustomRarity||'LEGENDARY');
  const badge=document.getElementById('customMainStatus'); if(badge) badge.textContent=custom?'✓ กำลังใช้การ์ดที่อัปโหลดเอง':'การ์ดจากคลัง';
}
function renderMainCardPicker(){
  const host=document.getElementById('mainCardPicker');if(!host)return;
  const s=state();
  const ownedIds=[...new Set(Array.isArray(s.owned)?s.owned:[])];
  const current=s.mainCard;
  let html='';
  if(s.mainCardCustomData){
    html+=`<button type="button" class="main-card-choice custom-main-choice ${current==='custom'?'selected':''}" onclick="setMainCard('custom')" title="ใช้การ์ดที่อัปโหลดเอง">
      <div class="main-card-choice-art"><img src="${s.mainCardCustomData}" alt="My Card"><span class="selected-badge">${current==='custom'?'✓ MAIN':'CUSTOM'}</span></div>
      <div class="main-card-choice-info"><b>${escapeHtml(s.mainCardCustomName||'My Card')}</b><small>การ์ดของฉัน</small></div>
    </button>`;
  }
  html+=CARDS.map(c=>{
    const owned=ownedIds.includes(c.id), selected=current===c.id;
    return `<button type="button" class="main-card-choice ${selected?'selected':''}" onclick="setMainCard('${c.id}')" title="คลิกเพื่อตั้ง ${c.name} เป็นการ์ดหน้าหลัก">
      <div class="main-card-choice-art"><img ${artAttrs(c)} alt="${c.name}" loading="lazy">${owned?'<span class="owned-badge">OWNED</span>':''}${selected?'<span class="selected-badge">✓ MAIN</span>':''}</div>
      <div class="main-card-choice-info"><b>${c.name}</b><small>${c.rarity}</small></div>
    </button>`;
  }).join('');
  host.innerHTML=html;
  initArtImages();
}
function escapeHtml(x){return String(x??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));}
function initMainCardCustomizer(){renderMainCard();renderMainCardPicker();syncMainCardControls();}
function syncMainCardControls(){
  const s=state();
  const ids={x:'mainCardPosX',y:'mainCardPosY',z:'mainCardZoom'};
  for(const [k,id] of Object.entries(ids)){const e=document.getElementById(id);if(e)e.value=k==='x'?s.mainCardCustomPosX:k==='y'?s.mainCardCustomPosY:s.mainCardCustomZoom;}
  const vals={x:'mainCardPosXVal',y:'mainCardPosYVal',z:'mainCardZoomVal'};
  for(const [k,id] of Object.entries(vals)){const e=document.getElementById(id);if(e)e.textContent=k==='x'?`${Math.round(s.mainCardCustomPosX)}%`:k==='y'?`${Math.round(s.mainCardCustomPosY)}%`:`${Number(s.mainCardCustomZoom).toFixed(2)}x`;}
}
function updateMainCardPosition(axis,val){
  const s=state(); const n=Number(val);
  if(axis==='x')s.mainCardCustomPosX=n; if(axis==='y')s.mainCardCustomPosY=n; if(axis==='z')s.mainCardCustomZoom=n;
  save(s); renderMainCard(); syncMainCardControls();
}
function saveCustomMainCardInfo(){
  const s=state();
  const n=document.querySelector('[data-custom-main-name]'),g=document.querySelector('[data-custom-main-game]'),r=document.querySelector('[data-custom-main-rarity]');
  if(n)s.mainCardCustomName=n.value.trim()||'My Card'; if(g)s.mainCardCustomGame=g.value.trim()||'Custom'; if(r)s.mainCardCustomRarity=r.value;
  save(s); renderMainCard(); renderMainCardPicker(); toast('บันทึกข้อมูลการ์ดของฉันแล้ว ✓');
}
function handleMainCardUpload(input){
  const file=input.files?.[0]; if(!file)return;
  if(!file.type.startsWith('image/')){toast('กรุณาเลือกไฟล์รูปภาพ');return;}
  const reader=new FileReader();
  reader.onload=()=>{const im=new Image(); im.onload=()=>{
    const maxW=900,maxH=1200,scale=Math.min(1,maxW/im.width,maxH/im.height),w=Math.max(1,Math.round(im.width*scale)),h=Math.max(1,Math.round(im.height*scale));
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.drawImage(im,0,0,w,h);
    const s=state();s.mainCardCustomData=canvas.toDataURL('image/jpeg',.88);s.mainCard='custom';s.mainCardCustomName=s.mainCardCustomName||file.name.replace(/\.[^.]+$/,'')||'My Card';s.mainCardCustomGame=s.mainCardCustomGame||'Custom';s.mainCardCustomRarity=s.mainCardCustomRarity||'LEGENDARY';s.mainCardCustomPosX=50;s.mainCardCustomPosY=50;s.mainCardCustomZoom=1;save(s);renderMainCard();renderMainCardPicker();syncMainCardControls();toast('✓ อัปโหลดการ์ดของคุณและตั้งเป็น MAIN CARD แล้ว');
  }; im.onerror=()=>toast('เปิดรูปนี้ไม่ได้'); im.src=reader.result;}; reader.readAsDataURL(file);
}
function removeCustomMainCard(){const s=state();s.mainCardCustomData='';if(s.mainCard==='custom')s.mainCard='yinlin';save(s);renderMainCard();renderMainCardPicker();toast('ลบการ์ดที่อัปโหลดแล้ว');}

function applyAvatarPosition(img){
  if(!img)return; const s=state();
  img.style.objectPosition=`${Number(s.profileAvatarPosX??50)}% ${Number(s.profileAvatarPosY??50)}%`;
  img.style.transform=`scale(${Math.max(.75,Math.min(2,Number(s.profileAvatarZoom??1)))})`;
  img.style.transformOrigin='center center';
}
function selectAvatar(el){
  if(!el)return;
  const base=el.dataset.artBase||'Jinhsi_Card'; const s=state();
  s.profileAvatar=base; s.profileAvatarData=''; s.profileAvatarPosX=50; s.profileAvatarPosY=50; s.profileAvatarZoom=1;
  save(s); document.querySelectorAll('.avatar-choice').forEach(x=>x.classList.toggle('selected',x===el)); renderProfile(); applyProfileMini(); toast(`เลือกรูป ${base.replace('_Card','')} แล้ว ✓`);
}
function saveProfile(){
  const s=state(),n=document.getElementById('profileNameInput'),title=document.getElementById('profileTitleInput'),av=document.querySelector('.avatar-choice.selected'),frame=document.querySelector('.style-choice[data-frame].selected'),color=document.querySelector('.color-choice.selected');
  if(n)s.profileName=n.value.trim()||DEFAULT.profileName;if(title)s.profileTitle=title.value.trim()||s.profileName;
  if(av&&!s.profileAvatarData){s.profileAvatar=av.dataset.artBase||'Jinhsi_Card'}if(frame)s.profileFrame=frame.dataset.frame;if(color)s.profileAccent=color.dataset.color;
  save(s);renderProfile();toast(t('saveProfile')+' ✓');
}
function handleAvatarUpload(input){
  const file=input.files?.[0];if(!file)return;if(!file.type.startsWith('image/'))return toast('กรุณาเลือกไฟล์รูปภาพ');
  const reader=new FileReader();reader.onload=()=>{const im=new Image();im.onload=()=>{
    const max=900,scale=Math.min(1,max/im.width,max/im.height),w=Math.max(1,Math.round(im.width*scale)),h=Math.max(1,Math.round(im.height*scale));
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.drawImage(im,0,0,w,h);
    const s=state();s.profileAvatarData=canvas.toDataURL('image/jpeg',.88);s.profileAvatarPosX=50;s.profileAvatarPosY=50;s.profileAvatarZoom=1;save(s);renderProfile();toast('✓ อัปโหลดรูปโปรไฟล์แล้ว');
  };im.onerror=()=>toast('เปิดรูปนี้ไม่ได้');im.src=reader.result;};reader.readAsDataURL(file);
}
function updateAvatarPosition(axis,val){
  const s=state(),n=Number(val);
  if(axis==='x')s.profileAvatarPosX=Math.max(0,Math.min(100,n));
  if(axis==='y')s.profileAvatarPosY=Math.max(0,Math.min(100,n));
  if(axis==='z')s.profileAvatarZoom=Math.max(.75,Math.min(3,n));
  save(s);renderProfile();
  const map={x:['avatarPosX','avatarPosXVal'],y:['avatarPosY','avatarPosYVal'],z:['avatarZoom','avatarZoomVal']};
  const ids=map[axis];
  if(ids){
    const e=document.getElementById(ids[0]),v=document.getElementById(ids[1]);
    const current=axis==='z'?s.profileAvatarZoom:(axis==='x'?s.profileAvatarPosX:s.profileAvatarPosY);
    if(e)e.value=current;
    if(v)v.textContent=axis==='z'?`${Number(current).toFixed(2)}x`:`${Math.round(current)}%`;
  }
}
function setupAvatarDrag(){
  document.querySelectorAll('.avatar-big').forEach(box=>{
    if(box.dataset.dragBound==='1')return;
    box.dataset.dragBound='1';
    let dragging=false,startX=0,startY=0,startPX=50,startPY=50;
    const begin=(x,y)=>{const s=state();dragging=true;startX=x;startY=y;startPX=Number(s.profileAvatarPosX??50);startPY=Number(s.profileAvatarPosY??50);box.classList.add('dragging');};
    const move=(x,y)=>{if(!dragging)return;const dx=x-startX,dy=y-startY;const w=Math.max(120,box.clientWidth),h=Math.max(120,box.clientHeight);const nx=Math.max(0,Math.min(100,startPX-dx/(w*.55)*100));const ny=Math.max(0,Math.min(100,startPY-dy/(h*.55)*100));const s=state();s.profileAvatarPosX=nx;s.profileAvatarPosY=ny;save(s);renderProfile();};
    const end=()=>{if(!dragging)return;dragging=false;box.classList.remove('dragging');syncAvatarControls();};
    box.addEventListener('pointerdown',e=>{e.preventDefault();box.setPointerCapture?.(e.pointerId);begin(e.clientX,e.clientY);});
    box.addEventListener('pointermove',e=>{if(dragging)move(e.clientX,e.clientY);});
    box.addEventListener('pointerup',end);box.addEventListener('pointercancel',end);
  });
}
function syncAvatarControls(){const s=state();const vals={avatarPosX:s.profileAvatarPosX??50,avatarPosY:s.profileAvatarPosY??50,avatarZoom:s.profileAvatarZoom??1};for(const id in vals){const e=document.getElementById(id);if(e)e.value=vals[id];const v=document.getElementById(id+'Val');if(v)v.textContent=id==='avatarZoom'?`${Number(vals[id]).toFixed(2)}x`:`${Math.round(vals[id])}%`;}}
function renderProfile(){
  const s=state(),a=document.getElementById('profileAvatar'),n=document.getElementById('profileNameInput'),title=document.getElementById('profileTitleInput');
  if(a){if(s.profileAvatarData){a.onerror=null;a.src=s.profileAvatarData}else{a.dataset.candidates=artCandidates(s.profileAvatar||'Jinhsi_Card').join('|');a.dataset.try='0';artFallback(a)}applyAvatarPosition(a)}
  if(n)n.value=s.profileName;if(title)title.value=s.profileTitle||s.profileName;
  document.querySelectorAll('.avatar-choice').forEach(x=>x.classList.toggle('selected',!s.profileAvatarData&&x.dataset.artBase===s.profileAvatar));
  document.querySelectorAll('.style-choice[data-frame]').forEach(x=>x.classList.toggle('selected',x.dataset.frame===(s.profileFrame||'holo')));document.querySelectorAll('.color-choice').forEach(x=>x.classList.toggle('selected',x.dataset.color===(s.profileAccent||'#a27bff')));
  const owned=document.getElementById('owned');if(owned)owned.textContent=s.owned.length;const pity=document.getElementById('profilePity');if(pity)pity.textContent=`${s.pity} / 10`;
  applyProfileStyle();renderMainCard();renderMainCardPicker();renderShowcasePicker();renderFramePicker();renderProfileBgPicker();syncProfileBgControls();
  const pn=document.getElementById('previewName');if(pn)pn.textContent=s.profileName;const pt=document.getElementById('previewTitle');if(pt)pt.textContent=s.profileTitle||s.profileName;const pa=document.getElementById('previewAvatar');if(pa){if(s.profileAvatarData){pa.src=s.profileAvatarData}else{pa.dataset.candidates=artCandidates(s.profileAvatar||'Jinhsi_Card').join('|');pa.dataset.try='0';artFallback(pa)}applyAvatarPosition(pa)}
  const mini=document.querySelectorAll('[data-profile-avatar]');mini.forEach(x=>applyAvatarPosition(x));syncAvatarControls();syncMainCardControls();setupAvatarDrag();
}

function audioErrorMessage(el,err){
  console.error('CARDVERSE audio play failed:',err,'element error object:',el&&el.error);
  const code=el&&el.error&&el.error.code;
  if(code===4||code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED)return'หาไฟล์เพลงไม่เจอ หรือไฟล์เสีย/ผิดฟอร์แมต';
  if(code===3||code===MediaError.MEDIA_ERR_DECODE)return'ไฟล์เพลงเปิดไม่ได้ (decode error) ไฟล์อาจเสียหรือดาวน์โหลดมาไม่สมบูรณ์ ลองโหลดใหม่';
  if(el&&el.networkState===0)return'หาไฟล์เพลงไม่เจอที่ตำแหน่งที่กำหนด — เช็คชื่อไฟล์และโฟลเดอร์ assets/ อีกที';
  return'เล่นเพลงไม่ได้ — เปิด Console (F12) เพื่อดูรายละเอียด error จริง';
}
function initGlobalMusic(){
  let audio=document.getElementById('cardverseGlobalMusic');
  if(!audio){
    audio=document.createElement('audio');
    audio.id='cardverseGlobalMusic';
    audio.src='assets/cardverse-chill.wav';
    audio.preload='auto';
    audio.loop=true;
    document.body.appendChild(audio);
  }
  audio.volume=Number(state().musicVolume??.55);
  let bar=document.getElementById('cardverseMusicBar');
  if(!bar){
    bar=document.createElement('div');
    bar.id='cardverseMusicBar';
    bar.innerHTML='<span class="music-dot">♪</span><span class="music-label">CARDVERSE MUSIC</span><button type="button" id="cardverseMusicBtn">▶</button>';
    document.body.appendChild(bar);
  }
  const btn=document.getElementById('cardverseMusicBtn');
  const s=state();
  const update=()=>{btn.textContent=audio.paused?'▶':'⏸';bar.classList.toggle('playing',!audio.paused);};
  const saveTime=()=>{try{localStorage.setItem('cardverse-music-time',String(audio.currentTime||0))}catch{}};
  const restoreTime=()=>{try{const t=Number(localStorage.getItem('cardverse-music-time')||0);if(Number.isFinite(t)&&t>0&&t<audio.duration)audio.currentTime=t}catch{}};
  audio.addEventListener('loadedmetadata',restoreTime,{once:true});
  audio.addEventListener('timeupdate',saveTime);
  audio.addEventListener('play',()=>{const st=state();st.musicOn=true;localStorage.setItem(KEY,JSON.stringify(st));update()});
  audio.addEventListener('pause',()=>{const st=state();st.musicOn=false;localStorage.setItem(KEY,JSON.stringify(st));update()});
  btn.onclick=()=>{if(audio.paused){audio.play().then(update).catch(e=>toast(audioErrorMessage(audio,e)))}else{audio.pause();update()}};
  // Browsers block autoplay. One user interaction on ANY page (including Gacha, now that
  // it shares this same single track — no more separate/broken per-page track) is enough
  // to start it, and it then plays continuously across every page including Gacha.
  const unlock=()=>{
    if(state().musicOn && audio.paused) audio.play().catch(()=>{});
    update();
  };
  ['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,unlock,{once:true,passive:true}));
  update();
}
function initMusic(){
  initGlobalMusic();
}
function setMusicVolume(val){
  const s=state();s.musicVolume=Number(val);save(s);
  const audio=document.getElementById('cardverseGlobalMusic');
  if(audio)audio.volume=s.musicVolume;
}
function resetAllProgress(){
  try{
    localStorage.removeItem(KEY);
    localStorage.removeItem(PROFILE_IMG_KEY);
    localStorage.removeItem(MAIN_IMG_KEY);
    localStorage.removeItem(PROFILE_BG_IMG_KEY);
    localStorage.removeItem('cardverse-music-time');
  }catch(e){}
  location.reload();
}

/* ================= CARDVERSE V21: ONE MAIN CARD + STABLE UPLOADS ================= */
(function(){
  function safeImageData(file, maxW=1000, maxH=1400, quality=.86){
    return new Promise((resolve,reject)=>{
      if(!file || !file.type || !file.type.startsWith('image/')) return reject(new Error('not-image'));
      const reader=new FileReader();
      reader.onerror=()=>reject(new Error('read-failed'));
      reader.onload=()=>{
        const im=new Image();
        im.onload=()=>{
          const scale=Math.min(1,maxW/im.width,maxH/im.height);
          const w=Math.max(1,Math.round(im.width*scale)), h=Math.max(1,Math.round(im.height*scale));
          const canvas=document.createElement('canvas'); canvas.width=w; canvas.height=h;
          const ctx=canvas.getContext('2d',{alpha:true});
          if(!ctx) return reject(new Error('canvas-failed'));
          ctx.drawImage(im,0,0,w,h);
          resolve(canvas.toDataURL('image/jpeg',quality));
        };
        im.onerror=()=>reject(new Error('image-failed'));
        im.src=reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function v21State(){
    const s=state();
    delete s.mainCard1CustomData; delete s.mainCard2CustomData;
    // Migrate any old two-card data into the single main-card slot once.
    
    if(!s.mainCardCustomPosX) s.mainCardCustomPosX=50;
    if(!s.mainCardCustomPosY) s.mainCardCustomPosY=50;
    if(!s.mainCardCustomZoom) s.mainCardCustomZoom=1;
    return s;
  }

  function applyMainImage(img){
    if(!img)return;
    const s=v21State();
    const c=getMainCard();
    const custom=s.mainCard==='custom' && s.mainCardCustomData;
    img.onerror=null;
    img.style.objectFit='cover';
    img.style.objectPosition=`${Number(s.mainCardCustomPosX??50)}% ${Number(s.mainCardCustomPosY??50)}%`;
    img.style.transform=`scale(${Math.max(.75,Math.min(2,Number(s.mainCardCustomZoom??1)))})`;
    img.style.transformOrigin='center center';
    if(custom){ img.src=s.mainCardCustomData; img.alt=s.mainCardCustomName||'My Card'; }
    else { img.dataset.candidates=artCandidates(c.artBase).join('|'); img.dataset.try='0'; img.alt=c.name; artFallback(img); }
  }

  function renderV21Main(){
    const s=v21State();
    const c=getMainCard();
    document.querySelectorAll('[data-main-card-art]').forEach(applyMainImage);
    document.querySelectorAll('[data-main-card-name]').forEach(e=>e.textContent=c.name);
    document.querySelectorAll('[data-main-card-game]').forEach(e=>e.textContent=c.game);
    document.querySelectorAll('[data-main-card-rarity]').forEach(e=>e.textContent=c.rarity);
    const custom=s.mainCard==='custom' && !!s.mainCardCustomData;
    document.querySelectorAll('[data-custom-main-name]').forEach(e=>e.value=s.mainCardCustomName||'My Card');
    document.querySelectorAll('[data-custom-main-game]').forEach(e=>e.value=s.mainCardCustomGame||'Custom');
    document.querySelectorAll('[data-custom-main-rarity]').forEach(e=>e.value=s.mainCardCustomRarity||'LEGENDARY');
    const badge=document.getElementById('customMainStatus'); if(badge) badge.textContent=custom?'✓ กำลังใช้รูปที่อัปโหลด':'การ์ดจากคลัง';
    syncV21MainControls();
  }

  function renderV21Picker(){
    const host=document.getElementById('mainCardPicker'); if(!host)return;
    const s=v21State();
    const current=s.mainCard;
    let html='';
    if(s.mainCardCustomData){
      html+=`<button type="button" class="main-card-choice custom-main-choice ${current==='custom'?'selected':''}" onclick="setMainCardV21('custom')"><div class="main-card-choice-art"><img src="${s.mainCardCustomData}" alt="My Card"><span class="selected-badge">${current==='custom'?'✓ MAIN':'CUSTOM'}</span></div><div class="main-card-choice-info"><b>${escapeHtml(s.mainCardCustomName||'My Card')}</b><small>การ์ดที่อัปโหลดเอง</small></div></button>`;
    }
    html += CARDS.map(c=>`<button type="button" class="main-card-choice ${current===c.id?'selected':''}" onclick="setMainCardV21('${c.id}')"><div class="main-card-choice-art"><img ${artAttrs(c)} alt="${escapeHtml(c.name)}" onerror="artFallback(this)">${current===c.id?'<span class="selected-badge">✓ MAIN</span>':''}</div><div class="main-card-choice-info"><b>${escapeHtml(c.name)}</b><small>${c.rarity}</small></div></button>`).join('');
    host.innerHTML=html;
    initArtImages();
  }

  function setMainCardV21(id){
    const s=v21State();
    if(id==='custom' && !s.mainCardCustomData){toast('กรุณาอัปโหลดรูปการ์ดของคุณก่อน');return;}
    if(id!=='custom' && !CARDS.some(c=>c.id===id))return;
    s.mainCard=id; save(s); renderV21Main(); renderV21Picker(); toast(id==='custom'?'✓ ตั้งรูปการ์ดของคุณเป็นการ์ดหน้าหลักแล้ว':'✓ ตั้งการ์ดหน้าหลักแล้ว');
  }

  async function uploadMainV21(input){
    const file=input?.files?.[0]; if(!file)return;
    try{
      const data=await safeImageData(file,1000,1400,.84);
      const s=v21State();
      s.mainCardCustomData=data;
      s.mainCard='custom';
      s.mainCardCustomName=s.mainCardCustomName && s.mainCardCustomName!=='My Card' ? s.mainCardCustomName : (file.name.replace(/\.[^.]+$/,'')||'My Card');
      s.mainCardCustomGame=s.mainCardCustomGame||'Custom';
      s.mainCardCustomRarity=s.mainCardCustomRarity||'LEGENDARY';
      s.mainCardCustomPosX=50;s.mainCardCustomPosY=50;s.mainCardCustomZoom=1;
      try{save(s)}catch(e){toast('รูปใหญ่เกินไปสำหรับพื้นที่เก็บข้อมูลของเบราว์เซอร์');return;}
      renderV21Main();renderV21Picker();toast('✓ อัปโหลดรูปการ์ดและตั้งเป็นการ์ดหน้าหลักแล้ว'); input.value='';
    }catch(e){toast('ไม่สามารถอ่านรูปนี้ได้ กรุณาลอง PNG/JPG/WebP');}
  }

  function saveMainInfoV21(){
    const s=v21State();
    const n=document.querySelector('[data-custom-main-name]'),g=document.querySelector('[data-custom-main-game]'),r=document.querySelector('[data-custom-main-rarity]');
    s.mainCardCustomName=n?.value.trim()||'My Card';s.mainCardCustomGame=g?.value.trim()||'Custom';s.mainCardCustomRarity=r?.value||'LEGENDARY';
    save(s);renderV21Main();renderV21Picker();toast('✓ บันทึกข้อมูลการ์ดแล้ว');
  }
  function updateMainV21(axis,val){
    const s=v21State(),n=Number(val);
    if(axis==='x')s.mainCardCustomPosX=n;if(axis==='y')s.mainCardCustomPosY=n;if(axis==='z')s.mainCardCustomZoom=n;
    save(s);renderV21Main();
  }
  function syncV21MainControls(){
    const s=v21State();
    const vals={mainCardPosX:s.mainCardCustomPosX??50,mainCardPosY:s.mainCardCustomPosY??50,mainCardZoom:s.mainCardCustomZoom??1};
    Object.entries(vals).forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.value=v;const o=document.getElementById(id+'Val');if(o)o.textContent=id==='mainCardZoom'?`${Number(v).toFixed(2)}x`:`${Math.round(v)}%`;});
  }

  async function uploadAvatarV21(input){
    const file=input?.files?.[0];if(!file)return;
    try{
      const data=await safeImageData(file,900,900,.84);
      const s=state();s.profileAvatarData=data;s.profileAvatar='';s.profileAvatarPosX=50;s.profileAvatarPosY=50;s.profileAvatarZoom=1;
      try{save(s)}catch(e){toast('รูปใหญ่เกินไปสำหรับพื้นที่เก็บข้อมูลของเบราว์เซอร์');return;}
      renderProfile();applyProfileMini();toast('✓ เปลี่ยนรูปโปรไฟล์แล้ว');input.value='';
    }catch(e){toast('ไม่สามารถอ่านรูปโปรไฟล์นี้ได้');}
  }
  function selectAvatarV21(base){
    const s=state();s.profileAvatar=base;s.profileAvatarData='';s.profileAvatarPosX=50;s.profileAvatarPosY=50;s.profileAvatarZoom=1;save(s);renderProfile();applyProfileMini();toast(`✓ เปลี่ยนรูปโปรไฟล์เป็น ${String(base).replace('_Card','')}`);
  }

  function renderV21All(){
    renderV21Main();renderV21Picker();
    const mainInput=document.getElementById('v21MainCardUpload');if(mainInput && !mainInput.dataset.bound){mainInput.dataset.bound='1';mainInput.addEventListener('change',()=>uploadMainV21(mainInput));}
    const s=state();
    document.querySelectorAll('.avatar-choice').forEach(x=>x.classList.toggle('selected',!s.profileAvatarData&&x.dataset.artBase===s.profileAvatar));
  }

  window.setMainCardV21=setMainCardV21;
  window.uploadMainV21=uploadMainV21;
  window.saveMainInfoV21=saveMainInfoV21;
  window.updateMainV21=updateMainV21;
  window.selectAvatarV21=selectAvatarV21;
  window.uploadAvatarV21=uploadAvatarV21;
  window.renderV21All=renderV21All;
  window.setupAvatarDrag=setupAvatarDrag;

  setTimeout(renderV21All,0);
})();

/* Gacha sound: generated locally with Web Audio, so no external audio file is required. */
let cardverseSfxCtx=null;
function playGachaSound(type='open'){
  try{
    const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
    if(!cardverseSfxCtx)cardverseSfxCtx=new C();
    const ctx=cardverseSfxCtx;if(ctx.state==='suspended')ctx.resume();
    const now=ctx.currentTime;
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type=type==='reveal'?'triangle':'sawtooth';
    const start=type==='reveal'?520:180,end=type==='reveal'?980:620;
    osc.frequency.setValueAtTime(start,now);osc.frequency.exponentialRampToValueAtTime(end,now+.28);
    gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(type==='reveal'?.22:.14,now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+.38);
    osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+.4);
    if(type==='reveal'){
      const o2=ctx.createOscillator(),g2=ctx.createGain();o2.type='sine';o2.frequency.setValueAtTime(1040,now+.05);o2.frequency.exponentialRampToValueAtTime(1560,now+.28);g2.gain.setValueAtTime(.0001,now+.05);g2.gain.exponentialRampToValueAtTime(.12,now+.08);g2.gain.exponentialRampToValueAtTime(.0001,now+.34);o2.connect(g2);g2.connect(ctx.destination);o2.start(now+.05);o2.stop(now+.36);
    }
  }catch(e){}
}

window.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
  const steps=[updateCoins,applyI18n,initArtImages,applyProfileMini,renderProfile,initMainCardCustomizer,initMusic,renderV21All];
  for(const step of steps){try{step()}catch(e){console.error('CARDVERSE init step failed:',step.name,e)}}
});

/* CARDVERSE V24 FINAL IMAGE FIX */
(function(){
  function renderMain24(){
    const st=state();
    const custom=st.mainCard==='custom' && !!st.mainCardCustomData;
    const card=custom
      ? {name:st.mainCardCustomName||'My Card',game:st.mainCardCustomGame||'Custom',rarity:st.mainCardCustomRarity||'LEGENDARY',custom:true,artData:st.mainCardCustomData}
      : (CARDS.find(x=>x.id===st.mainCard)||CARDS[0]);

    document.querySelectorAll('[data-main-card-name]').forEach(e=>e.textContent=card.name);
    document.querySelectorAll('[data-main-card-game]').forEach(e=>e.textContent=card.game);
    document.querySelectorAll('[data-main-card-rarity]').forEach(e=>e.textContent=card.rarity);

    document.querySelectorAll('[data-main-card-art]').forEach(img=>{
      img.style.objectFit='cover';
      img.style.objectPosition=custom?`${Number(st.mainCardCustomPosX??50)}% ${Number(st.mainCardCustomPosY??50)}%`:'50% 50%';
      img.style.transform=custom?`scale(${Math.max(.75,Math.min(2,Number(st.mainCardCustomZoom??1)))})`:'scale(1)';
      if(custom){
        img.onerror=null;img.src=card.artData;img.alt=card.name;
      }else{
        img.dataset.candidates=artCandidates(card.artBase).join('|');
        img.dataset.try='0';img.onerror=()=>artFallback(img);artFallback(img);
      }
    });
  }

  function renderProfile24(){
    const st=state();
    document.querySelectorAll('#profileAvatar,#previewAvatar,[data-profile-avatar]').forEach(img=>{
      img.style.objectFit='cover';
      img.style.objectPosition=`${Number(st.profileAvatarPosX??50)}% ${Number(st.profileAvatarPosY??50)}%`;
      img.style.transform=`scale(${Math.max(.75,Math.min(3,Number(st.profileAvatarZoom??1)))})`;
      if(st.profileAvatarData){
        img.onerror=null;img.src=st.profileAvatarData;
      }else{
        img.dataset.candidates=artCandidates(st.profileAvatar||'Jinhsi_Card').join('|');
        img.dataset.try='0';img.onerror=()=>artFallback(img);artFallback(img);
      }
    });
  }

  function compressImage(file,maxW,maxH,quality,done){
    const r=new FileReader();
    r.onerror=()=>done(null);
    r.onload=()=>{
      const im=new Image();
      im.onerror=()=>done(null);
      im.onload=()=>{
        const scale=Math.min(1,maxW/im.width,maxH/im.height);
        const w=Math.max(1,Math.round(im.width*scale)),h=Math.max(1,Math.round(im.height*scale));
        const cv=document.createElement('canvas');cv.width=w;cv.height=h;
        const ctx=cv.getContext('2d');
        ctx.drawImage(im,0,0,w,h);
        done(cv.toDataURL('image/jpeg',quality));
      };
      im.src=r.result;
    };
    r.readAsDataURL(file);
  }

  function bindProfile24(){
    const input=document.getElementById('v21ProfileUpload');
    if(input){
      input.onchange=function(){
        const file=this.files?.[0];if(!file)return;
        if(!file.type?.startsWith('image/')){toast('กรุณาเลือกไฟล์รูปภาพ');this.value='';return;}
        compressImage(file,640,640,.72,data=>{
          if(!data){toast('เปิดรูปไม่สำเร็จ');return;}
          try{
            const st=state();
            st.profileAvatarData=data;st.profileAvatar='';
            st.profileAvatarPosX=50;st.profileAvatarPosY=50;st.profileAvatarZoom=1;
            save(st);
            renderProfile24();renderProfile();
            toast('✓ เปลี่ยนรูปโปรไฟล์แล้ว');
            this.value='';
          }catch(e){toast('พื้นที่เก็บข้อมูลไม่พอ กรุณาใช้รูปที่เล็กลง');}
        });
      };
    }
  }

  function refresh24(){renderMain24();renderProfile24();bindProfile24();}
  window.renderMain24=renderMain24;
  window.renderProfile24=renderProfile24;
  setTimeout(refresh24,100);
  window.addEventListener('pageshow',refresh24);
})();
