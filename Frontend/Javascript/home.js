$(document).ready(function(){
    var sessionToken = $.cookie('student');
    
if (!sessionToken) {
    window.location.href = 'studentlog.html'; 
}

$.ajax({
    url: `http://localhost:3000/admin/students/sid/${sessionToken}`,
    type: 'GET',
    success: function(allStudents) {
        updatedata(allStudents)
    },
    error: function(error) {
        alert('Error username or password');
    }
});

function updatedata(student){
    $('#name').text(student[0].FirstName+" "+student[0].LastName);
    $('#email').text(student[0].Email);
    $('#phonenumber').text(student[0].Phonenumber);
    $('#address').text(student[0].NearCity);
    $('#SemesterIn').text(student[0].Semester_in.year+" Year "+student[0].Semester_in.semester+" Semester");
    $('#SemesterPaid').text(student[0].Semester_pay.year+" Year "+student[0].Semester_pay.semester+" Semester");
    $('#subjects').text(student[0].Subjects.join(', '));
    let card =" "
    for (let index = 0; index < student[0].Course.length; index++) {
        card += `<div class="card mt-3">
                    <div class="card-title">
                        <h4>${student[0].Course[index]}</h4>
                    </div>
                </div>
                    `
        
    }
    $('#Courses').append(card);
    if(!(student[0].Semester_in.year==student[0].Semester_pay.year)){
        $('#Error').text("You haven't paid for the semester")
    }else if (!(student[0].Semester_in.semester<=student[0].Semester_pay.semester)){
        $('#Error').text("You haven't paid for the semester")
    }
}   
})
