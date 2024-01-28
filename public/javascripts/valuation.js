const btn = document.getElementById('submitBtn');
const result = document.getElementById('result');
const myForm = document.getElementById('carIndicators');

if(btn){
    btn.onclick = function(e){
        e.preventDefault(); 
    
        var formData = new FormData(myForm);
        console.log(formData);
        var formDataObj = Object.fromEntries(formData.entries());
        var formDataJsonString = JSON.stringify(formDataObj);
        console.log(formDataJsonString);
    
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:3000/valuation');
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(formDataJsonString);
        xhr.send(formDataJsonString);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status <= 304){
                    result.innerHTML = `<h2>Estimated price: ${xhr.response}</h2>`;
                } else {
                    result.innerHTML = `<h1>Error: ${xhr.statusText}</h1>`;
                }
            }
        }
    }
}else{
    console.log('null');
}
