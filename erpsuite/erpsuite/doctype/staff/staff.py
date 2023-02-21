# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.model.selfument import selfument

class Staff(selfument):
	def before_validate(self):
		if self.first_name:
			self.full_name = self.first_name
		if self.last_name:
			self.full_name = self.first_name + " " + self.last_name
