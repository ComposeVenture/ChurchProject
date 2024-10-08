const BATTERY=(callback)=>{var battery=JSON.parse(Android.getBatteryLevel());callback(battery)};
const CONTACTS=(callback)=>{var contactsData=Android.getContacts();var parsedContacts=JSON.parse(contactsData);callback(parsedContacts)};
const HIDENAVIGATIONBAR=()=>{CONDITION("Production"===localStorage.getItem("Environment"),()=>Android.hideNavigationBar(),()=>CHECK(localStorage.getItem("Environment"),(result)=>{}))};
const NETWORKSTATE=(callback)=>{CONDITION(localStorage.getItem("Environment")==="Production",()=>CHECK(Android.isNetworkAvailable(),(result)=>callback(result)),()=>CHECK(navigator.onLine,(result)=>callback(result)))};
const NOTIFICATIONS=(e,A)=>{if("Production"===localStorage.getItem("Environment")){Android.showNotification(`${e}`,`${A}`)}else if("Notification" in window){Notification.requestPermission().then(function(o){if("granted"===o){new Notification(e,{body:A,icon:"/Components/Library/Images/app_icon.png"})}})}else{console.log("This browser does not support notifications.")}};
const READFILE=(Path,callback)=>{var fileData=Android.readFile(Path);callback(fileData)};
const SHOWNAVIGATIONBAR=()=>{CONDITION(localStorage.getItem("Environment")==="Production",()=>Android.showNavigationBar(),()=>CHECK(localStorage.getItem("Environment"),(result)=>{}))};
const VIBRATION=(e)=>{CONDITION("Production"===localStorage.getItem("Environment"),()=>Android.vibrate(e),()=>CHECK(localStorage.getItem("Environment"),(result)=>{ if ("vibrate" in navigator) { navigator.vibrate(e); } else { console.log("Vibration not supported"); } }))};
const TOAST=(e)=>{console.log(e)}