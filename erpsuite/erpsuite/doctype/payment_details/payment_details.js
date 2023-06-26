// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on('Payment Details', {
	refresh:function(frm) {
		frm.set_query("staff",function(){
		  return {
			filters: {
			  "business_unit": frm.doc.business_unit
			}
		  }
		})
	  }
	  
})
	
		