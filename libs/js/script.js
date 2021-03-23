$(document).ready(() => {
  $.ajax({
    url: "libs/php/getAll.php",
    type: "get",
    dataType: "json",

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);
        for (let i = 0; i < result.data.length; i++) {
          $(".records").append(
            `<div class='card'><img src='./libs/images/user-icon.png' ><div class='card-body'><p class='fullName'>${result.data[i].firstName} ${result.data[i].lastName}</p><p class='jobTitle'>${result.data[i].jobTitle}</p><p class='department'>${result.data[i].department}</p><p class='location'>${result.data[i].location}</p><p class='email'>${result.data[i].email}</p><button type='button' class='btn btn-primary btn-sm'>Edit</button><button type='button' class='btn btn-danger btn-sm'>Delete</button></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
});
