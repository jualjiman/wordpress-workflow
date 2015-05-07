

var scripts_path = "../scripts/";
$(".spinner").hide();
$(".test-content").hide();


//on click event for project test 
$("#project_test button").on("click", function(){
  var parent_name = "#project_test";

  test_button_event_on_click(
    parent_name,
    '/home/vagrant/wordpress-workflow/'
  );
});


//on click event for third party test 
$("#third_party_test button").on("click", function(){
  var parent_name = "#third_party_test";

  test_button_event_on_click(
    parent_name,
    '/home/vagrant/public_www/wp-content/plugins'
  );
});


//generic functions

function test_button_event_on_click(parent_name, path){
  $(parent_name + " .test-content").hide();

  $(parent_name + " .spinner").show();
  $(parent_name + " button").attr("disabled", true);

  $.get( 
  scripts_path + "get_tests_json.php",
  {
    path: path
  })
  .done(function(json_string) {
    json = JSON.parse(json_string);

    var quick_stats = get_quick_stats_template(json);

    // generate data template for canvas
    data = generate_canvas_data(
        quick_stats.files_correct.length,        //a
        quick_stats.files_with_warnings.length,  //b
        quick_stats.files_with_errors.length     //c
      );

    $(parent_name + " .quick_stats").html(render_quick_stats(quick_stats));
    $(parent_name + " .test-details .panel-group").html(render_details_template(json.files));

    $(parent_name + " .test-content").fadeIn();

    var ctx = $(parent_name + " canvas").get(0).getContext("2d");
    var configurations = generate_canvas_configurations(parent_name, ctx, data);
    var myDoughnut = new Chart(ctx).Doughnut(data, configurations);

    $(parent_name + " .spinner").hide();
    $(parent_name + " button").attr("disabled", false);

  })
  .fail(function() {
    $(parent_name + " .quick_stats").html("Error while runing the test").fadeIn();
    $(parent_name + " .spinner").hide();
    $(parent_name + " button").attr("disabled", false);
  });
}

function get_quick_stats_template(json){

  var stats = {};

  stats.total_files = Object.keys(json.files).length;

  stats.files_with_errors = _.filter(json.files, function(item){
    return item.errors > 0;
  });

  stats.files_with_warnings = _.filter(json.files, function(item){
    return item.warnings > 0;
  });

  stats.files_correct = _.filter(json.files, function(item){
    return item.warnings == 0 && item.warnings == 0;
  });

  stats.files_incorrect = _.filter(json.files, function(item){
    return item.warnings > 0 && item.warnings > 0;
  });

  stats.total_errors = json.totals.errors;

  stats.total_warnings = json.totals.warnings;

  stats.one_percent_value = stats.total_files / 100;

  stats.errors_porcentage_value = stats.files_with_errors.length * stats.one_percent_value;

  stats.warnings_porcentage_value = stats.files_with_warnings.length * ( stats.one_percent_value * 0.5);

  stats.wrong_porcentage_value = (stats.errors_porcentage_value + stats.warnings_porcentage_value).toFixed(2);

  stats.score = 100 - stats.wrong_porcentage_value;

  return stats;
}

function render_quick_stats(quick_stats){

  var score_color_class = "";
  var qualitative_score = "Qualitative score";

  if(quick_stats.score < 33){
    score_color_class = "red-text";
    qualitative_score = "Burn it up right now!";
  }
  else if(quick_stats.score < 66){
    score_color_class = "orange-text";
    qualitative_score = "Ugly isn't the right word";
  }
  else if(quick_stats.score <= 99){
    score_color_class = "green-text";
    qualitative_score = "Almost beautiful";
  }
  else if(quick_stats.score === 100){
    score_color_class = "blue-text";
    qualitative_score = "You're the best!";
  }

  template = "<div>                                                                                               \
      <h3 class='score " + score_color_class + "'>                                                                \
        " + qualitative_score + "                                                                                 \
        <span>(" + quick_stats.score + "%)</span>                                                                 \
      </h3>                                                                                                       \
      <h4>Quick stats</h4>                                                                                        \
      Total files checked: <strong>" + quick_stats.total_files + "</strong><br/>                                  \
      <hr/>                                                                                                       \
      Files correct: <strong>" + quick_stats.files_correct.length + "</strong><br/>                               \
      Files incorrect: <strong>" + quick_stats.files_incorrect.length + "</strong><br/>                           \
      Files with warnings: <strong>" + quick_stats.files_with_warnings.length + "</strong><br/>                   \
      Files with errors: <strong>" + quick_stats.files_with_errors.length + "</strong>                            \
      <hr>                                                                                                        \
      Total warnings: <strong>" + quick_stats.total_warnings + "</strong><br/>                                    \
      Total errors: <strong>" + quick_stats.total_errors + "</strong>                                             \
    </div>";

  return template;
}

function render_details_template(json_files){
  
  var template = "";

  $.each(json_files, function(file_name, file_info) {
    
    var n = Math.floor((Math.random() * 10000) + 1);

    template += "<a class='collapsed' data-toggle='collapse' data-parent='#accordion'                           \
      href='#file" + n + "' aria-expanded='false' aria-controls='file" + n + "'>                                \
      <div class='panel panel-default'>                                                                         \
        <div class='panel-heading' role='tab' id='headingThree'>                                                \
          <h4 class='panel-title'>                                                                              \
              <span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>                            \
              " + file_name + "                                                                                 \
          </h4>                                                                                                 \
        </div>                                                                                                  \
        <div id='file" + n + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingThree'> \
          <ul class='list-group'>";

          $.each(file_info.messages, function(i, message) {
            template += "<li class='list-group-item'>                                                           \
                    <a href='commands.php#environment'>                                                         \
                        " + (i + 1) + ". " + message.message +  "                                               \
                    </a>                                                                                        \
                </li>";
          });

    template += " </ul>                                                                                         \
        </div>                                                                                                  \
      </div>                                                                                                    \
    </a>";
  });

  return template;
}

function generate_canvas_data(a, b, c){
  var data = [
    {
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Correct files"
    },
    {
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Files with warnings"
    },
    {
        color:"#DA5556",
        highlight: "#FF5A5E",
        label: "Files with errors"
    }
  ];

  data[0].value = a;
  data[1].value = b;
  data[2].value = c;

  return data;
}

function generate_canvas_configurations(parent_name, ctx, data) {

  var target = parent_name + " canvas";
    ctx = ctx,
    data = data;

  var configurations = {

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 0, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

    // onAnimationComplete: function () {
    //   var canvasWidthvar = $(target).width();

    //   var canvasHeight = $(target).height();
    //   var constant = 114;
    //   var fontsize = (canvasHeight/constant).toFixed(2);

    //   var total = 0;
      
    //   $.each(data,function() {
    //       total += parseInt(this.value,10);
    //   });

    //   var tpercentage = ((data[0].value/total)*100).toFixed(2)+"%";
    //   var textWidth = ctx.measureText(tpercentage).width;
      
    //   var txtPosx = Math.round((canvasWidthvar - textWidth)/2);
    //   ctx.fillText(tpercentage, txtPosx, canvasHeight/2);

    //   parent_name="";
    //   data="";
    //   ctx="";
    // }
  };

  return configurations;
}