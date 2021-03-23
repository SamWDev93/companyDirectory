function createCard(result) {
  var card =
    "<div class='card'><img src='./libs/images/user-icon.png' ><div class='card-body'><p class='fullName'></p><p class='jobTitle'></p><p class='department'></p><p class='location'></p><p class='email'></p><button type='button' class='btn btn-primary btn-sm'>Edit</button><button type='button' class='btn btn-danger btn-sm'>Delete</button></div></div>";
  return card;
}

$(document).ready(() => {
  $.ajax({
    url: "libs/php/getAll.php",
    type: "get",
    dataType: "json",

    success: function (result) {
      console.log(result);
      result.data.forEach((record) => {
        $(".fullName").html(record.firstName + " " + record.lastName);
        $(".jobTitle").html(record.jobTitle);
        $(".department").html(record.department);
        $(".location").html(record.location);
        $(".email").html(record.email);
        $(".records").append(createCard(record));
      });
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
});
