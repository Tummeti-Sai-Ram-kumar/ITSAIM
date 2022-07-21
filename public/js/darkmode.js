// Dark Mode Implementation 
function DarkMode(){
    
    document.body.classList.toggle("dark-theme");
    
    if(document.body.classList.contains("dark-theme")){
        color = 1;
        document.getElementById("sun-moon").setAttribute("class","fa-solid fa-sun");
        document.getElementById("sun-moon-mode").innerHTML = "Light"; 
        localStorage.setItem('Dark',1);
    }
    else{
        document.getElementById("sun-moon").setAttribute("class","fa-solid fa-moon");
        document.getElementById("sun-moon-mode").innerHTML = "Dark";
        localStorage.setItem('Dark',0);
    }
}

if(localStorage.getItem('Dark') == 1){
    document.getElementById("sun-moon").setAttribute("class","fa-solid fa-sun");
    document.getElementById("sun-moon-mode").innerHTML = "Light"; 
    document.body.classList.add("dark-theme");

}
else{
    document.getElementById("sun-moon").setAttribute("class","fa-solid fa-moon");
    document.getElementById("sun-moon-mode").innerHTML = "Dark";
    document.body.classList.remove("dark-theme");
}
