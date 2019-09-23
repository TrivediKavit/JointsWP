<?php
/**
 * The template part for displaying offcanvas content
 *
 * For more info: http://jointswp.com/docs/off-canvas-menu/
 */
?>

<div class="off-canvas position-left" id="off-canvas" data-off-canvas>

	<div class="hide-for-large">
		<button id="off-canvas-close" aria-label="Close menu" type="button">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	
	<?php joints_off_canvas_nav(); ?>

	<?php if ( is_active_sidebar( 'offcanvas' ) ) : ?>
		<?php dynamic_sidebar( 'offcanvas' ); ?>
	<?php endif; ?>
	
</div>
