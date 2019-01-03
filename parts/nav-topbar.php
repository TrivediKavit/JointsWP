<?php
/**
 * The off-canvas menu uses the Off-Canvas Component
 *
 * For more info: http://jointswp.com/docs/responsive-navigation/
 */
?>

<div class="top-bar" id="main-menu">
	<div class="row">
		<div class="columns large-12">
			<div class="top-bar-left">
				<ul class="menu">
					<li class="menu-text">
						<a href="<?php echo home_url(); ?>">
							<?php $logo = "/assets/images/logo.png"; ?>
							<?php if(file_exists(get_template_directory().$logo)): ?>
								<img src="<?php echo get_template_directory_uri().$logo; ?>" alt="<?php bloginfo('name'); ?>">
							<?php else: ?>
								<h2 class="site-title"><?php bloginfo('name'); ?></h2>
								<p class="site-description"><?php bloginfo('description'); ?></p>
							<?php endif; ?>
						</a>
					</li>
				</ul>
			</div>
			<div class="top-bar-right text-center large-text-right">
				<div class="primary-menu">
					<?php joints_top_nav(); ?>
				</div>
			</div>
		</div>
	</div>
</div>