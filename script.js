/*
==================================================
 Digital Card
 script.js
 Part 1 / 4
==================================================
*/

"use strict";

//==============================
// Apps Script API
//==============================

const API_URL =
"https://script.google.com/macros/s/AKfycbzw3wf79jFV2Ymz5nNB2VyaFElaSXCgDiqtRKb1duwvehWU1OaydkpJmG0tUIK9INkc/exec";

//==============================
// URL Parameter
//==============================

const urlParams = new URLSearchParams(window.location.search);

const memberId =
urlParams.get("id");

//==============================
// HTML Elements
//==============================

const profileCard =
document.getElementById("profileCard");

const displayName =
document.getElementById("displayName");

const account =
document.getElementById("account");

const profileText =
document.getElementById("profileText");

const iconImage =
document.getElementById("iconImage");

const mainPhoto =
document.getElementById("mainPhoto");

const instagramBtn =
document.getElementById("instagramBtn");

const threadsBtn =
document.getElementById("threadsBtn");

const xBtn =
document.getElementById("xBtn");

const youtubeBtn =
document.getElementById("youtubeBtn");

const websiteBtn =
document.getElementById("websiteBtn");

const phoneBtn =
document.getElementById("phoneBtn");

const mailBtn =
document.getElementById("mailBtn");

const saveContactBtn =
document.getElementById("saveContactBtn");

//==============================
// Theme
//==============================

function setTheme(member){

    document.documentElement.style.setProperty(
        "--theme-color",
        member.themeColor || "#667744"
    );

    document.documentElement.style.setProperty(
        "--accent-color",
        member.accentColor || "#8BA05A"
    );

}

//==============================
// Image
//==============================

function setImages(member){

    iconImage.src =
        member.iconImage;

    mainPhoto.src =
        member.mainPhoto;

    const bg =
        document.getElementById("background");

    bg.style.backgroundImage =
        `url('${member.backgroundImage}')`;

}

//==============================
// Text
//==============================

function setText(member){

    displayName.textContent =
        member.displayName;

    account.textContent =
        member.account;

    profileText.textContent =
        member.profile;

}
//==============================
// SNS Button
//==============================

function setButton(button, url) {

    if (!url || url.trim() === "") {

        button.classList.add("d-none");
        return;

    }

    button.href = url;
    button.classList.remove("d-none");

}

function setPhone(member) {

    if (!member.phone) {

        phoneBtn.classList.add("d-none");
        return;

    }

    phoneBtn.href =
        "tel:" + member.phone;

    phoneBtn.classList.remove("d-none");

}

function setMail(member) {

    if (!member.mail) {

        mailBtn.classList.add("d-none");
        return;

    }

    mailBtn.href =
        "mailto:" + member.mail;

    mailBtn.classList.remove("d-none");

}

//==============================
// Apply Member Data
//==============================

function applyMember(member){

    setTheme(member);

    setImages(member);

    setText(member);

    setButton(
        instagramBtn,
        member.instagram
    );

    setButton(
        threadsBtn,
        member.threads
    );

    setButton(
        xBtn,
        member.x
    );

    setButton(
        youtubeBtn,
        member.youtube
    );

    setButton(
        websiteBtn,
        member.website
    );

    setPhone(member);

    setMail(member);

}

//==============================
// Fetch API
//==============================

async function loadMember(){

    try{

        const response =
            await fetch(
                API_URL + "?id=" + memberId
            );

        if(!response.ok){

            throw new Error("API Error");

        }

        const member =
            await response.json();

        if(member.error){

            throw new Error(member.error);

        }

        applyMember(member);

    }

    catch(error){

        console.error(error);

        displayName.textContent =
            "データが見つかりません";

        profileText.textContent =
            "指定されたプロフィールは存在しません。";

    }

}
//==============================
// vCard
//==============================

function createVCard(member){

    const lines = [

        "BEGIN:VCARD",
        "VERSION:3.0",

        "FN:" + (member.displayName || ""),

        "ORG:" + (member.company || ""),

        "TITLE:" + (member.position || ""),

        "TEL:" + (member.phone || ""),

        "EMAIL:" + (member.mail || ""),

        "URL:" + (member.website || ""),

        "NOTE:" + (member.profile || ""),

        "END:VCARD"

    ];

    return lines.join("\n");

}

//==============================
// Download vCard
//==============================

function downloadVCard(member){

    const vcard =
        createVCard(member);

    const blob =
        new Blob(
            [vcard],
            {
                type:"text/vcard;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        (member.displayName || "contact") + ".vcf";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

}

//==============================
// Contact Button
//==============================

function setupContactButton(member){

    saveContactBtn.addEventListener(

        "click",

        function(){

            downloadVCard(member);

        }

    );

}
//==============================
// Initialize
//==============================

async function initialize(){

    if(!memberId){

        displayName.textContent =
            "IDが指定されていません";

        profileText.textContent =
            "URLに ?id=xxxx を指定してください。";

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

            displayName.textContent =
                "プロフィールが見つかりません";

            profileText.textContent =
                "指定されたIDは登録されていません。";

            return;

        }

        applyMember(member);

        setupContactButton(member);

        document.title =
            member.displayName + " | Digital Card";

    }

    catch(error){

        console.error(error);

        displayName.textContent =
            "読み込みエラー";

        profileText.textContent =
            "データの取得に失敗しました。";

    }

}

//==============================
// Start
//==============================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        initialize();

    }

);