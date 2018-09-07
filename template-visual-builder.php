<?php
/*
Template Name: Visual Builder
*/
?>

<?php get_header(); ?>
			
		<div id="content">

			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		
			<?php the_content(); ?>

			<?php endwhile; endif; ?>

		</div> <!-- end #content -->

<?php get_footer(); ?>