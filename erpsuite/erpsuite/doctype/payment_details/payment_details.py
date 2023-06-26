# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _
from frappe.utils import getdate

class PaymentDetails(Document):
    def validate(self):
        if self.salary_date_time:
            salary_date = getdate(self.salary_date_time)
            payment = getdate()
            monthly_salary = salary_date
            # print("salary_date ", salary_date)
            # print('salary_date.day', salary_date.day)
            # print('salary_date.month', salary_date.month)

        if salary_date == payment:
                frappe.throw('already paid.')
        elif salary_date < payment:
            frappe.msgprint('payment successfull')
        # if existing_salary_count > 0:
        #     frappe.throw(('Monthly salary has already been paid for this staff.'))
        #     print(existing_salary_count)
        # else:
        #     frappe.throw(('Monthly salary has  been unpaid for this staff.'))
