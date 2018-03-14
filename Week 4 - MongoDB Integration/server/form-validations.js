// Wait for the DOM to be ready
$(function() {
    $("#dob").datepicker();
  
    //Form Validator
    $("form[name='registration']").validate({
    onclick: false,
    rules: {
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      },
      dob: {
        required: true,
        date: true
      },
      website: {
          required: true,
          url: true
      },
      age: {
          required: true,
          number: true
      }
    },

    //Error messages
    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your lastname",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      email: "Please enter a valid email address",
      dob: "Please enter a valid date",
      website: "Please enter a Website URL",
      age: "Please enter a valid Age",
    },
    errorPlacement: function (error, element){
        alert(error.html());
    },
    submitHandler: function(form) {
      var s = prepareData();
      alert(getAlertText());
      $("#display_values").html(s);
      //form.submit();
    }
  });
});


function validate_registration(){
    
}

function prepareData(){
    var s = "<p>First Name: "+$("#firstname").val()+"<br/>Last Name: "+$("#lastname").val()
        +"<br/>Email: "+$("#email").val()+"<br/>Password: "+$("#password").val()+"<br/>Date of Birth: "+$("#dob").val()
        +"<br/>Website URL: "+$("#website").val()+"<br/>Age: "+$("#age").val()+"</p>";
    return s;
}
function getAlertText(){
    var s = "First Name: "+$("#firstname").val()+"\nLast Name: "+$("#lastname").val()
        +"\nEmail: "+$("#email").val()+"\nPassword: "+$("#password").val()+"\nDate of Birth: "+$("#dob").val()
        +"\nWebsite URL: "+$("#website").val()+"\nAge: "+$("#age").val();
    return s;
}