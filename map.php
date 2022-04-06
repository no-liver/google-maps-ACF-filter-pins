<script src="https://maps.googleapis.com/maps/api/js?key=YOUR-API-KEY-HERE"></script>
<div class="container-wide">
<?php if ( have_rows('map_group','option') ) : ?>
    <?php while( have_rows('map_group','option') ) : the_row(); ?>
    <section class="mapBlock">
            <div class="mapBlock__inner">

                <div class="mapBlock__filter col-m-none">
                    <p class="locationFilter__title h5"><?php _e('Filtreeri', 'wp-theme'); ?></p>
                    <ul class="list-block locationFilter">
                        <li class="locationFilter__item">
                            <a href="javascript:;" class="btn btn-filter" data-mapfilter="all"><?php _e('Kõik', 'wp-theme'); ?></a>
                        </li>
                        <?php if ( have_rows('category_repeater','option') ) : ?>
                        <?php while( have_rows('category_repeater','option') ) : the_row(); ?>
                            <li class="locationFilter__item">
                                <a href="javascript:;" class="btn btn-filter" data-mapfilter="<?php the_sub_field('category_title','option'); ?>"><?php the_sub_field('category_title','option'); ?></a>
                            </li>
                        <?php endwhile; ?>
                        <?php endif; ?>

                        

                    </ul>
                </div><!-- .mapBlock__filter -->

                <div class="map">

                    <!-- <div class="marker"
                        data-lat="59.434150"
                        data-lng="24.683596"
                        data-img="<?php echo get_template_directory_uri(); ?>/assets/icon--locationpin.svg"
                        data-mapfilter="all"
                        data-title="Location name">
                        <div class="marker__title">Description</div>
                    </div> -->

                    <?php if ( have_rows('category_repeater','option') ) : ?>
                    <?php while( have_rows('category_repeater','option') ) : the_row(); ?>
                        <?php $cat_title = get_sub_field('category_title','option'); ?>
                        <?php while( have_rows('locations_repeater','option') ) : the_row(); ?>
                        <?php $location = get_sub_field('location','option'); ?>
                            <div class="marker"
                                data-lat="<?php echo esc_attr($location['lat']); ?>"
                                data-lng="<?php echo esc_attr($location['lng']); ?>"
                                data-img="<?php echo get_template_directory_uri(); ?>/assets/icon--locationpin.svg"
                                data-mapfilter="<?php echo $cat_title; ?>"
                                data-title="<?php the_sub_field('location_title','option'); ?>">
                                <div class="marker__title"><?php the_sub_field('location_title','option'); ?></div>
                            </div>
                        <?php endwhile; ?>
                    <?php endwhile; ?>
                    <?php endif; ?>

                </div><!-- .map -->

            </div><!-- .mapBlock__inner -->
    </section><!-- .mapBlock -->
    <?php endwhile; ?>
<?php endif; ?>
</div>
<script src="<?php bloginfo('template_url'); ?>/map.js"></script>
