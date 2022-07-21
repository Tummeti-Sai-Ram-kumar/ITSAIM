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

