function getAllEmployees() {
  $.ajax({
    url: "libs/php/getAll.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);
        $(".records").empty();
        for (let i = 0; i < result.data.length; i++) {
          $(".records").append(
            `<div class='card'><table><tr><td class='alignCenter'><img src='./libs/images/user-icon.png'></td></tr></table><div class='card-body'><table><tr><td class='fullName alignCenter'><b>${result.data[i].firstName} ${result.data[i].lastName}</b><a href='mailto:${result.data[i].email}'><i class="fas fa-envelope-open-text"></i></a></td></tr></table><table class='table table-striped mt-4'><tr><td class='alignLeft'><i class="fas fa-network-wired"></i><b>Department: </b></td><td class='department alignRight'>${result.data[i].department}</td></tr><tr><td class='alignLeft'><i class="fas fa-search-location"></i><b>Location:</b></td><td class='location alignRight'>${result.data[i].location}</td></tr></table><table class='mt-5'><tr><td class='alignCenter'><button type='button' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' class='btn btn-danger btn-sm'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function getAllDepartments() {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);
        $(".records").empty();
        for (let i = 0; i < result.data.length; i++) {
          $(".records").append(
            `<div class='card'><table><tr><td class='departmentIcon alignCenter'><img src='./libs/images/department-icon.png'></td></tr></table><div class='card-body'><table><tr><td class='departmentName alignCenter'><b>${result.data[i].name}</b></td></tr></table><table class='mt-5'><tr><td class='alignCenter'><button type='button' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' class='btn btn-danger btn-sm'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function getAllLocations() {
  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);
        $(".records").empty();
        for (let i = 0; i < result.data.length; i++) {
          $(".records").append(
            `<div class='card'><table><tr><td class='locationIcon alignCenter'><img src='./libs/images/location-icon.png'></td></tr></table><div class='card-body'><table><tr><td class='departmentName alignCenter'><b>${result.data[i].name}</b></td></tr></table><table class='mt-5'><tr><td class='alignCenter'><button type='button' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' class='btn btn-danger btn-sm'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Retrieve all records on load
$(document).ready(() => {
  getAllEmployees();
});

// Dynamically populate department select filter
$.ajax({
  url: "libs/php/getAllDepartments.php",
  type: "GET",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#filterByDepartment").append(
        $("<option>", {
          value: result.data[index].id,
          text: result.data[index].name,
        })
      );
    });
  },

  error: function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown);
  },
});

// Dynamically populate location select filter
$.ajax({
  url: "libs/php/getAllLocations.php",
  type: "GET",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#filterByLocation").append(
        $("<option>", {
          value: result.data[index].id,
          text: result.data[index].name,
        })
      );
    });
  },

  error: function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown);
  },
});

$("#searchFor").change(function () {
  if ($("#searchFor").val() == "employees") {
    getAllEmployees();
  }

  if ($("#searchFor").val() == "departments") {
    getAllDepartments();
  }

  if ($("#searchFor").val() == "locations") {
    getAllLocations();
  }
});
