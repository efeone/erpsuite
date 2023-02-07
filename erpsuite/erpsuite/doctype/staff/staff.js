// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on('Staff', {
	first_name: function(frm) {
    if(frm.doc.first_name){
      frm.set_value('full_name', frm.doc.first_name);
      frm.refresh_field('full_name');
    }
	},
  last_name: function(frm) {
    if(frm.doc.first_name && frm.doc.last_name){
      frm.set_value('full_name', frm.doc.first_name + " "+ frm.doc.last_name);
      frm.refresh_field('full_name');
    }
	}
});
