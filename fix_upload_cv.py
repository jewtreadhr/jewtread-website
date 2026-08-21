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
            
            # Replace Upload CV button link
            content = re.sub(
                r'href="#" class="btn btn-secondary">Upload CV</a>',
                r'href="{% url \'users:profile\' %}" class="btn btn-secondary">Upload CV</a>',
                content
            )
            
            # Replace Profile and CV dropdown link
            content = re.sub(
                r'href="#" class="dropdown-item">\s*<svg[^>]*>[\s\S]*?</svg>\s*Profile and CV\s*</a>',
                r'href="{% url \'users:profile\' %}" class="dropdown-item">\n                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 4-4H8a4 4 0 0 4-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\n                            Profile and CV\n                        </a>',
                content
            )
            
            if original_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed Upload CV links in {filepath}")
