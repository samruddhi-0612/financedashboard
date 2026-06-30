let transactions = JSON.parse(localStorage.getItem("data")) || [];

function addTransaction(){

let title=document.getElementById("title").value;

let amount=parseFloat(document.getElementById("amount").value);

let type=document.getElementById("type").value;

let category=document.getElementById("category").value;

if(title=="" || isNaN(amount)){

alert("Fill all fields");

return;

}

transactions.push({

title,
amount,
type,
category

});

localStorage.setItem("data",JSON.stringify(transactions));

display();

}

function display(){

let tbody=document.getElementById("tableData");

tbody.innerHTML="";

let income=0;

let expense=0;

transactions.forEach(function(t){

tbody.innerHTML+=`

<tr>

<td>${t.title}</td>

<td>${t.amount}</td>

<td>${t.type}</td>

<td>${t.category}</td>

</tr>

`;

if(t.type=="Income")

income+=t.amount;

else

expense+=t.amount;

});

document.getElementById("income").innerHTML="₹"+income;

document.getElementById("expense").innerHTML="₹"+expense;

document.getElementById("saving").innerHTML="₹"+(income-expense);

drawChart(income,expense);

}

function searchTransaction(){

let value=document.getElementById("search").value.toLowerCase();

let rows=document.querySelectorAll("#tableData tr");

rows.forEach(function(row){

row.style.display=row.innerText.toLowerCase().includes(value)?"":"none";

});

}

let chart;

function drawChart(income,expense){

let ctx=document.getElementById("chart");

if(chart)

chart.destroy();

chart=new Chart(ctx,{

type:"pie",

data:{

labels:["Income","Expense"],

datasets:[{

data:[income,expense],

backgroundColor:["green","red"]

}]

}

});

}

display();