const express = require('express');
const router = express.Router();
const User = require('../models/loginSchema.js');
const {Ipads,LaptopByod,Harddisk,CCTV,LaptopTrident,IpPhone,Desktop} = require('../models/AssetSchema.js');
var QR = require('../models/QrDetails.js');
const AssetCountSchema = require('../models/AssetCountSchema.js');
const Rack = require('../models/RackContents.js');
var Dlts = require('../models/DeleteSchema.js');
const path = require('path');
const { remove } = require('../models/loginSchema.js');
const { cachedDataVersionTag } = require('v8');



router.get('/',(req,res) => {
//    res.send("Hola Chicka");
    res.render("index");
})


router.post('/', async (req,res) => {
    const user = new User({
        UserName : req.body.UserName,
        PassWord : req.body.PassWord
    })

    if(!user.UserName || !user.PassWord){
        res.status(401).json({status : 401});
    }

    try{
        console.log("A");
        const userinDb = await User.findOne({UserName : user.UserName});
        if(!userinDb){
            console.log("B");
            res.status(404).json({ErrMsg : "Sorry ..! USer Cant be found .."});
        }
        else{
            console.log("C");
           // console.log("H" + userinDb.UserName + " " + user.UserName);
            if(userinDb.PassWord === user.PassWord){
                console.log("From Server");
                console.log(userinDb);
                res.cookie('valid',1,{maxAge: 1200000});
               // res.json(userinDb);
             //   res.render("home");
             res.json({status : 200});
              //  res.sendFile(path.join(__dirname , "../public/assets.html"));
            }
            else{
                res.json({status : 404});
            }
        }
    }
    catch(err){
        console.log("D");
        res.status(500).json({ErrMsg : err});
    }
    
})

router.get('/home',(req,res) => {
    if(req.cookies.valid == 1){
        console.log("H");
        res.render("home");
    }
    else
    {
        console.log("W");
        res.redirect("/");
    }
    
    
})

router.get('/home/:id', async (req,res) => {
    if(req.cookies.valid == 1){
        try{
            console.log(req.params.id);
            var asset = req.params.id;
       //     var AssetCountDetails = await AssetCountSchema.findOne({AssetName : asset});
            
        //    console.log(AssetCountDetails);
            var data;
            if(asset == "Ipads"){
                data = await Ipads.find();
            }
            else if(asset == "LaptopByod"){
                data = await LaptopByod.find();
            }
            else if(asset == "HardDisks"){
                data = await Harddisk.find();
            }
            else if(asset == "LaptopsTrident"){
                data = await LaptopTrident.find();
            }
            else if(asset == "cctv"){
                data = await CCTV.find()
            }
            else if(asset == "IpPhones"){
                data = await IpPhone.find();
            }
            else if(asset == "Desktops"){
                data = await Desktop.find();
            }
            else if(asset == "Peripherals"){
                res.redirect("/tableview");
            }
            else if(asset == "servers"){
                res.redirect("/servers");
            }
      //      console.log(data);
            const obj = {
                A : req.params.id,
                B : data
            }
          // console.log(obj);
          res.render("asset",{object : obj});
        }
        catch(err){
            res.status(500).json({ErrMsg : err.ErrMsg});
        }
    }
    else{
        res.redirect("/");
    }
})

