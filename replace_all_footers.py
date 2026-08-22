import os
import re

new_footer = '''    <footer class="footer">
      <div class="container footer-main">
        <div class="footer-brand">
          <a href="{% url 'core:index' %}" class="footer-logo">
            <img src="{% static 'images/jewtread-logo.png' %}" alt="Jewtread HR Logo" style="height: 40px" />Jewtread<span>HR</span>
          </a>
          <p>Connecting dependable professionals with households and businesses across Nigeria.</p>
        </div>
        <div class="footer-links">
          <h3>Job seekers</h3>
          <a href="{% url 'users:upload_cv' %}">Upload CV</a>
          <a href="{% url 'core:contact' %}">Get support</a>
        </div>
        <div class="footer-links">
          <h3>Employers</h3>
          <a href="{% url 'services:hire' %}">Hire a professional</a>
          <a href="{% url 'core:services' %}#corporate">Find talent</a>
          <a href="{% url 'core:contact' %}">Contact our team</a>
        </div>
        <div class="footer-links">
          <h3>Jewtread HR</h3>
          <a href="{% url 'core:about' %}">About us</a>
          <a href="{% url 'core:services' %}">Our services</a>
          <a href="{% url 'core:privacy' %}">Privacy Policy</a>
          <a href="{% url 'core:terms' %}">Terms & Conditions</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; 2026 Jewtread HR. All Rights Reserved.</p>
        <p>Building Better Homes and Stronger Businesses.</p>
      </div>
    </footer>'''

footer_regex = re.compile(r'<footer class="footer">.*?</footer>', re.DOTALL)

count = 0
for root, dirs, files in os.walk('templates'):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if '<footer class="footer">' in content:
                new_content = footer_regex.sub(new_footer, content)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f"Updated {path}")

print(f"Total files updated: {count}")
