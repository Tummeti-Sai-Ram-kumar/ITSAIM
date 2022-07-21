var loader = document.getElementById("loader-animation");
var alldivs = document.getElementsByTagName("div");
console.log(alldivs);
for(let i=1;i<alldivs.length;i++){
    alldivs[i].style.display = "none";
}
var allnavs = document.getElementsByTagName("nav")[0];
allnavs.style.display = "none";
setTimeout(function Load(){
    for(let i=1;i<alldivs.length;i++){
        alldivs[i].style.display = "";
    }
    alldivs[0].style.display = "none";
    allnavs.style.display = "";
},3000);




var Asset = document.getElementsByClassName("assets")[0];
var AssetHeader = document.getElementById("AssetType");
Asset.addEventListener('click',GetAssetDetails);
var assetname;
function GetAssetDetails(event){
    event.preventDefault();
    console.log(event.target.id);
    assetname = event.target.id;
    window.open(`/home/${assetname}`,target="_self");
}




function Search(){
    var input = document.getElementById("search-bar").value.toLowerCase();
    var assets = document.getElementsByClassName("asset");
    console.log(input);
    for(var i=0;i<assets.length;i++){
        var content =  assets[i].getElementsByTagName("p");
        console.log(content[0].innerHTML);
        if(content[0].innerHTML.toLowerCase().indexOf(input) === -1){
            assets[i].style.display = "none";
        }
        else{
            assets[i].style.display = "";
        }
    }

}

function ClearSearchBar(){
    document.getElementById("search-bar").value = '';
    var assets = document.getElementsByClassName("asset");
    for(var i=0;i<assets.length;i++){
        assets[i].style.display = "";
    }
}