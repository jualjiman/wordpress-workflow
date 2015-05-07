<!DOCTYPE html>
<html lang="en">

	<head>

	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="description" content="">
	    <meta name="author" content="">

	    <title>Wordpress-workflow Documentation</title>

	    <!-- Bootstrap Core CSS -->
	    <link href="css/bootstrap.css" rel="stylesheet">

	    <!-- Custom CSS -->
	    <link href="css/simple-sidebar.css" rel="stylesheet">

	    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	    <![endif]-->

	</head>

	<body>
		<nav class="navbar navbar-inverse navbar-fixed-top">
		  <div class="container-fluid">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">

		      <a class="navbar-brand" href="#">
		      	<img src="images/wwb.png" alt="">
		      	<span>Wordpress-<strong>workflow</strong></span>
		      </a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

		      <ul class="nav navbar-nav navbar-right">
		        <!-- <li><a href="#">Documentation</a></li> -->
		        <!-- <li class="dropdown">
		          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
		          <ul class="dropdown-menu" role="menu">
		            <li><a href="#">Action</a></li>
		            <li><a href="#">Another action</a></li>
		            <li><a href="#">Something else here</a></li>
		            <li class="divider"></li>
		            <li><a href="#">Separated link</a></li>
		          </ul>
		        </li> -->
		      </ul>

		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
	    <div id="wrapper">
	        <!-- Sidebar -->
	        <div id="sidebar-wrapper">
	        <?php include("menu.php") ?>
	        </div>

	                <!-- Page Content -->
        <div>
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 name="wordpress-workflow">Tests</h1>
                        <hr>
                       	<section id="tests" class="row">
                       		<article class="col-xs-12">
                       			<div id="project_test" class="test-section">
				                    <div class="test-header row">
				                   		<div class="col-sm-6">
				                   			<h3>Project code</h3>
				                   		</div>
				                   		<div class="col-sm-6 text-right">
				                    		<button class="btn btn-danger">Run test</button>
				                   		</div>
				                    </div>

				                    <div class="test-content">
					                    <div class="row">
					                    	<div class="col-md-6">
					                    		<canvas></canvas>
					                    	</div>
					                    	<div class="col-md-6">
					                    		<div class="quick_stats"></div>
					                    	</div>
					                    </div>
										<hr>
										<div class="test-details">
											<h4>Details</h4>
							                <div class="panel-group" role="tablist"></div>
										</div>
	                   				</div>
				                    <div class="text-center spinner">
	                       				<img src="images/loading.gif" alt="loading imgs">
	                       				This test may take a while...
				                    </div>
                   				</div>
                       		</article>

                       		<article class="col-xs-12">
                       			<div id="third_party_test" class="test-section">
				                    <div class="test-header row">
				                   		<div class="col-sm-6">
				                   			<h3>Third party plugins</h3>
				                   		</div>
				                   		<div class="col-sm-6 text-right">
				                    		<button class="btn btn-danger">Run test</button>
				                   		</div>
				                    </div>

				                    <div class="test-content">
					                    <div class="row">
					                    	<div class="col-md-6">
					                    		<canvas></canvas>
					                    	</div>
					                    	<div class="col-md-6">
					                    		<div class="quick_stats"></div>
					                    	</div>
					                    </div>
										<hr>
										<div class="test-details">
											<h4>Details</h4>
							                <div class="panel-group" role="tablist"></div>
										</div>
	                   				</div>
				                    <div class="text-center spinner">
	                       				<img src="images/loading.gif" alt="loading imgs">
	                       				This test may take a while...
				                    </div>
                   				</div>
                       		</article>

                       	</section> 
                    </div>
                </div>
        </div>
        <!-- /#page-content-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/Chart.min.js"></script>
    <script src="js/lodash.min.js"></script>
    <script src="js/custom.js"></script>

</body>

</html>