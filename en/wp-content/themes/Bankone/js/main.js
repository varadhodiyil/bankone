 jQuery(function($) {
    initialisation_customer_type()
    initialisation_form_new_customer();
	fakewaffle.responsiveTabs(['xs', 'sm']);

    var rotation = function() {
        $(".btn-map img").rotate({
            angle: 0,
            animateTo: 360,
            callback: rotation
        });
    }
    rotation();

    $("#close_success_popup").click(function(){
        closeAll();
    });

    $('input[name="customer_type"]').change(function() {
        if ($(this).val() == 0) {
            initialisation_customer_type()
        } else if ($(this).val() == 1) {
            $("input[name='cus_code']").removeAttr('disabled');
            $("input[name='a_c_no']").removeAttr('disabled');
            $("input[name='b_l']").removeAttr('disabled');
            $("input[name='y_l']").removeAttr('disabled');
            $("input[name='cus_code']").attr('required', true);
            $("input[name='a_c_no']").attr('required', true);
            $("input[name='b_l']").attr('required', true);
            $("input[name='y_l']").attr('required', true);
        }
    });

    $("#title_pdf_1").change(function() {
        if ($(this).val() == 3) {
            //Change customer 2 enabled
            $('#title_2').val("3");
            $('#title_2').removeAttr('disabled');
            $('input[name="surname_2"]').removeAttr('disabled');
            $('input[name="firstname_2"]').removeAttr('disabled');
            $('input[name="relationship"]').removeAttr('disabled');
            $('input[name="maiden_name_2"]').removeAttr('disabled');
            $('input[name="nic_2"]').removeAttr('disabled');
            $('#genre_2').removeAttr('disabled');
            $('input[name="dob_2"]').removeAttr('disabled');
            $('#marital_status_2').removeAttr('disabled');
            $('input[name="phone_2"]').removeAttr('disabled');
            $('input[name="mobile_2"]').removeAttr('disabled');
            $('input[name="mail_2"]').removeAttr('disabled');
            $('input[name="address_mi_2"]').removeAttr('disabled');
            $('input[name="adress_others_2"]').removeAttr('disabled');
            $('#status_2').removeAttr('disabled');
            $('input[name="occupation_2"]').removeAttr('disabled');
            $('input[name="employer_name_2"]').removeAttr('disabled');
            $('input[name="employer_address_2"]').removeAttr('disabled');
            $('input[name="average_monthly_2"]').removeAttr('disabled');
            $('input[name="account_others_bank_2"]').removeAttr('disabled');
            $('input[name="card_details_2"]').removeAttr('disabled');
            $('input[name="source_founds_2"]').removeAttr('disabled');
            $('input[name="card_details_2_2"]').removeAttr('disabled');
            $('input[name="details_phone_1"]').removeAttr('disabled');
            $('input[name="details_a_c_1"]').attr('disabled', false);
        } else {
            //Change customer 2 desabled
            initialisation_form_new_customer();
        }
    });

    if (!Modernizr.objectfit) {
        $('.img').each(function() {
            var $container = $(this),
                imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container
                    .css('backgroundImage', 'url(' + imgUrl + ')')
                    .addClass('compat-object-fit');
            }
        });
    }

    $(document).ready(function() {
        initialisationMenu();
        $(window).scroll(function() {
            initialisationMenu();
        });
        $(document).change(function() {
            initialisationMenu();
        });
    });


    $(".select-langue").click(function() {
        $(".choice-langage").css("background", "#f12938");
        $(".choice-langage").css("color", "#fff");
        $(".choice-langage option").css("background", "#f12938");
        $(".choice-langage option").css("color", "#fff");
    });
    $(".choice-langage").blur(function() {
        $(".choice-langage").css("background", "transparent");
        $(".choice-langage").css("color", "#f12938");
        $(".choice-langage option").css("background", "transparent");
        $(".choice-langage option").css("color", "#f12938");
    });

    $('#collapse-all').click(function() {
        $('.collapse').collapse('toggle');
    });
    $('#hide-all').click(function() {
        $('.collapse').collapse('hide');
    });

    // $(".wpcf7 input:nth(1)").text(window.location.pathname.split('/')[window.location.pathname.split('/').length-2].split('-').join(" "));
    var product = window.location.pathname.split('/')[window.location.pathname.split('/').length - 2].split('-').join(" ");
    $("input[name$='your-product']").val(product);
    $("input[name$='your-product']").attr('value', product);
    // $("input[name$='your-product']").attr('disabled','disabled');

    $("#villes li").hover(
        function() {
            $(this).css('color', '#f12938');
            $(this).children(".icone-agence").css('background', 'url('+content_url+'/themes/Bankone/images/icon-agence-act.png) no-repeat');
        },
        function() {
            if ($(this).attr('class') != 'selected') {
                $(this).css('color', '#fff');
                $(this).children(".icone-agence").css('background', 'url('+content_url+'/themes/Bankone/images/icon-agence-des.png) no-repeat');
            }
        }
    );

    $("#villes li").click(
        function() {
            reinitialisationAgence();
            $(this).addClass('selected');
            $(this).css('color', '#f12938');
            $(this).children(".icone-agence").css('background', 'url('+content_url+'/themes/Bankone/images/icon-agence-act.png) no-repeat');
        }
    );

    $('.item-search').click(function() {
        reinitialisationAgence();
        if ($('#show2').is(":visible") == false) {
            $('#show1').toggle();
            $('#show2').toggle();
            $('.search-form input').focus();
			if($(window).width() <= 768){
				$('.sidebar').attr('style','display: block !important');
			}
        }
    });
    $('.search-close').click(function() {
        $('#show2').toggle();
        $('#show1').toggle();
    });

    $('.btn-burger').click(function() {
		$(".sidebar").css("position", "relative");
        $(".sidebar").css("top", 0);
        if ($('.sidebar').is(":visible") == false) {
            $('.sidebar').slideDown('slow');
			$('.sidebar').attr('style','display: block !important');
            $('.btn-burger img').attr('src',THM_URL+'/images/close.png');
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;

        } else {
            $('.sidebar').fadeOut();
			$('.sidebar').attr('style','display: none !important');
            $('.btn-burger img').attr('src',THM_URL+'/images/burger.png');
        }
    });

    $(".rslides").responsiveSlides({
        pager: true,
        speed: 4000,
        timeout: 8000,
    });

    $("#text-slider").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 4000,
        singleItem: true,
        autoPlay: 8000
    });

    $("#owl-credit").owlCarousel({
        items: 3,
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [900, 1],
        itemsTablet: [600, 1],
        autoPlay: 3000,
        navigation: true,
        pagination: false,
        stopOnHover: true,
        navigationText: ["<img src='" + content_url + "/themes/Bankone/images/left-arrow.svg'>", "<img src='" + content_url + "/themes/Bankone/images/right-arrow.svg'>"]
    });

    /**Popup**/
    $('.btn-popup').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
        closeOnContentClick: false,
        callbacks: {
            beforeOpen: function() {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    $(".gridder-first").gridderExpander({
        scroll: false,
        scrollOffset: 30,
        scrollTo: "panel",
        animationSpeed: 400,
        animationEasing: "easeInOutExpo",
        showNav: false,
        onClosed: function() {
            $(".black-mask-team").css('background', '#000');
        }
    });

    var timeline_item = $('.timeline .icon');
    timeline_item.click(function() {
        if ($(this).hasClass('white-circle')) {
            $('.timeline .icon').each(function() {
                $(this).removeClass('white-circle').addClass('red-circle');
            });
            $(this).removeClass('white-circle').addClass('red-circle');
        } else if ($(this).hasClass('red-circle')) {
            $('.timeline .icon').each(function() {
                $(this).removeClass('white-circle').addClass('red-circle');
            });
            $(this).removeClass('red-circle').addClass('white-circle');
        }

        var jid = $(this).data('jid');
        $('.journey .content .item-content').each(function() {
            $(this).hide();
        });
        $(jid).fadeIn();
    });

    $('.timeline-carousel').owlCarousel({
        items: 10,
        itemsDesktop: [1000, 3],
        itemsDesktopSmall: [900, 1],
        itemsTablet: [600, 1],
        autoPlay: false,
        navigation: false,
        pagination: false,
        stopOnHover: true,
        navigationText: false
    });
    var owl_t = $('.timeline-carousel').data('owlCarousel');;
    $('.timeline .btn-left').click(function() {
        owl_t.prev();
    });
    $('.timeline .btn-right').click(function() {
        owl_t.next();
    });

    $('#download-currency').click(function() {
        $('#currency_form').submit();
    });

    $("#close-mobile").click(function() {
        $(".btn-map").css('display', 'block');
        $(".search-wrapper").css('display', 'none');
    });
    $(".btn-map").click(function() {
        $(".btn-map").css('display', 'none');
        $(".search-wrapper").css('display', 'block');
    });

    $('#converter-submit').on('click', function(e) {
        e.preventDefault();
        var type = $("#sell_buy").val();
        var amount = $("#amount").val();
        var final_currency = $("#final-currency").val();
        if (type == 0) { //sell
            var from = $('td#buy-' + final_currency).data('val');
            var unit_from = $('td#buy-' + final_currency).data('unit');
            var result = (amount * from) / unit_from;
        } else if (type == 1) { //buy
            var from = $('td#sell-' + final_currency).data('val');
            var unit_from = $('td#sell-' + final_currency).data('unit');
            var result = (amount * from) / unit_from;
        }
        $('#result-container').show().html('Result : ' + result.toLocaleString() + " RS");
    });

    if (typeof simulator_type != 'undefined') {
        if (simulator_type == 0) {
            simulator_home_loan(plr, home_loan);
        } else if (simulator_type == 1) {
            simulator_car_loan_lease(plr, car_loan)
        } else if (simulator_type == 2) {
            simulator_education_loan(plr, educational_loan);
        } else if (simulator_type == 3) {
            simulator_personal_loan(plr, personal_loan);
        }
    }
    $('.currency-graph').click(function() {
        var curr_text = $(this).text();
        $('.history-wrap').attr('data-curr', $(this).data('id'));
        $('#id_curr_history').val($(this).data('id'));
        jQuery.post(
            ajaxurl, {
                'action': 'currency_graph',
                'id_currency': $(this).data('id'),
            },
            function(response) {
                $('.history-wrap').show();

                var data = jQuery.parseJSON(response);
                AmCharts.makeChart("chartdiv", {
                    "type": "serial",
                    "categoryField": "date",
                    "dataDateFormat": "YYYY-MM-DD",
                    "maxSelectedSeries": -1,
                    "autoMarginOffset": 8,
                    "marginBottom": 19,
                    "marginRight": 19,
                    "marginTop": 21,
                    "zoomOutButtonPadding": 9,
                    "color": "#A1A1A1",
                    "handDrawScatter": 4,
                    "handDrawThickness": 4,
                    "theme": "default",
                    "categoryAxis": {
                        "parseDates": true
                    },
                    "chartCursor": {
                        "enabled": true,
                        "animationDuration": 0
                    },
                    "chartScrollbar": {
                        "enabled": true
                    },
                    "trendLines": [],
                    "graphs": [{
                            "bullet": "round",
                            "id": "AmGraph-1",
                            "title": "Buy",
                            "valueField": "Buy"
                        },
                        {
                            "bullet": "square",
                            "id": "AmGraph-2",
                            "title": "Sell",
                            "valueField": "Sell"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [{
                        "id": "ValueAxis-1",
                        "position": "right",
                        "axisThickness": 0,
                        "firstDayOfWeek": 0,
                        "gridCount": 4,
                        "offset": -2,
                        "tickLength": 6,
                        "title": "",
                        "titleRotation": -2
                    }],
                    "allLabels": [],
                    "balloon": {},
                    "legend": {
                        "enabled": true,
                        "marginRight": 28,
                        "right": -1,
                        "useGraphSettings": true,
                        "verticalGap": 9,
                        "width": 0,
                        "divId": "legenddiv"
                    },
                    "titles": [{
                        "id": "Title-1",
                        "size": 15,
                        "text": "Currency history: " + curr_text
                    }],
                    "dataProvider": data
                });
            }
        );
    });
});

function initMap() {
    if (document.getElementById("map")) {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -20.2659762,
                lng: 57.5562719
            },
            zoom: 10,
            scrollwheel: false
        });

        var currentInfo = null;
        var myIcon = new google.maps.MarkerImage(THM_URL + "/images/marqueur-map.png", null, null, null, new google.maps.Size(45, 45));

        $.each(data_agence, function(index, value) {
            var marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(value.latitude),
                    lng: parseFloat(value.longitude)
                },
                map: map,
                icon: myIcon,
                flat: true
            });
            var contentString = null;
            marker.addListener('click', function() {
                if (currentInfo != null) {
                    currentInfo.close();
                }
                contentString = '<div class="agency-marker"><div class="agency"><h3>' + value.name + '</h3></div><div>' + value.description + '</div></div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                infowindow.open(map, this);
                currentInfo = infowindow;
            });

        });


        listenerGlobal(map);

        var infoWindow = new google.maps.InfoWindow({ map: map });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                map.setCenter(pos);
                map.setZoom(12);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function listenerGlobal(map) {
    $('.title-search').click(function() {
        map.setCenter({ lat: -20.2659762, lng: 57.5562719 });
        map.setZoom(10);
    });
    $("#villes li").click(function() {
        map.setCenter({ lat: parseFloat($(this).attr('lattd')), lng: parseFloat($(this).attr('longtd')) });
        map.setZoom(18);
        if ($(window).innerWidth() < 1024) {
            $(".btn-map").css('display', 'block');
            $(".search-wrapper").css('display', 'none');
        }
    });
}

