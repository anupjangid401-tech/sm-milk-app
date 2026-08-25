import fitz # PyMuPDF
import re

pdf_path = r"C:\Users\Asus 15 Aspire\.gemini\antigravity\brain\5c335cf0-973a-41ed-90cf-f809c1381518\media__1783152697207.pdf"

doc = fitz.open(pdf_path)

# Regex to match transaction start line: 10 digits, followed by space, followed by date dd.mm.yyyy, followed by doc type (2 chars)
row_re = re.compile(r"^(\d{10})\s+(\d{2}\.\d{2}\.\d{4})\s+([A-Z0-9]{2})\s+(.*)$")

transactions = []
current_tx = None

# Let's read all lines from the document
all_lines = []
for page in doc:
    text = page.get_text()
    for line in text.split('\n'):
        # strip spaces but keep inner spacing
        all_lines.append(line.strip())

print(f"Total lines read from PDF: {len(all_lines)}")

# We will iterate through the lines and parse them
line_idx = 0
while line_idx < len(all_lines):
    line = all_lines[line_idx]
    m = row_re.match(line)
    if m:
        # If we have a pending transaction, save it
        if current_tx:
            transactions.append(current_tx)
        
        doc_no = m.group(1)
        doc_date = m.group(2)
        doc_type = m.group(3)
        rest = m.group(4).strip()
        
        current_tx = {
            "doc_no": doc_no,
            "doc_date": doc_date,
            "doc_type": doc_type,
            "rest": rest,
            "extra_lines": []
        }
    else:
        # Check if it is a continuation of the document text or a metadata page header/totals line
        # If it is a header, footer, page number, monthly summary, etc. we skip it.
        # Otherwise, if we have current_tx, it might be an extra line of Doc.Text
        if current_tx:
            # Let's filter out lines that are clearly not doc text (e.g. page headers, totals)
            # Lines starting with Customer No, Name, User ID, Date: 04.07.2026, System ID, Program ID, closing balance, opening balance, etc.
            is_noise = False
            noise_patterns = [
                r"^User ID", r"^System ID", r"^Program ID", r"^Customer No", r"^Name:", r"^Address:",
                r"^Security Deposit", r"^Opening Balance", r"^Opening balance", r"^closing balance",
                r"^DOC NO\s+DOC DATE", r"^Amount\s+Quantity", r"^mount\s+Quantity", r"^Total Ledger Activity",
                r"^\(RV - INVOICE", r"^CT - AR-CN", r"^Note: In order", r"^In case you", r"^or by calling",
                r"^Pune # 411001", r"^AMBUJA CEMENTS LTD", r"^ACCOUNTING STATEMENT", r"^RJ-ACL-Jodhpur",
                r"^,,Jodhpur-342001", r"^Page:", r"^\(INR\)"
            ]
            for pat in noise_patterns:
                if re.match(pat, line, re.IGNORECASE):
                    is_noise = True
                    break
            
            # If it's a blank line or starts with a 10 digit number or looks like a new header, it's not text continuation
            if not is_noise and line:
                current_tx["extra_lines"].append(line)
    
    line_idx += 1

# Append the last transaction
if current_tx:
    transactions.append(current_tx)

print(f"Parsed {len(transactions)} transaction records.")

# Let's print the first 5 and last 5 parsed records to inspect
print("\n--- FIRST 5 RECORDS ---")
for t in transactions[:5]:
    print(t)

print("\n--- LAST 5 RECORDS ---")
for t in transactions[-5:]:
    print(t)
