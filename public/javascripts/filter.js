const btn = document.getElementById('filterBtn');
const filterForm = document.getElementById('filterForm');


btn.onclick = function(e){
    e.preventDefault(); 

    var formData = new FormData(filterForm);
    var formDataObj = Object.fromEntries(formData.entries());
    var formDataJsonString = JSON.stringify(formDataObj);
    console.log(formDataJsonString);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000/filter');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(formDataJsonString);
    xhr.onreadystatechange = function(){

    }
}

