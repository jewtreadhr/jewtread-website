import os

count = 0
for root, dirs, files in os.walk('templates'):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'Jewtread<span>HR</span>' in content:
                new_content = content.replace('Jewtread<span>HR</span>', 'Jewtread<span class="hr-circle">hr</span>')
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
print(f'Updated {count} HTML files.')
