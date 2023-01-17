import frappe
from frappe.utils import *

@frappe.whitelist()
def get_today_sales():
    '''Method to get today total Sales'''
    current_date = getdate(today())
    return get_today_transaction_summary('Sales', current_date)

@frappe.whitelist()
def get_today_purchase():
    '''Method to get today total Purchase'''
    current_date = getdate(today())
    return get_today_transaction_summary('Purchase', current_date)

@frappe.whitelist()
def get_today_bank_balance():
    '''Method to get today Bank Balance'''
    current_date = getdate(today())
    return get_today_transaction_summary('Bank Balance', current_date)

@frappe.whitelist()
def get_today_petty_cash_balance():
    '''Method to get today Petty Cash Balance'''
    current_date = getdate(today())
    return get_today_transaction_summary('Petty Cash Balance', current_date)

@frappe.whitelist()
def get_today_creditors_balance():
    '''Method to get today Creditors Balance'''
    current_date = getdate(today())
    return get_today_transaction_summary('Creditors Balance', current_date)

@frappe.whitelist()
def get_today_debitors_balance():
    '''Method to get today Debtors Balance'''
    current_date = getdate(today())
    return get_today_transaction_summary('Debtors Balance', current_date)

@frappe.whitelist()
def get_today_transaction_summary(transaction, posting_date):
    '''Method to get Transaction Value from Transaction Summary'''
    transaction_value = 0
    if frappe.db.exists('Transaction Summary', { 'transaction': transaction, 'posting_date': posting_date }):
        last_transaction_doc = frappe.get_last_doc('Transaction Summary', { 'transaction': transaction, 'posting_date': posting_date }, order_by='posting_date desc')
        if last_transaction_doc.transaction_value:
            transaction_value = last_transaction_doc.transaction_value
    return transaction_value
