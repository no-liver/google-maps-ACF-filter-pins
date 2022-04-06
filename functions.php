<?php 

// Add this to your Wordpress functions php
function my_admin_scripts() {
  	wp_enqueue_script('wp-theme', 'https://maps.googleapis.com/maps/api/js?key=YOUR-API-KEY-HERE', '', '', true );
}
add_action( 'admin_enqueue_scripts', 'my_admin_scripts' );
