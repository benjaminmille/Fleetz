var bdm_id = '50fd48b2af4ae7b21900000d';
var bdm_path = 'http://bdm.geo.fr/overlay/';
var bdm_capping = 2;
var bdm_seuil = 2;
var bdm_delai = 60*1000;
var bdm_package_id = 1;
var bdm_params = bdm_params || [];
var bdm_status = false;

if (bdm_status) {
	(function() {

		var s = document.getElementsByTagName('script')[0];
		var ol = document.createElement('script');
			ol.type = 'text/javascript';
			ol.src = 'http://overlays.next-targeting.com/library/overlay_launcher.js';
		s.parentNode.insertBefore(ol, s);

	})();
}

var s = document.getElementsByTagName('body')[0];
var ol = document.createElement('img');
//ol.src = 'http://tr.cloud-media.fr/t/5236e57c953ba19641000008';
	ol.width = 1;
	ol.height = 1;
//s.parentNode.appendChild(ol, s);
