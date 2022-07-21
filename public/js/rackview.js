
// slide - show 
let CurrentSlideIndex = 1;
let SlideLength = document.getElementsByClassName("dot").length;

function NextSlide(n){
    CurrentSlideIndex = CurrentSlideIndex + n;
    if(CurrentSlideIndex > SlideLength)
    {
        CurrentSlideIndex = 1;
    }
    if(CurrentSlideIndex < 1)
    {
        CurrentSlideIndex = SlideLength; 
    }
    ShowSlide(CurrentSlideIndex);
}
function CurrentSlide(n){
    CurrentSlideIndex = n;
    ShowSlide(CurrentSlideIndex);
}


function ShowSlide(n){
    let slides = document.getElementsByClassName("assets-grid-view");
    let dots = document.getElementsByClassName("dot");

    for(let i=0;i<slides.length;i++)
    {
        slides[i].style.display = "none";
        dots[i].style.background = "#bbb";
    }
    slides[n-1].style.display = "grid";
    dots[n-1].style.background = "#6d6c6c"; 
} 


function ClearSearchBar(){
    document.getElementById("racks-search-bar").value = '';
    document.getElementById("search-info-button").style.display = "none"; 
    document.getElementById("search-info-content").innerHTML = '';
    RemoveHighLight(indexes);
}

function Clear(){
    RemoveHighLight(indexes);
    document.getElementById("search-info-content").innerHTML = '';
}

var SearchButton = document.getElementById("racks-search-btn");
var SearchBar = document.getElementById("racks-search-bar");
SearchButton.addEventListener('click',GetRackData);

var indexes = [];

function GetRackData(event){
    var AssetToSearch = SearchBar.value.toLowerCase();

    console.log(AssetToSearch);
    

    

    fetch(`/rackview/${AssetToSearch}`)
    .then(res => res.json())
    .then(data => {
        var SearchInfoContent = document.getElementById("search-info-content");
        console.log("Data From The Server");
        console.log(data);
     //   console.log(data.status);
        if(data.status === 400){
            RemoveHighLight(indexes);
            SearchInfoContent.innerHTML = `Asset cannot be found  : (`;
        }
        else
        {
            var AssetName = data[0].AssetName;
            AssetName = AssetName.charAt(0).toUpperCase() + AssetName.slice(1);
            const AssetLocations = data[0].RackNumbers;
            const AssetBoxes = data[0].BoxNumbers;
         //   alert(data.length);
            if(AssetBoxes.length === 0)
            SearchInfoContent.innerHTML = `${AssetName} can be found in racks numbered { ${AssetLocations} } `;
            else
            SearchInfoContent.innerHTML = `${AssetName} can be found in racks numbered { ${AssetLocations} } in boxes numbered { ${AssetBoxes} }`;

            HighLight(AssetLocations);
        }
        
    });
}
 
function HighLight(AssetLocations){
    console.log(AssetLocations[0]);
    var rack = document.getElementById("RackAB");
    var subracks = rack.getElementsByClassName("rack");

    for(let i=0;i<subracks.length;i++){
        
   //     console.log(typeof(parseInt(subracks[i].id)));
        var RackId = parseFloat(subracks[i].id);
        console.log(RackId);
        if(AssetLocations.includes(RackId)){
            subracks[i].classList.add("found-rack");
            indexes.push(subracks[i].id);
        }
    }
}
function RemoveHighLight(indexes){
    var rack = document.getElementById("RackAB");
    var subracks = rack.getElementsByClassName("rack");

    for(let i=0;i<subracks.length;i++){
   //     console.log(subracks[i].id);
        var RackId = subracks[i].id;
        if(indexes.indexOf(RackId)!==-1){
            subracks[i].classList.remove("found-rack");
        }
    }
    indexes = [];
}

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
    ShowSlide(CurrentSlideIndex);
},3000);

