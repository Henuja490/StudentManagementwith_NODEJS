$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get('id');
    
    
    if(!(isNaN(sid))){
        $.ajax({
            url: `http://localhost:3000/admin/students/SID/${sid}`,
            type: 'GET',
            success: function(allStudents) {
                updateStudentsTable(allStudents);
            },
            error: function(error) {
                alert('Error searching students');
            }
        });
        
        
    }else{
        $.ajax({
            url: `http://localhost:3000/admin/students/firstname/${sid}`,
            type: 'GET',
            success: function(allStudents) {
                updateStudentsTable(allStudents);
            },
            error: function(error) {
                alert('Error searching students');
            }
        });
    }
    
    $('#updateStudentForm').on('submit', function(event) {
        event.preventDefault();
        
        const student = {
            SID: parseInt($('#updateSid').val()),
            FirstName: $('#updateFirstName').val(),
            LastName: $('#updateLastName').val(),
            Email: $('#updateEmail').val(),
            NearCity: $('#updateCity').val(),
            Phonenumber: $('#updatephonenumber').val(),
            Course: $('#updateCourses').val().split(',').map(course => course.trim()),
            Guardian: $('#updateGuardian').val(),
            Subjects: $('#updatesubjects').val().split(',').map(subject => subject.trim()),
            Semester_in:{
                year: parseInt($('#updateyear').val()),
                semester:   parseInt($('#updatesem').val())
            },
            Semester_pay:{
                year: parseInt($('#updatepaidyear').val()),
                semester:   parseInt($('#updatepaidsem').val())
            },
            password: $('#updatepassword').val()
        };

        if(!(isNaN(sid))){
            $.ajax({
                url: `http://localhost:3000/admin/students/${sid}`,
                type: 'PUT',
                contentType: 'application/json',
            data: JSON.stringify(student),
            success: function(result) {
                
            }
            });
            window.location.href='index.html';
            
        }else{
            $.ajax({
                url: `http://localhost:3000/admin/students/firstname/${sid}`,
                type: 'PUT',
                contentType: 'application/json',
            data: JSON.stringify(student),
            success: function(result) {

                
            }
            });
            window.location.href= 'index.html';
        }
        
    });
    

    
})

function updateStudentsTable(students){
    students.forEach(student => {
        $('#updateSid').val(student.SID);
        $('#updateFirstName').val(student.FirstName);
        $('#updateLastName').val(student.LastName);
        $('#updateEmail').val(student.Email);
        $('#updateCity').val(student.NearCity);
        $('#updateCourses').val(student.Course.join(', '));
        $('#updateGuardian').val(student.Guardian);
        $('#updatesubjects').val(student.Subjects.join(','));
        $('#updatephonenumber').val(student.Phonenumber)
        $('#updateyear').val(student.Semester_in.year);
        $('#updatesem').val(student.Semester_in.semester);
        $('#updatepaidyear').val(student.Semester_pay.year);
        $('#updatepaidsem').val(student.Semester_pay.semester);
        $('#updatepassword').val(student.password);
    })
}
    