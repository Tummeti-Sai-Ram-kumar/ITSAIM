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


var input = document.getElementById("file-input");
var upbtn = document.getElementById("file-up");
var flsc = document.getElementById("file-scan");
var close = document.getElementById("cl");
// var copy = document.getElementById("cp");
var Info = document.getElementById("info");
var UploadbtnText = document.getElementById("file-up");
var GeneratebtnText = document.getElementById("gen-info");
var CloseScanner = document.getElementById("cl-qr");
var Scanner = document.getElementById("scanner");
var GeneratebtnText = document.getElementById("gen-info");
//var Scanner = document.getElementById("scanner");
var scanit = document.getElementById("file-scan");

function expand(){
    if(input.files.length == 0){
        alert("Choose a QR");
    }
    else
    {
        document.getElementById("qr-contents").classList.add("Expand");
        GeneratebtnText.innerHTML = "Generating the info";
        setTimeout(() => {
            GeneratebtnText.innerHTML = "Generated the Info";
        },500);
    }
    
}

close.addEventListener('click', () => {
    document.getElementById("qr-contents").classList.remove("Expand");
    document.getElementById("qr-code").classList.remove("Expand-QR");
    document.getElementById("qr-text").value = "Hello World";
    UploadbtnText.innerHTML = "Upload " + `<i class="fa-solid fa-cloud-arrow-up">`;
    GeneratebtnText.innerHTML = "Generate the info";
    input.value = null;
    
})

CloseScanner.addEventListener('click',() => {
    Scanner.classList.remove("Show-Scanner");
})
    
/*
copy.addEventListener('click', () => {
    var input = document.getElementById("qr-text");
    input.select();
    navigator.clipboard.writeText(input.value);
    alert("Copied Text " + input.value);
})
*/


Info.addEventListener('click',GetQRInfo);
function GetQRInfo(){
  var asset_sr = document.getElementById("qr-text").value;
  console.log(asset_sr);
  window.open(`/qr/qr-reader/${asset_sr}`,target="_self"); 
}

upbtn.addEventListener('click',() => {
    input.click();   
});

input.addEventListener('change', e => {
    let myfile = e.target.files[0];
    console.log(myfile); 
    let formData = new FormData();
    formData.append("file",myfile);

    fetchRequest(formData,myfile);
})

function fetchRequest(formData,myfile){
    UploadbtnText.innerHTML = "Uploading "+  `<i class="fa-solid fa-spinner"></i>`;
    fetch("https://api.qrserver.com/v1/read-qr-code/",{
        method : "POST" , body : formData 
    }).then(res => res.json()).then(d => {
        UploadbtnText.innerHTML = "Uploaded";
        console.log(d[0].symbol[0].data);
        document.getElementById("qr-code").classList.add("Expand-QR");
        document.getElementById("qr-img").src = URL.createObjectURL(myfile);
        document.getElementById("qr-text").value = d[0].symbol[0].data;
    });
}


scanit.addEventListener('click',() =>{
    document.getElementById("qr-contents").classList.remove("Expand");
    document.getElementById("qr-code").classList.remove("Expand-QR");
    var scanner = new Instascan.Scanner({ video: document.getElementById('scanner-preview'), scanPeriod: 5, mirror: false });
      scanner.addListener('scan',function(content){
       
      //  alert(content);

        setTimeout(() => {
          Scanner.classList.remove("Show-Scanner");
          document.getElementById("qr-text").value = content.toString();
        },1000);
     //     
          setTimeout(() => {
              document.getElementById("qr-contents").classList.add("Expand");
              GeneratebtnText.innerHTML = "Generating the info";
          },2000);

          setTimeout(() => {
            GeneratebtnText.innerHTML = "Generated the Info";
            
          },3000);
          
        //window.location.href=content;
      });
      
      Instascan.Camera.getCameras().then(function (cameras){
        if(cameras.length>0){
        Scanner.classList.add("Show-Scanner");
          scanner.start(cameras[0]);
          $('[name="options"]').on('change',function(){
            if($(this).val()==1){
              if(cameras[0]!=""){
               // alert("H");
                scanner.start(cameras[0]);
              }else{
                alert('No camera 1 found!');
              }
            }else if($(this).val()==2){
              if(cameras[1]!=""){
                alert("Opening Camera 2");
                scanner.start(cameras[1]);
              }else{
                alert('No camera 2 found!');
              }
            }
          });
        }else{
          console.error('No cameras found.');
          alert('No cameras found.');
        }
      }).catch(function(e){
        console.error(e);
      //  alert(e);
      alert('No cameras found');
      });
})

function refresh(){
    window.open('/qr/qr-reader', target="_self");
}

