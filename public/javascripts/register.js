document.getElementById('register_form').addEventListener('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var encryptedPasswd = md5(formData.get('password'));

    var dataObj = {};
    formData.forEach((value, key) => {
        dataObj[key] = value;
    });
    dataObj.password = encryptedPasswd;
    var data = JSON.stringify(dataObj);

    fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data 
    })
    .then(response => {
        if(response.status === 400){
            alert("Incorrect username or password");
        }
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText); 
        }
        return fetch('../html/hint.html');
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        document.body.innerHTML = data;
        document.getElementById('result').innerText = ' :) You have successfully completed registration';
        var alertClass = document.getElementById('alert');
        alertClass.classList.add('alert-success');
        var jump = document.getElementById('jump');
        jump.href = '/users/login';
        jump.innerHTML = 'Sign in now!';
    })
    .catch(error => {
        console.error('Error:', error);
    });
})