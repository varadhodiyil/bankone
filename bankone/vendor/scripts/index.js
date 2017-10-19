let user_data_ip = [];
google.charts.load('current', { 'packages': ['corechart', 'scatter', 'line', 'bar'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  $.getJSON(location.toLocaleString()+"api/data/", function (resp) {
    var user_data = new google.visualization.DataTable();
    user_data.addColumn('string', 'Event Name');
    user_data.addColumn('number', 'count');
    var business_data = new google.visualization.DataTable();
    business_data.addColumn('string', 'Event Name');
    business_data.addColumn('number', 'count');


    if (resp.event_name.user != null) {
      resp.event_name.user.forEach(function (e) {
        user_data.addRow([e.key, e.value]);
      });
    }
    if (resp.event_name.business != null) {
      resp.event_name.business.forEach(function (e) {
        business_data.addRow([e.key, e.value]);
      });
    }


    var distinct_events = new google.visualization.DataTable();
    distinct_events.addColumn('string', 'Event Name');
    distinct_events.addColumn('number', 'count');
    resp.distinctEvents.forEach(function (element) {
      if (element.key != null) {
        if (element.key.length > 0) {
          distinct_events.addRow([element.key, element.value]);
        }
      }
    });




    var options_u = {
      title: 'Event - Users',
      hAxis: { title: 'Event', minValue: 0 },
      // vAxis: {title: 'Weight', minValue: 0},
      legend: 'none',
      colors: ["#F37428"],
    };
    var options_b = {
      title: 'Event - Business',
      hAxis: { title: 'Event', minValue: 0 },
      // vAxis: {title: 'Weight', minValue: 0},
      legend: 'none',
      colors: ["#F37428"],
    };
    // var chart1 = new google.visualization.ScatterChart(document.getElementById('user_map'));

    // chart1.draw(user_data, options_u);
    // var chart2 = new google.visualization.ScatterChart(document.getElementById('business_map'));

    // chart2.draw(business_data, options_b);


    var options = {
      colors: ["#F37428"],
      bar: { groupWidth: "15%" },
      chart: {
        title: 'Events ',
      },
      hAxis: { title: 'Events' },
      vAxis: { title: 'count' }
    };

    var chart3 = new google.visualization.ColumnChart(document.getElementById('events'));

    chart3.draw(distinct_events, google.charts.Scatter.convertOptions(options));



    var options_timeline = {
      colors: ["#F37428"],
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'Popularity'
      }
    };

    var visit_timeline_d = new google.visualization.DataTable();
    visit_timeline_d.addColumn('date', 'Visit date');
    visit_timeline_d.addColumn('number', 'count');
    resp.visit_timeline.forEach(function (element) {

      visit_timeline_d.addRow([new Date(element.key), element.value]);

    });

    var chart4 = new google.visualization.LineChart(document.getElementById('timeline'));

    chart4.draw(visit_timeline_d, options_timeline);

    var click_Events = new google.visualization.DataTable();
    click_Events.addColumn('string', 'Event Name');
    click_Events.addColumn('number', 'count');
    resp.click_events.forEach(function (element) {

      click_Events.addRow([element[0], element[1]]);
    });
    var options_click = {
      bar: { groupWidth: "15%" },
      colors: ["#F37428"],
      title: 'Event - Users',
      hAxis: { title: 'Event', minValue: 0 },
      // vAxis: {title: 'Weight', minValue: 0},
      legend: 'none'
    };
    var chart5 = new google.visualization.ColumnChart(document.getElementById('section_popularity'));

    chart5.draw(click_Events, options_click);


    var options_visit_timeline = {
      bar: { groupWidth: "15%" },
      colors: ["#F37428"],
      hAxis: {
        title: 'User'
      },
      vAxis: {
        title: 'Total Visits'
      }
    };

    var average_visit_D = new google.visualization.DataTable();
    average_visit_D.addColumn('string', 'Visitor');
    average_visit_D.addColumn('number', 'count');
    resp.average_visit.forEach(function (element) {
      average_visit_D.addRow([element.key, element.value]);
    });

    var chart6 = new google.visualization.ColumnChart(document.getElementById('visits'));
    chart6.draw(average_visit_D, options_visit_timeline);

    var options_searches = {
      bar: { groupWidth: "15%" },
      colors: ["#F37428"],
      hAxis: {
        title: 'Business'
      },
      vAxis: {
        title: 'Views'
      }
    };
    var search_d = new google.visualization.DataTable();
    search_d.addColumn('string', 'Page');
    search_d.addColumn('number', 'count');
    resp.navigate.forEach(function (element) {
      search_d.addRow([element.key, element.value]);
    });

    var chart7 = new google.visualization.ColumnChart(document.getElementById('navigations'));
    chart7.draw(search_d, options_searches);

    var options_searches = {
      bar: { groupWidth: "15%" },
      colors: ["#F37428"],
      hAxis: {
        title: 'Business'
      },
      vAxis: {
        title: 'Views'
      }
    };
    var search_d = new google.visualization.DataTable();
    search_d.addColumn('string', 'Search');
    search_d.addColumn('number', 'count');
    resp.search.forEach(function (element) {
      search_d.addRow([element.key, element.value]);
    });

    var chart8 = new google.visualization.ColumnChart(document.getElementById('searches'));
    chart8.draw(search_d, options_searches);

    let ip_address = Object.keys(resp.ip_events);
    user_data_ip = resp.ip_events;
    // console.log(user_data , resp.ip_events);
    $.each(ip_address, function (i, item) {
      $('#ip').append($('<option>', {
        value: item,
        text: item
      }));
    });
  });

}
function change_user(new_ip) {
  if (new_ip == "") {
    $("#ip_ev").hide();
    return;
  }
  $("#ip_ev").show();
  let curr_data = user_data_ip[new_ip];
  var ip_d = new google.visualization.DataTable();
  ip_d.addColumn('string', 'Event');
  ip_d.addColumn('number', 'count');
  curr_data.events.forEach(function (element) {
    key = element.key
    if (key == null) {
      key = "pageView";
    }
    ip_d.addRow([key, element.value]);
  });
  var options_searches = {
    bar: { groupWidth: "15%" },
    colors: ["#F37428"],
    // hAxis: {
    //   title: 'Events'
    // },
    // vAxis: {
    //   title: 'Count'
    // }
  };
  var chart9 = new google.visualization.ColumnChart(document.getElementById('ip_graph'));
  chart9.draw(ip_d, options_searches);
  var ip_page = new google.visualization.DataTable();
  ip_page.addColumn('string', 'Event');
  ip_page.addColumn('number', 'count');
  curr_data.page_visits.forEach(function (element) {
    key = element.key;
    if (key == null) {
      key = "/";
    }
    ip_page.addRow([key, element.value]);
  });
  var options_searches = {
    bar: { groupWidth: "15%" },
    colors: ["#F37428"],
    hAxis: {
      title: 'Page '
    },
    // vAxis: {
    //   title: 'Count'
    // }
  };
  var chart10 = new google.visualization.ColumnChart(document.getElementById('ip_graph_page'));
  chart10.draw(ip_page, options_searches);
}
$(document).ready(function () {
  $("#ip_ev").hide();
});