const pages = [...document.querySelectorAll('.page')];
const crumb = document.getElementById('crumb');
const toast = document.getElementById('toast');
let completed = 2;
let currentCourse = 'Design thinking basics';
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
function showPage(name){
  pages.forEach(p=>p.classList.toggle('active',p.id===name));
  document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  const names={home:'Overview',learn:'My learning',session:'Learning session',progress:'Progress',rewards:'My rewards',profile:'Profile'};
  crumb.textContent=names[name]||'Overview';
  window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',e=>{
  const nav=e.target.closest('[data-page]');
  if(nav){showPage(nav.dataset.page);return;}
  const course=e.target.closest('[data-course]');
  if(course){currentCourse=course.dataset.course;document.getElementById('sessionTitle').textContent=currentCourse==='Design thinking basics'?'Understand the people you’re designing for':`Start exploring ${currentCourse}`;showPage('session');return;}
});
document.querySelectorAll('.mood-card').forEach(card=>card.addEventListener('click',()=>{
  document.querySelectorAll('.mood-card').forEach(c=>c.classList.remove('selected'));
  card.classList.add('selected');notify(`Check-in saved: ${card.dataset.mood}. Take today at your pace.`);
}));
document.getElementById('completeBtn').addEventListener('click',()=>{
  completed=Math.min(4,completed+1);
  document.getElementById('weekCount').textContent=`${completed}/4`;
  notify('Lesson completed! You earned 20 learning points. ✨');
  document.getElementById('completeBtn').textContent='Completed ✓';
  document.getElementById('completeBtn').disabled=true;
});
document.getElementById('pauseBtn').addEventListener('click',()=>{notify('Session paused. Your progress is safe.');showPage('learn');});
document.getElementById('helpBtn').addEventListener('click',()=>openModal('A gentle reminder','Your learning journey is yours. You can pause, rest and return whenever it works for you. There are no streaks to lose.'));
function openModal(title,text){document.getElementById('modalTitle').textContent=title;document.getElementById('modalText').textContent=text;document.getElementById('modal').classList.add('show')}
function closeModal(){document.getElementById('modal').classList.remove('show')}
document.getElementById('closeModal').addEventListener('click',closeModal);
document.getElementById('modalOkay').addEventListener('click',closeModal);
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
document.getElementById('saveSettings').addEventListener('click',()=>notify('Your preferences have been saved.'));
document.getElementById('courseSearch').addEventListener('input',e=>{
  const q=e.target.value.toLowerCase();
  document.querySelectorAll('.course-card').forEach(card=>card.style.display=card.textContent.toLowerCase().includes(q)?'':'none');
});
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const type=btn.textContent.trim();
  document.querySelectorAll('.course-card').forEach((card,i)=>{
    card.style.display=(type==='All topics'||(type==='In progress'&&i===0)||(type==='Completed'&&false))?'':'none';
  });
  if(type==='Completed')notify('No completed courses yet. Keep learning at your own pace.');
}));
