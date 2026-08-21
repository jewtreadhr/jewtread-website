import os
import re

templates_dir = 'templates'
images_dir = 'static/images'

images = os.listdir(images_dir)

for root, dirs, files in os.walk(templates_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            for img in images:
                # Escape the image name for regex just in case it has special chars
                img_escaped = re.escape(img)
                
                # Replace src="img"
                content = re.sub(rf'src="{img_escaped}"', f'src="{{% static \'images/{img}\' %}}"', content)
                content = re.sub(rf'src="/static/images/{img_escaped}"', f'src="{{% static \'images/{img}\' %}}"', content)
                
                # Replace href="img" (e.g., for icon)
                content = re.sub(rf'href="{img_escaped}"', f'href="{{% static \'images/{img}\' %}}"', content)
                content = re.sub(rf'href="/static/images/{img_escaped}"', f'href="{{% static \'images/{img}\' %}}"', content)
                
                # Replace content="img" (e.g., for meta tags)
                content = re.sub(rf'content="{img_escaped}"', f'content="{{% static \'images/{img}\' %}}"', content)
                
            if original_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed images in {filepath}")
