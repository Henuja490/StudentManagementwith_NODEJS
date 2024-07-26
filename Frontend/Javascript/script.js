
$(document).ready(function() {
    
    var sessionToken = $.cookie('sessionToken');
    
    if (!sessionToken) {
        window.location.href = 'adminlog.html'; 
    }
    

    
    $('#addStudentForm').on('submit', function(event) {
        event.preventDefault();

        const student = {
            SID: parseInt($('#sid').val()),
            FirstName: $('#firstName').val(),
            LastName: $('#lastName').val(),
            Email: $('#email').val(),
            NearCity: $('#city').val(),
            Course: $('#courses').val().split(',').map(course => course.trim()),
            Guardian: $('#guardian').val(),
            Subjects: $('#subjects').val().split(',').map(subject => subject.trim()),
            Phonenumber: $('#phonenumber').val(),
            Semester_in:{
                year: parseInt($('#year').val()),
                semester:   parseInt($('#sem').val())
            },
            Semester_pay:{
                year: parseInt($('#paidyear').val()),
                semester:   parseInt($('#paidsem').val())
            },
            password: $('#password').val()
        };

        $.ajax({
            url: 'http://localhost:3000/admin/students',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(student),
            success: function(result) {
                alert('Student added successfully');
                $('#addStudentForm')[0].reset();
                fetchStudents();
            }
        });
        window.location.href = "index.html"
    });

    $('#searchStudentsForm').on('submit', function(event) {
        event.preventDefault();

        const searchField = $('#searchField').val();
        const searchValue = $('#searchValue').val();
        
        $.ajax({
            url: `http://localhost:3000/admin/students/${searchField}/${searchValue}`,
            type: 'GET',
            success: function(allStudents) {
                updateStudentsTable(allStudents);
            },
            error: function(error) {
                alert('Error searching students');
            }
        });
    });

    function fetchStudents() {
        $.ajax({
            url: 'http://localhost:3000/admin/',
            type: 'GET',
            dataType :'json',
            success: function(allStudents) {
                console.log(allStudents)
                updateStudentsTable(allStudents);
            }
        });
    }

    function updateStudentsTable(students) {
        const tableBody = $('#studentsTable tbody');
        tableBody.empty();
        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.SID}</td>
                    <td>${student.FirstName}</td>
                    <td>${student.LastName}</td>
                    <td>${student.Email}</td>
                    <td>${student.NearCity}</td>
                    <td>${student.Course.join(', ')}</td>
                    <td>${student.Guardian}</td>
                    <td>${student.Phonenumber}</td>
                    <td>${student.Semester_in.year} year ${student.Semester_in.semester} semester </td>
                    <td>${student.Semester_pay.year} year ${student.Semester_pay.semester} semester </td>
                    <td>
                    <button class="btn btn-secondary dropdown-toggle bg-dark edit-button " type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" data-sid="${student.SID}">
                              Update By
                            </button>
                            <ul class="dropdown-menu ">
                                <li><a class="dropdown-item edit-button" href="updatestudent.html?id=${student.SID}" id="update-sid" >Student ID</a></li>
                                <li><a class="dropdown-item edit-button" href="updatestudent.html?id=${student.FirstName}" id="update-fname" >First Name</a></li>
                               
                            </ul>
                            <button class="btn btn-outline-danger btn-sm delete-button mt-2" data-sid="${student.SID}">Delete</button>
                </td>
                </tr>
            `;
            
            tableBody.append(row)
        });

        
        $('.delete-button').on('click', function() {
            const sid = $(this).data('sid');
            console.log(`http://localhost:3000/admin/deletestudents/${sid}`);
            $.ajax({
                url: `http://localhost:3000/admin/deletestudents/${sid}`,
                type: 'DELETE',
                success: function(result) {
                    alert(result);
                    
                    fetchStudents();
                }
                
            });
        });
    }

    // Fetch all students on page load
    fetchStudents();
});