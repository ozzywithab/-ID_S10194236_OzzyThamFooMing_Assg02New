// Fetching currencies and adding them into select tag form
fetch("http://api.exchangerate.host/latest")
.then(Response => Response.json())
.then(data =>{
    currencies = data
    allKeys = Object.keys(currencies["rates"])
    for (i = 0; i < allKeys.length; i++){
        $("#currencyFromLeft").append("<option value = " + allKeys[i] + ">" + allKeys[i] + "</option>")
        $("#currencyToLeft").append("<option value = " + allKeys[i] + ">" + allKeys[i] + "</option>")
        $("#currencyFromRight").append("<option value = " + allKeys[i] + ">" + allKeys[i] + "</option>")
        $("#currencyToRight").append("<option value = " + allKeys[i] + ">" + allKeys[i] + "</option>")
    }
})

// Setting of variables
var fromLeft = document.getElementById("inputFromLeft")
var toLeft = document.getElementById("outputToLeft")
var fromRight = document.getElementById("inputFromRight")
var toRight = document.getElementById("outputToRight")
var dLeft = document.getElementById("dayLeft")
var mLeft = document.getElementById("monthLeft")
var yLeft = document.getElementById("yearLeft")
var dRight = document.getElementById("dayRight")
var mRight = document.getElementById("monthRight")
var yRight = document.getElementById("yearRight")


// Event listener looks for keypresses in conversions form and runs values to functions based on whether date is inputed
fromLeft.addEventListener("keyup", function(){
    if (document.getElementById("latestLeft").checked == true || (  dLeft.value == "" && mLeft.value == "" && yLeft.value == "")){
        getExchange(document.getElementById("currencyFromLeft").value, document.getElementById("currencyToLeft").value, document.getElementById("inputFromLeft").value, "toLeft")
    }
    else{
        getExchangeDate(document.getElementById("currencyFromLeft").value, document.getElementById("currencyToLeft").value, document.getElementById("inputFromLeft").value, dLeft.value, mLeft.value, yLeft.value, "toLeft")
    }
})

// Event listener looks for keypresses in conversions form and runs values to functions based on whether date is inputed
toLeft.addEventListener("keyup", function(){
    if (document.getElementById("latestLeft").checked == true || (  dLeft.value == "" && mLeft.value == "" && yLeft.value == "")){
        getExchange(document.getElementById("currencyFromLeft").value, document.getElementById("currencyToLeft").value, document.getElementById("outputToLeft").value, "fromLeft")
    }
    else{
        getExchangeDate(document.getElementById("currencyFromLeft").value, document.getElementById("currencyToLeft").value, document.getElementById("outputToLeft").value, dLeft.value, mLeft.value, yLeft.value, "fromLeft")
    }
})

// Event listener looks for keypresses in conversions form and runs values to functions based on whether date is inputed
fromRight.addEventListener("keyup", function(){
    if (document.getElementById("latestRight").checked == true || (  dRight.value == "" && mRight.value == "" && yRight.value == "")){
        getExchange(document.getElementById("currencyFromRight").value, document.getElementById("currencyToRight").value, document.getElementById("inputFromRight").value, "toRight")
    }
    else{
        getExchangeDate(document.getElementById("currencyFromRight").value, document.getElementById("currencyToRight").value, document.getElementById("inputFromRight").value, dRight.value, mRight.value, yRight.value, "toRight")
    }
})

// Event listener looks for keypresses in conversions form and runs values to functions based on whether date is inputed
toRight.addEventListener("keyup", function(){
    if (document.getElementById("latestRight").checked == true || (  dRight.value == "" && mRight.value == "" && yRight.value == "")){
        getExchange(document.getElementById("currencyFromRight").value, document.getElementById("currencyToRight").value, document.getElementById("outputToRight").value, "fromRight")
    }
    else{
        getExchangeDate(document.getElementById("currencyFromRight").value, document.getElementById("currencyToRight").value, document.getElementById("outputToRight").value, dRight.value, mRight.value, yRight.value, "fromRight")
    }
})

// Function runs input values and outputs values based on exchange rates
async function getExchange(from, to, amount, oppositeClass){ 
    await fetch ("https://api.exchangerate.host/convert?from=" + from + "&to=" + to + "&places=2")
    .then(Response => Response.json())    
    .then(data => exchangeRate = data["result"])
    exchangedAmount = amount * exchangeRate
    await fetch ("https://api.exchangerate.host/convert?from=" + to + "&to=" + from + "&places=2")
    .then(Response => Response.json())
    .then(data => reverseExchangeRate = data["result"])
    reverseExchangedAmount = amount * reverseExchangeRate
    if (oppositeClass == "toLeft"){
        toLeft.value = exchangedAmount
    }   
    else if (oppositeClass == "fromLeft"){
        fromLeft.value = reverseExchangedAmount
    }
    else if (oppositeClass == "toRight"){
        toRight.value = exchangedAmount
    }
    else{
        fromRight.value = reverseExchangedAmount
    }
}

// Function runs input values and outputs values based on exchange rates from a certain date
async function getExchangeDate(from, to, amount, day, month, year, oppositeClass){
    if (day.length < 2){
        day = "0".concat(day);
    }
    if (month.length < 2){
        month = "0".concat(month);
    }
    await fetch ("http://api.exchangerate.host/" + year + "-" + month + "-" + day + "?base=" + from + "&symbols=" + to + "&places=2")
    .then(Response => Response.json())
    .then(data => exchangeRate = (data["rates"][to]))
    exchangedAmount = amount * exchangeRate
    await fetch ("http://api.exchangerate.host/" + year + "-" + month + "-" + day + "?base=" + to + "&symbols=" + from + "&places=2")
    .then(Response => Response.json())
    .then(data => reverseExchangeRate = (data["rates"][from]))
    reverseExchangedAmount = amount * reverseExchangeRate
    if (oppositeClass == "toLeft"){
        toLeft.value = exchangedAmount
    }
    else if (oppositeClass == "fromLeft"){
        fromLeft.value = reverseExchangedAmount
    }
    else if (oppositeClass == "toRight"){
        toRight.value = exchangedAmount
    }
    else{
        fromRight.value = reverseExchangedAmount
    }
}

// Disables date inputs if a button is toggled/ Enables if button is no longer toggled
function disableLatest(checkID){
    let checkBox = document.getElementById(checkID);
    let day = document.getElementById("day" + checkID.substr(6));
    let month = document.getElementById("month" + checkID.substr(6));
    let year = document.getElementById("year" + checkID.substr(6));
    if (checkBox.checked == true){
        day.value = "";
        month.value = "";
        year.value = "";
        day.disabled = true;
        month.disabled = true;
        year.disabled = true;
    }
    else{
        day.disabled = false;
        month.disabled = false;
        year.disabled = false;
    }
}
