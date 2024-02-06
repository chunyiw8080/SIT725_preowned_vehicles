document.addEventListener('DOMContentLoaded',function(){
    fetch('/editor/data').then(response => {
        return response.json();
    }).then(data => {
        if(data){
            console.log(data);

            document.getElementById('seats').value = data.seats;
            document.getElementById('km_driven').value = data.km_driven;
            document.getElementById('fuel').value = data.fuel;
            document.getElementById('transmission').value = data.transmission;
            document.getElementById('mileage').value = data.mileage;
            document.getElementById('engine').value = data.engine;
            document.getElementById('max_power').value = data.max_power;
            document.getElementById('torque').value = data.torque;
            document.getElementById('seller_type').value = data.seller_type;

            let str = data.owner;
            let words = str.split(" ");
            let owner = words[0];
            document.getElementById('owner').value = owner;

            document.getElementById('price').value = data.price;

        }
        
    });

});

$(document).ready(function() {
    var data = localStorage.getItem('data');
  
    if (data) {
        console.log(data);
    //   $('#post-title').val(title);
    //   localStorage.removeItem('postTitle'); // 清除已使用的数据
    }
  
    // if (content) {
    //   $('#post-content').val(content);
    //   localStorage.removeItem('postContent'); // 清除已使用的数据
    // }
  });