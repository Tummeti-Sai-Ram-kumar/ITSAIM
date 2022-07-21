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

function ClearDB(){
    var options = {
        method : 'DELETE'
    }
    fetch(`/bin/clear`, options)
    .then(res => res.json())
    .then(data => {
    //    var content = document.getElementById("ContentDelete");
        console.log(data);
        if(data.status === 200){
            alert("Data deleted Successfully...");
            window.open('/bin',target="_self");
        }
        else{
            alert("Data cannot be deleted...")
        }
        
    })
}


function ConvertToExcel(){
    const table = document.getElementsByTagName('table');
    const html = table[0].outerHTML;
    window.open('data:application/vnd.ms-excel;base64,' + btoa(html));
}


