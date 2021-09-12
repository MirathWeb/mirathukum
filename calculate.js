/* this file depends on other files */

let items = dropList.getElementsByClassName('list-item');
let table = document.getElementById("result-table");
let receipt = document.querySelector('.receipt');
let paid = document.querySelector('.paid');

let familyCount = {};
let familyRatios = {};
let familyMember;

function createTable(obj1, obj2){
    table.innerHTML = "";
    let i=0;
    Object.keys(obj1).forEach(function(key){
        let row = table.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.classList.add("col1");
        cell2.classList.add("col2");
        cell3.classList.add("col2");
        cell1.innerHTML=`${key}`;
        cell2.innerHTML=`${obj1[key]}`;
        cell3.innerHTML=`${obj2[key]}`;
        i++;
    });
}

function calculateCount(){
    familyCount = {}; //count from 1

    //update familyCount
    for(i=0; i<items.length; i++){
        familyCount[items[i].id] = parseInt(items[i].getAttribute("data-count"), 10);
    }


    //assign familyCount to family to use it functions
    assignFromDic(family, familyCount);
    //update familyMember
    familyMember = new FamilyMember(family);

    //update family ratios by using familyMember
    Object.keys(familyCount).forEach(function(member){
        ratio = familyMember[member].call(familyMember)*familyMember.rad()*familyMember.correction();
        familyRatios[member] = ratio.toFixed(3);
    });

    //create a table to show the results
    createTable(familyCount, familyRatios);
    //show table on receipt (functions from jquery)
    if ( receipt.getAttribute('data-silde-status') === "down" ) {
        $(".receipt").slideUp("slow");
        $(".paid").slideDown("slow");
        receipt.setAttribute('data-silde-status', "up");
    } else if ( receipt.getAttribute('data-silde-status') === "up" ) {
        $(".receipt").slideDown("slow");
        $(".paid").slideUp("slow");
        receipt.setAttribute('data-silde-status', "down");
    }
}
