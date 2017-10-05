function logEvent(event, type, navigation_to = "", raw_query="" ,category = "landing_page") {
	d =  {}; 
	d.page_id = window.location.pathname; 
	d.event_name = type;
	d.category_id = navigation_to; 
	d.queryString = raw_query; 
	divolte.signal(event, d); 
	console.log(d); 
	if(type=="navigate" || type=="search")
	{
		function navigate_to()
		{
			// window.open(navigation_to, '_blank');
			window.location = navigation_to;
			
		}
		setTimeout(navigate_to, 1500)
	}
	
}

function do_search(val)
{
	console.log(val);
	logEvent('submit','search',"https://bankone.mu/en/?s="+val,val);
	return false;
}
$(document).ready(function()
{
	$("a").live('click',function(event){
		event.preventDefault();
	   let n = $(this).text();
	   let ref =$(this).attr('href');
	   if(ref!="#")
	   {
		   logEvent('click','navigate',ref,n);
	   }
	});

});
