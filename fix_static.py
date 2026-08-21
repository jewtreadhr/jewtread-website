import os
import re

templates_dir = 'templates'

replacements = {
    r'href="styles\.css"': r'href="{% static \'css/styles.css\' %}"',
    r'href="/static/css/styles\.css"': r'href="{% static \'css/styles.css\' %}"',
    r'src="script\.js"': r'src="{% static \'js/script.js\' %}"',
    r'src="/static/js/script\.js"': r'src="{% static \'js/script.js\' %}"',
    r'href="jewtread-logo\.png"': r'href="{% static \'images/jewtread-logo.png\' %}"',
    r'src="jewtread-logo\.png"': r'src="{% static \'images/jewtread-logo.png\' %}"',
    r'href="/static/images/jewtread-logo\.png"': r'href="{% static \'images/jewtread-logo.png\' %}"',
    r'src="/static/images/jewtread-logo\.png"': r'src="{% static \'images/jewtread-logo.png\' %}"',
    r'src="images/(.+?)"': r'src="{% static \'images/\1\' %}"',
}

for root, dirs, files in os.walk(templates_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            for old, new in replacements.items():
                content = re.sub(old, new, content)
            
            # Ensure {% load static %} is at the top if any static tags are used
            if '{% static ' in content and '{% load static %}' not in content:
                content = '{% load static %}\n' + content
                
            if original_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated static links in {filepath}")
