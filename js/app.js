$(window).on('load', function() { // makes sure the whole site is loaded 
    $('#status').fadeOut(); // will first fade out the loading animation 
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
    $('body').delay(350).css({'overflow':'visible'});
});

$(document).ready(function() {

	  // scroll to translate
	$(".link_traslate").on("click", function(evt){
		scroll_traslate=1;
		evt.preventDefault();
		traslate_section($(this).attr("href"));
	});

	$('#scrollUp').click(function(){

		$("html, body").animate({ scrollTop: 0 }, 1100);

		return false;

	});
    
    // $('.collapse').collapse();

    //////////////////////////////////////////////////////////////////////////////  

    // Si es boton submit le doy clic.
    $('.enviar').click(function() {
        
        // Envio los datos de todos los campos del html
        var name           = $('input[name=nombres]');
        var celular        = $('input[name=telefono]');         
        var email          = $('input[name=email]');   
        var ubicacion      = $('input[name=ubicacion_edificio]');
        var comment        = $('textarea[name=mensaje]');       
        var returnError    = false;

        var formData       = $('#fcontacto').serialize();        
        
        // Simple validacion para saber si el usuario ingreso algun valor
        // Agrego un control de errores con js, pero tambien procesando con un archivo PHP.
        // Si encuentra el error, se agrega y resalta la clase .error a los campos de texto, al select y al textarea.
        if (name.val()=='') 
        {
            name.addClass('error');
            returnError = true;
        } else name.removeClass('error');
        
        if (celular.val()=='') 
        {
            celular.addClass('error');
            returnError = true;
        } else celular.removeClass('error');           

        if (email.val()=='') 
        {
            email.addClass('error');
            returnError = true;
        } else email.removeClass('error');
        
        if (ubicacion.val()=='')
        {
            ubicacion.addClass('error');
            returnError = true;
        } else ubicacion.removeClass('error');
        
        if (comment.val()=='') 
        {
            comment.addClass('error');
            returnError = true;
        } else comment.removeClass('error');

        
        // A continuacion se resalta todos los campos que contengan errores.
        if(returnError == true)
        {
            return false;   
        }
                
        // Se inicia el ajax
        $.ajax({
            // Colocamos la url para iniciar el ajax.
            url: ajaxurl,
            
            // el metodo que se usara es POST
            type: "POST",

            // colocamos la variable formData concatenando la funcion enviarMail() para enviar los datos del formulario.       
            data: formData + '&action=enviarMail',      
            
            // No almacenar los temporales en la pagina
            cache: false,
            
            //success
            success: function(data){            
                
                $('#estado').fadeOut("fast",function()
                {
                    $('#estado').html(data);
                });
                
                $('#estado').fadeIn("slow");
                $("#fcontacto").find('input[type=text], textarea').val("");

            }

        });
        
        return false;

    });

    //////////////////////////////////////////////////////////////////////////////

    // carousel de productos agrupados por categorias
    $(".productos__categorias").each(function(i){

        var getId = $(this).attr("id");

        $("#"+getId+"").owlCarousel({
            margin: 20,
            nav: true,
            autoWidth:false,
            autoHeight:true,
            navigation:true,
            navigationText: [
                "<i class='icon-chevron-left icon-white'><</i>",
                "<i class='icon-chevron-right icon-white'>></i>"
            ],
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            loop: true, 
            dots: false,
            animateOut: 'fadeOut',
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:true,
                    autoWidth:false,                    
                    loop:false
                }            
            }

        });

    })

    /*$(".productos__categorias").owlCarousel({
        margin: 20,
        nav: true,
        autoWidth:true,
        navigation:true,
        navigationText: [
            "<i class='icon-chevron-left icon-white'><</i>",
            "<i class='icon-chevron-right icon-white'>></i>"
        ],
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        loop: true, 
        animateOut: 'fadeOut',
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }            
        }

    });   */ 

});

$(window).scroll(function(){

	if ($(this).scrollTop() > 100) 
	{
		$('#scrollUp').fadeIn();
	} 
	else 
	{
		$('#scrollUp').fadeOut();

	}

});

function traslate_section(href){
	$('html, body').animate({
		scrollTop: $(href).offset().top
	}, 700,function(){
		scroll_traslate=0;
		$("nav").removeClass("m_visible");
		$("body").removeClass("body-overflow");
		$(".m_base_menu").fadeOut("slow");
		$("body .view_menu").css({"opacity":"1"});
	});

}