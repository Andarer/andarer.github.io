fetch('./data/registry.json').then(r=>r.json()).then(data=>{
const grid=document.getElementById('projects-grid');
data.projects.forEach(p=>{
const d=document.createElement('div');
d.className='card';
d.innerHTML=`<h3>${p.icon} ${p.title}</h3><p>${p.description}</p>`;
grid.appendChild(d);
});
});