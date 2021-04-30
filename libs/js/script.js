//Global variables
var totalRecords;
var updateEmployeeID = "No Employee ID";
var updateDepartmentID = "No Department ID";
var updateLocationID = "No Location ID";
var deleteEmployeeID = "No Employee ID";
var deleteDepartmentID = "No Department ID";
var deleteLocationID = "No Location ID";
var employeeCount;
var departmentCount;

// GET functions
function getAllEmployees() {
  $("#loader-container").show();
  $("#loader").show();
  $.ajax({
    url: "libs/php/getAll.php",
    type: "POST",
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
            `<div class='card'><table><tr><td class='alignCenter'><img src='./img/user-icon.png' class='userIcon'></td></tr></table><div class='card-body'><table><tr><td class='fullName alignCenter'><b>${result.data[i].firstName} ${result.data[i].lastName}</b><a href='mailto:${result.data[i].email}'><i class="fas fa-envelope-open-text"></i></a></td></tr></table><table class='table table-striped mt-3'><tr><td class='alignLeft'><i class="fas fa-briefcase"></i><b>Job Title: </b></td><td class='jobTitle alignRight'>${result.data[i].jobTitle}</td></tr><tr><td class='alignLeft'><i class="fas fa-network-wired"></i><b>Department: </b></td><td class='department alignRight'>${result.data[i].department}</td></tr><tr><td class='alignLeft'><i class="fas fa-search-location"></i><b>Location:</b></td><td class='location alignRight'>${result.data[i].location}</td></tr></table><table><tr><td class='alignCenter'><button type='button' id='editEmployeeBtn' class='btn btn-primary btn-sm' data-bs-toggle='modal'
            data-bs-target='#updateEmployeeModal' data-employee-id='${result.data[i].id}'>Edit</button></td><td class='alignCenter'><button type='button' id='deleteEmployeeBtn' class='btn btn-danger btn-sm' data-bs-toggle='modal'
            data-bs-target='#deleteEmployeeModal' data-employee-id='${result.data[i].id}'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
  $("#loader-container").hide();
  $("#loader").hide();
}

function getAllDepartments() {
  $("#loader-container").show();
  $("#loader").show();
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: "POST",
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
            `<div class='card'><table><tr><td class='departmentIcon alignCenter'><img src='./img/department-icon.png'></td></tr></table><div class='card-body'><table><tr><td class='departmentName alignCenter'><b>${result.data[i].name}</b></td></tr></table><table class='table table-striped mt-3'><tr><td class='alignLeft'><i class="fas fa-globe-europe"></i><b>Location: </b></td><td class='location alignRight'>${result.data[i].location}</td></tr></table><table><tr><td class='alignCenter'><button type='button' id='updateDepartmentBtn' class='btn btn-primary btn-sm' data-bs-toggle='modal'
            data-bs-target='#updateDepartmentModal' data-department-id='${result.data[i].id}'>Edit</button></td><td class='alignCenter'><button type='button' id='deleteDepartmentBtn' class='btn btn-danger btn-sm' data-bs-toggle='modal'
            data-bs-target='#deleteDepartmentModal' data-department-id='${result.data[i].id}'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
  $("#loader-container").hide();
  $("#loader").hide();
}

function getAllLocations() {
  $("#loader-container").show();
  $("#loader").show();
  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: "POST",
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
            `<div class='card'><table><tr><td class='locationIcon alignCenter'><img src='./img/location-icon.png'></td></tr></table><div class='card-body'><table><tr><td class='departmentName alignCenter'><b>${result.data[i].name}</b></td></tr></table><table><tr><td class='alignCenter'><button type='button' id='editLocationBtn' class='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#updateLocationModal' data-location-id='${result.data[i].id}'>Edit</button></td><td class='alignCenter'><button type='button' id='deleteLocationBtn' class='btn btn-danger btn-sm' data-bs-toggle='modal' data-bs-target='#deleteLocationModal' data-location-id='${result.data[i].id}'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
  $("#loader-container").hide();
  $("#loader").hide();
}

function getEmployeeByID() {
  $.ajax({
    url: "libs/php/getEmployeeByID.php",
    type: "POST",
    data: {
      id: updateEmployeeID,
    },
    dataType: "json",

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);

        $("#updateFirstNameInput").val(result["data"][0]["firstName"]);
        $("#updateLastNameInput").val(result["data"][0]["lastName"]);
        $("#updateEmailInput").val(result["data"][0]["email"]);
        $("#updateJobTitleInput").val(result["data"][0]["jobTitle"]);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function getDepartmentByID() {
  $.ajax({
    url: "libs/php/getDepartmentByID.php",
    type: "POST",
    data: {
      id: updateDepartmentID,
    },
    dataType: "json",

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);

        $("#updateDepartmentNameInput").val(result["data"][0]["name"]);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function getLocationByID() {
  $.ajax({
    url: "libs/php/getLocationByID.php",
    type: "POST",
    data: {
      id: updateLocationID,
    },
    dataType: "json",

    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);

        $("#updateLocationNameInput").val(result["data"][0]["name"]);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Insert functions
function insertNewEmployee() {
  $.ajax({
    url: "libs/php/insertEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      firstName: $("#firstNameInput").val(),
      lastName: $("#lastNameInput").val(),
      jobTitle: $("#jobTitleInput").val(),
      email: $("#emailInput").val(),
      departmentID: $("#departmentSelect")
        .find(":selected")
        .data("department-id"),
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Employee successfully added");
        $("#addEmployeeModal").modal("hide");
        $(document).ready(function () {
          getAllEmployees();
        });
        $("#firstNameInput").val("");
        $("#lastNameInput").val("");
        $("#emailInput").val("");
        $("#jobTitleInput").val("");
        $("#departmentSelect").val("selectADepartment");
        $("#addEmployeeLocationSelect").empty();
        $("#addEmployeeLocationSelect").append(
          $("<option>", {
            value: "selectALocation",
            text: "Select a Location",
          })
        );
        $("#employeeConfirmAddCheck").prop("checked", false);
        $("#employeeConfirmAddBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function insertNewDepartment() {
  $.ajax({
    url: "libs/php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#departmentNameInput").val(),
      locationID: $("#addDepartmentLocationSelect").val(),
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Department successfully added");
        $("#addDepartmentModal").modal("hide");
        $(document).ready(function () {
          getAllDepartments();
        });
        $("#departmentNameInput").val("");
        $("#addDepartmentLocationSelect").val("selectALocation");
        $("#departmentConfirmAddCheck").prop("checked", false);
        $("#departmentConfirmAddBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

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

// Update functions
function updateEmployee() {
  $.ajax({
    url: "libs/php/updateEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      firstName: $("#updateFirstNameInput").val(),
      lastName: $("#updateLastNameInput").val(),
      email: $("#updateEmailInput").val(),
      jobTitle: $("#updateJobTitleInput").val(),
      departmentID: $("#updateDepartmentSelect")
        .find(":selected")
        .data("department-id"),
      id: updateEmployeeID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Employee successfully updated");
        $("#updateEmployeeModal").modal("hide");
        $(document).ready(function () {
          getAllEmployees();
        });
        $("#filterByDepartment").val("allDepartments");
        $("#filterByDepartment").attr("disabled", false);
        $("#mobileFilterByDepartment").val("allDepartments");
        $("#mobileFilterByDepartment").attr("disabled", false);
        $("#filterByLocation").val("allLocations");
        $("#filterByLocation").attr("disabled", false);
        $("#mobileFilterByLocation").val("allLocations");
        $("#mobileFilterByLocation").attr("disabled", false);
        $("#employeeConfirmUpdateCheck").prop("checked", false);
        $("#employeeConfirmUpdateBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function updateDepartment() {
  $.ajax({
    url: "libs/php/updateDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#updateDepartmentNameInput").val(),
      locationID: $("#updateDepartmentLocationSelect").val(),
      id: updateDepartmentID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Department successfully updated");
        $("#updateDepartmentModal").modal("hide");
        $(document).ready(function () {
          getAllDepartments();
        });
        $("#departmentConfirmUpdateCheck").prop("checked", false);
        $("#departmentConfirmUpdateBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function updateLocation() {
  $.ajax({
    url: "libs/php/updateLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#updateLocationNameInput").val(),
      id: updateLocationID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Location successfully updated");
        $("#updateLocationModal").modal("hide");
        $(document).ready(function () {
          getAllLocations();
        });
        $("#locationConfirmUpdateCheck").prop("checked", false);
        $("#locationConfirmUpdateBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Delete functions
function deleteEmployee() {
  $.ajax({
    url: "libs/php/deleteEmployeeByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: deleteEmployeeID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Employee successfully deleted");
        $("#deleteEmployeeModal").modal("hide");
        $(document).ready(function () {
          getAllEmployees();
        });
        $("#employeeConfirmDeleteCheck").prop("checked", false);
        $("#employeeConfirmDeleteBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function deleteDepartment() {
  $.ajax({
    url: "libs/php/deleteDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: deleteDepartmentID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        console.log("Department successfully deleted");
        $("#deleteDepartmentModal").modal("hide");
        $(document).ready(function () {
          getAllDepartments();
        });
        $("#departmentConfirmDeleteCheck").prop("checked", false);
        $("#departmentConfirmDeleteBtn").attr("disabled", true);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

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
    type: "POST",
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
            `<div class='card'><table><tr><td class='alignCenter'><img src='./img/user-icon.png' class='userIcon'></td></tr></table><div class='card-body'><table><tr><td class='fullName alignCenter'><b>${result.data[i].firstName} ${result.data[i].lastName}</b><a href='mailto:${result.data[i].email}'><i class="fas fa-envelope-open-text"></i></a></td></tr></table><table class='table table-striped mt-3'><tr><td class='alignLeft'><i class="fas fa-network-wired"></i><b>Department: </b></td><td class='department alignRight'>${result.data[i].department}</td></tr><tr><td class='alignLeft'><i class="fas fa-search-location"></i><b>Location:</b></td><td class='location alignRight'>${result.data[i].location}</td></tr></table><table><tr><td class='alignCenter'><button type='button' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' class='btn btn-danger btn-sm'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function employeeMobileFilterByDepartment() {
  $.ajax({
    url: "libs/php/employeeFilterByDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#mobileFilterByDepartment").val(),
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
            `<div class='card'><table><tr><td class='alignCenter'><img src='./img/user-icon.png' class='userIcon'></td></tr></table><div class='card-body'><table><tr><td class='fullName alignCenter'><b>${result.data[i].firstName} ${result.data[i].lastName}</b><a href='mailto:${result.data[i].email}'><i class="fas fa-envelope-open-text"></i></a></td></tr></table><table class='table table-striped mt-3'><tr><td class='alignLeft'><i class="fas fa-network-wired"></i><b>Department: </b></td><td class='department alignRight'>${result.data[i].department}</td></tr><tr><td class='alignLeft'><i class="fas fa-search-location"></i><b>Location:</b></td><td class='location alignRight'>${result.data[i].location}</td></tr></table><table><tr><td class='alignCenter'><button type='button' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' class='btn btn-danger btn-sm'>Delete</button></td></tr></table></div></div>`
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
    type: "POST",
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
            `<div class='card'><table><tr><td class='alignCenter'><img src='./img/user-icon.png' class='userIcon'></td></tr></table><div class='card-body'><table><tr><td class='fullName alignCenter'><b>${result.data[i].firstName} ${result.data[i].lastName}</b><a href='mailto:${result.data[i].email}'><i class="fas fa-envelope-open-text"></i></a></td></tr></table><table class='table table-striped mt-3'><tr><td class='alignLeft'><i class="fas fa-network-wired"></i><b>Department: </b></td><td class='department alignRight'>${result.data[i].department}</td></tr><tr><td class='alignLeft'><i class="fas fa-search-location"></i><b>Location:</b></td><td class='location alignRight'>${result.data[i].location}</td></tr></table><table><tr><td class='alignCenter'><button type='button' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' class='btn btn-danger btn-sm'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

function employeeMobileFilterByLocation() {
  $.ajax({
    url: "libs/php/employeeFilterByLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#mobileFilterByLocation").val(),
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
            `<div class='card'><table><tr><td class='alignCenter'><img src='./img/user-icon.png' class='userIcon'></td></tr></table><div class='card-body'><table><tr><td class='fullName alignCenter'><b>${result.data[i].firstName} ${result.data[i].lastName}</b><a href='mailto:${result.data[i].email}'><i class="fas fa-envelope-open-text"></i></a></td></tr></table><table class='table table-striped mt-3'><tr><td class='alignLeft'><i class="fas fa-network-wired"></i><b>Department: </b></td><td class='department alignRight'>${result.data[i].department}</td></tr><tr><td class='alignLeft'><i class="fas fa-search-location"></i><b>Location:</b></td><td class='location alignRight'>${result.data[i].location}</td></tr></table><table><tr><td class='alignCenter'><button type='button' class='btn btn-primary btn-sm'>Edit</button></td><td class='alignCenter'><button type='button' class='btn btn-danger btn-sm'>Delete</button></td></tr></table></div></div>`
          );
        }
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Count employee function
function countEmployeeByDepartmentID() {
  $.ajax({
    url: "libs/php/countEmployeeByDepartmentID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: deleteDepartmentID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        employeeCount = result["data"][0]["COUNT(id)"];
        console.log(employeeCount);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Count department function
function countDepartmentByLocationID() {
  $.ajax({
    url: "libs/php/countDepartmentByLocationID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: deleteLocationID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        departmentCount = result["data"][0]["COUNT(id)"];
        console.log(departmentCount);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Validate add form functions
function validateAddEmployeeForm() {
  if (
    $("#firstNameInput").val() == "" ||
    $("#firstNameInput").val() == " " ||
    $("#lastNameInput").val() == "" ||
    $("#lastNameInput").val() == " " ||
    $("#emailInput").val() == "" ||
    $("#emailInput").val() == " " ||
    $("#jobTitleInput").val() == "" ||
    $("#jobTitleInput").val() == " " ||
    $("#departmentSelect").val() == "selectADepartment" ||
    $("#addEmployeeLocationSelect").val() == "selectALocation"
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}

function validateAddDepartmentForm() {
  if (
    $("#departmentNameInput").val() == "" ||
    $("#departmentNameInput").val() == " " ||
    $("#addDepartmentLocationSelect").val() == "selectALocation"
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}

function validateAddLocationForm() {
  if (
    $("#locationNameInput").val() == "" ||
    $("#locationNameInput").val() == " "
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}

// Validate update form functions
function validateUpdateEmployeeForm() {
  if (
    $("#updateFirstNameInput").val() == "" ||
    $("#updateFirstNameInput").val() == " " ||
    $("#updateLastNameInput").val() == "" ||
    $("#updateLastNameInput").val() == " " ||
    $("#updateEmailInput").val() == "" ||
    $("#updateEmailInput").val() == " " ||
    $("#updateJobTitleInput").val() == "" ||
    $("#updateJobTitleInput").val() == " " ||
    $("#updateDepartmentSelect").val() == "selectADepartment" ||
    $("#updateEmployeeLocationSelect").val() == "selectALocation"
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}

function validateUpdateDepartmentForm() {
  if (
    $("#updateDepartmentNameInput").val() == "" ||
    $("#updateDepartmentNameInput").val() == " " ||
    $("#updateDepartmentLocationSelect").val() == "selectALocation"
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}

function validateUpdateLocationForm() {
  if (
    $("#updateLocationNameInput").val() == "" ||
    $("#updateLocationNameInput").val() == " "
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}

// Retrieve all records on load
$(document).ready(() => {
  getAllEmployees();
});

// Dynamically populate department select filter - desktop
$.ajax({
  url: "libs/php/getAllDepartments.php",
  type: "POST",
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

// Dynamically populate department select filter - mobile
$.ajax({
  url: "libs/php/getAllDepartments.php",
  type: "POST",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#mobileFilterByDepartment").append(
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

// Dynamically populate location select filter - desktop
$.ajax({
  url: "libs/php/getAllLocations.php",
  type: "POST",
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

// Dynamically populate location select filter - mobile
$.ajax({
  url: "libs/php/getAllLocations.php",
  type: "POST",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#mobileFilterByLocation").append(
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

// Dynamically populate department select in add employee modal
$.ajax({
  url: "libs/php/getDepartmentLocationID.php",
  type: "POST",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#departmentSelect").append(
        $("<option>", {
          value: result.data[index].locationID,
          text: result.data[index].name,
          "data-department-id": result.data[index].id,
        })
      );
    });
  },

  error: function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown);
  },
});

// Dynamically populate department select in update employee modal
$.ajax({
  url: "libs/php/getDepartmentLocationID.php",
  type: "POST",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#updateDepartmentSelect").append(
        $("<option>", {
          value: result.data[index].locationID,
          text: result.data[index].name,
          "data-department-id": result.data[index].id,
        })
      );
    });
  },

  error: function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown);
  },
});

// Dynamically populate location select in add employee modal on change of department select
$("#departmentSelect").change(function () {
  $.ajax({
    url: "libs/php/getDepartmentLocations.php",
    type: "POST",
    data: {
      id: $("#departmentSelect").val(),
    },
    dataType: "json",
    success: function (result) {
      if ($("#departmentSelect").val() == "selectADepartment") {
        $("#addEmployeeLocationSelect").empty();
        $("#addEmployeeLocationSelect").append(
          $("<option>", {
            value: "selectALocation",
            text: "Select a Location",
          })
        );
      } else {
        $("#addEmployeeLocationSelect").empty();
        $.each(result.data, function (index) {
          $("#addEmployeeLocationSelect").append(
            $("<option>", {
              value: result.data[index].id,
              text: result.data[index].name,
            })
          );
        });
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
});

// Dynamically populate location select in update employee modal on change of department select
$("#updateDepartmentSelect").change(function () {
  $.ajax({
    url: "libs/php/getDepartmentLocations.php",
    type: "POST",
    data: {
      id: $("#updateDepartmentSelect").val(),
    },
    dataType: "json",
    success: function (result) {
      if ($("#updateDepartmentSelect").val() == "selectADepartment") {
        $("#updateEmployeeLocationSelect").empty();
        $("#updateEmployeeLocationSelect").append(
          $("<option>", {
            value: "selectALocation",
            text: "Select a Location",
          })
        );
      } else {
        $("#updateEmployeeLocationSelect").empty();
        $.each(result.data, function (index) {
          $("#updateEmployeeLocationSelect").append(
            $("<option>", {
              value: result.data[index].id,
              text: result.data[index].name,
              "data-test": "test",
            })
          );
        });
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
});

// Dynamically populate location select in add department modal
$.ajax({
  url: "libs/php/getAllLocations.php",
  type: "POST",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#addDepartmentLocationSelect").append(
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

// Dynamically populate location select in update department modal
$.ajax({
  url: "libs/php/getAllLocations.php",
  type: "POST",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#updateDepartmentLocationSelect").append(
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

// Show corresponding buttons / filter options for search select value - desktop
$("#searchFor").change(function () {
  if ($("#searchFor").val() == "employees") {
    $("#filterByTitle").show();
    $("#filterByDepartment").show();
    $("#filterByLocation").show();
    $(".lineBreak").show();
    $("#addEmployeeBtn").show();
    $("#addDepartmentBtn").hide();
    $("#addLocationBtn").hide();
    getAllEmployees();
  }

  if ($("#searchFor").val() == "departments") {
    $("#filterByTitle").hide();
    $("#filterByDepartment").hide();
    $("#filterByLocation").hide();
    $(".lineBreak").hide();
    $("#addEmployeeBtn").hide();
    $("#addDepartmentBtn").show();
    $("#addLocationBtn").hide();
    getAllDepartments();
  }

  if ($("#searchFor").val() == "locations") {
    $("#filterByTitle").hide();
    $("#filterByDepartment").hide();
    $("#filterByLocation").hide();
    $(".lineBreak").hide();
    $("#addEmployeeBtn").hide();
    $("#addDepartmentBtn").hide();
    $("#addLocationBtn").show();
    getAllLocations();
  }
});

// Show corresponding buttons / filter options for search select value - mobile
$("#mobileSearchFor").change(function () {
  if ($("#mobileSearchFor").val() == "employees") {
    $("#mobileFilterBtn").show();
    $("#mobileFilterByDepartment").show();
    $("#mobileFilterByLocation").show();
    $("#mobileAddEmployeeBtn").show();
    $("#mobileAddDepartmentBtn").hide();
    $("#mobileAddLocationBtn").hide();
    getAllEmployees();
  }

  if ($("#mobileSearchFor").val() == "departments") {
    $("#mobileFilterBtn").hide();
    $("#mobileFilterByDepartment").hide();
    $("#mobileFilterByLocation").hide();
    $("#mobileAddEmployeeBtn").hide();
    $("#mobileAddDepartmentBtn").show();
    $("#mobileAddLocationBtn").hide();
    getAllDepartments();
  }

  if ($("#mobileSearchFor").val() == "locations") {
    $("#mobileFilterBtn").hide();
    $("#mobileFilterByDepartment").hide();
    $("#mobileFilterByLocation").hide();
    $("#mobileAddEmployeeBtn").hide();
    $("#mobileAddDepartmentBtn").hide();
    $("#mobileAddLocationBtn").show();
    getAllLocations();
  }
});

// Disable location select on department select change - desktop
$("#filterByDepartment").change(function () {
  if ($("#filterByDepartment").val() == "allDepartments") {
    $("#filterByLocation").attr("disabled", false);
    getAllEmployees();
  } else {
    $("#filterByLocation").attr("disabled", true);
    employeeFilterByDepartment();
    $(".mobileFilterDropdown").hide();
  }
});

// Disable location select on department select change - mobile
$("#mobileFilterByDepartment").change(function () {
  if ($("#mobileFilterByDepartment").val() == "allDepartments") {
    $("#mobileFilterByLocation").attr("disabled", false);
    getAllEmployees();
  } else {
    $("#mobileFilterByLocation").attr("disabled", true);
    employeeMobileFilterByDepartment();
    $(".mobileFilterDropdown").hide();
  }
});

// Disable department select on location select change - desktop
$("#filterByLocation").change(function () {
  if ($("#filterByLocation").val() == "allLocations") {
    $("#filterByDepartment").attr("disabled", false);
    getAllEmployees();
  } else {
    $("#filterByDepartment").attr("disabled", true);
    employeeFilterByLocation();
    $(".mobileFilterDropdown").hide();
  }
});

// Disable department select on location select change - mobile
$("#mobileFilterByLocation").change(function () {
  if ($("#mobileFilterByLocation").val() == "allLocations") {
    $("#mobileFilterByDepartment").attr("disabled", false);
    getAllEmployees();
  } else {
    $("#mobileFilterByDepartment").attr("disabled", true);
    employeeMobileFilterByLocation();
    $(".mobileFilterDropdown").hide();
  }
});

// Enable add buttons on change of confirmation checkbox
$("#employeeConfirmAddCheck").click(function () {
  if (validateAddEmployeeForm()) {
    if ($(this).is(":checked")) {
      $("#employeeConfirmAddBtn").attr("disabled", false);
    } else {
      $("#employeeConfirmAddBtn").attr("disabled", true);
    }
  } else {
    $("#employeeConfirmAddCheck").prop("checked", false);
  }
});

$("#departmentConfirmAddCheck").click(function () {
  if (validateAddDepartmentForm()) {
    if ($(this).is(":checked")) {
      $("#departmentConfirmAddBtn").attr("disabled", false);
    } else {
      $("#departmentConfirmAddBtn").attr("disabled", true);
    }
  } else {
    $("#departmentConfirmAddCheck").prop("checked", false);
  }
});

$("#locationConfirmAddCheck").click(function () {
  if (validateAddLocationForm()) {
    if ($(this).is(":checked")) {
      $("#locationConfirmAddBtn").attr("disabled", false);
    } else {
      $("#locationConfirmAddBtn").attr("disabled", true);
    }
  } else {
    $("#locationConfirmAddCheck").prop("checked", false);
  }
});

// Enable update buttons on change of confirmation checkbox
$("#employeeConfirmUpdateCheck").click(function () {
  if (validateUpdateEmployeeForm()) {
    if ($(this).is(":checked")) {
      $("#employeeConfirmUpdateBtn").attr("disabled", false);
    } else {
      $("#employeeConfirmUpdateBtn").attr("disabled", true);
    }
  } else {
    $("#employeeConfirmUpdateCheck").prop("checked", false);
  }
});

$("#departmentConfirmUpdateCheck").click(function () {
  if (validateUpdateDepartmentForm()) {
    if ($(this).is(":checked")) {
      $("#departmentConfirmUpdateBtn").attr("disabled", false);
    } else {
      $("#departmentConfirmUpdateBtn").attr("disabled", true);
    }
  } else {
    $("#departmentConfirmUpdateCheck").prop("checked", false);
  }
});

$("#locationConfirmUpdateCheck").click(function () {
  if (validateUpdateLocationForm()) {
    if ($(this).is(":checked")) {
      $("#locationConfirmUpdateBtn").attr("disabled", false);
    } else {
      $("#locationConfirmUpdateBtn").attr("disabled", true);
    }
  } else {
    $("#locationConfirmUpdateCheck").prop("checked", false);
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
    if (employeeCount == 0) {
      $("#departmentConfirmDeleteBtn").attr("disabled", false);
    } else {
      alert(
        "You cannot delete this department because it has employee records assigned to it. Please reassign employee records to another department to allow deletion."
      );
      $("#departmentConfirmDeleteCheck").prop("checked", false);
    }
  } else {
    $("#departmentConfirmDeleteBtn").attr("disabled", true);
  }
});

$("#locationConfirmDeleteCheck").click(function () {
  if ($(this).is(":checked")) {
    if (departmentCount == 0) {
      $("#locationConfirmDeleteBtn").attr("disabled", false);
    } else {
      alert(
        "You cannot delete this location because it has department records assigned to it. Please reassign department records to another location to allow deletion."
      );
      $("#locationConfirmDeleteCheck").prop("checked", false);
    }
  } else {
    $("#locationConfirmDeleteBtn").attr("disabled", true);
  }
});

// Run insert routines on add button click
$("#employeeConfirmAddBtn").click(function () {
  insertNewEmployee();
});

$("#departmentConfirmAddBtn").click(function () {
  insertNewDepartment();
});

$("#locationConfirmAddBtn").click(function () {
  insertNewLocation();
});

// Run update routines on update button click
$("#employeeConfirmUpdateBtn").click(function () {
  updateEmployee();
});

$("#departmentConfirmUpdateBtn").click(function () {
  updateDepartment();
});

$("#locationConfirmUpdateBtn").click(function () {
  updateLocation();
});

// Get input data for update department modal
$("#updateEmployeeModal").on("show.bs.modal", function (e) {
  updateEmployeeID = $(e.relatedTarget).data("employee-id");
  console.log(updateEmployeeID);
  getEmployeeByID();
});

// Get input data for update department modal
$("#updateDepartmentModal").on("show.bs.modal", function (e) {
  updateDepartmentID = $(e.relatedTarget).data("department-id");
  console.log(updateDepartmentID);
  getDepartmentByID();
});

// Get input data for update location modal
$("#updateLocationModal").on("show.bs.modal", function (e) {
  updateLocationID = $(e.relatedTarget).data("location-id");
  console.log(updateLocationID);
  getLocationByID();
});

// Get employee ID for deletion
$("#deleteEmployeeModal").on("show.bs.modal", function (e) {
  deleteEmployeeID = $(e.relatedTarget).data("employee-id");
  console.log(deleteEmployeeID);
});

// Get department ID for deletion
$("#deleteDepartmentModal").on("show.bs.modal", function (e) {
  deleteDepartmentID = $(e.relatedTarget).data("department-id");
  console.log(deleteDepartmentID);
  countEmployeeByDepartmentID();
});

// Get location ID for deletion
$("#deleteLocationModal").on("show.bs.modal", function (e) {
  deleteLocationID = $(e.relatedTarget).data("location-id");
  console.log(deleteLocationID);
  countDepartmentByLocationID();
});

// Run delete routines on delete button click
$("#employeeConfirmDeleteBtn").click(function () {
  deleteEmployee();
});

$("#departmentConfirmDeleteBtn").click(function () {
  deleteDepartment();
});

$("#locationConfirmDeleteBtn").click(function () {
  deleteLocation();
});

$(document).ready(function () {
  $(".mobileFilterDropdown").hide();
});

$("#mobileFilterBtn").click(function () {
  $(".mobileFilterDropdown").toggle();
});
