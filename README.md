# Company Directory

## Summary:

The Company Directory is a single page CRUD application, that works well across desktop, tablet and mobile devices. The Company Directory allows users to create, read, update and delete employee, department and location records within the Company Directory.

You can visit the live version [here.](https://company-directory.samwelsh.co.uk/)

## Technologies used:

* HTML5.
* CSS3.
* SASS.
* Bootstrap.
* JavaScript and jQuery for DOM manipulation / AJAX.
* PHP.
* MySQL.

## How the Company Directory works:

1. Once the page has loaded, the user can choose if they would like to view employee, department or location records using the select bar. By default, employee records are displayed.
    * If employee records are selected, the user can also apply department or location filters to specify their search.
2. The user can add a new record to the Company Directory by clicking the 'add' button. Once clicked, a modal will show, allowing the user to input record data and then save that record to the database. All fields must be filled in. If not, the user will be alerted and will not be able to create a new record until they have done so.
3. The user can update any record information by clicking on the 'edit' button on the record card. Once clicked, a modal will show, allowing the user to make any updates to the existing record. Again, all fields must be filled in, otherwise the user will be unable to make changes to the record.
4. Finally, the user can delete records from the Company Directory by clicking on the delete button on the record card. Once clicked, a confirmation modal will show. The user then has to check the confirmation box before being able to permanently delete the record.
