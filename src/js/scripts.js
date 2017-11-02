jQuery(document).ready(function($) {
	
	$.fn.responsiveMenu = function( options ) {
        // Default options
        var settings = $.extend({
			breakpoint: 300
        }, options );

		var menu_content = $('.menu-content');
		var menu_element = $('.menu li');
					
		$.each($('.menu li'), function (index, value) {
			if ($(this).children('ul').length > 0 || $(this).children('div').length > 0) {
				$(this).children('a').append($('<span class="arrow"></span>'));
			}
		});
		
		// add to-left class tu parent ul
		if( $('.menu li').hasClass('to-left') ){ $('.menu li.to-left').parent('ul').addClass("to-left-ul"); }
		  		
		  		
		// hamburger btn
		$('#nav-icon').on('click', function(e) {
		    e.preventDefault();
		    e.stopPropagation();
		
		    if ( menu_content.hasClass( "open" ) ) {
				menu_content.removeClass('open');
				menu_content.addClass('close');
			}else{
				menu_content.addClass('open');
				menu_content.removeClass('close')
			}
		
		    $(document).one('click', function closeMenu (e){
			    
			    var $browserWidth = window.innerWidth || document.documentElement.clientWidth;
			    if ($browserWidth < settings.breakpoint ) {
		        if(menu_content.has(e.target).length === 0){
		            menu_content.removeClass('open');
		            menu_content.addClass('close');
		            $('#nav-icon').removeClass('is-active');
		        } else {
		            $(document).one('click', closeMenu);
		        }
		        }
		    });
		});
	
	
		// init responsive
		menuStuff();
	
		$(window).resize(function () {
			menuStuff();
		});
		
		$('#nav-icon').click(function(e){
			e.preventDefault();
			$(this).toggleClass('is-active');
		});
	
	
		function menuStuff() {
		
			var $browserWidth = window.innerWidth || document.documentElement.clientWidth;
	
			var menu_content = $('.menu-content');
			var menu_element = $('.menu li');
			var arrow = $('.menu__item span.arrow');
			var submenu_element = $('.menu__sub-menu');
	
			var hamburger = $('#nav-icon');
	
			// desktop size
			if ( $browserWidth > settings.breakpoint ) {
				
				$('.menu .menu__item .menu__link').removeClass('active-parent');
				
				menu_content.removeClass('open').removeClass('close');
				arrow.removeClass('open');
				hamburger.removeClass('is-active');
				
				submenu_element.removeClass('open');
				submenu_element.removeClass('open').hide();

				//unbind arrow hover event
				arrow.unbind();
				
				menu_element.unbind().hover(function (e) {
					e.preventDefault();
	
					if( $(this).children('ul').hasClass( "menu__sub-menu" ) || $(this).children('div').hasClass( "menu__sub-menu" ) ){ 
						var element = $(this);
						var level = '.menu__sub-menu';
						xlScreen(element, level); 
					}
				});
	
			// mobile size
			} else {
				
				//unbind li click event
				menu_element.unbind();
	   
				arrow.unbind().click(function (e) {
	       
					e.preventDefault();
	
					if( $(this).closest('li').children('ul').hasClass( "menu__sub-menu" ) ){ 
						var level = '.menu__sub-menu'; 
						var element = $(this);
						xsScreen(element, level);
					
					}
				});
			}
	
			function xsScreen(element, level) {
				
				if( element.closest('li').children(level).hasClass('open') ){
				 	
	       		 	element.closest('li').children(level).slideUp(250).removeClass("open");
	       		 	element.parent('a').removeClass("active-parent");
	       		 	element.removeClass("open");
	       		 	
		  		}else{
	
			  		element.closest('li').children(level).slideDown(250).addClass('open');
			  		element.parent('a').addClass("active-parent");
			  		element.addClass("open");
		  		}
			}
	
			function xlScreen(element, level) {
		
				if( element.children(level).hasClass('open') ){
				 	
	       		 	element.children(level).removeClass("open");
	       		 	element.children('a').removeClass("active-parent");
	       		 	
		  		}else{
	
			  		element.children(level).show(1).addClass('open');
			  		element.children('a').addClass("active-parent");
		  		}
			}
		}
	}
});