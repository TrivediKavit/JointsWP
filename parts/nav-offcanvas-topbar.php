<?php
/**
 * The off-canvas menu uses the Off-Canvas Component
 *
 * For more info: http://jointswp.com/docs/off-canvas-menu/
 */
?>

<div class="top-bar" id="top-bar-menu">
	<div class="row">
		<div class="columns large-12">
			<div class="top-bar-left float-left">
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
			<div class="top-bar-right show-for-medium">
				<div class="text-center xlarge-text-right">
					<div class="primary-menu show-inline">
						<?php joints_top_nav(); ?>
					</div>
				</div>
			</div>
			<div class="show-for-small-only">
				<ul class="menu" id="mobileMenuToggleContainer">
					<li><a data-toggle="off-canvas" class="uc" id="mobileMenuToggle"><i class="fas fa-bars"></i></a></li>
				</ul>
			</div>
		</div>
	</div>
</div>