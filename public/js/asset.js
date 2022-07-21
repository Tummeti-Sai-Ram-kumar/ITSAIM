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
             CellData[4].innerHTML.toLowerCase().indexOf(inputValue) === -1 &&
             CellData[2].innerHTML.toLowerCase().indexOf(inputValue) === -1 &&
             CellData[3].innerHTML.toLowerCase().indexOf(inputValue) === -1 &&
             CellData[1].innerHTML.toLowerCase().indexOf(inputValue) === -1)
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

var AssetName;

function ConvertToExcel(){
    const table = document.getElementsByTagName('table');
    const html = table[0].outerHTML;
    window.open('data:application/vnd.ms-excel;base64,' + btoa(html));
}

// Lets Delete
function OpenDelete(){
    console.log("Opening the Delete form");
    document.getElementById("DeleteForm").classList.add("open-box");
}
var dlt = document.getElementById("DeleteForm");
dlt.addEventListener('submit',DeleteAsset);
function DeleteAsset(event){
    console.log("Listening to the click")
    event.preventDefault();
    var AssetId = event.target.SerialNumber.value;
    console.log(AssetId);
    const AssetDetails = {
        AssetId : AssetId
    }

    const options = {
        method : 'DELETE'
    }
    AssetName = document.getElementById("AssetType").innerHTML;
    var content = document.getElementById("FormContentDelete");
    fetch(`/home/${AssetName}/${AssetId}`,options)
    .then(res => res.json())
    .then(data => {
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
    AssetName = document.getElementById("AssetType").innerHTML;
    document.getElementById("DeleteForm").classList.remove("open-box");
    window.open(`/home/${AssetName}`,target="_self");
 //   alert('D');
}


// Lets Create
function OpenCreate(){
    console.log("Opening the Create form..");
    document.getElementById("CreateForm").classList.add("open-box");    
}

var Crt = document.getElementById("CreateForm");
Crt.addEventListener('submit',CreateAsset);

function CreateAsset(event){
    event.preventDefault();
    console.log("Listening to the click of Add");
    
    var SerialNumber = event.target.SerialNumber.value;
    var EquipmentNumber = event.target.EquipmentNumber.value;
    var Location = event.target.Location.value;
    var Description = event.target.Description.value;
    var Remarks = event.target.Remarks.value;

    const AssetUploadDetails = {
        Description : Description,
        EquipmentNumber : EquipmentNumber,
        SerialNumber : SerialNumber,
        Location : Location,
        Remarks : Remarks
    }

    var options = {
        method : 'POST',
        body : JSON.stringify(AssetUploadDetails),
        headers : new Headers({
            'Content-Type' : 'application/json'
        })
    }

    AssetName = document.getElementById("AssetType").innerHTML;
    console.log(AssetName);
    fetch(`/home/${AssetName}`,options)
    .then(res => res.json())
    .then(data => {
        var content = document.getElementById("FormContentCreate");
        console.log(data);

        if(data.status === 201){
            content.innerHTML = `Asset details added  : ) `;
        }
        else if(data.status === 400){
            content.innerHTML = `Asset details cannot be added into the database : ( `;
        }
        else{
            content.innerHTML = `Something unknown occurred : | `;
        }
    })
}





function CloseCreate(){
    AssetName = document.getElementById("AssetType").innerHTML;
    document.getElementById("CreateForm").classList.remove("open-box");
    window.open(`/home/${AssetName}`,target="_self");
}

// Lets Update

var Upt = document.getElementById("UpdateForm");
Upt.addEventListener('submit',UpdateAsset);

function UpdateAsset(event){
    event.preventDefault();
    console.log("Listening to the click of Update");
    var SerialNumber = event.target.SerialNumber.value;
    var EquipmentNumber = event.target.EquipmentNumber.value;
    var UpdatedLocation = event.target.Location.value;
    var UpdatedDescription = event.target.Description.value;
    var UpdatedRemarks = event.target.Remarks.value;

    const AssetUpdateDetails = {
        SerialNumber : SerialNumber,
        EquipmentNumber : EquipmentNumber,
        Location : UpdatedLocation,
        Description : UpdatedDescription,
        Remarks : UpdatedRemarks
    }

    var options = {
        method : 'PATCH',
        body : JSON.stringify(AssetUpdateDetails),
        headers : new Headers({
            'Content-Type' : 'application/json'
        })
    }

    AssetName = document.getElementById("AssetType").innerHTML;
    console.log(AssetUpdateDetails);
    var content = document.getElementById("FormContentUpdate");
    fetch(`/home/${AssetName}`,options)
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


function OpenUpdate(){
    console.log("Opening the Update form");
    document.getElementById("UpdateForm").classList.add("open-box");
}
function CloseUpdate(){
    AssetName = document.getElementById("AssetType").innerHTML;
    document.getElementById("UpdateForm").classList.remove("open-box");
    window.open(`/home/${AssetName}`,target="_self");
}



