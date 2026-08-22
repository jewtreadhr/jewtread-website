import re

with open('static/css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix .logo block
# Find the block around line 1638
logo_pattern = re.compile(r'\.logo \{[^}]*?width:\s*48px;[^}]*?font-size:\s*0;[^}]*?\}', re.DOTALL)
logo_replacement = '''\.logo {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 1.55rem;
    font-weight: 800;
    color: var(--primary-forest);
    text-decoration: none;
}'''
css, c1 = logo_pattern.subn(logo_replacement, css)

# Fix .footer-logo block
# Find the block around line 1653
footer_logo_pattern = re.compile(r'\.footer-logo \{[^}]*?width:\s*54px;[^}]*?font-size:\s*0;[^}]*?\}', re.DOTALL)
footer_logo_replacement = '''.footer-logo {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--bg-white);
    text-decoration: none;
}'''
css, c2 = footer_logo_pattern.subn(footer_logo_replacement, css)

print(f"Replaced .logo {c1} times, .footer-logo {c2} times.")

with open('static/css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
