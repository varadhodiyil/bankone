function simulator_home_loan(plr, home_loan_params){
	var capital_min = parseFloat(home_loan_params[0].capital_minimum);
	var capital_maxi = parseFloat(home_loan_params[0].capital_maximum);
	var duree_min = parseFloat(home_loan_params[0].minimum_duration);//valeur exprimer en année donc x12
	var duree = duree_min;//valeur exprimer en année donc x12
	var duree_max = parseFloat(home_loan_params[0].maximum_duration);//valeur exprimer en année donc x12
	var taux_first_year_below_2m  = parseFloat(home_loan_params[0].taux_first_year_below_2m)/100;
	var taux_first_year_above_2m  = parseFloat(home_loan_params[0].taux_first_year_above_2m)/100;
	var taux_above_2m_from_2year = parseFloat(home_loan_params[0].taux_above_mur_2m_as_from_2nd_year);

    var first_year_monthly = simulateurPretCapitalDonnee(taux_first_year_below_2m,duree_min*12, capital_min);
    var capital_over = calculCapitalRestantApresUneAnneeHomeLoan(capital_min,taux_first_year_below_2m, first_year_monthly);
    var mensualitee = simulateurPretCapitalDonnee(plr/100,24, capital_over);

    var capital_over_min = capital_min * 0.7;
    var first_year_monthly_min = simulateurPretCapitalDonnee(taux_first_year_below_2m,duree_min*12, capital_over_min);
    capital_over_min = calculCapitalRestantApresUneAnneeHomeLoan(capital_over_min,taux_first_year_below_2m, first_year_monthly_min);
    var mensualite_min = simulateurPretCapitalDonnee(plr/100,(duree_max-1)*12, ((capital_over_min*34)/35));
    var mensualite_max = simulateurPretCapitalDonnee(taux_first_year_below_2m,12, capital_maxi);

	$("#objectif").next().children(".limit.pull-left").text(capital_min.toLocaleString()+" RS");
    $("#objectif").next().children(".limit.pull-right").text(capital_maxi.toLocaleString()+" RS");

    $("#versement_i").next().children(".limit.pull-left").text(duree_min+" Years");
    $("#versement_i").next().children(".limit.pull-right").text(duree_max+" Years");


    $("#objectif").bootstrapSlider({min: capital_min, max: capital_maxi,scale: 'linear', step: 1000, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();}});
    $("#objectif").change("slide", function(slideEvt){
        var capital = slideEvt.value.newValue;
        var duree = $("#versement_i").bootstrapSlider("getValue");
        var nature = $('input:checked[name="home_nature"]').val();
        var financing;
        var taux_first_years;
        var taux_variable;
        
        //Nature
        if(nature == 0){
        	financing = capital;
        }
        else if(nature == 1){
        	financing = capital*0.9;
        }
        else if(nature == 2){
        	financing = capital*0.7;
        }

        //Logique taux d'interet
        if(capital <= 1000000){
            taux_variable = plr/100;
            taux_first_years = taux_first_year_below_2m;
        }

        else if(capital > 1000000 && capital <= 2000000){
            taux_variable = (plr-0.5)/100;
            taux_first_years = taux_first_year_below_2m;
        }
        else if(capital > 2000000){
            taux_variable = (taux_above_2m_from_2year)/100;
            taux_first_years = taux_first_year_above_2m;
        }

        capital_over = (financing * (duree-1))/duree;

        var monthly_first_year = simulateurPretCapitalDonnee(taux_first_years,duree*12, financing);
        var capital_reste = calculCapitalRestantApresUneAnneeHomeLoan(financing, taux_first_years, monthly_first_year);
        if(capital_reste <= 1000000){
            taux_variable = plr/100;
        }
        else if(capital_reste > 1000000 && capital_reste <= 2000000){
            taux_variable = (plr-0.5)/100;
        }
        else if(capital_reste > 2000000){
            taux_variable = (taux_above_2m_from_2year)/100;
        }
        var monthly = simulateurPretCapitalDonnee(taux_variable,(duree-1)*12, capital_reste);
        $("#home_financing").bootstrapSlider('setValue',financing);
        $("#first_year").bootstrapSlider('setValue',monthly_first_year);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $('input[name="home_nature"]').change(function(){
        var capital = $("#objectif").bootstrapSlider("getValue");
        var duree = $("#versement_i").bootstrapSlider("getValue");
        var nature = $(this).val();
        var financing;
        var taux_first_years;
        var taux_variable;

        if(nature == 0){
        	financing = capital;
        }
        else if(nature == 1){
        	financing = capital*0.9;
        }
        else if(nature == 2){
        	financing = capital*0.7;
        }

        //Logique taux d'interet
        if(capital <= 1000000){
            taux_variable = plr/100;
            taux_first_years = taux_first_year_below_2m;
        }

        else if(capital > 1000000 && capital <= 2000000){
            taux_variable = (plr-0.5)/100;
            taux_first_years = taux_first_year_below_2m;
        }
        else if(capital > 2000000){
            taux_variable = (taux_above_2m_from_2year)/100;
            taux_first_years = taux_first_year_above_2m;
        }

        capital_over = (financing * (duree-1))/duree;

        var monthly_first_year = simulateurPretCapitalDonnee(taux_first_years,duree*12, financing);
        var capital_reste = calculCapitalRestantApresUneAnneeHomeLoan(financing, taux_first_years, monthly_first_year);
        if(capital_reste <= 1000000){
            taux_variable = plr/100;
        }
        else if(capital_reste > 1000000 && capital_reste <= 2000000){
            taux_variable = (plr-0.5)/100;
        }
        else if(capital_reste > 2000000){
            taux_variable = (taux_above_2m_from_2year)/100;
        }
        var monthly = simulateurPretCapitalDonnee(taux_variable,(duree-1)*12, capital_reste);
        $("#home_financing").bootstrapSlider('setValue',financing);
        $("#first_year").bootstrapSlider('setValue',monthly_first_year);
        $("#versement_m").bootstrapSlider('setValue',monthly);

    });

    $("#home_financing").bootstrapSlider({min: 100000, max: 15000000,scale: 'linear', step: 1000, value: capital_min, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();}});
	$("#first_year").bootstrapSlider({scale: 'linear', step: 1, value: first_year_monthly, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();}});
    $("#versement_i").bootstrapSlider({min: duree_min, max: duree_max,scale: 'linear', step: 1, value:duree_min, tooltip: 'always' });
    $("#versement_i").change("slide", function(slideEvt){
        var duree = slideEvt.value.newValue;
        var capital = $("#objectif").bootstrapSlider("getValue");
        var nature = $('input:checked[name="home_nature"]').val();
        var financing;
        var taux_first_years;
        var taux_variable;

        if(nature == 0){
        	financing = capital;
        }
        else if(nature == 1){
        	financing = capital*0.9;
        }
        else if(nature == 2){
        	financing = capital*0.7;
        }

        //Logique taux d'interet
        if(capital <= 1000000){
            taux_variable = plr/100;
            taux_first_years = taux_first_year_below_2m;
        }

        else if(capital > 1000000 && capital <= 2000000){
            taux_variable = (plr-0.5)/100;
            taux_first_years = taux_first_year_below_2m;
        }
        else if(capital > 2000000){
            taux_variable = (taux_above_2m_from_2year)/100;
            taux_first_years = taux_first_year_above_2m;
        }

        capital_over = (financing * (duree-1))/duree;

        var monthly_first_year = simulateurPretCapitalDonnee(taux_first_years,duree*12, financing);
        var capital_reste = calculCapitalRestantApresUneAnneeHomeLoan(financing, taux_first_years, monthly_first_year);
        if(capital_reste <= 1000000){
            taux_variable = plr/100;
        }
        else if(capital_reste > 1000000 && capital_reste <= 2000000){
            taux_variable = (plr-0.5)/100;
        }
        else if(capital_reste > 2000000){
            taux_variable = (taux_above_2m_from_2year)/100;
        }
        var monthly = simulateurPretCapitalDonnee(taux_variable,(duree-1)*12, capital_reste);
        $("#first_year").bootstrapSlider('setValue',monthly_first_year);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $("#versement_m").bootstrapSlider({id: "versement_mb",min: mensualite_min, max: mensualite_max,scale: 'linear', step: 1, value: mensualitee, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();} });
    
}