router.post('/home/:id', async (req,res) => {
    var AssetUploadDetails;
    console.log("Deal");
    console.log(req.params.id);
    if(req.params.id == 'Ipads'){
        console.log("Deal");
        AssetUploadDetails = new Ipads({
            Description : req.body.Description,
            EquipmentNumber : req.body.EquipmentNumber,
            SerialNumber : req.body.SerialNumber,
            Location : req.body.EquipmentNumber,
            Remarks : req.body.Remarks
        })
    }
    else if(req.params.id == "LaptopsByod"){
        AssetUploadDetails = new LaptopByod({
            Description : req.body.Description,
            EquipmentNumber : req.body.EquipmentNumber,
            SerialNumber : req.body.SerialNumber,
            Location : req.body.EquipmentNumber,
            Remarks : req.body.Remarks
        })
    }
    else if(req.params.id == "LaptopsTrident"){
        AssetUploadDetails = new LaptopTrident({
            Description : req.body.Description,
            EquipmentNumber : req.body.EquipmentNumber,
            SerialNumber : req.body.SerialNumber,
            Location : req.body.EquipmentNumber,
            Remarks : req.body.Remarks
        })
    }
    else if(req.params.id == "HardDisks"){
        AssetUploadDetails = new Harddisk({
            Description : req.body.Description,
            EquipmentNumber : req.body.EquipmentNumber,
            SerialNumber : req.body.SerialNumber,
            Location : req.body.EquipmentNumber,
            Remarks : req.body.Remarks
        })
    }
    else if(req.params.id == "cctv"){
        AssetUploadDetails = new CCTV({
            Description : req.body.Description,
            EquipmentNumber : req.body.EquipmentNumber,
            SerialNumber : req.body.SerialNumber,
            Location : req.body.EquipmentNumber,
            Remarks : req.body.Remarks
        })
    }
    else if(req.params.id == "Desktops"){
        AssetUploadDetails = new Desktop({
            Description : req.body.Description,
            EquipmentNumber : req.body.EquipmentNumber,
            SerialNumber : req.body.SerialNumber,
            Location : req.body.EquipmentNumber,
            Remarks : req.body.Remarks
        })
    }

    

    try{
        console.log(AssetUploadDetails);
        await AssetUploadDetails.save().then(function(){
            console.log("Data Saved"); // Success
            res.send({status : 201});
        }).catch(function(error){
            console.log(error); // Failure
        }); 
    }
    catch(err){
        res.send({status : 400});
    }
})

