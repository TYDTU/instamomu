const fs = require('fs');
const path = require('path');

const W=2550,H=3300,I='#0b2e4f',G='#f4b400',P='#ee2a7b';
const out=path.join(__dirname,'..','assets','college-semester-planner');
fs.mkdirSync(out,{recursive:true});
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const text=(x,y,s,size=46,fill=I,weight=700,anchor='start',extra='')=>`<text x="${x}" y="${y}" fill="${fill}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" ${extra}>${esc(s)}</text>`;
const line=(x1,y1,x2,y2,stroke=I,w=8,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
const rect=(x,y,w,h,fill=G,stroke=I,sw=8,r=28)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const circle=(x,y,r,fill=P,stroke='none',sw=0)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const heart=(x,y,s=1,fill=P)=>`<path d="M ${x} ${y+24*s} C ${x-42*s} ${y-10*s},${x-80*s} ${y+48*s},${x} ${y+110*s} C ${x+80*s} ${y+48*s},${x+42*s} ${y-10*s},${x} ${y+24*s}Z" fill="${fill}"/>`;
const star=(cx,cy,r=55,fill=G)=>{let a=[];for(let n=0;n<10;n++){let rr=n%2?r*.43:r,ang=-Math.PI/2+n*Math.PI/5;a.push(`${cx+Math.cos(ang)*rr},${cy+Math.sin(ang)*rr}`)}return `<polygon points="${a.join(' ')}" fill="${fill}"/>`};
const cap=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><polygon points="0,90 180,15 360,90 180,165" fill="${I}"/><path d="M75 125v105q105 65 210 0V125l-105 45Z" fill="${P}"/><path d="M335 100v130" stroke="${G}" stroke-width="14"/><circle cx="335" cy="245" r="24" fill="${G}"/></g>`;
const books=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="150" width="390" height="92" rx="18" fill="${P}" stroke="${I}" stroke-width="12"/><rect x="40" y="72" width="390" height="90" rx="18" fill="${G}" stroke="${I}" stroke-width="12"/><rect x="5" y="0" width="390" height="84" rx="18" fill="${P}" stroke="${I}" stroke-width="12"/>${line(75,22,75,64,I,10)}${line(110,95,110,140,I,10)}${line(65,173,65,220,I,10)}</g>`;
const bulb=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="70" cy="70" r="58" fill="${G}" stroke="${I}" stroke-width="12"/><path d="M45 112h50v55H45z" fill="${P}" stroke="${I}" stroke-width="10"/>${line(50,185,90,185,I,12)}</g>`;
const clock=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${circle(75,75,65,G,I,12)}${line(75,75,75,32,I,10)}${line(75,75,112,92,P,10)}${circle(75,75,9,P)}</g>`;
const bookIcon=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 10Q75-15 145 25v125Q75 110 0 145Z" fill="${P}" stroke="${I}" stroke-width="10"/><path d="M145 25Q215-15 290 10v135q-75-35-145 5Z" fill="${G}" stroke="${I}" stroke-width="10"/>${line(145,28,145,150,I,10)}</g>`;
const page=(title,subtitle,body,bg=G)=>`<svg xmlns="http://www.w3.org/2000/svg" width="8.5in" height="11in" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${bg}"/>${rect(55,55,W-110,H-110,bg,I,14,45)}${title?`${text(1275,205,title,88,I,900,'middle','letter-spacing="3"')}${subtitle?text(1275,270,subtitle,34,P,800,'middle','letter-spacing="4"'):''}${line(180,315,2370,315,P,12)}`:''}${body}</svg>`;
const panel=(x,y,w,h,titleText,accent=P)=>`${rect(x,y,w,h,G,I,8,30)}<rect x="${x}" y="${y}" width="${w}" height="82" rx="28" fill="${accent}"/><rect x="${x}" y="${y+52}" width="${w}" height="30" fill="${accent}"/>${text(x+34,y+57,titleText,36,accent===I?G:I,900)}`;
const ruleLines=(x,y,x2,count,gap=72,bullet=false)=>Array.from({length:count},(_,n)=>`${bullet?circle(x,y+n*gap-10,10,P):''}${line(x+(bullet?32:0),y+n*gap,x2,y+n*gap,I,5)}`).join('');
const save=(n,name,svg)=>fs.writeFileSync(path.join(out,`page-${n}-${name}.svg`),svg);

// 1 Cover
let dots='';for(let y=110;y<3200;y+=180)for(let x=110;x<2450;x+=190)if((x+y)%4)dots+=circle(x,y,11,G);
let cover=`${dots}${text(1275,650,'COLLEGE',150,G,900,'middle','letter-spacing="14"')}${text(1275,855,'SEMESTER',190,P,900,'middle')}${text(1275,1060,'SUCCESS',190,P,900,'middle')}
<path d="M320 1140H2230L2110 1280l120 140H320l120-140Z" fill="${G}"/>${text(1275,1340,'PLANNER',118,I,900,'middle','letter-spacing="20"')}
${books(260,2225,1.25)}${cap(1650,2150,1.35)}${heart(1275,1810,1.8,G)}${star(2200,430,70,G)}${star(340,1780,55,P)}
${text(1275,3050,'PLAN WITH PURPOSE • FINISH WITH PRIDE',44,G,800,'middle','letter-spacing="3"')}`;
save(1,'front-cover',page('', '',cover,I));

// 2 Semester overview
const months=['AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
let sem=`${cap(150,90,.55)}`;
months.forEach((m,idx)=>{const col=idx%3,row=Math.floor(idx/3),x=120+col*790,y=390+row*800,w=710,h=680;sem+=panel(x,y,w,h,m,idx%2?I:P);const cw=w/7,gy=y+155;['S','M','T','W','T','F','S'].forEach((d,i)=>sem+=text(x+cw*(i+.5),gy,d,25,I,800,'middle'));for(let r=0;r<6;r++)for(let c=0;c<7;c++){sem+=rect(x+18+c*(w-36)/7,gy+32+r*72,(w-36)/7,72,'none',I,3,0)}});
sem+=panel(1700,1190,740,680,'MILESTONE KEY',P)+[[P,'EXAMS'],[I,'PROJECTS'],[I,'BREAKS'],[P,'REGISTRATION'],[I,'CAMPUS EVENTS']].map((a,i)=>circle(1760,1350+i*90,17,a[0])+text(1810,1364+i*90,a[1],31,I,700)).join('');
sem+=panel(120,2050,2310,980,'IMPORTANT DATES',I)+ruleLines(190,2240,2350,10,70,true);
save(2,'semester-at-a-glance',page('SEMESTER AT A GLANCE','AUGUST — DECEMBER',sem));

// 3 Monthly
let mon=`${text(180,420,'MONTH:',38,I,800)}${line(365,425,1050,425,I,6)}${text(1510,420,'YEAR:',38,I,800)}${line(1660,425,2080,425,I,6)}`;
const gx=120,gy=520,gw=2310,gh=1640,cw=gw/7,ch=gh/6;
mon+=rect(gx,gy,gw,gh,G,I,10,28);['SUN','MON','TUE','WED','THU','FRI','SAT'].forEach((d,i)=>{mon+=`<rect x="${gx+i*cw}" y="${gy}" width="${cw}" height="105" fill="${i%2?I:P}"/>${text(gx+(i+.5)*cw,gy+69,d,30,G,900,'middle')}`});for(let i=1;i<7;i++)mon+=line(gx+i*cw,gy,gx+i*cw,gy+gh,I,5);for(let i=1;i<6;i++)mon+=line(gx,gy+i*ch,gx+gw,gy+i*ch,I,5);
mon+=panel(120,2250,720,700,'MONTHLY GOALS',P)+ruleLines(180,2420,780,6,78,true)+panel(880,2250,720,700,'KEY DEADLINES',I)+ruleLines(940,2420,1540,6,78,true)+panel(1640,2250,790,700,'NOTES',P)+ruleLines(1700,2420,2370,7,68,false);
save(3,'monthly-planner',page('MONTHLY PLANNER','BIG PICTURE • CLEAR PRIORITIES',mon));

// 4 Weekly
let week=`${text(170,415,'WEEK OF:',38,I,800)}${line(390,420,1100,420,I,6)}`;
const days=['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];days.forEach((d,i)=>{const col=i%2,row=Math.floor(i/2),x=120+col*1170,y=500+row*610;week+=panel(x,y,1110,560,d,i%2?I:P)+ruleLines(x+55,y+155,x+1050,5,72,true)});
week+=panel(1290,2330,1140,560,'WEEKEND FOCUS',P)+line(1860,2415,1860,2860,I,6)+ruleLines(1345,2500,1815,5,70,true)+ruleLines(1915,2500,2380,5,70,true);
week+=panel(120,2940,1110,220,'OFFICE HOURS',I)+line(175,3080,1170,3080,I,5)+panel(1290,2940,1140,220,'CLUB MEETINGS',P)+line(1345,3080,2370,3080,I,5);
save(4,'weekly-planner',page('WEEKLY PLANNER','SHOW UP • STUDY SMART • STAY BALANCED',week));

// 5 Daily
let daily=`${clock(140,100,.75)}${text(165,415,'DATE:',38,I,800)}${line(310,420,850,420,I,6)}${text(1370,415,'DAY:',38,I,800)}${line(1500,420,2220,420,I,6)}`;
daily+=panel(120,510,720,660,'TOP 3 PRIORITIES',P)+[1,2,3].map((n,i)=>circle(190,700+i*135,28,P)+text(190,713+i*135,n,26,G,900,'middle')+line(245,705+i*135,780,705+i*135,I,5)).join('');
daily+=panel(880,510,1550,1690,'SCHEDULE • 7 AM — 9 PM',I);for(let i=0;i<15;i++){const hr=i+7,lab=hr===12?'12 PM':hr<12?`${hr} AM`:`${hr-12} PM`;daily+=text(930,675+i*95,lab,27,I,800)+line(1060,680+i*95,2370,680+i*95,I,4,'12 10')}
daily+=panel(120,1230,720,470,'FOCUS SESSION',I)+text(180,1420,'START',28,I,800)+line(330,1425,770,1425,I,5)+text(180,1535,'GOAL',28,I,800)+line(310,1540,770,1540,I,5);
daily+=panel(120,1760,720,440,'REMINDERS',P)+ruleLines(180,1930,780,4,75,true);
daily+=panel(120,2280,720,720,'NOTES',I)+ruleLines(180,2470,780,7,75,false)+panel(880,2280,740,720,'ASSIGNMENTS',P)+ruleLines(940,2470,1560,7,75,true)+panel(1660,2280,770,720,'TOMORROW PREP',I)+ruleLines(1720,2470,2370,7,75,true);
save(5,'daily-planner',page('DAILY PLANNER','ONE FOCUSED DAY AT A TIME',daily));

// 6 Stickers
const stickerData=[['BOOK',bookIcon],['EXAM',clock],['IDEA',bulb],['DEADLINE',clock],['READING',bookIcon],['PROJECT',bulb],['STUDY GROUP',heart],['OFFICE HOURS',clock],['PRESENTATION',star],['LAB',bulb],['INTERNSHIP',books],['PRIORITY',star],['SELF CARE',heart],['QUIZ',bookIcon],['MEETING',clock]];
let stickers='';stickerData.forEach((it,i)=>{const col=i%3,row=Math.floor(i/3),x=120+col*790,y=410+row*530;stickers+=rect(x,y,710,450,i%2?I:P,G,12,55);const fn=it[1];if(fn===heart)stickers+=heart(x+355,y+75,1.25,G);else if(fn===star)stickers+=star(x+355,y+155,90,G);else if(fn===bookIcon)stickers+=bookIcon(x+215,y+80,.95);else if(fn===books)stickers+=books(x+180,y+60,.85);else stickers+=fn(x+280,y+65,1.15);stickers+=line(x+185,y+370,x+525,y+370,G,8)});
stickers+=`${heart(300,3100,.65,P)}${star(650,3150,45,I)}${circle(980,3150,45,P)}${heart(1275,3100,.65,I)}${star(1640,3150,45,P)}${circle(1970,3150,45,I)}${heart(2260,3100,.65,P)}`;
save(6,'planner-stickers-icons',page('PLANNER STICKERS + ICONS','RESIZE • RECOLOR • CUSTOMIZE',stickers));

// 7 Tips
const tips=[['BREAK BIG TASKS DOWN','Turn one intimidating assignment into small, scheduled actions.'],['PLAN THE WEEK FIRST','Block classes, study time, meals, rest, and travel before extras.'],['USE ACTIVE RECALL','Close the notes. Ask a question. Retrieve the answer from memory.'],['START BEFORE YOU FEEL READY','A focused ten-minute start can create the momentum you need.'],['PROTECT OFFICE HOURS','Bring one clear question and leave with one specific next step.'],['REST IS PART OF THE PLAN','Consistent sleep and real breaks make focused work possible.']];
let t='';tips.forEach((a,i)=>{const y=410+i*440,accent=i%2?I:P;t+=rect(150,y,2250,360,G,accent,12,42)+circle(310,y+180,95,accent)+text(310,y+203,i+1,66,G,900,'middle')+text(470,y+125,a[0],42,accent,900)+text(470,y+205,a[1],31,I,600)+line(470,y+260,2230,y+260,accent,5)});t+=heart(1275,3070,.8,P)+text(1420,3155,'PROGRESS OVER PERFECTION',42,I,900,'middle');
save(7,'tips-and-tricks',page('TIPS + TRICKS','COLLEGE SUCCESS, MADE PRACTICAL',t));

// 8 Notes / vision
let notes=panel(120,410,1440,1680,'NOTES',I);for(let i=0;i<18;i++)notes+=line(180,580+i*78,1500,580+i*78,I,4);
notes+=panel(1600,410,830,1680,'VISION BOARD',P);for(let r=0;r<12;r++)for(let c=0;c<5;c++)notes+=circle(1680+c*155,600+r*120,7,(r+c)%2?I:P);
notes+=panel(120,2160,730,830,'IDEAS TO EXPLORE',P)+ruleLines(180,2350,790,8,78,true)+panel(910,2160,730,830,'WINS TO REMEMBER',I)+ruleLines(970,2350,1580,8,78,true)+panel(1700,2160,730,830,'NEXT STEPS',P)+ruleLines(1760,2350,2370,8,78,true);
notes+=`${star(300,3120,50,P)}${heart(1275,3070,.75,I)}${star(2250,3120,50,P)}`;
save(8,'notes-and-vision-board',page('NOTES + VISION BOARD','DREAM IT • MAP IT • MAKE IT YOURS',notes));

console.log(`Generated 8 SVG pages in ${out}`);
