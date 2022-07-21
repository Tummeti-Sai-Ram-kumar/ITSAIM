var LoginForm = document.getElementById("login-form");
LoginForm.addEventListener('submit',CheckLogin);
function CheckLogin(event){
    event.preventDefault();
    const user_details = {
        UserName : event.target.username.value,
        PassWord : event.target.password.value
    }
/*
    if(!user_details.UserName || !user_details.PassWord){
        window.alert("Both the fields are mandatory..");
    }
*/
    const options = {
        method : 'POST',
        body : JSON.stringify(user_details),
        headers : new Headers({
            'Content-Type' : 'application/json'
        })
    }

    return fetch('/',options)
    .then(res => res.json())
    .then(data => {
        console.log("Hello World");
        if(data.status === 200){
            window.open('/home',target="_self");            
        }
        else if(data.status === 401){
            document.getElementById("error-details").innerHTML = "Enter Required Credentials!!";
          //  window.location('http://localhost:1000/');
        }
        else{
            document.getElementById("error-details").innerHTML = "Invalid Credentials..!!";

        }

    });
}