# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class BusinessUnit(Document):
	def validate(self):
		if self.staffs:
			self.total_staffs = len(self.staffs)
		else:
			self.total_staffs = 0
