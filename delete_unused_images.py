import os
import shutil
from pathlib import Path

def delete_unused_images():
    """Удаляет неиспользуемые изображения из проекта"""
    
    # Список неиспользуемых изображений из файла неиспользуемые_картинки.txt
    unused_images = [
        "images/Logo180p.png",
        "images/Logo48p.png", 
        "images/Logo64p.png",
        "images/whiteStudent.png",
        "images/certificate/cactus.png",
        "images/certificate/director-sign.png",
        "images/certificate/teacher-sign.png",
        "src/assets/img/chat/OpenChat.png",
        "src/assets/img/chat/SelectChat.png",
        "src/assets/img/CheckHW/hw_checkhaw.png",
        "src/assets/img/CheckHW/HW_checkhw.png",
        "src/assets/img/CheckHW/hw_checkpag.png",
        "src/assets/img/CheckHW/HW_checkpage.png",
        "src/assets/img/CheckHW/HW_mentor.png",
        "src/assets/img/common/2941039.jpg",
        "src/assets/img/common/account-settings-hover.png",
        "src/assets/img/common/account-settings.png",
        "src/assets/img/common/add-employee-hover.png",
        "src/assets/img/common/anton.png",
        "src/assets/img/common/chat1.svg",
        "src/assets/img/common/close_hw_modal.svg",
        "src/assets/img/common/cv.png",
        "src/assets/img/common/domain-hover.png",
        "src/assets/img/common/exit1.svg",
        "src/assets/img/common/good.png",
        "src/assets/img/common/group-settings-hover.png",
        "src/assets/img/common/guide-start-hover.png",
        "src/assets/img/common/guide-start.png",
        "src/assets/img/common/iconModal.svg",
        "src/assets/img/common/medal-star.svg",
        "src/assets/img/common/platform-settings-hover.png",
        "src/assets/img/common/school-hover.png",
        "src/assets/img/common/school_1.png",
        "src/assets/img/common/social_meniu.svg",
        "src/assets/img/common/status-up.svg",
        "src/assets/img/common/whyChooseLogo.png",
        "src/assets/img/common/whyChooseLogo1.png",
        "src/assets/img/createCourse/back_arr.svg",
        "src/assets/img/createCourse/books55px.svg",
        "src/assets/img/createCourse/dontShow.svg",
        "src/assets/img/createCourse/download_img_bg.png",
        "src/assets/img/createCourse/forward_arr.svg",
        "src/assets/img/createCourse/notPublic.svg",
        "src/assets/img/createCourse/tag_icon.svg",
        "src/assets/img/createCourse/typeClasses/vebinar.svg",
        "src/assets/img/manageAccount/account_logout.png",
        "src/assets/img/manageAccount/account_page.png",
        "src/assets/img/manageAccount/account_page_finish.png",
        "src/assets/img/manageAccount/main_page.png",
        "src/assets/img/manageSchool/groups1.png",
        "src/assets/img/manageSchool/groups2.png",
        "src/assets/img/manageSchool/school_settings_button.png",
        "src/assets/img/manageSchool/school_settings_general.png",
        "src/assets/img/manageSchool/school_settings_header.png",
        "src/assets/img/manageSchool/school_settings_header_set.png",
        "src/assets/img/manageSchool/school_settings_payment.png",
        "src/assets/img/manageSchool/school_settings_personal.png",
        "src/assets/img/manageSchool/school_settings_personal_mentor..png",
        "src/assets/img/manageSchool/school_settings_stamp.png",
        "src/assets/img/overAI/overai_button.png",
        "src/assets/img/overAI/overai_example_algorithm.png",
        "src/assets/img/overAI/overai_example_automation.png",
        "src/assets/img/overAI/overai_example_code.png",
        "src/assets/img/overAI/overai_example_learning.png",
        "src/assets/img/studentPage/accardion_arr.svg",
        "src/assets/img/studentPage/arr-right-v1.svg",
        "src/assets/img/studentPage/arrow-down.svg",
        "src/assets/img/studentPage/avatarEllipse.png",
        "src/components/Modal/TariffDetailModal/assets/SVG/payments-mastercard.svg",
        "src/components/Modal/TariffDetailModal/assets/SVG/payments-visa.svg",
        "src/Pages/Bonuses/components/PrizeBoxDeposit/assets/five.png",
        "src/Pages/CreateNewSchool/assets/background-banner.jpg",
        "src/Pages/School/Navigations/CoursesCreating/RedactorCourse/Comments/images/vectorBack.png",
        "src/Pages/School/Navigations/CoursesCreating/RedactorCourse/Comments/images/vectorContent.png",
        "src/Pages/School/Navigations/CoursesCreating/RedactorCourse/Comments/images/vectorForward.png",
        "src/Pages/Settings/NotificationBannerSettings/assets/course-hub-banner.png",
        "src/Pages/TariffPlans/images/Vector (3).png"
    ]
    
    deleted_files = []
    failed_deletions = []
    
    print("Начинаю удаление неиспользуемых изображений...")
    print(f"Всего файлов для удаления: {len(unused_images)}")
    print("-" * 50)
    
    for i, image_path in enumerate(unused_images, 1):
        if os.path.exists(image_path):
            try:
                os.remove(image_path)
                deleted_files.append(image_path)
                print(f"[{i:3d}/{len(unused_images)}] Удален: {image_path}")
            except Exception as e:
                failed_deletions.append((image_path, str(e)))
                print(f"[{i:3d}/{len(unused_images)}] ОШИБКА при удалении {image_path}: {e}")
        else:
            print(f"[{i:3d}/{len(unused_images)}] Файл не найден: {image_path}")
    
    print("-" * 50)
    print(f"Успешно удалено: {len(deleted_files)} файлов")
    print(f"Ошибок при удалении: {len(failed_deletions)}")
    
    if failed_deletions:
        print("\nОшибки при удалении:")
        for file_path, error in failed_deletions:
            print(f"  {file_path}: {error}")
    
    # Сохраняем отчет об удалении
    with open("deletion_report.txt", "w", encoding="utf-8") as f:
        f.write("ОТЧЕТ ОБ УДАЛЕНИИ НЕИСПОЛЬЗУЕМЫХ ИЗОБРАЖЕНИЙ\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Всего файлов для удаления: {len(unused_images)}\n")
        f.write(f"Успешно удалено: {len(deleted_files)}\n")
        f.write(f"Ошибок при удалении: {len(failed_deletions)}\n\n")
        
        f.write("УДАЛЕННЫЕ ФАЙЛЫ:\n")
        f.write("-" * 30 + "\n")
        for file_path in deleted_files:
            f.write(f"{file_path}\n")
        
        if failed_deletions:
            f.write("\nОШИБКИ ПРИ УДАЛЕНИИ:\n")
            f.write("-" * 30 + "\n")
            for file_path, error in failed_deletions:
                f.write(f"{file_path}: {error}\n")
    
    print(f"\nОтчет сохранен в файл: deletion_report.txt")

if __name__ == "__main__":
    delete_unused_images() 