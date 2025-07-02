import os
import re
from pathlib import Path

def find_all_images(project_path):
    """Находит все изображения в проекте"""
    image_extensions = {'.png', '.jpg', '.jpeg', '.svg'}
    images = []
    
    for root, dirs, files in os.walk(project_path):
        for file in files:
            if Path(file).suffix.lower() in image_extensions:
                full_path = os.path.join(root, file)
                relative_path = os.path.relpath(full_path, project_path)
                images.append((relative_path, file))
    
    return images

def normalize_filename(filename):
    """Нормализует имя файла для сравнения"""
    # Убираем расширение
    name = Path(filename).stem.lower()
    # Убираем цифры в конце
    name = re.sub(r'\d+$', '', name)
    # Убираем специальные символы
    name = re.sub(r'[_-]', '', name)
    return name

def find_similar_images(images):
    """Находит похожие и дубликаты изображений"""
    results = []
    
    for i, (path1, filename1) in enumerate(images):
        print(f"Обрабатываю {i+1}/{len(images)}: {filename1}")
        
        duplicates = []
        similar = []
        
        name1 = normalize_filename(filename1)
        
        for j, (path2, filename2) in enumerate(images):
            if i == j:
                continue
                
            name2 = normalize_filename(filename2)
            
            # Точное совпадение имен
            if name1 == name2:
                duplicates.append(f"{path2} ({filename2})")
            # Частичное совпадение
            elif name1 in name2 or name2 in name1:
                similar.append(f"{path2} ({filename2})")
        
        # Записываем результат
        if duplicates or similar:
            result = f"\n=== {filename1} ({path1}) ===\n"
            
            if duplicates:
                result += "ДУБЛИКАТЫ:\n"
                for dup in duplicates:
                    result += f"  - {dup}\n"
            
            if similar:
                result += "ПОХОЖИЕ:\n"
                for sim in similar:
                    result += f"  - {sim}\n"
            
            results.append(result)
        else:
            results.append(f"\n=== {filename1} ({path1}) ===\nДУБЛИКАТОВ НЕ НАЙДЕНО\n")
    
    return results

def main():
    project_path = "."
    
    print("Поиск всех изображений...")
    images = find_all_images(project_path)
    print(f"Найдено {len(images)} изображений")
    
    print("Поиск дубликатов и похожих изображений...")
    results = find_similar_images(images)
    
    print("Запись результатов в файл...")
    with open("картинки.txt", "w", encoding="utf-8") as f:
        f.write("ПОИСК ДУБЛИКАТОВ И ПОХОЖИХ ИЗОБРАЖЕНИЙ\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Всего найдено изображений: {len(images)}\n\n")
        
        for result in results:
            f.write(result)
    
    print("Готово! Результаты записаны в картинки.txt")

if __name__ == "__main__":
    main() 