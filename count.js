let inputs = document.getElementsByTagName("input");

for (i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", updateDataCount);
}

function updateDataCount(e) {
    e.target.parentElement.setAttribute('data-count', e.target.value);
}
