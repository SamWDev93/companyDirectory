//Global variables
var totalRecords;
var deleteLocationID = "No Location ID";

// GET functions
function getAllEmployees() {
  $.ajax({
    url: "libs/php/getAll.php",
    type: "GET",
    dataType: "json",

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);
        totalRecords = 0;

        $(".records").empty();
        for (let i = 0; i < result.data.length; i++) {
          totalRecords++;
        }

        $(".records").append(
          `<div class='totalRecords container-fluid'><h5>Displaying ${totalRecords} Employee Records:</h5></div>`
        );

        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].jobTitle == "") {
            result.data[i].jobTitle = "Unspecified";
          }
          $(".records").append(
            `<div class='card'><table><tr><td class='alignCenter'><img src='./libs/images/user-icon.png'></td></tr></table><div class='card-body'><table><tr><td class='fullName alignCenter'><b>${result.data[i].firstName} ${result.data[i].lastName}</b><a href='mailto:${result.data[i].email}'><i class="fas fa-envelope-open-text"></i></a></td></tr></table><table class='table table-striped mt-4'><tr><td class='alignLeft'><i class="fas fa-briefcase"></i><b>Job Title: </b></td><td class='jobTitle alignRight'>${result.data[i].jobTitle}</td></tr><tr><td class='alignLeft'><i class="fas fa-network-wired"></i><b>Department: </b></td><td class='department alignRight'>${result.data[i].department}</td></tr><tr><td class='alignLeft'><i class="fas fa-search-location"></i><b>Location:</b></td><td class='location alignRight'>${result.data[i].location}</td></tr></table><table class='mt-5'><tr><td class='alignCenter'><button type='button' id='editEmployeeBtn' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' id='deleteEmployeeBtn' class='btn btn-danger btn-sm' data-bs-toggle='modal'
            data-bs-target='#deleteEmployeeModal'>Delete</button></td></tr></table></div></div>`
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
        totalRecords = 0;

        $(".records").empty();
        for (let i = 0; i < result.data.length; i++) {
          totalRecords++;
        }

        $(".records").append(
          `<div class='totalRecords container-fluid'><h5>Displaying ${totalRecords} Department Records:</h5></div>`
        );

        for (let i = 0; i < result.data.length; i++) {
          $(".records").append(
            `<div class='card'><table><tr><td class='departmentIcon alignCenter'><img src='./libs/images/department-icon.png'></td></tr></table><div class='card-body'><table><tr><td class='departmentName alignCenter'><b>${result.data[i].name}</b></td></tr></table><table class='mt-5'><tr><td class='alignCenter'><button type='button' id='editDepartmentBtn' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' id='deleteDepartmentBtn' class='btn btn-danger btn-sm' data-bs-toggle='modal'
            data-bs-target='#deleteDepartmentModal'>Delete</button></td></tr></table></div></div>`
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
        totalRecords = 0;

        $(".records").empty();
        for (let i = 0; i < result.data.length; i++) {
          totalRecords++;
        }

        $(".records").append(
          `<div class='totalRecords container-fluid'><h5>Displaying ${totalRecords} Location Records:</h5></div>`
        );
        for (let i = 0; i < result.data.length; i++) {
          $(".records").append(
            `<div class='card'><table><tr><td class='locationIcon alignCenter'><img src='./libs/images/location-icon.png'></td></tr></table><div class='card-body'><table><tr><td class='departmentName alignCenter'><b>${result.data[i].name}</b></td></tr></table><table class='mt-5'><tr><td class='alignCenter'><button type='button' id='editLocationBtn' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' id='deleteLocationBtn' class='btn btn-danger btn-sm' data-bs-toggle='modal' data-bs-target='#deleteLocationModal' data-location-id="${result.data[i].id}">Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Insert functions
function insertNewLocation() {
  $.ajax({
    url: "libs/php/insertLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#locationNameInput").val(),
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Location successfully added");
        $("#addLocationModal").modal("hide");
        $(document).ready(function () {
          getAllLocations();
        });
        $("#locationNameInput").val("");
        $("#locationConfirmAddCheck").prop("checked", false);
        $("#locationConfirmAddBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Delete functions
function deleteLocation() {
  $.ajax({
    url: "libs/php/deleteLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: deleteLocationID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Location successfully deleted");
        $("#deleteLocationModal").modal("hide");
        $(document).ready(function () {
          getAllLocations();
        });
        $("#locationConfirmDeleteCheck").prop("checked", false);
        $("#locationConfirmDeleteBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Filter functions
function employeeFilterByDepartment() {
  $.ajax({
    url: "libs/php/employeeFilterByDepartment.php",
    type: "GET",
    dataType: "json",
    data: {
      id: $("#filterByDepartment").val(),
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);
        totalRecords = 0;

        $(".records").empty();
        for (let i = 0; i < result.data.length; i++) {
          totalRecords++;
        }

        $(".records").append(
          `<div class='totalRecords container-fluid'><h5>Displaying ${totalRecords} Employee Records:</h5></div>`
        );

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

function employeeFilterByLocation() {
  $.ajax({
    url: "libs/php/employeeFilterByLocation.php",
    type: "GET",
    dataType: "json",
    data: {
      id: $("#filterByLocation").val(),
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);
        totalRecords = 0;

        $(".records").empty();
        for (let i = 0; i < result.data.length; i++) {
          totalRecords++;
        }

        $(".records").append(
          `<div class='totalRecords container-fluid'><h5>Displaying ${totalRecords} Employee Records:</h5></div>`
        );

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

// Retrieve all records on load
$(document).ready(() => {
  $("#addDepartmentBtn").hide();
  $("#addLocationBtn").hide();
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

// Show corresponding buttons for search select value
$("#searchFor").change(function () {
  if ($("#searchFor").val() == "employees") {
    $("#addEmployeeBtn").show();
    $("#addDepartmentBtn").hide();
    $("#addLocationBtn").hide();
    getAllEmployees();
  }

  if ($("#searchFor").val() == "departments") {
    $("#addEmployeeBtn").hide();
    $("#addDepartmentBtn").show();
    $("#addLocationBtn").hide();
    getAllDepartments();
  }

  if ($("#searchFor").val() == "locations") {
    $("#addEmployeeBtn").hide();
    $("#addDepartmentBtn").hide();
    $("#addLocationBtn").show();
    getAllLocations();
  }
});

// Disable location select on department select change
$("#filterByDepartment").change(function () {
  if ($("#filterByDepartment").val() == "allDepartments") {
    $("#filterByLocation").attr("disabled", false);
    getAllEmployees();
  } else {
    $("#filterByLocation").attr("disabled", true);
    employeeFilterByDepartment();
  }
});

// Disable department select on location select change
$("#filterByLocation").change(function () {
  if ($("#filterByLocation").val() == "allLocations") {
    $("#filterByDepartment").attr("disabled", false);
    getAllEmployees();
  } else {
    $("#filterByDepartment").attr("disabled", true);
    employeeFilterByLocation();
  }
});

// Enable add buttons on change of confirmation checkbox
$("#employeeConfirmAddCheck").click(function () {
  if ($(this).is(":checked")) {
    $("#employeeConfirmAddBtn").attr("disabled", false);
  } else {
    $("#employeeConfirmAddBtn").attr("disabled", true);
  }
});

$("#departmentConfirmAddCheck").click(function () {
  if ($(this).is(":checked")) {
    $("#departmentConfirmAddBtn").attr("disabled", false);
  } else {
    $("#departmentConfirmAddBtn").attr("disabled", true);
  }
});

$("#locationConfirmAddCheck").click(function () {
  if ($(this).is(":checked")) {
    $("#locationConfirmAddBtn").attr("disabled", false);
  } else {
    $("#locationConfirmAddBtn").attr("disabled", true);
  }
});

// Enable delete buttons on change of confirmation checkbox
$("#employeeConfirmDeleteCheck").click(function () {
  if ($(this).is(":checked")) {
    $("#employeeConfirmDeleteBtn").attr("disabled", false);
  } else {
    $("#employeeConfirmDeleteBtn").attr("disabled", true);
  }
});

$("#departmentConfirmDeleteCheck").click(function () {
  if ($(this).is(":checked")) {
    $("#departmentConfirmDeleteBtn").attr("disabled", false);
  } else {
    $("#departmentConfirmDeleteBtn").attr("disabled", true);
  }
});

$("#locationConfirmDeleteCheck").click(function () {
  if ($(this).is(":checked")) {
    $("#locationConfirmDeleteBtn").attr("disabled", false);
  } else {
    $("#locationConfirmDeleteBtn").attr("disabled", true);
  }
});

// Run insert routines on add button click
$("#locationConfirmAddBtn").click(function () {
  insertNewLocation();
});

// Get location ID for deletion
$("#deleteLocationModal").on("show.bs.modal", function (e) {
  deleteLocationID = $(e.relatedTarget).data("location-id");
  console.log(deleteLocationID);
});

// Run delete routines on delete button click
$("#locationConfirmDeleteBtn").click(function () {
  deleteLocation();
});
