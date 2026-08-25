import fitz # PyMuPDF

pdf_path = r"C:\Users\Asus 15 Aspire\.gemini\antigravity\brain\5c335cf0-973a-41ed-90cf-f809c1381518\media__1783152697207.pdf"

doc = fitz.open(pdf_path)

# Let's inspect the words on Page 1
page = doc[0]
words = page.get_text("words")

# Print words in the header row (y coordinate around the header area)
# Let's find words that contain "DOC NO" or "DOC DATE" to identify the header row y-coordinate
header_y = None
for w in words:
    if w[4] == "DOC" and (w[1] > 100 and w[1] < 300): # between y=100 and y=300
        header_y = w[1]
        print(f"Header word: {w[4]} at y={w[1]:.2f}, x0={w[0]:.2f}, x1={w[2]:.2f}")

if header_y:
    # Let's print all words in the header row (whose y-coordinate is within 5 units of header_y)
    header_words = [w for w in words if abs(w[1] - header_y) < 5]
    header_words.sort(key=lambda x: x[0])
    print("\nHeader words sorted by X-coordinate:")
    for w in header_words:
        print(f"  '{w[4]}': x0={w[0]:.2f}, x1={w[2]:.2f}")