function simulator_car_loan_lease(plr, car_loan_params){
	var capital_min = parseFloat(car_loan_params[0].capital_minimum);
	var capital_maxi = parseFloat(car_loan_params[0].capital_maximum);
	var duree_min = parseFloat(car_loan_params[0].minimum_duration);
	var duree = duree_min;
	var duree_max = parseFloat(car_loan_params[0].maximum_duration);
	
	var pourc_1 = parseFloat(car_loan_params[0].financing_second_handreconditioned_cars_less_than_5_years)/100;
	var pourc_2 = parseFloat(car_loan_params[0].financing_second_handreconditioned_cars_between__5_years)/100;

    	var taux_util = 0;

	var mensualite_max = simulateurPretCapitalDonnee((plr+1)/100,duree_min*12, capital_maxi);
   	var mensualitee = simulateurPretCapitalDonnee((plr+1)/100,duree_min*12, capital_min);
    	var mensualite_min = simulateurPretCapitalDonnee((plr+2)/100,duree_max*12, capital_min*pourc_2);

	$("#objectif").next().children(".limit.pull-left").text(capital_min.toLocaleString()+" RS");
    $("#objectif").next().children(".limit.pull-right").text(capital_maxi.toLocaleString()+" RS");

    $("#versement_i").next().children(".limit.pull-left").text(duree_min);
    $("#versement_i").next().children(".limit.pull-right").text(duree_max);

    $("#car_condition").bootstrapSlider({min: 1, max: 2,scale: 'linear', step: 1, tooltip: 'hide'});//New car || Second hand/reconditionned
    $("#car_condition").change("slide", function(slideEvt){
    	
    });

    $('input[name="car_condition"]').change(function(){
    	var capital = 0;
        var condition = $(this).val();
        var financing = 0;
        duree = $("#versement_i").bootstrapSlider('getValue');
        if(type_car == 1){
    		taux_util = (plr + 1)/100;
    	}
    	else{
    		taux_util = (plr + 2)/100;
    	}
        if(condition == 0){
        	$(".car_age").css('display','none');
        	$("#car_financing").bootstrapSlider('setValue',capital_min);
        	var type_car = $('input:checked[name="car_type"]').val();     
        	financing =  $("#objectif").bootstrapSlider('getValue');
        	capital = simulateurPretCapitalDonnee(taux_util,duree*12, capital);
        	$("#versement_m").bootstrapSlider('setValue',capital);
		$("#versement_i").bootstrapSlider({max: 7 });
		$("#versement_i").next().children(".limit.pull-right").text(7);
        }
        else if(condition == 1){
		$("#versement_i").bootstrapSlider({max: 5 });
		$(".tooltip.tooltip-main.top.in:eq(2)").children().last().text(duree);
		$("#versement_i").next().children(".limit.pull-right").text(5);
		if(duree > 5){
			$("#versement_i").bootstrapSlider({value: 5 });
			$(".tooltip.tooltip-main.top.in:eq(2)").children().last().text(5);
			duree = 5;
		}
        	$(".car_age").css('display','block');
        	var age_car = $('input:checked[name="car_age"]').val();
        	if(age_car == 0){
        		financing = $("#objectif").bootstrapSlider('getValue') * pourc_1;
        	}
        	else if(age_car == 1){
        		financing = $("#objectif").bootstrapSlider('getValue') * pourc_2;
        	}
        }
        var monthly = simulateurPretCapitalDonnee(taux_util,duree*12, financing);
        $("#car_financing").bootstrapSlider('setValue',financing);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $('input[name="car_type"]').change(function(){ 
    	var type = $(this).val();
        var capital = $("#car_financing").bootstrapSlider('getValue');
        duree = $("#versement_i").bootstrapSlider("getValue");
        var taux_util;
        if(type == 0){
        	taux_util = (plr + 1)/100;
        }
        else if(type == 1){
        	taux_util = (plr + 2)/100;
        }
        var monthly = simulateurPretCapitalDonnee(taux_util,duree*12, capital);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    
    $('input[name="car_age"]').change(function(){
    	var age_car = $(this).val();

    	duree = $("#versement_i").bootstrapSlider("getValue");
    	var capital = $("#objectif").bootstrapSlider("getValue");
    	var financing ;
    	if(age_car == 0){
    		financing = capital * pourc_1;
    	}
    	else if(age_car == 1){
    		financing = capital * pourc_2;
    	}
    	var type = $('input:checked[name="car_type"]').val();
        if(type == 0){
        	taux_util = (plr + 1)/100;
        }
        else if(type == 1){
        	taux_util = (plr + 2)/100;
        }

		var monthly = simulateurPretCapitalDonnee(taux_util,duree*12, financing);
        $("#car_financing").bootstrapSlider('setValue',financing);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $("#car_financing").bootstrapSlider({min: 150000, max: 4500000,scale: 'linear', step: 1, value: capital_min, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();}});
    $("#car_financing").change("slide", function(slideEvt){
        capital = slideEvt.value.newValue;
        var monthly = simulateurPretCapitalDonnee(taux_util,duree*12, capital);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $("#objectif").bootstrapSlider({min: capital_min, max: capital_maxi,scale: 'linear', step: 1000, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();}});
    $("#objectif").change("slide", function(slideEvt){
        var capital = slideEvt.value.newValue;
        var duree = $("#versement_i").bootstrapSlider("getValue");
        var financing;

        var condition = $('input:checked[name="car_condition"]').val();
        if(condition == 0){
        	financing = capital * 0.9;
        }
        else if(condition == 1){
        	var age_car = $('input:checked[name="car_age"]').val();
        	if(age_car == 0){
        		financing = capital * pourc_1;
        	}
        	else if(age_car == 1){
        		financing = capital * pourc_2;
        	}
        }

        var type = $('input:checked[name="car_type"]').val();
        var taux_util;
        if(type == 0){
        	taux_util = (plr + 1)/100;
        }
        else if(type == 1){
        	taux_util = (plr + 2)/100;
        }

        $("#car_financing").bootstrapSlider('setValue',financing);
        var monthly = simulateurPretCapitalDonnee(taux_util,duree*12, financing);
        console.log("monthly : "+monthly);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $("#versement_i").bootstrapSlider({min: duree_min, max: duree_max,scale: 'linear', step: 1, value:duree_min, tooltip: 'always' });
     $("#versement_i").change("slide", function(slideEvt){
        duree = slideEvt.value.newValue;
        var type = $('input:checked[name="car_type"]').val();
        var capital = $("#car_financing").bootstrapSlider("getValue");
        var taux_util;
        if(type == 0){
        	taux_util = (plr + 1)/100;
        }
        else if(type == 1){
        	taux_util = (plr + 2)/100;
        }
        var montant = simulateurPretCapitalDonnee(taux_util,duree*12, capital);
        
        $("#versement_m").bootstrapSlider('setValue',montant);
    });

    $("#versement_m").bootstrapSlider({id: "versement_mb",min: mensualite_min, max: mensualite_max,scale: 'linear', step: 1, value: mensualitee, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();} });
    $("#versement_m").change("slide", function(slideEvt){
        var versement = slideEvt.value.newValue;
        duree = $("#versement_i").val();
        capital = $("#objectif").val();
        mensualitee = simulateurRemboursementMensuelDonnee(taux_util,duree, versement);
        //Dans le cas où le mensualitee minimal est depassé on change le duree de paiement
        if(mensualitee >= capital_min && mensualitee <= mensualite_max){
            $("#objectif").bootstrapSlider('setValue',mensualitee);
        }
        if(mensualitee < capital_min){
            duree = simulateurDelaiDePaiementDonnee(taux_util, capital_min, versement);
            $("#versement_i").bootstrapSlider('setValue',duree*12);
        }
        if(mensualitee > mensualite_max){
            $duree = simulateurDelaiDePaiementDonnee(taux_util, capital, versement);
            $("#objectif").bootstrapSlider('setValue',mensualitee);
            $("#versement_i").bootstrapSlider('setValue',duree/12);
        }
    });
}

function simulator_education_loan(plr, education_loan_params){
	plr = plr/100;
	var capital_min = parseFloat(education_loan_params[0].minumum_amount);
	var capital_maxi = parseFloat(education_loan_params[0].maximum_amount);
	var duree_min = parseFloat(education_loan_params[0].mimimum_duration);
	var duree = duree_min;
	var duree_max = parseFloat(education_loan_params[0].maximum_duration);

	var mensualite_max = simulateurPretCapitalDonnee(plr,duree_min*12, capital_maxi);
   	var mensualitee = simulateurPretCapitalDonnee(plr,duree_min*12, capital_min);
    var mensualite_min = simulateurPretCapitalDonnee(plr,duree_max*12, capital_min);

	$("#objectif").next().children(".limit.pull-left").text(capital_min.toLocaleString()+" RS");
    $("#objectif").next().children(".limit.pull-right").text(capital_maxi.toLocaleString()+" RS");

    $("#versement_i").next().children(".limit.pull-left").text(duree_min);
    $("#versement_i").next().children(".limit.pull-right").text(duree_max);

    $("#objectif").bootstrapSlider({min: capital_min, max: capital_maxi,scale: 'linear', step: 1000, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();}});
    $("#objectif").change("slide", function(slideEvt){
        var capital = slideEvt.value.newValue;
        var monthly = simulateurPretCapitalDonnee(plr,duree*12, capital);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $("#versement_i").bootstrapSlider({min: duree_min, max: duree_max,scale: 'linear', step: 1, value:duree_min, tooltip: 'always' });
     $("#versement_i").change("slide", function(slideEvt){
        var duree = slideEvt.value.newValue;
        var capital = $("#objectif").bootstrapSlider("getValue");
        var montant = simulateurPretCapitalDonnee(plr,duree*12, capital);
        
        $("#versement_m").bootstrapSlider('setValue',montant);
    });

    $("#versement_m").bootstrapSlider({id: "versement_mb",min: mensualite_min, max: mensualite_max,scale: 'linear', step: 1, value: mensualitee, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();} });
    $("#versement_m").change("slide", function(slideEvt){
        var versement = slideEvt.value.newValue;
        duree = $("#versement_i").val();
        capital = $("#objectif").val();
        mensualitee = simulateurRemboursementMensuelDonnee(plr,duree*12, versement);
        //Dans le cas où le mensualitee minimal est depassé on change le duree de paiement
        if(mensualitee >= capital_min && mensualitee <= mensualite_max){
            $("#objectif").bootstrapSlider('setValue',mensualitee);
        }
        if(mensualitee < capital_min){
            duree = simulateurDelaiDePaiementDonnee(plr, capital_min, versement);
            $("#versement_i").bootstrapSlider('setValue',duree/12);
        }
        if(mensualitee > mensualite_max){
            duree = simulateurDelaiDePaiementDonnee(plr, capital, versement);
            $("#objectif").bootstrapSlider('setValue',mensualitee);
            $("#versement_i").bootstrapSlider('setValue',duree/12);
        }
    });
}

function simulator_personal_loan(plr, personal_loan_params){
	var capital_min = parseFloat(personal_loan_params[0].minimum_amount);
	var salary_up = 15;
    var limite_max_with = personal_loan_params[0].maximum_amount_without_security;
	var capital_maxi = 500000;
	var duree_min = 1;
	var duree = duree_min;
	var duree_max = personal_loan_params[0].repayment_terms_without_security;

	var mensualite_max = simulateurPretCapitalDonnee(plr/100,duree_min*12, capital_maxi);
   	var mensualitee = simulateurPretCapitalDonnee(plr/100,duree_min*12, capital_min);
    var mensualite_min = simulateurPretCapitalDonnee(plr/100,duree_max*12, capital_min);

	$("#objectif").next().children(".limit.pull-left").text(capital_min.toLocaleString()+" RS");
    $("#objectif").next().children(".limit.pull-right").text(capital_maxi.toLocaleString()+" RS");

    $("#versement_i").next().children(".limit.pull-left").text(duree_min);
    $("#versement_i").next().children(".limit.pull-right").text(duree_max);

    $("#loan_financing").next().children(".limit.pull-left").text(capital_min);
    $("#loan_financing").next().children(".limit.pull-right").text(capital_min * salary_up);

    $("#objectif").bootstrapSlider({min: capital_min, max: capital_maxi,scale: 'linear', step: 1000, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();}});
    $("#objectif").change("slide", function(slideEvt){
        var capital = slideEvt.value.newValue;
        var status = $('input:checked[name="loan_security"]').val();
        var financing = $("#loan_financing").bootstrapSlider('getValue');
        var limite;
        var taux_variable;
        if(status == 0){
            limite =  capital * salary_up;
            if(limite > limite_max_with){
                limite = limite_max_with;
            }
        }else if(status == 1){
            limite =  capital * salary_up;
        }
        if(financing > limite){
            $("#loan_financing").bootstrapSlider('setValue',limite);
            financing = limite;
        }
        $("#loan_financing").bootstrapSlider({max: limite});
        $("#loan_financing").next().children(".limit.pull-right").text(limite);

        // var monthly = simulateurPretCapitalDonnee(plr/100,duree*12, financing);
        // $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $('input[name="loan_security"]').change(function(){
        var stat = $(this).val();
        if(stat == 0){
            $("#loan_financing").bootstrapSlider("enable");
            $("#objectif").bootstrapSlider("enable");
            $(".loan_guarantee").css('display','none');
            $("#versement_i").bootstrapSlider({max: 7});
            if($("#versement_i").bootstrapSlider('getValue') > 7){
                $("#versement_i").bootstrapSlider('setValue', 7);
            }
            else{
                var temp = $("#versement_i").bootstrapSlider('getValue');
                $("#versement_i").bootstrapSlider('setValue', temp);
            }
            $("#versement_i").next().children(".limit.pull-right").text(7);

            var financing = $("#loan_financing").bootstrapSlider("getValue");
            var capital = $("#objectif").bootstrapSlider("getValue");
            var duree = $("#versement_i").bootstrapSlider("getValue");
            var taux_variable;           
            if(financing <= capital*10){
                taux_variable = (plr+5.20)/100;
            }
            else if(financing < capital*10){
                taux_variable = (plr+5.70)/100;
            }
            var monthly = simulateurPretCapitalDonnee(taux_variable,duree*12, financing);
            $("#versement_m").bootstrapSlider('setValue',monthly);
        }
        else if(stat == 1){
            $("#loan_financing").bootstrapSlider("disable");
            $("#objectif").bootstrapSlider("disable");
            $(".loan_guarantee").css('display','block');
            $("#versement_i").bootstrapSlider({max: 15});
            var temp = $("#versement_i").bootstrapSlider('getValue');
            $("#versement_i").bootstrapSlider('setValue', temp);
            $("#versement_i").next().children(".limit.pull-right").text(15);
        }
    });

    $("#launch_calcul").click(function(){
        var security = $("#loan_guarantee").val();
        if(security > 0 || security != ""){
            $("#loan_financing").bootstrapSlider("enable");
            var financing = security * 0.8;
            $("#loan_financing").bootstrapSlider({max: financing});
            $("#loan_financing").next().children(".limit.pull-right").text(financing);
            
            var capital = $("#objectif").bootstrapSlider("getValue");
            var duree = $("#versement_i").bootstrapSlider("getValue");
            var taux_variable;           
            var monthly = simulateurPretCapitalDonnee(taux_variable,duree*12, financing);
            
            $("#versement_m").bootstrapSlider('setValue',monthly);
        }
    });

    $("#loan_financing").bootstrapSlider({min: capital_min, max: 750000,scale: 'linear', step: 1000, value:duree_min, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();} });
    $("#loan_financing").change("slide", function(slideEvt){
        var financing = slideEvt.value.newValue;
        var capital = $("#objectif").bootstrapSlider("getValue");
        var duree = $("#versement_i").bootstrapSlider("getValue");
        var status = $('input:checked[name="loan_security"]').val();
        var taux_variable;
        if(status == 0){
            if(financing <= capital*10){
                taux_variable = (plr+5.20)/100;
            }
            else if(financing > capital*10){
                taux_variable = (plr+5.70)/100;
            }
        }
        else if(status == 1){
            taux_variable = (plr+1)/100;
        }

        var monthly = simulateurPretCapitalDonnee(taux_variable,duree*12, financing);
        $("#versement_m").bootstrapSlider('setValue',monthly);
    });

    $("#versement_i").bootstrapSlider({min: duree_min, max: duree_max,scale: 'linear', step: 1, value:duree_min, tooltip: 'always' });
     $("#versement_i").change("slide", function(slideEvt){
        var financing = $("#loan_financing").bootstrapSlider("getValue");
        var capital = $("#objectif").bootstrapSlider("getValue");
        var duree = slideEvt.value.newValue;
        var status = $('input:checked[name="loan_security"]').val();
        var taux_variable;
        if(status == 0){
            if(financing <= capital*10){
                taux_variable = (plr+5.20)/100;
            }
            else if(financing < capital*10){
                taux_variable = (plr+5.70)/100;
            }
        }
        else if(status == 1){
            taux_variable = (plr+1)/100;
        }

        var monthly = simulateurPretCapitalDonnee(taux_variable,duree*12, financing);
        $("#versement_m").bootstrapSlider('setValue',monthly);

    });

    $("#versement_m").bootstrapSlider({id: "versement_mb", min: mensualite_min, max: mensualite_max,scale: 'linear', step: 1, value: mensualitee, tooltip: 'always',precision: 2, formatter: function(value){ return value.toLocaleString();} });
    $("#versement_m").change("slide", function(slideEvt){
        var versement = slideEvt.value.newValue;
        duree = $("#versement_i").val();
        capital = $("#objectif").val();
        mensualitee = simulateurRemboursementMensuelDonnee(plr,duree, versement);
        //Dans le cas où le mensualitee minimal est depassé on change le duree de paiement
        if(mensualitee >= capital_min && mensualitee <= mensualite_max){
            $("#objectif").bootstrapSlider('setValue',mensualitee);
        }
        if(mensualitee < capital_min){
            duree = simulateurDelaiDePaiementDonnee(plr, capital_min, versement);
            $("#versement_i").bootstrapSlider('setValue',duree);
        }
        if(mensualitee > mensualite_max){
            duree = simulateurDelaiDePaiementDonnee(plr, capital, versement);
            $("#objectif").bootstrapSlider('setValue',mensualitee);
            $("#versement_i").bootstrapSlider('setValue',duree);
        }
    });
}

function simulateurPretCapitalDonnee(taux,nbMois, capital){
    var result = (capital*((taux/12)/(1-Math.pow((1+(taux/12)),-nbMois))));
    return parseFloat(result.toFixed(2));
}


function simulateurRemboursementMensuelDonnee(taux,nbMois, mensualite){
    var result = (((12*mensualite)/taux)*(1 - Math.pow((1 + (taux/12)),-nbMois)));
    return parseFloat(result.toFixed(2));
}

function simulateurDelaiDePaiementDonnee(taux, capital_minimum, mensualite_min){
    var result = -(Math.log10(1-(capital_minimum*(taux/12))/mensualite_min))/(Math.log10(1+(taux/12)));
    return result;
}

function calculCapitalRestantApresUneAnneeHomeLoan(capital_init,taux_first_year, mens_first_year){
    var res = capital_init;
    var q = 1 +(taux_first_year/12);
    for($i=0;$i<12;$i++){
        res = (q * res) - mens_first_year;
    }
    return res;
}
