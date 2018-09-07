<?php
/*
Template Name: Full Width (No Sidebar)
*/

get_header(); ?>
			
	<div class="content">
	
		<div class="inner-content row">
	
		    <main class="main columns large-12" role="main">
				
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

					<?php get_template_part( 'parts/loop', 'page' ); ?>
					
				<?php endwhile; endif; ?>							

			</main> <!-- end #main -->
		    
		</div> <!-- end #inner-content -->
	
	</div> <!-- end #content -->

<?php get_footer(); ?>
