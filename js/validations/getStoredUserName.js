function getStoredUserName() {
    const userName = document.getElementById("userNameSpan");
    let storedUserName = localStorage.getItem("userName");
    userName.textContent = storedUserName;
}

document.addEventListener("DOMContentLoaded", getStoredUserName());
