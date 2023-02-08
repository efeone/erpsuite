// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on('Transaction Quick Entry', {
  refresh: function(frm) {
    frm.disable_save();
    make_buttons(frm);
	},
});

frappe.ui.form.on('Transaction Quick Entry Item', {
  transaction: function(frm){
    var transactions_list = get_transactions_list(frm);
    set_transaction_filters(frm, transactions_list);
  },
	items_add: function(frm) {
    var transactions_list = get_transactions_list(frm);
    set_transaction_filters(frm, transactions_list);
	},
  before_items_remove: function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    var transactions_list = get_transactions_list(frm);
    if(row.transaction){
      set_transaction_filters(frm, transactions_list = transactions_list.replace(row.transaction, ''));
    }
  }
});

function make_buttons(frm){
  frm.add_custom_button('Clear form', () => {
    frm.reload_doc();
  }).addClass("btn btn-danger");

  frm.add_custom_button('Save', () => {
    if(validate_mandatory_fields(frm)){
      frappe.confirm('Are you sure, you want to continue?',
        (yes) => {
          create_transactions(frm)
        },(no) => {

      });
    }
  }).addClass("btn btn-primary");
}

frappe.ui.keys.on("ctrl+s", function(frm) {
  console.log("Saving via Keyboard Shortcut");
  if(validate_mandatory_fields(cur_frm)){
    frappe.confirm('Are you sure, you want to continue?',
      (yes) => {
        create_transactions(cur_frm)
      },(no) => {

    });
  }
});

function set_transaction_filters(frm, transactions_list){
  frm.set_query('transaction', 'items', () => {
    return {
      filters: {
        name: [ 'not in', transactions_list ]
      }
    }
  });
}

function get_transactions_list(frm){
	var transactions_list = [];
	frm.doc.items.forEach(function (transaction, i) {
		if(transaction.transaction){
				transactions_list += transaction.transaction + ', ';
		}
	});
	return transactions_list;
}

function remove_blank_rows(frm){
  let len = frm.doc.items.length;
  if(!frm.doc.items[len-1].transaction && len>1){
    frm.get_field('items').grid.grid_rows[len-1].remove();
    frm.refresh_field('items');
  }
}

function create_transactions(frm){
  var created = 0;
  if(frm.doc.items){
    frm.doc.items.forEach(function (item, i) {
      frappe.db.insert({
    			doctype: 'Transaction Summary',
    			posting_date: frm.doc.posting_date,
    			posting_time: frm.doc.posting_time,
          transaction: item.transaction,
          business_unit: frm.doc.business_unit,
          transaction_value: item.transaction_value
    		});
        created = 1;
  	});
    if(created){
      frappe.show_alert('Transactions Created..', 5);
    }
    frm.reload_doc();
  }
}

function validate_mandatory_fields(frm){
  remove_blank_rows(frm);
  if (!frm.doc.posting_date) { frappe.throw(__('Posting Date is Required!')); }
  if (!frm.doc.posting_time) { frappe.throw(__('Posting Time is Required!')); }
  if (!frm.doc.items.length) { frappe.throw(__('Transactions are Required!')); }
  return 1
}
