# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import getdate, get_datetime, today
from frappe import _

class StaffAttendence(Document):
	def validate(self):
		if self.checkin_date_and_time:
			current_date = getdate(today())
			checkin_date = getdate(self.checkin_date_and_time)
			if checkin_date == current_date:
				frappe.throw(_("Check-in already exists for today"))
			else:
				frappe.msgprint("OK")
				# elif checkin_date_and_time > today:
				# 	frappe.throw(_("Invalid check-in date. Future dates are not allowed."))
				# else:
				# 	frappe.throw(_("Check-in datetime is required."))


















































#
