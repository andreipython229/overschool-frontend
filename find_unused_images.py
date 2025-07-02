import os
import re
from pathlib import Path

def find_all_images(project_path):
    """Находит все изображения в проекте"""
    image_extensions = {'.png', '.jpg', '.jpeg', '.svg'}
    images = []
    
    for root, dirs, files in os.walk(project_path):
        # Пропускаем node_modules
        if 'node_modules' in root:
            continue
            
        for file in files:
            if Path(file).suffix.lower() in image_extensions:
                full_path = os.path.join(root, file)
                relative_path = os.path.relpath(full_path, project_path)
                images.append((relative_path, file))
    
    return images

def find_image_references(project_path, image_name):
    """Ищет ссылки на изображение в коде"""
    references = []
    
    # Расширения файлов для поиска
    code_extensions = {'.tsx', '.ts', '.jsx', '.js', '.scss', '.css', '.html', '.json'}
    
    for root, dirs, files in os.walk(project_path):
        # Пропускаем node_modules и другие служебные папки
        if any(skip in root for skip in ['node_modules', '.git', 'dist', 'build']):
            continue
            
        for file in files:
            if Path(file).suffix.lower() in code_extensions:
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        
                    # Ищем различные способы использования изображения
                    patterns = [
                        image_name,  # Прямое имя файла
                        image_name.replace('.png', '').replace('.jpg', '').replace('.svg', ''),  # Без расширения
                        image_name.replace('_', '').replace('-', ''),  # Без подчеркиваний и дефисов
                        image_name.lower(),  # В нижнем регистре
                        image_name.upper(),  # В верхнем регистре
                    ]
                    
                    for pattern in patterns:
                        if pattern in content:
                            relative_path = os.path.relpath(file_path, project_path)
                            references.append(f"{relative_path} (найдено: {pattern})")
                            break
                            
                except Exception as e:
                    continue
    
    return references

def main():
    project_path = "."
    
    print("Поиск всех изображений...")
    images = find_all_images(project_path)
    print(f"Найдено {len(images)} изображений")
    
    unused_images = []
    used_images = []
    
    print("Проверка использования изображений...")
    for i, (path, filename) in enumerate(images):
        print(f"Проверяю {i+1}/{len(images)}: {filename}")
        
        references = find_image_references(project_path, filename)
        
        if references:
            used_images.append((path, filename, references))
        else:
            unused_images.append((path, filename))
    
    print("Запись результатов в файл...")
    with open("неиспользуемые_картинки.txt", "w", encoding="utf-8") as f:
        f.write("ПОИСК НЕИСПОЛЬЗУЕМЫХ ИЗОБРАЖЕНИЙ\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Всего найдено изображений: {len(images)}\n")
        f.write(f"Используемых изображений: {len(used_images)}\n")
        f.write(f"Неиспользуемых изображений: {len(unused_images)}\n\n")
        
        f.write("НЕИСПОЛЬЗУЕМЫЕ ИЗОБРАЖЕНИЯ:\n")
        f.write("-" * 30 + "\n")
        for path, filename in unused_images:
            f.write(f"{filename} ({path})\n")
        
        f.write("\n\nИСПОЛЬЗУЕМЫЕ ИЗОБРАЖЕНИЯ:\n")
        f.write("-" * 30 + "\n")
        for path, filename, references in used_images:
            f.write(f"{filename} ({path})\n")
            for ref in references[:3]:  # Показываем только первые 3 ссылки
                f.write(f"  - {ref}\n")
            if len(references) > 3:
                f.write(f"  - ... и еще {len(references) - 3} ссылок\n")
            f.write("\n")
    
    print("Готово! Результаты записаны в неиспользуемые_картинки.txt")

if __name__ == "__main__":
    main() 