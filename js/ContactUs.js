// ----------------------------save the data------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        validateAndSave();
    });
});

function validateAndSave() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var services = document.getElementById('services').value;
    var message = document.getElementById('message').value;

    if (name.trim() === '' || phone.trim() === '' || email.trim() === '' || services.trim() === '' || message.trim() === '') {
        // Display error message if any field is empty
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (!validateEmail(email)) {
        // Display error message if email is invalid
        Swal.fire({
            title: 'Error!',
            text: 'Please enter a valid email address.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (!validatePhone(phone)) {
        // Display error message if phone number is invalid
        Swal.fire({
            title: 'Error!',
            text: 'Please enter a valid phone number.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // If all validations pass, proceed to save data
    saveData();
}

function validateEmail(email) {
    // Email validation regex
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhone(phone) {
    // Phone number validation regex
    var re = /^\d{10}$/;
    return re.test(phone);
}

function saveData() {
    var saveData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        services: document.getElementById('services').value,
        message: document.getElementById('message').value
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch("http://localhost:2222/auth/contact-us", {
        method: 'POST',
        body: JSON.stringify(saveData),
        headers: headers,
    })
    .then(response => response.json())
    .then(json => {
        // Display success message using Swal.fire
        Swal.fire({
            title: 'Success!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        console.log(json);
        // Reset form after successful submission
        document.getElementById("contactForm").reset();
    })
    .catch(error => {
        // Display error message using Swal.fire
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while sending your message.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('Error:', error);
    });
}



//     fetch('http://localhost:2222/auth/contact-us', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Authorization': 'Bearer ' + jwtToken,
//         },
//         body: JSON.stringify(saveData)
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Server response:', data);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Saved!',
//                 text: 'Data has been saved successfully.',
//             }).then((result) => {
//                 document.getElementById('name').value = '';
//                 document.getElementById('phone').value = '';
//                 document.getElementById('email').value = '';
//                 document.getElementById('services').value = '';
//                 document.getElementById('message').value = '';
//                 window.location.href = 'ContactUs.html';

//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);

//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error!',
//                 text: 'Failed to save data. Please try again.',
//             });
//         });
// }


// ------------------------------get all the data--------------------------------------

// var jwtToken = localStorage.getItem('jwtToken');

// document.addEventListener('DOMContentLoaded', getData);


// function getData() {
//     var jwtToken = localStorage.getItem('jwtToken');

//     fetch('http://localhost:8181/ibg-infotech/auth/get-all-contact-us', {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + jwtToken,
//         },
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             populateTable(data.data);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }


// function arrayBufferToBase64(buffer) {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//         binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
// }



// function populateTable(data) {
//     const tableBody = document.getElementById('dataTableBody');
//     tableBody.innerHTML = '';

//     if (Array.isArray(data)) {
//         data.forEach((item, index) => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td style="color: #0F4229;">${index + 1}</td>
//                 <td style="color: #0F4229;">${item.name}</td>
//                 <td style="color: #0F4229;">${item.email}</td>
//                 <td style="color: #0F4229;">${item.phone}</td>
//                 <td style="color: #0F4229;">${item.services}</td>
//                 <td style="color: #0F4229;">${item.text}</td>               
//                 <td style="color: #0F4229;">
//                     <a class="edit-btn" data-id="${item.id}"><i class="ti-pencil"></i>Edit</a>
//                     <a class="delete-btn" data-id="${item.id}"><i class="ti-trash"></i>Delete</a>
//                 </td>
//             `;
//             tableBody.appendChild(row);

//             const editBtn = row.querySelector('.edit-btn');
//             editBtn.addEventListener('click', function () {
//                 const id = editBtn.getAttribute('data-id');
//                 console.log("Edit button clicked for ID: " + id);

//                 fetch(`http://localhost:8181/ibg-infotech/auth/get-contact-us/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': 'Bearer ' + jwtToken,
//                     },
//                 })
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error('Network response was not ok');
//                         }
//                         return response.json();
//                     })
//                     .then(data => {

//                         localStorage.setItem('updateData', JSON.stringify(data.data));


//                         window.location.href = 'update-contact.html';
//                     })
//                     .catch(error => {
//                         console.error('Error fetching service data:', error);
//                     });
//             });


//             const deleteBtn = row.querySelector('.delete-btn');
//             deleteBtn.addEventListener('click', () => {
//                 const id = deleteBtn.getAttribute('data-id');
//                 deleteService(id);
//             });
//         });
//     } else {
//         console.error('Data received is not an array:', data);
//     }
// }


// ----------------------------------------delete by id-----------------------------------------------


// function deleteService(id) {
//     var jwtToken = localStorage.getItem('jwtToken');

//     fetch(`http://localhost:8181/ibg-infotech/auth/delete-contact-us/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': 'Bearer ' + jwtToken,
//         },
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Deleted!',
//                 text: 'Service has been deleted successfully.',
//             }).then((result) => {

//                 getData();
//             });
//         })
//         .catch(error => {
//             console.error('Error deleting service:', error);

//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error!',
//                 text: 'Failed to delete the service. Please try again later.',
//             });
//         });
// }

// -----------------------------------update the data by id-------------------------------------------



// function updateData() {
//     var id = document.getElementById('id').value;
//     var name = document.getElementById('name').value;
//     var email = document.getElementById('email').value;
//     var services = document.getElementById('services').value;
//     var text = document.getElementById('text').value;
//     var phone = document.getElementById('phone').value;
//     var jwtToken = localStorage.getItem('jwtToken');


//     if (!name || !text || !email || !phone) {
//         alert('Please fill in all required fields.');
//         return;
//     }


//     if (!jwtToken) {
//         alert('JWT token is missing. Please log in again.');
//         return;
//     }


//     var data = {
//         name: name,
//         email: email,
//         services: services,
//         text: text,
//         phone: phone
//     };

//     fetch(`http://localhost:8181/ibg-infotech/auth/update-contact-us/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + jwtToken,
//         },
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Server response:', data);
//             if (data.status) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Updated!',
//                     text: 'Data has been updated successfully.',
//                 }).then((result) => {

//                     window.location.href = 'Contact-Us.html';
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error!',
//                     text: 'Failed to update data. ' + data.error,
//                 });
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error!',
//                 text: 'Failed to update data. Please try again.',
//             });
//         });
// }