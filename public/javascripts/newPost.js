document.getElementById('post_form').addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    // post data
    fetch('/posts/new', {
        method: 'POST',
        body: formData  // FormData : req.body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText); 
        }
        return fetch('../html/hint.html');
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        // on success, jump to hint page and render
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        doc.getElementById('result').innerText = ' :) New post has been created';
        var alertClass = doc.getElementById('alert');
        alertClass.classList.add('alert-success');
        var jump = doc.getElementById('jump');
        jump.href = '/posts';
        jump.innerHTML = 'View all posts';

        document.body.innerHTML = doc.body.innerHTML;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});