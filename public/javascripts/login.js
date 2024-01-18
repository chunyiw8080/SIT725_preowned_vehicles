document.getElementById('login_form').addEventListener('submit', function(e){
    e.preventDefault();

    var userLogin = new FormData(this);
    var password = userLogin.get("password");
    var username = userLogin.get("username");
    var encryptedPasswd = md5(password);

    var data = JSON.stringify({
        username: username,
        password: encryptedPasswd
    });

    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data  // FormData : req.body
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
        document.getElementById('result').innerText = ' :) Login successfully';
        var alertClass = document.getElementById('alert');
        alertClass.classList.add('alert-success');
        var jump = document.getElementById('jump');
        jump.href = '/posts';
        jump.innerHTML = 'View all posts';
    })
    .catch(error => {
        console.error('Error:', error);
    });

})