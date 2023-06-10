document.getElementById("formz").onsubmit = function()
{

var charecLength = document.getElementById("name").value.length;

if(charecLength > 3)
{

/*---*/

 var emailength = document.getElementById("email").value.length;

 if(emailength >= 10)
 {
    /*---*/

 var feedbklength = document.getElementById("msg").value.length;

 if(feedbklength >= 10 )
 {
  
  alert("Send successfully.");
 
 }

 else
 {

 document.getElementById("update2").innerHTML= ("**please provide feedback, it will help us alot with improving our site to better serve you or leave a msg behind for our photographer");
 }
 
/*---*/

  alert("Send successfully")
 
 }
 
 else if(emailength == " ")
{
alert("**your form is incomplete");
}

 else
 {
    
 document.getElementById("update1").innerHTML= ("**enter a valid email address, this enables me to contact you later");    

 return false;

 /*---*/

 var feedbklength = document.getElementById("msg").value.length;

 if(feedbklength >= 10 )
 {
  
  
 
 }
 
 
 else if(feedbklength < 10)
{
document.getElementById("update2").innerHTML= ("**please enter at least 10 or more letters.");
}
 
 else
 {

 document.getElementById("update2").innerHTML= ("**please provide feedback, it will help us alot with improving our site to better serve you or leave a msg behind for our photographer");
 return false;
 }
 
/*---*/

 }
 
/*---*/

 }

 /*---*/
else if(charecLength == " ")
{
alert("**your form is incomplete");

}
 /*--*/

else
{
    
document.getElementById("update").innerHTML= ("**More then 3 letters are required for this fill");

/*---*/

 var emailength = document.getElementById("email").value.length;

 if(emailength >= 10)
 {
  
  /*---*/

 var feedbklength = document.getElementById("msg").value.length;

 if(feedbklength >= 10 )
 {
  
  
 
 }
 
 
 else if(feedbklength < 10)
{
document.getElementById("update2").innerHTML= ("**please enter at least 10 or more letters.");
}
 
 else
 {

 document.getElementById("update2").innerHTML= ("**please provide feedback, it will help us alot with improving our site to better serve you or leave a msg behind for our photographer");
 return false;
 }
 
/*---*/
  
 }
 
 else if(emailength == " ")
{
alert("**your form is incomplete");
}

 else
 {
    
 document.getElementById("update1").innerHTML= ("**enter a valid email address, this enables me to contact you later");
 
 /*---*/

 var feedbklength = document.getElementById("msg").value.length;

 if(feedbklength >= 10 )
 {
  
  
 
 }
 
 
 else if(feedbklength < 10)
{
document.getElementById("update2").innerHTML= ("**please enter at least 10 or more letters.");
}
 
 else
 {

 document.getElementById("update2").innerHTML= ("**please provide feedback, it will help us alot with improving our site to better serve you or leave a msg behind for our photographer");
 return false;
 }
 
/*---*/

 return false; 
 }
 
/*---*/


return false;

}


};