var Crt = document.getElementById("CreateForm");
Crt.addEventListener('submit',CreateAsset);
function OpenCreate(){
    console.log("Opening the Create form");
    document.getElementById("CreateForm").classList.add("open-box");
}
function CreateAsset(event){
    event.preventDefault();
    console.log("LISTENING TO THE CLICK OF CREATE");
    var RN = event.target.RackNumbers.value;
    RN = RN.split(',').map(Number);
    var BN = event.target.BoxNumbers.value;
    BN = BN.split(',').map(Number);
    const AssetUploadDetails = event.target.BoxNumbers.value==""?{
        AssetName : event.target.AssetName.value.toLowerCase(),
        RackNumbers : RN,
        Remarks : event.target.Remarks.value
    }:{
        AssetName : event.target.AssetName.value.toLowerCase(),
        RackNumbers : RN,
        BoxNumbers : BN,
        Remarks : event.target.Remarks.value
    }
    console.log(AssetUploadDetails);
    var options = {
        method : 'POST',
        body : JSON.stringify(AssetUploadDetails),
        headers : new Headers({
            'Content-Type' : 'application/json'
        })
    }

    fetch('/rackview',options)
    .then(res => res.json())
    .then(data => {
        var content = document.getElementById("FormContentCreate");
        console.log(data);

        if(data.status === 201){
            content.innerHTML = `Asset details added  : ) `;
        }
        else if(data.status === 500){
            content.innerHTML = `Asset details cannot be added into the RackDB : ( `;
        }
        else{
            content.innerHTML = `Something unknown occurred : | `;
        }
    })
}
function CloseCreate(){
    document.getElementById("CreateForm").classList.remove("open-box");
    window.open(`/rackview`,target="_self");
}



function OpenUpdate(){
    console.log("Opening the Update form");
    document.getElementById("UpdateForm").classList.add("open-box");
}


var Upt = document.getElementById("UpdateForm");
Upt.addEventListener('submit',UpdateAsset);

function UpdateAsset(event){
    event.preventDefault();
    console.log("LISTENING TO THE CLICK OF Update");
    var RN = event.target.RackNumbers.value;
    RN = RN.split(',').map(Number);
    var BN = event.target.BoxNumbers.value;
    BN = BN.split(',').map(Number);
    var AssetName = event.target.AssetName.value.toLowerCase();
    const AssetUploadDetails = event.target.BoxNumbers.value==""?{
        AssetName : event.target.AssetName.value.toLowerCase(),
        RackNumbers : RN,
        Remarks : event.target.Remarks.value
    }:{
        AssetName : event.target.AssetName.value.toLowerCase(),
        RackNumbers : RN,
        BoxNumbers : BN,
        Remarks : event.target.Remarks.value
    }

    var options = {
        method : 'PATCH',
        body : JSON.stringify(AssetUploadDetails),
        headers : new Headers({
            'Content-Type' : 'application/json'
        })
    }

    console.log(AssetUploadDetails);
    var content = document.getElementById("FormContentUpdate");
    fetch(`/rackview/${AssetName}`,options)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.status === 201){
            content.innerHTML = `Asset details updated : ) `;
        }
        else if(data.status === 400){
            content.innerHTML = `Asset details cannot be updated  : ( `;
        }
        else{
            content.innerHTML = `Something unknown occurred : | `;
        }
    })
}

function CloseUpdate(){
    document.getElementById("UpdateForm").classList.remove("open-box");
    window.open(`/rackview`,target="_self");
}



var Dlt = document.getElementById("DeleteForm");
Dlt.addEventListener('submit',DeleteAsset);

function DeleteAsset(event){
    event.preventDefault();
    console.log("LISTENING TO THE CLICK OF DELETE");
    var AssetName = event.target.AssetName.value.toLowerCase();
    var options = {
        method : 'DELETE'
    }
    fetch(`/rackview/${AssetName}`, options)
    .then(res => res.json())
    .then(data => {
        var content = document.getElementById("FormContentDelete");
        console.log(data);
        if(data.status === 200){
            content.innerHTML = "Asset deleted successfully  : ) ";
        }
        else if(data.status === 401){
            content.innerHTML = "Asset cannot be found  : ( "
        }
        else{
            content.innerHTML = "Something unknown happened  : | "
        }
        
    })
    
}

function OpenDelete(){
    console.log("Opening the Delete form");
    document.getElementById("DeleteForm").classList.add("open-box");
}
function CloseDelete(){
    document.getElementById("DeleteForm").classList.remove("open-box");
    window.open(`/rackview`,target="_self");
}



