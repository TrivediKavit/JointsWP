<?php
/** 
 * For more info: https://developer.wordpress.org/themes/basics/theme-functions/
 *
 */			
	
// Theme support options
require_once(get_template_directory().'/functions/theme-support.php'); 

// WP Head and other cleanup functions
require_once(get_template_directory().'/functions/cleanup.php'); 

// Register scripts and stylesheets
require_once(get_template_directory().'/functions/enqueue-scripts.php'); 

// Register custom menus and menu walkers
require_once(get_template_directory().'/functions/menu.php'); 

// Register sidebars/widget areas
require_once(get_template_directory().'/functions/sidebar.php'); 

// Makes WordPress comments suck less
require_once(get_template_directory().'/functions/comments.php'); 

// Replace 'older/newer' post links with numbered navigation
require_once(get_template_directory().'/functions/page-navi.php'); 

// Adds support for multiple languages
require_once(get_template_directory().'/functions/translation/translation.php'); 

// Adds site styles to the WordPress editor
// require_once(get_template_directory().'/functions/editor-styles.php'); 

// Remove Emoji Support
// require_once(get_template_directory().'/functions/disable-emoji.php'); 

// Related post function - no need to rely on plugins
// require_once(get_template_directory().'/functions/related-posts.php'); 

// Use this as a template for custom post types
// require_once(get_template_directory().'/functions/custom-post-type.php');

// Customize the WordPress login menu
// require_once(get_template_directory().'/functions/login.php'); 

// Customize the WordPress admin
// require_once(get_template_directory().'/functions/admin.php');

// Custom Post Type - Testimonials
// require_once(get_template_directory().'/functions/custom-post-type-testimonials.php');

// Custom Shortcodes
// require_once(get_template_directory().'/functions/custom-shortcodes.php');

function limit_words($string, $word_limit = 35)
{
	$words = explode(" ",$string);
	return implode(" ",array_splice($words,0,$word_limit));
}

function pagination($total_pages, $current_page)
{
	if($total_pages > 1)
	{
		echo "<div class=\"pagination\">";

		for ($i=1; $i <= $total_pages; $i++)
		{
			echo ($current_page == $i)? "<span class=\"active\">".$i."</span>":"<a href='".get_pagenum_link($i)."' class=\"inactive\">".$i."</a>";
		}

		echo "</div>\n";
	}
}

function custom_css_classes_for_vc_column( $class_string, $tag )
{
	if ( $tag == 'vc_column_container' || $tag == 'vc_column_inner' )
	{
		if(!preg_match('/columns/', $class_string))
		{
			$class_string = preg_replace( '/vc_col-sm-(\d{1,2})/', 'large-$1 columns', $class_string ); // This will replace "vc_col-sm-%" with "large-%"	
		}
	}
	
	/*if ( $tag == 'vc_column' || $tag == 'vc_column_inner' )
	{
		$class_string = preg_replace( '/vc_col-sm-(\d{1,2})/', 'xxlarge-$1 columns', $class_string ); // This will replace "vc_col-sm-%" with "xxlarge-%"
	}*/
	return $class_string; // Important: you should always return modified or original $class_string
}

// Filter to replace default css class names for vc_column shortcode
add_filter( 'vc_shortcodes_css_class', 'custom_css_classes_for_vc_column', 10, 2 );

add_filter('widget_text', 'do_shortcode');

//add_image_size( 'post-thumbnail-image', 600, 400, true);

/*
* Gets the excerpt of a specific post ID or object
* @param - $post - object/int - the ID or object of the post to get the excerpt of
* @param - $length - int - the length of the excerpt in words
* @param - $tags - string - the allowed HTML tags. These will not be stripped out
* @param - $extra - string - text to append to the end of the excerpt
*/
function get_excerpt_by_id($post, $length = 35, $tags = '<a><em><strong>', $extra = ' ...') {

	if(is_int($post)) {
        // get the post object of the passed ID
		$post = get_post($post);
	} elseif(!is_object($post)) {
		return false;
	}

	if(has_excerpt($post->ID)) {
		$the_excerpt = $post->post_excerpt;
		return apply_filters('the_content', $the_excerpt);
	} else {
		$the_excerpt = $post->post_content;
	}

	$the_excerpt = strip_shortcodes(strip_tags($the_excerpt), $tags);
	$the_excerpt = preg_split('/\b/', $the_excerpt, $length * 2+1);
	$excerpt_waste = array_pop($the_excerpt);
	$the_excerpt = implode($the_excerpt);
	$the_excerpt .= $extra;

	return apply_filters('the_content', $the_excerpt);
}