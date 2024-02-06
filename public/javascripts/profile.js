//Read user information
var uuid = "";
var uid = "";
fetch("/users/getprofile", {
  method: "GET",
  credentials: "include", // Include cookies in the request
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Network response was not ok");
    }
  })
  .then((data) => {
    // console.log(data)
    let username = document.getElementById("uname");
    let uuid = document.getElementById("uuid");

    username.innerHTML = data.username;
    id.innerHTML = data._id;
    uuid.innerHTML = data.uuid;
    uid = data.uuid;

    //Read post list

    fetch(`/posts/getpostsbyauthor/${uid}?sort=desc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the obtained post data
        let postsContainer = document.querySelector(".post-container");
        let post_num = document.getElementById("post_num");
        post_num.innerHTML = data.length;
        data.forEach((post) => {
          let postElement = document.createElement("div");
          postElement.classList.add("card", "mb-4");

          let postBody = document.createElement("div");
          postBody.classList.add("card-body");

          let postTitle = document.createElement("h5");
          postTitle.classList.add("card-title");
          postTitle.textContent = post.title;

          let postText = document.createElement("p");
          postText.classList.add("card-text");

          let date = new Date(post.post_date);
          let formattedDate = `${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDate()}`;
          postText.textContent = formattedDate;

          // Create delete and edit buttons
          let delButton = document.createElement("button");
          delButton.textContent = "Delete";
          delButton.classList.add("btn", "btn-danger", "mr-2", "btn-sm", "del");
          delButton.setAttribute("data-id", post._id);

          let editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.classList.add("btn", "btn-info", "btn-sm", "edit");
          editButton.setAttribute("data-id", post._id);

          postBody.appendChild(postTitle);
          postBody.appendChild(postText);
          postElement.appendChild(postBody);

          postBody.appendChild(delButton);
          postBody.appendChild(editButton);

          // Adds a new post element to the page
          postsContainer.appendChild(postElement);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }) // The obtained user information is displayed
  .catch((error) =>
    console.error("There has been a problem with your fetch operation:", error)
  );

//Listen edit button
document
  .getElementById("editProfileForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var uuid = document.getElementById("uuid").innerText;
    password = md5(password);

    // Packaged form data
    var updateInfo = {
      username: username,
      email: email,
      phone: phone,
      password: password,
      uuid: uuid,
      // You may also need to pass a uuid to the user, which can be obtained from your session or elsewhere
      // uuid: '...'
    };

    // console.log(updateInfo);

    // Send a fetch request to the /update route
    fetch("/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile update response: ", data);
        // Before the modal window closes, you may want to give some operational information back to the user
        $("#editProfileModal").modal("hide");
        location.reload(); // Reload the page to update the page content
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Listen for delete button click events
$(document).on("click", ".del", function () {
  let id = $(this).data("id"); // Gets the value of the data-id attribute
  deletePost(id);
  // After this, you may need to remove the post element from the page or reload all posts
});

// How to delete posts
function deletePost(id) {
  $.ajax({
    url: `/posts/del/${id}`,
    type: "DELETE",
    success: function (result) {
      location.reload(); // Reload the page to update the page content
    },
  });
}



// When the user clicks the Edit button, the modal window is displayed and the form is filled
$(document).on("click", ".edit", function () {
  var id = $(this).data("id"); // Gets the value of the data-id attribute
  var button = document.querySelector('.edit');
  var dataId = button.getAttribute('data-id');
  if(dataId){
    window.location.href = `/editor/update/${dataId}`;
  }else{
    alert('Something Wrong');
  }
  
});


// When the user submits the form, submit the changes and reload the page
$("#editForm").on("submit", function (e) {
  e.preventDefault();
  var id = $(this).data("id");
  var newContent = $("#post-content").val();
  var newTitle = $("#post-title").val();

  // Update the content of the post
  $.ajax({
    url: `/posts/edit/${id}`,
    type: "PUT",
    data: JSON.stringify({
      content: newContent,
      title: newTitle
    }),
    contentType: "application/json",
    success: function (result) {
      $("#editModal").modal("hide"); // Hidden modal window
      location.reload(); // Reload the page to update the page content
    },
    error: function (err) {
      console.error(err);
    },
  });
});
