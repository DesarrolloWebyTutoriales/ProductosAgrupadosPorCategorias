<?php

	//----//
	function add_yourtheme_css_js() 
	{

		wp_register_style( 'style', get_stylesheet_directory_uri() . '/style.css', array(), '1.1', 'all' );
		wp_register_style( 'font-awesome-min', get_stylesheet_directory_uri() . '/css/fontawesome.css', array(), '5.12.0', 'all' );
		wp_register_style( 'brands-min', get_stylesheet_directory_uri() . '/css/brands.css', array(), '5.12.0', 'all' );
		wp_register_style( 'solid-min', get_stylesheet_directory_uri() . '/css/solid.css', array(), '5.12.0', 'all' );

		// owl carousel
		wp_register_style( 'owl-carousel-min', get_stylesheet_directory_uri() . '/css/owl.carousel.min.css', array(), '2.3.4', 'all' );
		wp_register_style( 'owl-theme-default-min', get_stylesheet_directory_uri() . '/css/owl.theme.default.min.css', array(), '2.3.4', 'all' );

		wp_register_script( 'owl-carousel-js', get_template_directory_uri().'/js/owl.carousel.min.js', '', '', true );
		wp_register_script( 'app-js', get_template_directory_uri().'/js/app.js', '', '', true );   

		// css
		wp_enqueue_style('style');
		wp_enqueue_style('font-awesome-min');
		wp_enqueue_style('brands-min');
		wp_enqueue_style('solid-min');
		wp_enqueue_style('owl-carousel-min');
		wp_enqueue_style('owl-theme-default-min');

		// js
		wp_enqueue_script('owl-carousel-js');
		wp_enqueue_script('app-js');

	}
	add_action( 'wp_enqueue_scripts', 'add_yourtheme_css_js' );	

	function add_scripts() {
	        wp_deregister_script('jquery');
	        wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', '', '1.12.4', false);
	        wp_enqueue_script( 'jquery' );
	}
	add_action('wp_enqueue_scripts', 'add_scripts');

	function productosAgrupadosPorCategoria($content = null)
	{
		ob_start();

		$args = array(
		    'orderby'    => 'title',
		    'order'      => 'ASC',
		    'hide_empty' => 0,
		    'exclude' 	   => array(20),
		);
		$product_categories = get_terms( 'product_cat', $args );

		// Declaro una variable para almacenar cuantas categorias voy a mostrar
		$count = count($product_categories);

		// Si el numero de categorias es mayor a 0
		if ( $count > 0 ):

			// Para cada categoria, mostrar el nombre
			$i = 1;
		    foreach ( $product_categories as $product_category ):
		    ?>
				<section class="productos__loop">
				    <h4>
				    	<a href="<?php echo get_term_link( $product_category ); ?>">
				    		<?php echo $product_category->name; ?>
				    	</a>
				    </h4>
				    <div class="products">
						<?php
						    $args = array(
						        'posts_per_page' => -1,
						        'ignore_sticky_posts' => 1,
						        'tax_query' => array(
						            'relation' => 'AND',
						            array(
						                'taxonomy' => 'product_cat',
						                'field' => 'slug',
						                'terms' => $product_category->slug
						            )
						        ),
						        'post_type' => 'product',
						        'post_status' => 'publish',
						        'orderby' => 'title,'
						    );
						    $products = new WP_Query( $args );

						    if( $products->have_posts() ): 
						?>

								<div id="slider-productos-<?php echo $i; ?>" class="owl-carousel owl-theme productos__categorias">

									<?php
										while ( $products->have_posts() ):
											$products->the_post();
											$price = get_post_meta( get_the_ID(), '_price', true );
									?>
											<div class="item">
												<a href="<?php the_permalink(); ?>">
													<?php
													    if (has_post_thumbnail( $products->post->ID )) 
													        echo get_the_post_thumbnail($products->post->ID, 'shop_catalog');
													    else 
													        echo '<img src="'.woocommerce_get_product_thumbnail(184,184).'" alt="imagen" />';
													?>		                    	
													<h2><?php the_title(); ?></h2>
													<h3><?php echo wc_price( $price ); ?></h3>
												</a>
											</div>

										<?php endwhile; // Cierra el while ?>

									<?php wp_reset_postdata(); ?>

								</div>
								<!-- ./slider-productos -->

						<?php else: ?>
						<p>No hay productos en esta categoria. </p>
						<?php endif; ?>

					</div>
					<!-- -->

				</section>
				<!-- ./productos__loop -->
		    <?php
		    $i++;
		    endforeach; // Cierra el foreach
		
		endif; // Cierra el if

		$content = ob_get_contents();
		ob_end_clean();
		return $content;

	}
	add_shortcode('products-grouped-by-category','productosAgrupadosPorCategoria');