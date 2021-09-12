let uniqueList = document.getElementById('unique-list');
let othersList = document.getElementById('others-list');
let dropList = document.getElementById('drop-list');
let dragHereP = document.getElementById('drag-here-p')

Sortable.create(uniqueList, {
    animation: 150,
    sort: false,
    group: {
        name: "shared",
        put: false
    },
});

Sortable.create(othersList, {
    animation: 150,
    sort: false,
    group: {
        name: "shared",
        pull: "clone",
        put: false
    },
});

let dropListSort = Sortable.create(dropList, {
    animation: 150,
    group: "shared",
    removeOnSpill: true,

    onAdd: function(evt) {
        let numberInput = evt.item.querySelector('input[type=number]');
        if (numberInput) {
            let allInstances = dropList.querySelectorAll(`#${evt.item.id}`);
            if (allInstances.length > 1) {
                numberInput = allInstances[0].querySelector('input[type=number]');
                numberInputValue0 = parseInt(allInstances[0].querySelector('input[type=number]').value);
                numberInputValue1 = parseInt(allInstances[1].querySelector('input[type=number]').value);
                allInstances[1].remove();
                numberInput.value =  Math.max(numberInputValue1, numberInputValue0) + 1;
                numberInput.parentNode.setAttribute('data-count', numberInput.value);
            }
            numberInput.hidden = false;
        }

        if(!dragHereP.hidden){
            dragHereP.hidden = true;
            dropList.classList.remove("drag-here");
        }

        //if husband is added to dropList, wife is removed
        if(evt.item.id == "husband"){
            if (dropList.querySelector("#wife")){
                dropList.querySelector("#wife").remove();
            };
        }

        //if wife is added to dropList, husband is removed
        if(evt.item.id == "wife"){
            if (dropList.querySelector("#husband")){
                dropList.querySelector("#husband").remove();
            };
        }
    },
});

function changeInDropList(){
    // hide receipt table.
    $(".receipt").slideUp("slow");
    $(".paid").slideDown("slow");

    let dropListItems = dropList.getElementsByTagName('div');
    if(dropListItems.length == 0){
        dragHereP.hidden = false;
        dropList.classList.add("drag-here");
    };

    //making uniqueList members returnable after being discarded from dropList
    if(!dropList.querySelector("#husband") && !uniqueList.querySelector("#husband")){
        uniqueList.innerHTML = '<div id="husband" class="list-item" data-count="1">Husband</div>' + uniqueList.innerHTML;
    };
    if(!dropList.querySelector("#wife") && !uniqueList.querySelector("#wife")){
        uniqueList.innerHTML = '<div id="wife" class="list-item" data-count="1">wife</div>' + uniqueList.innerHTML;
    };
    if(!dropList.querySelector("#father") && !uniqueList.querySelector("#father")){
        uniqueList.innerHTML += '<div id="father" class="list-item" data-count="1">father</div>';
    };
    if(!dropList.querySelector("#mother") && !uniqueList.querySelector("#mother")){
        uniqueList.innerHTML += '<div id="mother" class="list-item" data-count="1">mother</div>';
    };
}

let observer = new MutationObserver(changeInDropList);
observer.observe(dropList, {childList: true});