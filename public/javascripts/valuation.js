const btn = document.querySelector('button');
const result = document.getElementById('result');
const myForm = document.getElementById('carIndicators');

btn.onclick = function(e){
    e.preventDefault(); // 阻止表单的默认提交行为

    var formData = new FormData(myForm);
    var formDataObj = Object.fromEntries(formData.entries());
    var formDataJsonString = JSON.stringify(formDataObj);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000/valuation');
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(formDataJsonString);
    xhr.send(formDataJsonString);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status <= 304){
                result.innerHTML = `<h1>${xhr.response}</h1>`;
            } else {
                result.innerHTML = `<h1>Error: ${xhr.statusText}</h1>`;
            }
        }
    }
}