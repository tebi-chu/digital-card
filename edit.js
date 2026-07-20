"use strict";

//==============================
// Apps Script API
//==============================

const API_URL =
"https://script.google.com/macros/s/AKfycbzw3wf79jFV2Ymz5nNB2VyaFElaSXCgDiqtRKb1duwvehWU1OaydkpJmG0tUIK9INkc/exec";

//==============================
// URL Parameter
//==============================

const params =
new URLSearchParams(window.location.search);

const memberId =
params.get("id");

//==============================
// HTML Elements
//==============================

const pageTitle =
document.getElementById("pageTitle");

const displayName =
document.getElementById("displayName");

const account =
document.getElementById("account");

const profile =
document.getElementById("profile");

const saveButton =
document.getElementById("saveButton");
//==============================
// Load Member
//==============================

async function loadMember(){

    if(!memberId){

        pageTitle.textContent = "IDが指定されていません";
        return;

    }

    try{

        const response =
            await fetch(
                API_URL + "?id=" + encodeURIComponent(memberId)
            );

        if(!response.ok){

            throw new Error("API Error");

        }

        const member =
            await response.json();

        if(member.error){

            pageTitle.textContent = "ユーザーが見つかりません";
            return;

        }

        pageTitle.textContent =
            member.displayName + " の編集";

        displayName.value =
            member.displayName || "";

        account.value =
            member.account || "";

        profile.value =
            member.profile || "";

    }

    catch(error){

        console.error(error);

        pageTitle.textContent =
            "読み込みエラー";

    }

}

//==============================
// Save Button
//==============================

saveButton.addEventListener(

    "click",

    async function(){

        const member = {

            id: memberId,

            displayName: displayName.value,

            account: account.value,

            profile: profile.value

        };

        try{

            const response =
                await fetch(

                    API_URL,

                    {

                        method:"POST",

                        headers:{
                            "Content-Type":"application/json"
                        },

                        body:JSON.stringify(member)

                    }

                );

            const result =
                await response.json();

            if(result.success){

                alert("保存しました。");

            }else{

                alert(result.message);

            }

        }

        catch(error){

            console.error(error);

            alert("保存に失敗しました。");

        }

    }

);

//==============================
// Initialize
//==============================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadMember();

    }

);
