const params = new URLSearchParams(location.search);

const id = params.get("id");

fetch("data/members.json")

.then(res=>res.json())

.then(data=>{

const member=data.find(x=>x.id===id);

if(!member){

document.body.innerHTML="<h1>名刺が見つかりません。</h1>";

return;

}

document.getElementById("icon").src=member.icon;

document.getElementById("photo").src=member.photo;

document.getElementById("name").textContent=member.name;

document.getElementById("account").textContent=member.account;

document.getElementById("profile").innerHTML=

member.profile.replace(/\n/g,"<br>");

document.getElementById("instagram").href=member.instagram;

document.getElementById("threads").href=member.threads;

document.getElementById("x").href=member.x;

});
