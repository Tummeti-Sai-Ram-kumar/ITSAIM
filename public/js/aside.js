document.getElementById("aside-resize-btn").onclick = function ResizeAsideBar(){
    document.getElementById("aside-bar").classList.toggle("aside-resize");

    if(document.getElementById("aside-bar").classList.contains("aside-resize")){
        document.getElementById("collapse-expand").setAttribute("class","fa-solid fa-circle-arrow-right");
        document.getElementById("aside-resize-btn").classList.add("aside-resize-style");
     //   document.getElementById("aside-bar-logo").style.display = "none";
     document.getElementById("aside-bar-logo").style.visibility = "hidden";
      document.getElementById("all-tabs").classList.add("move-to-middle");

      const asideNames = document.getElementsByClassName("single-tab-name");
      for(var i=0;i<asideNames.length;i++){
            asideNames[i].style.visibility = "hidden";
        }   
        
    }
    else{
        document.getElementById("collapse-expand").setAttribute("class","fa-solid fa-circle-arrow-left");
        document.getElementById("aside-resize-btn").classList.remove("aside-resize-style");
     //   document.getElementById("aside-bar-logo").style.display = "block";
     document.getElementById("aside-bar-logo").style.visibility = "visible";
    document.getElementById("all-tabs").classList.remove("move-to-middle");
    
    const asideNames = document.getElementsByClassName("single-tab-name");
        for(var i=0;i<asideNames.length;i++){
            asideNames[i].style.visibility = "visible";
        }  
        
    }
}

document.getElementById("shrink").onclick = function ResizeAside(){
    document.getElementById("aside-bar").classList.toggle("aside-resize");
    

    if(document.getElementById("aside-bar").classList.contains("aside-resize")){
        document.getElementById("aside-resize-btn").classList.add("aside-resize-style");
      //  document.getElementById("aside-bar-logo").style.display = "none";
      document.getElementById("aside-bar-logo").style.visibility = "hidden";
        document.getElementById("collapse-expand").setAttribute("class","fa-solid fa-circle-arrow-right");

      document.getElementById("all-tabs").classList.add("move-to-middle");

      const asideNames = document.getElementsByClassName("single-tab-name");
      for(var i=0;i<asideNames.length;i++){
            asideNames[i].style.visibility = "hidden";
        }   
        
    }
    else{
        document.getElementById("aside-resize-btn").classList.remove("aside-resize-style");
    //    document.getElementById("aside-bar-logo").style.display = "block";
    document.getElementById("aside-bar-logo").style.visibility = "visible";
    document.getElementById("all-tabs").classList.remove("move-to-middle");
    document.getElementById("collapse-expand").setAttribute("class","fa-solid fa-circle-arrow-left");
    const asideNames = document.getElementsByClassName("single-tab-name");
        for(var i=0;i<asideNames.length;i++){
            asideNames[i].style.visibility = "visible";
        }  
        
    }
}