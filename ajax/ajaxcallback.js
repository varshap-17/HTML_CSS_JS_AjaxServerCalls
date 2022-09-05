let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date=new Date();
    return date.getHours()+"hrs:"+date.getMinutes()+"mins:"+date.getSeconds()+"secs:";
}

function makeAJAXCall(methodType,url,callback,async=true,data=null){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        console.log("State changed called. Ready State:"+xhr.readyState+" Status:"+xhr.status);
        if(xhr.readyState===4){
            if(xhr.status===200 || xhr.status===201){
                callback(xhr.responseText);
            }else if(xhr.status>=400){
                console.log("Handle 400 Client Error or 500 Server Error"+showTime());
            }
        }
    }
    xhr.open(methodType,url,async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content=Type","application/json");
        xhr.send(JSON.stringify(data));
    }else 
        xhr.send();
    console.log(methodType+" request sent to the server"+showTime());
}
const getURL="http://127.0.0.1:3000/employees/1";
function getUserDetails(data){
    console.log("Get User Data:"+data);
}
makeAJAXCall("GET",getURL,getUserDetails,true);
console.log("make get ajax call to server"+showTime());
const deleteURL="http://localhost:3000/employees/4";
function userDeleted(data){
    console.log("User Deleted"+data);
}
makeAJAXCall("DELETE",deleteURL,userDeleted,false);
const postURL="http://localhost:3000/employees";
const emplData={"name":"varsha","salary":"50000"};
function userAdded(data){
    console.log("user Added:"+data);
}
makeAJAXCall("POST",postURL,userAdded,true,emplData);