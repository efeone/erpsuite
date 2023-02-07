// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt
frappe.ui.form.on('Business Unit', {
	validate: function(frm) {
    set_staff_count(frm);
	}
});

frappe.ui.form.on('Business Unit Staff', {
  staff: function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    var staffs_list = get_staffs_list(frm);
    set_staff_filters(frm, staffs_list);
  },
	staffs_add: function(frm) {
		var row = locals[cdt][cdn];
    set_staff_count(frm);
    var staffs_list = get_staffs_list(frm);
    set_staff_filters(frm, staffs_list);
	},
  staffs_remove: function(frm) {
    set_staff_count(frm);
	},
  before_staffs_remove: function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    var staffs_list = get_staffs_list(frm);
    set_staff_filters(frm, staffs_list = staffs_list.replace(row.staff, ''));
  }
});

function set_staff_count(frm){
  if(frm.doc.staffs){
    frm.set_value('total_staffs', frm.doc.staffs.length);
  }
  else {
    frm.set_value('total_staffs', 0);
  }
  frm.refresh_fields('total_staffs');
}

function set_staff_filters(frm, staffs){
  frm.set_query('staff', 'staffs', () => {
    return {
      filters: {
        name: [ 'not in', staffs ]
      }
    }
  });
}

function get_staffs_list(frm){
	let staffs_list = '';
	frm.doc.staffs.forEach(function (staff, i) {
		if(staff.staff){
				staffs_list += staff.staff + ', ';
		}
	});
	return staffs_list;
}
