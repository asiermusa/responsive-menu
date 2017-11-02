# Responsive Menu

Super simple Flexbox based SCSS + jQuery Responsive Menu.


## Change all values in _vars.scss file (colors, position, fonts...)
``` bash
$colors: (
  menu-bg: rgba($primary, 0.8),
  link-color: white,
  link-color-hover: darken($primary, 10%),
  link-bg: $primary,
  link-bg-hover: rgba(white, 0.5),
  ...
  
);
```

## Set the breakpoint to jQuery
``` bash
jQuery(document).ready(function($) {
	$('.menu').responsiveMenu({
		breakpoint: '992'
	});
});
```

---

``` bash
# Clone or download and try yourself
npm install
```
