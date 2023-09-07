async function validateRole(){
    const req = await fetch("http://localhost:8080/api/permission_role/v1/get/" + localStorage.idRole);
    const res = await req.json();
    const menu = document.getElementById("lateralNavMenu").getElementsByTagName("li");
    console.log(menu);
    for(let i = 0; i<res.idPermission.length; i++){
        for(let j = 0; j<menu.length; j++){
            if(res.idPermission[i] === j)
            menu[j].style.display = "none";
        }
        }
}


document.addEventListener("DOMContentLoaded", validateRole());