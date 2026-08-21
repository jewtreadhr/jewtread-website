import os
import re

templates_dir = 'templates'

replacements = {
    r'href="index\.html"': r'href="{% url \'core:index\' %}"',
    r'href="/?"': r'href="{% url \'core:index\' %}"', # Just in case
    r'href="about\.html"': r'href="{% url \'core:about\' %}"',
    r'href="contact\.html"': r'href="{% url \'core:contact\' %}"',
    r'href="services\.html"': r'href="{% url \'core:services\' %}"',
    r'href="services\.html#corporate"': r'href="{% url \'core:services\' %}#corporate"',
    r'href="services\.html#management"': r'href="{% url \'core:services\' %}#management"',
    r'href="hire-a-professional\.html"': r'href="{% url \'services:hire\' %}"',
    r'href="job-opportunities\.html"': r'href="{% url \'jobs:list\' %}"',
    r'href="login\.html"': r'href="{% url \'users:login\' %}"',
    r'href="signup\.html"': r'href="{% url \'users:signup_jobseeker\' %}"',
    r'href="job-seeker-dashboard\.html"': r'href="{% url \'users:jobseeker_dashboard\' %}"',
    r'href="dashboard\.html"': r'href="{% url \'users:employer_dashboard\' %}"',
    r'href="profile-cv\.html"': r'href="#"',
    r'href="job-seeker-applications\.html"': r'href="#"',
    r'href="alerts\.html"': r'href="#"',
    r'href="saved-jobs\.html"': r'href="#"',
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
                
            if original_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed links in {filepath}")
