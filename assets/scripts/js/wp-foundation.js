/*
These functions make sure WordPress
and Foundation play nice together.
*/

var THEME_FOLDER = "../wp-content/themes/riopromo_v1";
var PHONE_FIELD = ".codesm-phone-field";
var DATEPICKER_FIELD = ".codesm-datepicker-field";

jQuery(document).ready(function() {
	
    // Remove empty P tags created by WP inside of Accordion and Orbit
	jQuery('.accordion p:empty, .orbit p:empty').remove();

	// Adds Flex Video to YouTube and Vimeo Embeds
	jQuery('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').each(function() {
		if ( jQuery(this).innerWidth() / jQuery(this).innerHeight() > 1.5 ) {
			jQuery(this).wrap("<div class='widescreen responsive-embed'/>");
		} else {
			jQuery(this).wrap("<div class='responsive-embed'/>");
		}
	});

	// Initialize Theme Functions
	initThemeFunctions();
});

/**======================================================
 **----------------------------------------------------**
 ** DO NOT EDIT BELOW THIS UNLESS ABSOLUTELY NECESSARY **
 **----------------------------------------------------**
=======================================================*/

function addEvent(ele, event, func)
{
	if(ele.addEventListener) ele.addEventListener(event, func, false);
	else ele.attachEvent('on' + event, func);
}

function link(event)
{
	var target	= event.target;
	var url	= target.getAttribute('data-href');
	var newWindow = (target.getAttribute('data-newwindow') !== null) ? true : false;

	if (!target.href)
	{
		var meta = (newWindow) ? '_blank' : '_self';
		window.open(url, meta);
	}
}

function setHrefs()
{
	if (document.querySelectorAll)
	{
		var datahrefs	= document.querySelectorAll('[data-href]'),
				dhcount	= datahrefs.length;
		
		while (dhcount-- > 0)
		{
			var ele = datahrefs[dhcount];
			addEvent(ele, 'click', link);
		}
	}
}

function initTelephoneInput(selector)
{
	var elements		= document.querySelectorAll(selector),
		element_count	= elements.length;

	if(element_count >= 1)
	{
		while (element_count-- > 0)
		{
			var element = elements[element_count];

			var element_i = window.intlTelInput(element, {
				utilsScript: THEME_FOLDER + "/assets/scripts/utils.js",
				preferredCountries: ['US', 'MX'],
				nationalMode: false,
				initialCountry: "auto",
				formatOnDisplay: true,
				geoIpLookup: function(callback) {
					jQuery.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
						var countryCode = (resp && resp.country) ? resp.country : "";
						callback(countryCode);
					});
				}
			});

			jQuery(element).on("keyup change", function(){
				var currentText = element_i.getNumber(intlTelInputUtils.numberFormat.E164);
				element_i.setNumber(currentText);
			});
		}
	}
}

function formatDate(date)
{
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function initThemeFunctions()
{
	// HANDLE DATA-HREF
	setHrefs();

	// INTL-TEL-INPUT
	initTelephoneInput(PHONE_FIELD);

	// FOUNDATION DATEPICKER
	jQuery(DATEPICKER_FIELD).attr("readonly", "readonly");
	jQuery(DATEPICKER_FIELD).fdatepicker();
}