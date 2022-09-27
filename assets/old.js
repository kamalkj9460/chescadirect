<script type="text/javascript">

	var _gaq = _gaq || [];
	// var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';;
	// _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
	_gaq.push(['_setAccount', 'UA-4274159-4']);
	_gaq.push(['_setDomainName', 'checkout.shopify.com']);
	_gaq.push(['_setAllowLinker', true]);
	_gaq.push(['_trackPageview']);
	_gaq.push(['_set', ‘currencyCode’, ‘GBP’]);
  
	_gaq.push(['_addTrans',
		'{{ order_number }}',								// transaction ID - required
		'{{ shop_name }}',  								// affiliation or store name
		'{{ total_price | money_without_currency }}',		// total - required
		'{{ tax_price | money_without_currency }}',			// tax
		'{{ shipping_price | money_without_currency }}',	// shipping
		'{{ shipping_address.city }}',						// city
		'{{ shipping_address.province }}',					// state or province
		'{{ shipping_address.country }}'					// country
	]);

	{% for line_item in line_items %}
		_gaq.push(['_addItem',
			'{{ order_number }}',								// transaction ID - required
			'{{ line_item.sku }}',								// SKU/code - required
			'{{ line_item.title }}',							// product name
			'{{ line_item.id }}',				// category or variation
			'{{ line_item.price | money_without_currency }}',	// unit price - required
			'{{ line_item.quantity }}'							// quantity - required
		]);
	{% endfor %}

	_gaq.push(['_trackTrans']);		//submits transaction to the Analytics servers


  //(function() {
  //  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  //  ga.src = ('https:' == document.location.protocol ? 'https://'; : 'http://';) + 'stats.g.doubleclick.net/dc.js';
   // var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  //})();
  
</script>

//from footer-scripts

{{ 'bootstrap.min.js' | asset_url | script_tag }}  
{{ 'api.jquery.js' | shopify_asset_url | script_tag }}
{{ 'option_selection.js' | shopify_asset_url | script_tag }}
{{ 'owl.carousel.min.js' | asset_url | script_tag }}
{{ 'flexslider.js' | asset_url | script_tag }}
{{ 'jquery.jcarousel.latest.min.js' | asset_url | script_tag }}
{{ 'jquery.elevateZoom-3.0.8.min.js' | asset_url | script_tag }}
{{ 'jquery.fancybox.pack.js' | asset_url | script_tag }}
{{ 'jquery.fakecrop.js' | asset_url | script_tag }}
{%  include 'new-currency' %}
{{ 'avenues.min.js' | asset_url | script_tag }}
{{ 'modernizr.custom.js' | asset_url | script_tag }}
{{ 'classie.js' | asset_url | script_tag }}
