import os

templates_dir = 'templates'

for root, dirs, files in os.walk(templates_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            # Remove the inline style from logo links since CSS handles it now
            content = content.replace(
                ' style="display: flex; align-items: center; gap: 12px;"',
                ''
            )
                
            if original_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Cleaned inline style from logo in {filepath}")
