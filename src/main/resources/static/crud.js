
	// alert ( 'from crud' );
	/**
	*
	*param field_data jei duomenu masyvas giliau tai lauko pavadiniamas, su tasku pradzioje, jei dar giliau - lauku seka, su taskais, bet butinai su tasku pradzioje, kitu atveju tuscias stringas
	*/
	function crud ( 
		
		params
	) {
		this.params = {};
		this.params.fields = params.fields;
		this.params.fields_names = params.fields_names;
		this.params.url = params.url;
		this.params.field_data = params.field_data;
		this.params.id_html_saraso = params.id_html_saraso;
		this.params.id_html_dialog_formos = params.id_html_dialog_formos;
		this.params.dialog_size_x = params.dialog_size_x;
		this.params.dialog_size_y = params.dialog_size_y;
		this.params.title_dialog_form = params.title_dialog_form;
		this.params.url_save_rec = params.url_save_rec;
		this.params.url_delete_rec = params.url_delete_rec;
		
		this.params.ed_fields = params.fields_edit;
		this.params.ed_types = params.fields_ed_types;
		
		this.params.field_name = params.field_name;		
																														// alert ( this.params.id_html_saraso );
	}
		
	crud.prototype.initEmpty = function() {
		
		var i_am = this;		
	
		this.params.o_ed_fields = [];

		this.params.dialog = null;
		
		this.params.form = null;			
		
		this.params.allFields = $( [] );
		
		this.params.confirm = null;
		
		this.params.data = {};
																																	// alert ( 'url: ' + url );
		this.params.res_str = '';
	}
	
	crud.prototype.resetDialogs = function() {
																														/*
																														if ( this.params.hasOwnProperty ( 'dialog' ) && ( this.params.dialog != null ) ) {
																														
																															this.params.dialog.dialog( 'destroy' );
																														}	
																														*/
		if ( this.params.hasOwnProperty ( 'confirm' ) && ( this.params.confirm != null ) ) {
		
			this.params.confirm.dialog( 'destroy' );
		}
		
	}

																														//	this.initEmpty();
		
	crud.prototype.refreshData = function() {
		
		var i_am = this;
		
		$.ajax(
				{
					url: this.params.url
													
				}
			)
			.done(
				
				function( data ) {

					i_am.params.data = data;
																														// alert ( 'this.data 1 ' +JSON.stringify ( i_am.params.data  ) );
					i_am.sarasas();
				}
			);
	}
																														//	this.refreshData();
	crud.prototype.sarasas = function() {
		
		var i_am = this;
			
		this.params.res_str = '<table>';			
		
		this.sarasoAntraste();
																														// alert ( 'this.params.data 2 ' + JSON.stringify ( this.params.data ) );	
		num_produktu = eval ( 'this.params.data' + this.params.field_data + '.length' );
																														// alert ( 'num_produktu:' +  num_produktu );
		for ( i = 0; i < num_produktu; i++) {
																																				// alert ( i );
			this.params.res_str += '<tr data-id="' + eval ( 'this.params.data' +this.params.field_data + '[ i ].id' ) +'" ><td>' + i + '</td>';
																														// alert ( 'this.params.fields.length' + this.params.fields.length );
			for ( k=0; k < this.params.fields.length; k++ ) {
			
				this.params.res_str += '<td>'+ eval (  'this.params.data' + this.params.field_data +'[ i ].' + this.params.fields [ k ] ) + '</td>';
			}
			
			this.params.res_str += this.addColumns();
			
			 this.params.res_str += '<td><input type="button" class="edit_button" value="redaguoti"><input  type="button" class="delete_button" value="šalinti"></td></tr>';
		} 
		this.params.res_str += '</table>';
		
		if ( this.params.id_html_dialog_formos == '' ) {

			this.htmlDialogo();
			this.params.id_html_dialog_formos = 'dialogo_forma';
		}  
		this.htmlPatvirtinimo();
		
		this.resetDialogs();
		
																														// alert ( this.params.id_html_saraso );
		
		$( '#' + this.params.id_html_saraso ).html( '' );

		$( '#' + this.params.id_html_saraso ).html( this.params.res_str );
		
		this.initDialog();
		this.edFields();
		
		// if (  ! params.hasOwnProperty ( 'confirm' ) || ( params.this == null ) ) {
		
			this.initConfirm();
		// }
		
		$( "#naujas_button" ).on( "click", function() {
			
			i_am.naujasClick ( i_am );
		});				
		
		$( '.edit_button' ).on ( 'click', function() {
			
			i_am.editClick( this, i_am );
		});
		
		$( '.delete_button' ).on ( 'click', function() {
			
			i_am.deleteClick( this, i_am );
		});
	}
	
	crud.prototype.naujasClick = function ( i_am ) {
	
		$( '#name_item' ).html ( 'Naujas ' + i_am.params.title_dialog_form );
		
		$( '#id_rec' ).val(  '0' );
		
		i_am.params.dialog.dialog( "open" );		
	}
	
	crud.prototype.editClick = function( this_button, i_am ) {

		id_record = $( this_button ).parent().parent().data ( 'id' );
		
		i_record = i_am.surastiSarasePagalId ( id_record );
		
		for ( k=0; k < i_am.params.fields.length; k++ ) {
			
			t =  i_am.params.ed_fields.indexOf ( i_am.params.fields [ k ] );
			
			if ( t > -1 ) {
			
				field_val = eval (  'i_am.params.data' + i_am.params.field_data + '[ i_record ].' + i_am.params.fields [ k ] );
			
				switch ( i_am.params.ed_types [ t ] ) {
					
					case 'textarea':
					
						$( '#' +  i_am.params.fields[ k ] ).html ( field_val );	break;
					
					case 'radio':
					
						$( 'input[name=' + i_am.params.fields[ k ] + ']' ).each ( function() {
							
																					// alert ( $( this ).val() + '==' + field_val + ': ' + ( $( this ).val() == field_val ) );
							
							$( this ).prop ( 'checked', $( this ).val() == field_val );
						});
						
						break;
						
					default:
																													// alert (  i_am.params.fields [ k ]  + ': ' + field_val );
						$( '#' +  i_am.params.fields[ k ]  ).val ( field_val );
				}
			}
		}
		
		$( '#name_item' ).html ( eval (  'i_am.params.data' + i_am.params.field_data + '[ i_record ].' + i_am.params.field_name ) );
		
		$( '#id_rec' ).val ( id_record );
		i_am.params.dialog.dialog( "open" );
	}
	
	crud.prototype.deleteClick = function( this_button, i_am ) {

		id_record = $( this_button ).parent().parent().data ( 'id' );
		
		i_record = i_am.surastiSarasePagalId ( id_record );
		
		for ( k=0; k < i_am.params.fields.length; k++ ) {
			
			field_val = eval (  'i_am.params.data' + i_am.params.field_data + '[ i_record ].' + i_am.params.fields [ k ] );
																													// alert (  i_am.params.fields [ k ] + ' (' + i_am.params.fields[ k ]  + ') : ' + field_val );
			$( '#del_' +  i_am.params.fields[ k ] ).html ( field_val );
																													// alert ( $( '#del_' +  i_am.params.fields[ k ] ).html() );
		}
		
		$( '#del_name_item' ).html ( eval (  'i_am.params.data' + i_am.params.field_data + '[ i_record ].' + i_am.params.field_name ) );
		
		$( '#id_del_rec' ).val ( id_record );
		i_am.params.confirm.dialog( "open" );
	}	
	
		 
	crud.prototype.sarasoAntraste= function() {
			
		this.params.res_str += '<tr><th>eil.<br>nr.</th>';
		
		for ( i =0; i< this.params.fields_names.length; i++ ) {
		
			this.params.res_str += '<th>' + this.params.fields_names [ i ] + '</th>';
			
		}
		this.params.res_str += 
		
			this.addHeadColumns()
		
			+ '<th>veiksmai ' +									
				'<input type="button" class="new_button" value="naujas" id="naujas_button"></th>' +
			'</tr>';
																												// alert ( this.params.res_str );
	}
		
	crud.prototype.surastiSarasePagalId = function ( id ) {
		
		found = -1;

		for ( i = 0; i < num_produktu; i++) {	
		
			if ( id == eval ( 'this.params.data' +this.params.field_data + '[ i ].id' ) ) {
			
				found = i;
			}
		}
		return found;
	}
		
	crud.prototype.htmlDialogo = function() {
			
		this.params.res_str += 
		
			'<div id="dialogo_forma" title="' + this.params.title_dialog_form + '">' +
				'<p class="validateTips">Visi laukeliai turi buti užpildyti.</p>' +
				'<p class="name_item" id="name_item"></p>' +
				'<form action="">' +
				'<fieldset>'
		;

		this.htmDialogoEditFields( this, this.params.ed_fields );

		this.params.res_str += 			
		
			'<!-- Allow form submission with keyboard without duplicating the dialog button -->' +
			'<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">' +
			'</fieldset>' +
			'<input type="hidden" name="id" id="id_rec" value="0">' +
			'</form>' +
			'</div>'
		;
																											// console.log ( this.params.res_str );
	}
	
	crud.prototype.htmlPatvirtinimo = function () {
		
		this.params.res_str +=		
	
			'<div id="salinimo_tvirtinimas" title="Irašo šalinimas">' +
				'<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Ar tikrai norite pašalinti šį įrašą?</p>' +
				        '<span id="del_name_item"></span>' +
					'<input type="hidden" name="id" id="id_del_rec" value="0">';
		
		this.htmlPatvirtinimoInfoFields ( this );
		
		this.params.res_str += '</div>'
	}
	
	crud.prototype.htmlPatvirtinimoInfoFields  = function ( i_am ) {
		
		for ( k=0; k < i_am.params.fields.length; k++ ) {
																																	// alert (i_am.params.fields[ k ] + ':' + fields_ignore.indexOf ( i_am.params.fields[ k ] ) );
			if ( ( i_am.params.ed_fields.length > 0 ) && ( i_am.params.ed_fields.indexOf ( i_am.params.fields[ k ] ) > -1 ) ) {
			
				i_am.params.res_str += 
			
					i_am.htmlDialogoEditFieldLabel ( i_am, k ) +
					'<span id="del_' + i_am.params.fields[ k ] + 
							'" class="text ui-widget-content ui-corner-all"></span>';
			}
		}
	}
	
	
	
	crud.prototype.htmlDialogoEditFieldLabel = function ( i_am, k ) {
		
			return '<label for="' + i_am.params.fields[ k ] + '">' + 
					i_am.params.fields_names [ k ].replace( '-<br>', '' ).replace ( '<br>', ' ' ).replace( '_', '' ) + 
				'</label>';
	}
	/**
	* @TODO perdaryti, kad veiktu ne su fields_ignore, o su tais laukais, kuriuos nurodai 
	*/
	crud.prototype.htmDialogoEditFields = function( i_am, fields_to_show ) {
		
		for ( k=0; k < i_am.params.fields.length; k++ ) {
																																	// alert (i_am.params.fields[ k ] + ':' + fields_ignore.indexOf ( i_am.params.fields[ k ] ) );
			if ( 
					( i_am.params.ed_fields.length > 0 ) 
				&& 
					( i_am.params.ed_fields.indexOf ( i_am.params.fields[ k ] ) > -1 ) 
				&& 
					( fields_to_show.indexOf ( i_am.params.fields[ k ] ) != -1  ) 
			) {
			
				i_am.params.res_str += 
				
					i_am.htmlDialogoEditFieldLabel ( i_am, k ) +

					'<input type="text" name="' + i_am.params.fields[ k ] +
									'" id="' + i_am.params.fields[ k ] + 
									'" value="" class="text ui-widget-content ui-corner-all">';
			}
		}		
	}
	
	
		
	crud.prototype.saveRecord = function( i_am ) {
			
		var valid = true;
		i_am.params.allFields.removeClass( "ui-state-error" );
		
		valid = i_am.validate();
	 
		id  = $( '#id_rec' ).val();
		i_am.sendData ( id, i_am );
		 
		return valid;
	}
		
	crud.prototype.edFields = function () {
		
		for ( k=0; k < this.params.fields.length; k++ ) {
			
			if ( 
					( this.params.ed_fields.length > 0 ) 
				&& 
					( this.params.ed_fields.indexOf ( this.params.fields[ k ] ) > -1 ) 
			) {

				this.params.o_ed_fields.push ( $( '#' + this.params.fields [ k ] ) );
				this.params.allFields.add ( this.params.o_ed_fields [ this.params.o_ed_fields.length - 1 ] );
			}
		}
	}
		
	crud.prototype.sendData = function( id, i_am ) {
			
		params_str = '?';
		
		if ( i_am.params.url_save_rec.indexOf ( '?' ) > -1 ) {
		
			params_str = '&';
		}			

		params_str += 'id=' + id;  	
		
		for ( k=0; k < i_am.params.ed_fields.length; k++ ) {
			
			params_str += '&' + i_am.params.ed_fields [ k ] + '='; // + $( 'input[name=' + + i_am.params.ed_fields [ k ] + ']' ).val();
			
			switch ( i_am.params.ed_types [ k ] ) {
				
				case 'textarea':
				
					params_str += $( '#' +  i_am.params.ed_fields[ k ] ).val ();	
																									// alert ( $( '#' +  i_am.params.ed_fields[ k ] ).val () ); 
					break;
				
				case 'radio':
				
					 $( 'input[name=' + i_am.params.ed_fields[ k ] + ']' ).each ( function() {
						
						
						if ( $( this ).prop ( 'checked' ) ) {
						
							params_str +=  $( this ).val();
						}
					});
					
					break;
					
				default:
																										// alert (  i_am.params.fields [ k ]  + ': ' + field_val );
					params_str += $( '#' +  i_am.params.fields[ k ]  ).val ();
			}
		}
																							alert (  'saving'  + i_am.params.url_save_rec + params_str );
		$.ajax(
			{
				url: i_am.params.url_save_rec + params_str
			}
		)
		.done( function( data ) {
			
																																// alert ( data );
			i_am.params.dialog.dialog ( 'close' );
			i_am.refreshData(); 																											// paimtiProduktus();
		});
	}		
		
		
	crud.prototype.validate = function() {
	
		return true;
	}
		
	crud.prototype.initDialog = function() {
			
																																	// alert ( this.params.id_html_dialog_formos  );
		var i_am = this;
		
		this.params.dialog = $( '#' + this.params.id_html_dialog_formos ).dialog({
			
			autoOpen: false
			, height: this.params.dialog_size_y
			, width: this.params.dialog_size_x
			, modal: true
			, buttons: {
				
				"Saugoti": function() {

					i_am.saveRecord ( i_am) 
				}
				
				, "Atšaukti": function() {
			
					i_am.params.dialog.dialog( "close" );
				}
		      }
		      , close: function() {
			      
				i_am.params.form[ 0 ].reset();
				i_am.params.allFields.removeClass( "ui-state-error" );
		      }
		});
		 
		this.params.form = this.params.dialog.find( 'form' );
	}
	
	crud.prototype.initConfirm = function() {
		
		var i_am = this;
		
		this.params.confirm = $( "#salinimo_tvirtinimas" ).dialog({

			autoOpen: false,			
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
			      
				"Šalinti": function() {
				
					i_am.deleteRecord( i_am );
				},
				"Atšaukti": function() {
				
					$( this ).dialog( "close" );
				} 
			}
		});		
	}
	
	crud.prototype.deleteRecord = function( i_am, id ) {
			
		params_str = '?';
		
		if ( i_am.params.url_delete_rec.indexOf ( '?' ) > -1 ) {
		
			params_str = '&';
		}	

		id  = $( '#id_del_rec' ).val();	
																																	// alert ( 'id_del: ' +  id );		
		
		params_str += 'id=' + id;			
																																	//alert (  'saving'  + i_am.params.url_save_rec + params_str );
		$.ajax(
			{
				url: i_am.params.url_delete_rec + params_str
			}
		)
		.done( function( data ) {
			
																																	// alert ( data );
			i_am.params.confirm.dialog ( 'close' );
			i_am.refreshData(); 																											// paimtiProduktus();
		});
	}	
	
	crud.prototype.addColumns = function() {
		
		return '';
	}
	
	crud.prototype.addHeadColumns = function() {
		
		return '';
	}	