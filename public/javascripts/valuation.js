const btn = document.getElementById('submitBtn');
const result = document.getElementById('result');
const myForm = document.getElementById('carIndicators');
var price;

if(btn){
    btn.onclick = function(e){
        e.preventDefault(); 
    
        var formData = new FormData(myForm);
        var formDataObj = Object.fromEntries(formData.entries());
        formDataJsonString = JSON.stringify(formDataObj);
        console.log(formDataJsonString);
    
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/valuation');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(formDataJsonString);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status <= 304){
                    price = xhr.response;
                    result.innerHTML = `<h2>Estimated price: ${price}</h2>`;
                    let btnContainer = document.getElementById('postnow');
                    btnContainer.innerHTML = `<button type="button" class="btn btn-primary" id="jumpBtn">Post Now!</button>`
                } else {
                    result.innerHTML = `<h1>Error: ${xhr.statusText}</h1>`;
                }
            }
        }
    }
}else{
    console.log('null');
}

const jumpBtnContainer = document.getElementById('postnow');
jumpBtnContainer.addEventListener('click', function(event){
    if(event.target.id === 'jumpBtn'){
        try{
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://127.0.0.1:3000/editor/data');
            xhr.setRequestHeader('Content-Type', 'application/json');
            let formPreset = JSON.parse(formDataJsonString);
            formPreset.price = price;
            xhr.send(JSON.stringify(formPreset));
            localStorage.setItem('formData', formDataJsonString);
            window.location.href = 'http://127.0.0.1:3000/editor'; 
        }catch(err){
            console.error(err);
        }
        
    } 
});
