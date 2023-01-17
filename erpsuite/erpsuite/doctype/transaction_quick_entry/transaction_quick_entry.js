// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on('Transaction Quick Entry', {
  onload: function(frm) {
    frm.add_child('items');
  },
  refresh: function(frm) {
    frm.disable_save();
    make_buttons(frm);
	},
});

function make_buttons(frm){
  frm.add_custom_button('Clear form', () => {
    frm.reload_doc();
  }).addClass("btn btn-danger");

  frm.add_custom_button('Save', () => {
    frappe.confirm('Are you sure you want to Approve?',
      (yes) => {
        //Creating function
      },(no) => {

    });
  }).addClass("btn btn-primary");
}
