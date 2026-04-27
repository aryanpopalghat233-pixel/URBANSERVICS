const API="http://localhost:3000";

/* SERVICES DATA */
const servicesData=[
{category:"Cleaning",name:"Home Cleaning",price:999,img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952"},
{category:"Plumbing",name:"Leak Fix",price:299,img:"https://images.unsplash.com/photo-1581579188871-45ea61f2a0c8"}
];

/* RENDER SERVICES */
if(document.getElementById("serviceList")){
renderServices(servicesData);
searchService.oninput=filterServices;
categoryFilter.onchange=filterServices;
}

function renderServices(data){
serviceList.innerHTML=data.map(s=>`
<div class="service-card" onclick="openService('${s.name}','${s.category}','${s.price}','${s.img}')">
<img src="${s.img}">
<h3>${s.name}</h3>
<p>₹${s.price}</p>
</div>`).join("");
}

function filterServices(){
let search=searchService.value.toLowerCase();
let cat=categoryFilter.value;
renderServices(servicesData.filter(s=>
s.name.toLowerCase().includes(search)&&
(cat? s.category===cat:true)
));
}

/* OPEN SERVICE */
function openService(n,c,p,i){
localStorage.setItem("serviceName",n);
localStorage.setItem("serviceCategory",c);
localStorage.setItem("servicePrice",p);
localStorage.setItem("serviceImg",i);
location="service-detail.html";
}

/* DETAIL */
if(document.getElementById("detailName")){
detailName.innerText=localStorage.getItem("serviceName");
detailCategory.innerText=localStorage.getItem("serviceCategory");
detailPrice.innerText=localStorage.getItem("servicePrice");
detailImg.src=localStorage.getItem("serviceImg");
}

/* BOOK */
function bookNow(){
localStorage.setItem("selectedService",localStorage.getItem("serviceName"));
location="booking.html";
}

/* BOOKING */
if(document.getElementById("bookingForm")){
service.value=localStorage.getItem("selectedService")||"";
bookingForm.onsubmit=async e=>{
e.preventDefault();
await fetch(API+"/book-service",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
name:name.value,phone:phone.value,address:address.value,
service:service.value,subservice:subservice.value,datetime:datetime.value
})});
alert("Booked");
};
}

/* WORKER */
if(document.getElementById("workerForm")){
workerForm.onsubmit=async e=>{
e.preventDefault();
await fetch(API+"/apply-worker",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
name:wname.value,phone:wphone.value,skills:skills.value,
experience:experience.value,lat:lat.value,lng:lng.value
})});
alert("Applied");
};
}

/* MAP */
if(document.getElementById("map")){
let map=L.map('map').setView([20,78],5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
fetch(API+"/workers-location").then(r=>r.json()).then(d=>{
d.forEach(w=>L.marker([w.lat,w.lng]).addTo(map));
});
}

/* ADMIN */
function login(){
if(user.value=="admin"&&pass.value=="1234"){
fetch(API+"/admin/bookings").then(r=>r.json()).then(d=>{
bookings.innerHTML=d.map(x=>`<li>${x.name}</li>`).join("");
});
fetch(API+"/admin/workers").then(r=>r.json()).then(d=>{
workers.innerHTML=d.map(x=>`<li>${x.name}</li>`).join("");
});
}
}