function reinitialisationAgence() {
    $("#villes li").removeClass('selected');
    $("#villes li").css('color', '#fff');
    $("#villes li").children(".icone-agence").css('background', 'url('+content_url+'/themes/Bankone/images/icon-agence-des.png) no-repeat');
}

function initialisation_form_new_customer() {
    $('#title_2').val("0");
    $('#title_2').attr('disabled', 'disabled');
    $('input[name="surname_2"]').attr('disabled', 'disabled');
    $('input[name="firstname_2"]').attr('disabled', 'disabled');
    $('input[name="relationship"]').attr('disabled', 'disabled');
    $('input[name="maiden_name_2"]').attr('disabled', 'disabled');
    $('input[name="nic_2"]').attr('disabled', 'disabled');
    $('#genre_2').attr('disabled', 'disabled');
    $('input[name="dob_2"]').attr('disabled', 'disabled');
    $('#marital_status_2').attr('disabled', 'disabled');
    $('input[name="phone_2"]').attr('disabled', 'disabled');
    $('input[name="mobile_2"]').attr('disabled', 'disabled');
    $('input[name="mail_2"]').attr('disabled', 'disabled');
    $('input[name="address_mi_2"]').attr('disabled', 'disabled');
    $('input[name="adress_others_2"]').attr('disabled', 'disabled');
    $('#status_2').attr('disabled', 'disabled');
    $('input[name="occupation_2"]').attr('disabled', 'disabled');
    $('input[name="employer_name_2"]').attr('disabled', 'disabled');
    $('input[name="employer_address_2"]').attr('disabled', 'disabled');
    $('input[name="average_monthly_2"]').attr('disabled', 'disabled');
    $('input[name="account_others_bank_2"]').attr('disabled', 'disabled');
    $('input[name="card_details_2"]').attr('disabled', 'disabled');
    $('input[name="source_founds_2"]').attr('disabled', 'disabled');
    $('input[name="card_details_2_2"]').attr('disabled', 'disabled');
    $('input[name="details_phone_1"]').attr('disabled', 'disabled');
    $('input[name="details_a_c_1"]').attr('disabled', 'disabled');
    $('input[name="details_signatute_1"]').attr('disabled', 'disabled');
}

function initialisation_customer_type() {
    $("input[name='cus_code']").attr({ 'disabled': "disabled", 'required': false });
    $("input[name='a_c_no']").attr({ 'disabled': "disabled", 'required': false });
    $("input[name='b_l']").attr({ 'disabled': "disabled", 'required': false });
    $("input[name='y_l']").attr({ 'disabled': "disabled", 'required': false });
}

function closeAll(){
  $("#fade-content").css("display","none");
  $(".send_mail.success").css("display","none");
}

function initialisationMenu(contents) {
    if ($(window).innerWidth() >= 768) {
        var contents = $(window),
            scrollTop = contents.scrollTop(),
            scrollBottom = parseInt($(document).height() - contents.height() - contents.scrollTop());
        if (scrollBottom >= $("#footer-row").height()) {
            $(".sidebar").css("position", "absolute");
            $(".sidebar").css("top", scrollTop);
        }
    } else {
        $(".sidebar").css("position", "relative");
        $(".sidebar").css("top", 0);
    }
}
/*amchart*/
