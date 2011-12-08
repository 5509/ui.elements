# ui.elements

Changing checkbox/radio/select styles.

## Usage

Loading css and js files on head element.

	<link href="ui.elements/ui.elements.css" rel="stylesheet">
	<script src="ui.elements/ui.elements.js"></script>

Execute uielements code as below sample codes.

	jQuery(function($) {
	  $('form').UIElements({
	    checkbox: [
	      { name: 'checkbox[]' }
	    ],
	    radio: [
	      { name: 'radio' }
	    ],
	    select: [
	      { name: 'select' }
	    ]
	  });
	});

Using some checkbox/radio groups is able to be specified.

	checkbox: [
	  { name: 'checkbox[]' },
	  { name: 'checkbox2[]' }
	]
