import os
import re

templates_dir = 'templates'

for root, dirs, files in os.walk(templates_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # The logo replacement - we'll use jewtread-logo.png
            # It seems they want the image to show. I will replace the text with an img tag.
            old_logo_html = r'<a href="[^"]*" class="logo">Jewtread<span>HR</span></a>'
            new_logo_html = r'<a href="{% url \'core:index\' %}" class="logo"><img src="{% static \'images/jewtread-logo.png\' %}" alt="Jewtread HR Logo" style="height: 40px;"></a>'
            
            content = re.sub(old_logo_html, new_logo_html, content)
            
            old_footer_logo = r'<a href="[^"]*" class="footer-logo">Jewtread<span>HR</span></a>'
            new_footer_logo = r'<a href="{% url \'core:index\' %}" class="footer-logo"><img src="{% static \'images/jewtread-logo.png\' %}" alt="Jewtread HR Logo" style="height: 40px;"></a>'
            
            content = re.sub(old_footer_logo, new_footer_logo, content)
                
            if original_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed logo in {filepath}")
