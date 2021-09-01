 var input = document.querySelector("#phone"),
 errorMsg = document.querySelector(".label"),
 validMsg = document.querySelector("#valid-msg");
 label = document.querySelector("#label");
 var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
 var successMap = ["Valid"];
  var iti = window.intlTelInput(input, {
    initialCountry:"auto",
    geoIpLookup: function(success, failure) {
      $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        success(countryCode);
      });
    },
      nationalMode:true,
      formatOnDisplay: true,
      seperateDialCode:true,
      preferredCountries: ['cz', 'ru','kz','ua'],
      hiddenInput:"full_number",
     utilsScript: "../assets/js/utils.js",
   
    });
 


// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);



  input.addEventListener('blur', function(event) {
    reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        validMsg.classList.remove("hide");
        return true;
      } else {
        input.classList.add("error");
        var errorCode = iti.getValidationError();
        errorMsg.innerHTML = errorMap[errorCode];
        errorMsg.classList.remove("hide");
        event.preventDefault();
        return false;
      
      }
    };
  });

  document.getElementById("validate").addEventListener("click",function(event){
  if(iti.getValidationError()){
 
      event.preventDefault();
      return false;
  }else{
    
    return true;
  }
  })




  $('.intl-tel-input, .iti').find('input.form-control').each(function(index, element) {
    let label = $(element).parent().find('~ label');
    $(element).after(label);
  });


          
    







  $('input#name').keyup('blur', function(e) {
      if( $(this).val() == ''  || $(this).val() == "null") {
 $("#error-name").html('Имя <i class="fas fa-exclamation-circle"></i>  Input your fullname').css("color","red");       
      } else {
        $("#error-name").html('Имя <i class="fas fa-check-circle"></i>').css("color","green");
              }
              e.preventDefault();
              return false;
  })



$("#email").keyup(function(e){
  if (!validEmail( $("#email").val() ) ) {
      $("#checkEmail").html('Э-почта <i class="fas fa-exclamation-circle"></i>    Input valid email').css("color","red");
  }else{
      $("#checkEmail").html('Электронная почта <i class="fas fa-check-circle"></i>').css("color","green");
  }

  e.preventDefault();
  return false;
})





function validEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};


var reset = function() {

};



$("#phone").keyup(function(e){
  if (iti.isValidNumber( $("#phone"))) {
    $("#valid").html('Мобилный телефон <i class="fas fa-check-circle"></i>').css("color","green");
     return true;
  }else
  {
    $(".label").html('Мобилный телефон <i class="fas fa-exclamation-circle"></i>').css("color","red");
  
  }

  e.preventDefault();
  return false;
})