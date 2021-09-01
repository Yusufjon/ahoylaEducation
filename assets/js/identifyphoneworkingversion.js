 var input = document.querySelector("#phone"),
 errorMsg = document.querySelector("#error-msg"),
 validMsg = document.querySelector("#valid-msg");
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
 
$('.intl-tel-input, .iti').find('input.form-control').each(function(index, element) {
	let label = $(element).parent().find('~ label');
	$(element).after(label);
});

$("input").focus(function(e){
  if (!validEmail( $("#email").val() ) ) {
      $("#checkEmail").html('Э-почта <i class="fas fa-exclamation-circle"></i>    Input valid email').css("color","red");
  }else{
      $("#checkEmail").html('Электронная почта <i class="fas fa-check-circle"></i>').css("color","green");
  }
  if($("#name").val().split('').length >= 1)
  {
      $("#error-name").html('Имя <i class="fas fa-check-circle"></i>').css("color","green");
  }else{
      $("#error-name").html('Имя <i class="fas fa-exclamation-circle"></i>  Input your fullname').css("color","red");
  }
  e.preventDefault();
})
function validEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
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


