import os
import re

count = 0
for root, dirs, files in os.walk('templates'):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace the text with a flex wrapper so the gap doesn't separate them
            target = 'Jewtread<span class="hr-circle">hr</span>'
            replacement = '<div style="display: flex; align-items: center;">Jewtread<span class="hr-circle">hr</span></div>'
            
            if target in content:
                new_content = content.replace(target, replacement)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                
print(f'Updated {count} HTML files.')

# Also update styles.css to remove the margin-left from .hr-circle
with open('static/css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('margin-left: 2px;', 'margin-left: 0px;')

with open('static/css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Updated styles.css')
