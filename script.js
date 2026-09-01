// scroll reveals
const rv = document.querySelectorAll('.rv');
const io = new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.18});
rv.forEach(el=>io.observe(el));
// safety net: if IntersectionObserver never fires (unsupported/throttled browser),
// don't leave content permanently invisible.
setTimeout(()=>{ rv.forEach(el=>el.classList.add('in')); }, 1200);

// sticky project frame follows the step you're reading
const steps = document.querySelectorAll('.proj-step');
const frames = document.querySelectorAll('.frame');
const stepNum = document.getElementById('projStepNum');
const stepIO = new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      const f = e.target.dataset.frame;
      frames.forEach(fr=>fr.classList.toggle('show', fr.dataset.f===f));
      steps.forEach(s=>s.classList.toggle('active', s===e.target));
      if(stepNum) stepNum.textContent = String(Number(f)+1).padStart(2,'0');
    }
  });
},{rootMargin:'-40% 0px -40% 0px'});
steps.forEach(s=>stepIO.observe(s));

// nav active state
const sections = ['hero','about','skills','projects','experience','contact'].map(id=>document.getElementById(id));
const navLinks = document.querySelectorAll('#siteNav a.link');
const navIO = new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(l=>l.classList.toggle('on', l.getAttribute('href')==='#'+e.target.id));
    }
  });
},{rootMargin:'-45% 0px -45% 0px'});
sections.forEach(s=>s && navIO.observe(s));

// mobile nav toggle
const nav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
if(navToggle){
  navToggle.addEventListener('click', ()=> nav.classList.toggle('open'));
  navLinks.forEach(l=>l.addEventListener('click', ()=> nav.classList.remove('open')));
}
