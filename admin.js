"use strict";

//==============================
// Apps Script API
//==============================

const API_URL =
"https://script.google.com/macros/s/AKfycbzw3wf79jFV2Ymz5nNB2VyaFElaSXCgDiqtRKb1duwvehWU1OaydkpJmG0tUIK9INkc/exec";

//==============================
// HTML
//==============================

const memberTable =
document.getElementById("memberTable");

const searchBox =
document.getElementById("searchBox");

//==============================
// Member Data
//==============================

let members = [];

//==============================
// Table
//==============================

function drawTable(list){

    if(list.length===0){

        memberTable.innerHTML=`

            <tr>

                <td colspan="5" style="text-align:center;padding:40px;">

                    ユーザーが見つかりません

                </td>

            </tr>

        `;

        return;

    }

    memberTable.innerHTML="";

    list.forEach(member=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

            <td>${member.id}</td>

            <td>${member.displayName}</td>

            <td>${member.account}</td>

            <td>公開中</td>

            <td>

                <button
                    class="action-button edit"
                    data-id="${member.id}">

                    編集

                </button>

            </td>

        `;

        memberTable.appendChild(tr);

    });

}

//==============================
// Search
//==============================

searchBox.addEventListener(

    "input",

    function(){

        const keyword=

            this.value.toLowerCase();

        const result=

            members.filter(member=>{

                return(

                    member.id
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    member.displayName
                    .toLowerCase()
                    .includes(keyword)

                );

            });

        drawTable(result);

    }

);

//==============================
// Load Members
//==============================

async function loadMembers(){

    try{

        const response =
            await fetch(API_URL + "?mode=list");

        if(!response.ok){

            throw new Error("API Error");

        }

        members =
            await response.json();

        drawTable(members);

    }

    catch(error){

        console.error(error);

        memberTable.innerHTML = `

            <tr>

                <td colspan="5" style="text-align:center;padding:40px;">

                    ユーザー一覧の取得に失敗しました。

                </td>

            </tr>

        `;

    }

}

//==============================
// Edit Button
//==============================

memberTable.addEventListener(

    "click",

    function(event){

        const button =
            event.target.closest(".edit");

        if(!button){

            return;

        }

        const id =
            button.dataset.id;

        alert("編集機能（ID：" + id + "）は次のSTEPで実装します。");

    }

);

//==============================
// Initialize
//==============================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadMembers();

    }

);