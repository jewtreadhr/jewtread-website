import re

with open('static/css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Add color: var(--ink); to the overridden .footer
footer_override_pattern = re.compile(r'\.footer \{ border-top: 1px solid var\(--line\); background: var\(--surface\); padding: 28px 0; \}')
footer_override_replacement = '.footer { border-top: 1px solid var(--line); background: var(--surface); color: var(--ink); padding: 28px 0; }'
css, c1 = footer_override_pattern.subn(footer_override_replacement, css)

# 2. Add .hr-circle styles at the end of the file
hr_circle_css = '''
/* Added HR Circle for Logo */
.hr-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background-color: var(--cta-emerald);
    color: var(--bg-white) !important;
    border-radius: 50%;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: lowercase;
    margin-left: 2px;
    line-height: 1;
}
'''
if '.hr-circle' not in css:
    css += hr_circle_css

print(f"Replaced .footer overrides {c1} times.")

with open('static/css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
