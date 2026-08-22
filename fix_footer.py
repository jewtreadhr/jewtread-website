import os
import re

templates_dir = 'templates'
for root, dirs, files in os.walk(templates_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Skip if already has privacy policy
            if '{% url \'core:privacy\' %}' in content:
                continue

            # Let's replace the whole Jewtread HR footer block.
            # We'll use a regex that matches <h3>Jewtread HR</h3> up to </div>
            pattern = re.compile(r'<h3>Jewtread HR</h3>\s*(<a[^>]*>.*?</a>\s*)+</div>', re.DOTALL)
            
            replacement = '''<h3>Jewtread HR</h3>
          <a href="{% url 'core:about' %}">About us</a>
          <a href="{% url 'core:services' %}">Our services</a>
          <a href="{% url 'core:privacy' %}">Privacy Policy</a>
          <a href="{% url 'core:terms' %}">Terms & Conditions</a>
          <a href="{% url 'core:contact' %}">Contact us</a>
        </div>'''
            
            new_content, count = pattern.subn(replacement, content)
            
            if count > 0:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {filepath}')