router.patch('/home/:id', async (req,res) => {
 //   console.log(req.body);
    var SerialNumber = req.body.SerialNumber;
    var AssetName =  req.params.id;
    console.log(SerialNumber);
    
    console.log(req.body);
    
    try {
        if(AssetName == 'Ipads'){
            var NewAsset = await Ipads.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'cctv'){
            var NewAsset = await CCTV.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'Desktops'){
            var NewAsset = await Desktop.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'LaptopsByod'){
            var NewAsset = await LaptopByod.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'LaptopsTrident'){
            var NewAsset = await LaptopTrident.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'Harddisks'){
            var NewAsset = await Harddisk.findOne({SerialNumber : SerialNumber});
        }

       //     console.log("bef " + NewAsset);
            if(!NewAsset){
                res.send({status : 400});
            }
            else{
                if(req.body.EquipmentNumber != ''){
                    NewAsset.EquipmentNumber = req.body.EquipmentNumber
                }
                if(req.body.Location != ''){
                    NewAsset.Location = req.body.Location
                }
                if(req.body.Remarks != ''){
                    NewAsset.Remarks = req.body.Remarks
                }
                if(req.body.Description != ''){
                    NewAsset.Description = req.body.Description
                }
                
            }
            NewAsset.save().then(function(){
                console.log("Data Saved and updated"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            });
            res.send({status : 201});
        
    }
    catch(err){
        res.send({status : 500});
    }
})

router.delete('/home/:id/:serialnumber', async (req,res) => {
    var SerialNumber = req.params.serialnumber;
    var AssetName = req.params.id;
    var asset;
    console.log("From Server...");
    console.log(SerialNumber);
    console.log(AssetName);
    try{
        if(AssetName == 'Ipads'){
            asset = await Ipads.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'cctv'){
            var NewAsset = await CCTV.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'Desktops'){
            var NewAsset = await Desktop.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'LaptopsByod'){
            var NewAsset = await LaptopByod.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'LaptopsTrident'){
            var NewAsset = await LaptopTrident.findOne({SerialNumber : SerialNumber});
        }
        else if(AssetName == 'Harddisks'){
            var NewAsset = await Harddisk.findOne({SerialNumber : SerialNumber});
        }
          //  asset.remove();
            console.log(asset);
            console.log(asset.length)
        //    res.send(asset);

            if(asset.length === 0){
                res.status(401).json({status : 401});
            }
            else{
          //      
             //   await res.asset.remove();
           //  Ipads.findOneAndDelete({ManufactSerialNumber : SerialNumber});
              //  Ipads.deleteOne(asset);
                asset = await Ipads.find({SerialNumber : SerialNumber});
           //     console.log(asset[0]);
                const obj = asset[0];
                console.log(obj);
                var dltasset = new Dlts({
                    Description : obj.Description,
                    EquipmentNumber : obj.EquipmentNumber,
                    SerialNumber : obj.SerialNumber,
                    Location : obj.Location,
                    Remarks : obj.Remarks
                });
                console.log(dltasset);
                await dltasset.save().then(function(){
                    console.log("Data Saved"); // Success
                }).catch(function(error){
                    console.log(error); // Failure
                });


                Ipads.deleteOne({SerialNumber : SerialNumber}).then(function(){
                    console.log("Data deleted"); // Success
                    res.status(200).json({status : 200});
                }).catch(function(error){
                    console.log(error); // Failure
                });
                console.log("Deleted");
                
            }
        
    }
    catch(err){
        res.status(500).json({status : 500});
    }
})

router.get('/bin',async (req,res) => {
    if(req.cookies.valid == 1){
        var binDetails = await Dlts.find();
        res.render("bin" , {binDetails : binDetails});
    }
    else
    {
        res.redirect("/");
    }
})

router.delete('/bin/clear', async(req,res) => {
    try{
        await Dlts.deleteMany({}).then(function(){
            console.log("Data deleted"); // Success
            res.send({status : 200});
        }).catch(function(error){
            console.log(error); // Failure
            res.send({status : 401});
        });
    }
    catch(err){
        res.send({status : 500});
    }
})

router.get('/rackview',async (req,res) => {
    if(req.cookies.valid == 1){
        var RackDetails = await Rack.find();
  //  RackDetails = JSON.stringify(RackDetails);
        res.render("rackview" , { name : RackDetails});
    }
    else
    {
        res.redirect("/");
    }
})

router.post('/rackview', async (req,res) => {
    var AssetName = req.body.AssetName;
    console.log(AssetName);
    const AssetDetails = await Rack.find({AssetName : AssetName});
    console.log(AssetDetails);
    if(AssetDetails.length === 0){
        console.log("CreatE new");
        console.log(req.body.BoxNumbers);
        var setB = new Set(req.body.BoxNumbers);
        var BoxNumbers = [...setB];
        var setR = new Set(req.body.RackNumbers);
        var RackNumbers = [...setR];

        const AssetUploadDetails = new Rack({
            AssetName : req.body.AssetName,
            RackNumbers : RackNumbers,
            BoxNumbers : BoxNumbers,
            Remarks : req.body.Remarks
        })

        try{
            console.log(AssetUploadDetails);
            await AssetUploadDetails.save().then(function(){
                console.log("Data Added"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            }); // .save() is a method in Mongodb to insert or update a document
            res.send({status : 201});
        }
        catch(err){
            res.send({status : 500});
        }
    }
    else{
        console.log("Appending old");
        var RN = AssetDetails[0].RackNumbers;
        var NR = req.body.RackNumbers;

        var l = RN.length;
        for(let i=0;i<NR.length;i++){
            RN[l+i] = NR[i];
        }

        var BN = AssetDetails[0].BoxNumbers;
        var NB = req.body.BoxNumbers;
        console.log(BN,NB);
        l = BN.length;
        for(let i=0;i<NB.length;i++){
            BN[l+i] = NB[i];
        }

        var setB = new Set(BN);
        var BoxNumbers = [...setB];
        var setR = new Set(RN);
        var RackNumbers = [...setR];


        const AssetUploadDetails = new Rack({
            AssetName : req.body.AssetName,
            RackNumbers : RackNumbers,
            BoxNumbers : BoxNumbers,
            Remarks : req.body.Remarks
        })
        
        try{
            console.log(AssetUploadDetails);


            Rack.deleteOne({AssetName : req.body.AssetName}).then(function(){
                console.log("Data deleted"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            });
            console.log("Deleted");


            await AssetUploadDetails.save().then(function(){
                console.log("Data Added"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            });  // .save() is a method in Mongodb to insert or update a document
            res.send({status : 201});
        }
        catch(err){
            res.send({status : 500});
        }
    }
})
// not in use
router.get('/rackview/:assetname', async (req,res) => {
    const AssetName = req.params.assetname;
    try{
        const AssetDetails = await Rack.find({AssetName : AssetName});
        if(AssetDetails.length === 0){
            res.send({status : 400});
        }
        else{
            console.log(AssetDetails);
            res.send(AssetDetails);
        }
    }
    catch(err){
        res.send({status : 500});
    }
})

router.delete('/rackview/:assetname', async (req,res) =>{
    var AssetName = req.params.assetname;

    try{
        asset = await Rack.find({AssetName : AssetName});
        console.log(asset);
        console.log(asset.length)
        if(asset.length == 0){
            res.status(401).json({status : 401});
        }
        else{
            Rack.deleteOne({AssetName : AssetName}).then(function(){
                console.log("Data deleted"); // Success
                res.status(200).json({status : 200});
            }).catch(function(error){
                console.log(error); // Failure
            });
            console.log("Deleted");
        }
    }
    catch(err){
        res.status(500).json({status : 500});
    }

})

router.patch('/rackview/:assetname', async (req,res) => {
    var asset = req.params.assetname;
    console.log(asset);
    try{
        var AssetDetails = await Rack.findOne({AssetName : asset});
        console.log("Asset Details..");
        console.log(AssetDetails);
        if(AssetDetails.length == 0){
            res.send({status : 400})
        }
        else{
            console.log("Updating contents ");
            if(req.body.RackNumbers != ''){
                AssetDetails.RackNumbers = req.body.RackNumbers
            }
            if(req.body.Remarks != ''){
                AssetDetails.Remarks = req.body.Remarks
            }
            if(req.body.BoxNumbers != ''){
                AssetDetails.BoxNumbers = req.body.BoxNumbers
            }
            console.log("Updated contents ");
            

            AssetDetails.save().then(function(){
                console.log("Data Saved and updated"); // Success
                res.send({status : 201});
            }).catch(function(error){
                console.log(error); // Failure
            });


        }
        
        
    }
    catch(err){
        res.send({status : 500});
    }
})

router.get('/tableview',async(req,res) => {
    if(req.cookies.valid == 1){
        var RackDetails = await Rack.find();
        res.render("tableview", {obj : RackDetails});
    }
    else
    {
        res.redirect("/");
    }
    
})

router.post('/tableview', async (req,res) => {
    var AssetName = req.body.AssetName;
    console.log(AssetName);
    const AssetDetails = await Rack.find({AssetName : AssetName});
    console.log(AssetDetails);
    if(AssetDetails.length === 0){
        console.log("Creating new");
        console.log(req.body.BoxNumbers);
        var setB = new Set(req.body.BoxNumbers);
        var BoxNumbers = [...setB];
        var setR = new Set(req.body.RackNumbers);
        var RackNumbers = [...setR];

        const AssetUploadDetails = new Rack({
            AssetName : req.body.AssetName,
            RackNumbers : RackNumbers,
            BoxNumbers : BoxNumbers,
            Remarks : req.body.Remarks
        })

        try{
            console.log(AssetUploadDetails);
            await AssetUploadDetails.save().then(function(){
                console.log("Data Added"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            }); // .save() is a method in Mongodb to insert or update a document
            res.send({status : 201});
        }
        catch(err){
            res.send({status : 500});
        }
    }
    else{
        console.log("Appending old");
        var RN = AssetDetails[0].RackNumbers;
        var NR = req.body.RackNumbers;

        var l = RN.length;
        for(let i=0;i<NR.length;i++){
            RN[l+i] = NR[i];
        }

        var BN = AssetDetails[0].BoxNumbers;
        var NB = req.body.BoxNumbers;
        console.log(BN,NB);
        l = BN.length;
        for(let i=0;i<NB.length;i++){
            BN[l+i] = NB[i];
        }

        var setB = new Set(BN);
        var BoxNumbers = [...setB];
        var setR = new Set(RN);
        var RackNumbers = [...setR];


        const AssetUploadDetails = new Rack({
            AssetName : req.body.AssetName,
            RackNumbers : RackNumbers,
            BoxNumbers : BoxNumbers,
            Remarks : req.body.Remarks
        })
        
        try{
            console.log(AssetUploadDetails);


            Rack.deleteOne({AssetName : req.body.AssetName}).then(function(){
                console.log("Data deleted"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            });
            console.log("Deleted");


            await AssetUploadDetails.save().then(function(){
                console.log("Data Added"); // Success
            }).catch(function(error){
                console.log(error); // Failure
            });  // .save() is a method in Mongodb to insert or update a document
            res.send({status : 201});
        }
        catch(err){
            res.send({status : 500});
        }
    }

})

router.patch('/tableview/:assetname', async (req,res) => {
    var asset = req.params.assetname;
    console.log(asset);
    try{
        var AssetDetails = await Rack.findOne({AssetName : asset});
        console.log("Asset Details..");
        console.log(AssetDetails);
        if(AssetDetails.length == 0){
            res.send({status : 400})
        }
        else{
            console.log("Updating contents ");
            if(req.body.RackNumbers != ''){
                AssetDetails.RackNumbers = req.body.RackNumbers
            }
            if(req.body.Remarks != ''){
                AssetDetails.Remarks = req.body.Remarks
            }
            if(req.body.BoxNumbers != ''){
                AssetDetails.BoxNumbers = req.body.BoxNumbers
            }
            console.log("Updated contents ");
            

            AssetDetails.save().then(function(){
                console.log("Data Saved and updated"); // Success
                res.send({status : 201});
            }).catch(function(error){
                console.log(error); // Failure
            });


        }
        
        
    }
    catch(err){
        res.send({status : 500});
    }
})

router.delete('/tableview/:assetname',async(req,res) => {
    var AssetName = req.params.assetname;
    console.log(AssetName);
    try{
        asset = await Rack.find({AssetName : AssetName});
        console.log(asset);
        console.log(asset.length)
        if(asset.length == 0){
            res.status(401).json({status : 401});
        }
        else{
            await Rack.deleteOne({AssetName : AssetName}).then(function(){
                console.log("Data deleted"); // Success
                res.status(200).json({status : 200});
            }).catch(function(error){
                console.log(error); // Failure
            });
            console.log("Deleted");
        }
    }
    catch(err){
        res.status(500).json({status : 500});
    }
})

router.get('/qr',async(req,res) => {
    if(req.cookies.valid == 1)
    res.render("qr");
    else
    res.redirect("/");
})
router.get('/qr/qr-generator',async(req,res) => {
    if(req.cookies.valid == 1)
    res.render("qr-generator");
    else
    res.redirect("/");
})
router.get('/qr/qr-reader',async(req,res) => {
    if(req.cookies.valid == 1)
    res.render("qr-reader");
    else
    res.redirect("/");
})
router.get('/qr/qr-reader/:id' , async (req,res) => {
    var id  = req.params.id;
    if(req.cookies.valid == 1)
    {
        var Qr_Details = await QR.find({SerialNumber : id});
        console.log(Qr_Details);
        res.render("qr-reader-details",{ QrObj : Qr_Details });
    }
    else
    res.redirect("/");
})


router.get('/servers',async (req,res) => {
    if(req.cookies.valid == 1)
    {
        var Qr_Details = await QR.find();
        console.log(Qr_Details);
        res.render("servers",{ QrObj : Qr_Details });
    }
    else
    res.redirect("/");
})



module.exports = router;