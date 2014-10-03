var bdm_id = '50fd4bf2af4ae7bac5000015';
var bdm_path = 'http://bdm.geo.fr/oc/';
var bdm_capping = 2;
var bdm_seuil = 2;
var bdm_delai = 60*1000;
var bdm_package_id = 1;
var bdm_params = bdm_params || [];
var bdm_status = true;
var bdm_space_id = '5249e01e953ba1b3ac000001';

var bdm_trigger_oc_layer = function() {
	
	if (typeof bdm_disable_layer != "undefined" && bdm_disable_layer == true) {
		return false;
	}
	
	var s = document.getElementsByTagName('script')[0];
	var ol = document.createElement('script');
		ol.type = 'text/javascript';
		ol.src = 'http://static.cloud-media.fr/library/oc_launcher.js';
	s.parentNode.insertBefore(ol, s);
}

if (bdm_status) {
	window.setTimeout('bdm_trigger_oc_layer()', 1000);
}