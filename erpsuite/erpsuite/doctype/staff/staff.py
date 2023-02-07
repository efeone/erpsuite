# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Staff(Document):
	def before_validate(doc, method):
		if doc.first_name:
			doc.full_name = doc.first_name
		if doc.last_name:
			doc.full_name = doc.first_name + " " + doc.last_name
