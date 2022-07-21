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

function SearchTable(){
    var inputValue = document.getElementById("table-search-bar").value.toLowerCase();

    var tb_wrapper = document.getElementById("table-wrapper");
 
    var TableRows = document.getElementsByClassName("table-row");
    console.log(TableRows.length);
 
    for(let i=0;i<TableRows.length;i++){
        var CellData = TableRows[i].getElementsByClassName("table-cell");
        console.log(CellData);
        for(let j=0;j<CellData.length;j++){
          //  console.log(CellData[j].innerHTML);
            if(CellData[0].innerHTML.toLowerCase().indexOf(inputValue) === -1 &&
             CellData[1].innerHTML.toLowerCase().indexOf(inputValue) === -1 &&
             CellData[2].innerHTML.toLowerCase().indexOf(inputValue) === -1 &&
             CellData[3].innerHTML.toLowerCase().indexOf(inputValue) === -1)
            {
                console.log("Hello");
                TableRows[i].style.display = "none";
            }
            else{
                TableRows[i].style.display = "";
            }
        }
    }
}

// Operations

function OpenDelete(){
    console.log("Opening the Delete form");
    document.getElementById("DeleteForm").classList.add("open-box");
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
    fetch(`/tableview/${AssetName}`, options)
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



function CloseDelete(){
    document.getElementById("DeleteForm").classList.remove("open-box");
    window.open(`/tableview`,target="_self");
}





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

    fetch('/tableview',options)
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
    window.open(`/tableview`,target="_self");
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
    fetch(`/tableview/${AssetName}`,options)
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
    window.open(`/tableview`,target="_self");
}



















/*
var AssetData = JSON.parse(localStorage.getItem('AssetCountDetails'));

console.log(AssetData.C);

// var Tableobj = AssetData.C;


function JsonToTable(data){
   var obj = data;
   
   var headers = [];
   
   for(let i = 0 ; i < obj.length ; i++){
       for(let j in obj[i]){
           if(headers.indexOf(j) === -1 && j!= '__v'){
               headers.push(j);
           }
       }
   }
   
   var Table = document.createElement("table");
   
   var tr = Table.insertRow(-1); // Inserts row at the last of the the table
   // console.log(headers);
   for(let i in headers){
     //  console.log(headers[i]);
       var th = document.createElement("th");
       th.innerHTML = headers[i];
       tr.appendChild(th);
   }
   var thead = document.createElement("thead");

   thead.appendChild(tr);
   Table.appendChild(thead);
   
   var tbody = document.createElement("tbody");
//    tbody.id = "table-body";
   
   for(let i=0; i<obj.length ;i++){
       tr = Table.insertRow(-1);
       tr.className = "table-row";
       for(let j=0; j < headers.length; j++){
           var td = document.createElement("td");
           td.className = "table-cell";
           if(j==0){
               td.innerHTML = i+1
           }
           else
           {
               td.innerHTML = obj[i][headers[j]];
           }
           tr.appendChild(td);
       }
       tbody.appendChild(tr);
   }
   Table.appendChild(tbody);
   var Table_wrapper = document.getElementById("table-wrapper");
   Table_wrapper.appendChild(Table);
   
}
//  JsonToTable(Tableobj);

*/