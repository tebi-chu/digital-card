"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const memberListBtn = document.getElementById("memberListBtn");
    const newMemberBtn = document.getElementById("newMemberBtn");
    const settingBtn = document.getElementById("settingBtn");

    memberListBtn.addEventListener("click", () => {
        alert("今後ここにユーザー一覧を表示します。");
    });

    newMemberBtn.addEventListener("click", () => {
        alert("今後ここから新規ユーザーを登録します。");
    });

    settingBtn.addEventListener("click", () => {
        alert("今後ここにシステム設定を追加します。");
    });

});