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
showToast("Booking Confirmed!");
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
/* SERVICE FULL DATA */
const servicesData = [
{name:"Home Cleaning",category:"Cleaning",price:999,img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952",desc:"Complete home cleaning by professionals"},
{name:"Leak Fix",category:"Plumbing",price:299,img:"https://images.unsplash.com/photo-1581579188871-45ea61f2a0c8",desc:"Quick leak fixing service"},
{name:"Fan Repair",category:"Electrician",price:249,img:"https://images.unsplash.com/photo-1593941707882-a5bac6861d75",desc:"Repair fans efficiently"},
{name:"Facial",category:"Beauty",price:499,img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348",desc:"Professional facial service"},
{name:"AC Service",category:"AC Repair",price:599,img:"https://images.unsplash.com/photo-1581093458791-9f3c3900dfad",desc:"AC maintenance & cleaning"}
];

/* RENDER HOME SERVICES */
if(document.querySelector(".uc-grid")){
document.querySelector(".uc-grid").innerHTML = servicesData.map(s=>`
<div class="uc-card" onclick='openModal(${JSON.stringify(s)})'>
<h3>${s.name}</h3>
<p>${s.category}</p>
</div>
`).join("");
}

/* OPEN MODAL */
function openModal(service){
serviceModal.style.display="flex";

modalName.innerText = service.name;
modalDesc.innerText = service.desc;
modalPrice.innerText = service.price;
modalImg.src = service.img;

localStorage.setItem("selectedService", service.name);
}

/* CLOSE */
function closeModal(){
serviceModal.style.display="none";
}

/* BOOKING */
if(document.getElementById("quickBooking")){
quickBooking.onsubmit = async (e)=>{
e.preventDefault();

await fetch(API+"/book-service",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:bname.value,
phone:bphone.value,
address:baddress.value,
service:localStorage.getItem("selectedService"),
subservice:"",
datetime:new Date()
})
});

alert("Booking Confirmed!");
closeModal();
};
}
/* OPEN SERVICE */
function openService(name, category, price, img){
localStorage.setItem("serviceName", name);
localStorage.setItem("serviceCategory", category);
localStorage.setItem("servicePrice", price);
localStorage.setItem("serviceImg", img);
window.location.href = "service-detail.html";
}

/* LOAD DETAIL PAGE */
if(document.getElementById("detailName")){
detailName.innerText = localStorage.getItem("serviceName");
detailCategory.innerText = localStorage.getItem("serviceCategory");
detailPrice.innerText = localStorage.getItem("servicePrice");
detailImg.src = localStorage.getItem("serviceImg");
}

/* BOOK NOW */
function bookNow(){
localStorage.setItem("selectedService", localStorage.getItem("serviceName"));
window.location.href = "booking.html";
}

/* AUTO FILL */
if(document.getElementById("service")){
service.value = localStorage.getItem("selectedService") || "";
}
function showToast(msg){
let t = document.createElement("div");
t.className = "toast show";
t.innerText = msg;
document.body.appendChild(t);

setTimeout(()=>{
t.classList.remove("show");
setTimeout(()=>t.remove(),300);
},2000);
}
window.onclick = function(e){
if(e.target === serviceModal){
closeModal();
}
}
/* SERVICES (REALISTIC) */
const homeServices = [
{
name:"Home Cleaning",
price:999,
img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952",
desc:"Professional home cleaning service.",
reviews:["Very clean work","Worth the price","Highly recommended"]
},
{
name:"Bathroom Cleaning",
price:499,
img:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
desc:"Deep bathroom cleaning.",
reviews:["Sparkling clean","Good service"]
},
{
name:"AC Repair",
price:599,
img:"https://images.unsplash.com/photo-1581093458791-9f3c3900dfad",
desc:"AC service and repair.",
reviews:["Quick fix","Cooling improved"]
},
{
name:"Plumbing",
price:299,
img:"https://images.unsplash.com/photo-1581579188871-45ea61f2a0c8",
desc:"All plumbing services.",
reviews:["Solved quickly","Professional"]
},
{
name:"Electrician",
price:249,
img:"https://images.unsplash.com/photo-1581091215367-59ab6b6a3d72",
desc:"Electrical repairs.",
reviews:["Fast work","Good technician"]
},
{
name:"Salon at Home",
price:799,
img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348",
desc:"Beauty services at home.",
reviews:["Loved it","Very relaxing"]
},
{
name:"Appliance Repair",
price:399,
img:"https://images.unsplash.com/photo-1581093588401-22f3d6f0b1f6",
desc:"Repair home appliances.",
reviews:["Fixed quickly","Affordable"]
}
];

/* LOAD SERVICES */
if(document.getElementById("serviceGrid")){
serviceGrid.innerHTML = homeServices.map((s,i)=>`
<div class="card" onclick="openDetail(${i})">
<img src="${s.img}" class="service-img">
<h3>${s.name}</h3>
<p>Starting ₹${s.price}</p>
</div>
`).join("");
}

/* OPEN DETAIL TAB */
function openDetail(i){
const s = homeServices[i];

document.getElementById("serviceDetail").style.display="block";

dImg.src = s.img;
dName.innerText = s.name;
dDesc.innerText = s.desc;
dPrice.innerText = s.price;

reviews.innerHTML = s.reviews.map(r=>`<li>⭐ ${r}</li>`).join("");

localStorage.setItem("selectedService", s.name);

/* scroll smooth */
window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
}

/* CLOSE */
function closeDetail(){
document.getElementById("serviceDetail").style.display="none";
}

/* BOOK */
function goToBooking(){
window.location.href="booking.html";
}
