import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ru";

interface Translations {
  [key: string]: { en: string; ru: string };
}

const translations: Translations = {
  // Layout
  "nav.dashboard": { en: "Dashboard", ru: "Главная" },
  "nav.diagnoses": { en: "Diagnoses", ru: "Диагнозы" },
  "nav.lab": { en: "Lab", ru: "Лаборатория" },
  "nav.profile": { en: "Profile", ru: "Профиль" },
  "nav.settings": { en: "Settings", ru: "Настройки" },
  "sidebar.healthScore": { en: "Health Score", ru: "Показатель здоровья" },
  "sidebar.premiumPlan": { en: "Premium plan", ru: "Премиум план" },
  "sidebar.healthAssistant": { en: "Health Assistant", ru: "Помощник здоровья" },

  // Index
  "home.welcomeBack": { en: "Welcome back,", ru: "С возвращением," },
  "home.consultations": { en: "Consultations", ru: "Консультации" },
  "home.conditionsTracked": { en: "Conditions tracked", ru: "Отслеживаемые состояния" },
  "home.healthScore": { en: "Health score", ru: "Показатель здоровья" },
  "home.thisMonth": { en: "+3 this month", ru: "+3 в этом месяце" },
  "home.allStable": { en: "All stable", ru: "Все стабильно" },
  "home.upFromLastMonth": { en: "↑ 5% from last month", ru: "↑ 5% за месяц" },
  "home.howFeeling": { en: "How are you feeling today?", ru: "Как вы себя чувствуете сегодня?" },
  "home.describeSymptoms": { en: "Describe your symptoms to get instant AI-powered health insights and personalized recommendations.", ru: "Опишите свои симптомы, чтобы получить мгновенную AI-оценку и персональные рекомендации." },
  "home.startConsultation": { en: "Start consultation", ru: "Начать консультацию" },
  "home.aiReady": { en: "AI ready · Average response under 3 seconds", ru: "AI готов · Среднее время ответа менее 3 секунд" },
  "home.quickActions": { en: "Quick actions", ru: "Быстрые действия" },
  "home.recentConsultations": { en: "Recent consultations", ru: "Последние консультации" },
  "home.viewAll": { en: "View all", ru: "Смотреть все" },

  // Quick Actions
  "action.checkSymptoms": { en: "Check symptoms", ru: "Проверить симптомы" },
  "action.aiAnalysis": { en: "AI-powered analysis", ru: "AI-анализ" },
  "action.medicines": { en: "Medicines", ru: "Лекарства" },
  "action.drugInteractions": { en: "Drug interactions", ru: "Взаимодействие лекарств" },
  "action.labTests": { en: "Lab tests", ru: "Анализы" },
  "action.uploadAnalyze": { en: "Upload & analyze", ru: "Загрузить и анализ" },
  "action.chronicCare": { en: "Chronic care", ru: "Хронические заболевания" },
  "action.trackConditions": { en: "Track conditions", ru: "Отслеживание состояний" },

  // Consultation Card
  "card.active": { en: "Active", ru: "Активно" },
  "card.done": { en: "Done", ru: "Завершено" },
  "card.daysAgo": { en: "2 days ago", ru: "2 дня назад" },
  "card.5daysAgo": { en: "5 days ago", ru: "5 дней назад" },
  "card.1weekAgo": { en: "1 week ago", ru: "1 неделю назад" },

  // Diagnoses
  "diagnoses.title": { en: "Health history", ru: "История здоровья" },
  "diagnoses.subtitle": { en: "Track and review all your past consultations", ru: "Отслеживайте все ваши прошлые консультации" },
  "diagnoses.search": { en: "Search by symptom or date...", ru: "Поиск по симптому или дате..." },
  "diagnoses.all": { en: "All", ru: "Все" },
  "diagnoses.active": { en: "Active", ru: "Активные" },
  "diagnoses.resolved": { en: "Resolved", ru: "Завершённые" },
  "diagnoses.labResults": { en: "Lab results", ru: "Результаты анализов" },

  // Lab
  "lab.title": { en: "Visual check", ru: "Визуальная проверка" },
  "lab.subtitle": { en: "Upload a photo for AI-powered visual analysis", ru: "Загрузите фото для AI-анализа" },
  "lab.upload": { en: "Upload or take photo", ru: "Загрузить или сделать фото" },
  "lab.skinEyeThroat": { en: "Skin, eye, throat, or wound", ru: "Кожа, глаза, горло или рана" },
  "lab.recentScans": { en: "Recent scans", ru: "Последние сканы" },
  "lab.disclaimer": { en: "AI analysis is not a definitive diagnosis. Always consult a qualified healthcare professional for medical advice.", ru: "AI-анализ не является окончательным диагнозом. Всегда консультируйтесь с квалифицированным врачом." },

  // Profile
  "profile.title": { en: "Profile", ru: "Профиль" },
  "profile.medicalId": { en: "Medical ID", ru: "Медицинская карта" },
  "profile.edit": { en: "Edit", ru: "Редактировать" },
  "profile.bloodType": { en: "Blood type", ru: "Группа крови" },
  "profile.allergies": { en: "Allergies", ru: "Аллергии" },
  "profile.chronic": { en: "Chronic", ru: "Хронические" },
  "profile.none": { en: "None", ru: "Нет" },
  "profile.settings": { en: "Settings", ru: "Настройки" },
  "profile.darkMode": { en: "Dark mode", ru: "Тёмная тема" },
  "profile.lightMode": { en: "Light mode", ru: "Светлая тема" },
  "profile.theme": { en: "Theme", ru: "Тема" },
  "profile.notifications": { en: "Notification settings", ru: "Уведомления" },
  "profile.privacy": { en: "Privacy & security", ru: "Конфиденциальность" },
  "profile.language": { en: "Language", ru: "Язык" },
  "profile.terms": { en: "Terms of use", ru: "Условия использования" },
  "profile.disclaimer": { en: "AI Doctor is not a replacement for professional medical advice. Always consult a qualified healthcare provider.", ru: "AI Doctor не заменяет профессиональную медицинскую помощь. Всегда консультируйтесь с квалифицированным врачом." },
  "profile.logout": { en: "Log out", ru: "Выйти" },

  // Chat
  "chat.aiDoctor": { en: "AI Doctor", ru: "AI Доктор" },
  "chat.howCanIHelp": { en: "How can I help you?", ru: "Чем я могу помочь?" },
  "chat.describeSymptoms": { en: "Describe your symptoms and I'll provide an assessment with recommendations.", ru: "Опишите ваши симптомы, и я предоставлю оценку с рекомендациями." },
  "chat.typeSymptoms": { en: "Type your symptoms...", ru: "Опишите симптомы..." },
  "chat.error": { en: "Sorry, something went wrong. Please try again.", ru: "Извините, произошла ошибка. Попробуйте снова." },

  // Misc
  "misc.menu": { en: "Menu", ru: "Меню" },
  "misc.aiPowered": { en: "AI-Powered", ru: "На базе ИИ" },

  // Months
  "month.jan": { en: "Jan", ru: "янв" },
  "month.feb": { en: "Feb", ru: "фев" },
  "month.mar": { en: "Mar", ru: "мар" },
  "month.apr": { en: "Apr", ru: "апр" },
  "month.may": { en: "May", ru: "май" },
  "month.jun": { en: "Jun", ru: "июн" },
  "month.jul": { en: "Jul", ru: "июл" },
  "month.aug": { en: "Aug", ru: "авг" },
  "month.sep": { en: "Sep", ru: "сен" },
  "month.oct": { en: "Oct", ru: "окт" },
  "month.nov": { en: "Nov", ru: "ноя" },
  "month.dec": { en: "Dec", ru: "дек" },

  // Medical data
  "condition.tensionHeadache": { en: "Tension headache", ru: "Головная боль напряжения" },
  "condition.acuteSinusitis": { en: "Acute sinusitis", ru: "Острый синусит" },
  "condition.seasonalAllergies": { en: "Seasonal allergies", ru: "Сезонная аллергия" },
  "condition.lowerBackStrain": { en: "Lower back strain", ru: "Растяжение поясницы" },
  "condition.mildDehydration": { en: "Mild dehydration", ru: "Лёгкое обезвоживание" },
  "condition.lowerBackPain": { en: "Lower back pain", ru: "Боль в пояснице" },

  // Lab scans
  "scan.skinRash": { en: "Skin rash", ru: "Кожная сыпь" },
  "scan.throat": { en: "Throat", ru: "Горло" },
  "scan.eyeCheck": { en: "Eye check", ru: "Проверка глаз" },

  // Visit Prep
  "visitPrep.title": { en: "Visit Prep", ru: "Подготовка к визиту" },
  "visitPrep.heading": { en: "Prepare for your doctor visit", ru: "Подготовьтесь к визиту к врачу" },
  "visitPrep.description": { en: "AI will analyze your symptoms and conditions to generate a personalized list of questions you should ask your doctor.", ru: "ИИ проанализирует ваши симптомы и состояния и сгенерирует персонализированный список вопросов, которые стоит задать врачу." },
  "visitPrep.symptomsLabel": { en: "Current symptoms", ru: "Текущие симптомы" },
  "visitPrep.symptomsPlaceholder": { en: "Describe what's bothering you...", ru: "Опишите, что вас беспокоит..." },
  "visitPrep.conditionsLabel": { en: "Known conditions & medications", ru: "Известные заболевания и лекарства" },
  "visitPrep.conditionsPlaceholder": { en: "E.g. diabetes, hypertension, aspirin...", ru: "Напр. диабет, гипертония, аспирин..." },
  "visitPrep.generate": { en: "Generate questions", ru: "Сгенерировать вопросы" },
  "visitPrep.generating": { en: "Generating...", ru: "Генерация..." },
  "visitPrep.questionsTitle": { en: "Questions to ask your doctor", ru: "Вопросы для врача" },
  "visitPrep.tipsTitle": { en: "Tips for your visit", ru: "Советы к визиту" },
  "visitPrep.newPrep": { en: "Prepare for another visit", ru: "Подготовиться к другому визиту" },
  "visitPrep.error": { en: "Failed to generate questions. Please try again.", ru: "Не удалось сгенерировать вопросы. Попробуйте снова." },
  "visitPrep.disclaimer": { en: "AI-generated questions are suggestions only. Always discuss all concerns with your healthcare provider.", ru: "Сгенерированные ИИ вопросы являются лишь рекомендациями. Всегда обсуждайте все проблемы с вашим лечащим врачом." },
  "action.visitPrep": { en: "Visit prep", ru: "К визиту" },
  "action.visitPrepDesc": { en: "Questions for doctor", ru: "Вопросы для врача" },

  // Subscription
  "sub.title": { en: "Subscription", ru: "Подписка" },
  "sub.subtitle": { en: "Choose the plan that's right for you", ru: "Выберите подходящий план" },
  "sub.free": { en: "Free", ru: "Бесплатный" },
  "sub.pro": { en: "Pro", ru: "Про" },
  "sub.premium": { en: "Premium", ru: "Премиум" },
  "sub.perMonth": { en: "month", ru: "мес" },
  "sub.popular": { en: "Most popular", ru: "Популярный" },
  "sub.currentPlan": { en: "Selected plan", ru: "Выбранный план" },
  "sub.changePlan": { en: "You can change your plan at any time", ru: "Вы можете сменить план в любое время" },
  "sub.upgrade": { en: "Upgrade", ru: "Перейти" },
  "sub.currentPlanBtn": { en: "Current plan", ru: "Текущий план" },
  "sub.free1": { en: "3 AI consultations / month", ru: "3 AI-консультации / мес" },
  "sub.free2": { en: "Basic symptom check", ru: "Базовая проверка симптомов" },
  "sub.free3": { en: "Health score tracking", ru: "Отслеживание здоровья" },
  "sub.pro1": { en: "Unlimited consultations", ru: "Безлимитные консультации" },
  "sub.pro2": { en: "Visual AI analysis", ru: "Визуальный AI-анализ" },
  "sub.pro3": { en: "Visit prep coach", ru: "Подготовка к визиту" },
  "sub.pro4": { en: "Priority responses", ru: "Приоритетные ответы" },
  "sub.prem1": { en: "Everything in Pro", ru: "Всё из Про" },
  "sub.prem2": { en: "Family accounts (up to 5)", ru: "Семейные аккаунты (до 5)" },
  "sub.prem3": { en: "Lab results analysis", ru: "Анализ результатов лаборатории" },
  "sub.prem4": { en: "Chronic care management", ru: "Управление хроническими заболеваниями" },
  "sub.prem5": { en: "24/7 priority support", ru: "Поддержка 24/7" },
  "profile.medicalCard": { en: "Detailed Medical Card", ru: "Медицинская карта (подробная)" },
  "profile.subscription": { en: "Subscription", ru: "Подписка" },
  "profile.editProfile": { en: "Edit Profile", ru: "Редактировать профиль" },
  "profile.updateUsername": { en: "Update Username", ru: "Обновить имя пользователя" },
  "profile.enterNewUsername": { en: "Enter new username", ru: "Введите новое имя пользователя" },
  "profile.save": { en: "Save", ru: "Сохранить" },
  "profile.resetPassword": { en: "Reset Password", ru: "Сбросить пароль" },
  "profile.deleteAllData": { en: "Delete All Data", ru: "Удалить все данные" },
  "profile.deleteAllDataConfirm": { en: "Are you sure you want to delete all your data? This action cannot be undone.", ru: "Вы уверены, что хотите удалить все данные? Это действие нельзя отменить." },
  "profile.deleteAccount": { en: "Delete Account", ru: "Удалить аккаунт" },
  "profile.deleteAccountConfirm": { en: "Are you sure you want to delete your account? This action cannot be undone.", ru: "Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить." },
  "profile.logoutAllDevices": { en: "Logout from All Devices", ru: "Выйти со всех устройств" },
  "profile.cancel": { en: "Cancel", ru: "Отмена" },
  "profile.delete": { en: "Delete", ru: "Удалить" },

  // Auth
  "auth.login.title": { en: "Sign In", ru: "Вход" },
  "auth.login.emailPlaceholder": { en: "Enter email", ru: "Введите почту" },
  "auth.login.passwordPlaceholder": { en: "••••••••", ru: "••••••••" },
  "auth.login.signIn": { en: "Sign In", ru: "Войти" },
  "auth.login.signingIn": { en: "Signing in...", ru: "Вход..." },
  "auth.login.forgotPassword": { en: "Forgot password?", ru: "Забыли пароль?" },
  "auth.login.registerCTA": { en: "Create account", ru: "Создать аккаунт" },
  "auth.login.error": { en: "Invalid email or password", ru: "Неверный email или пароль" },
  "auth.login.legalDisclaimerPrefix": { en: "By signing in, you agree to our", ru: "Входя, вы соглашаетесь с" },
  "auth.login.legalDisclaimerConnector": { en: "and", ru: "и" },
  "auth.login.legalDisclaimerSuffix": { en: "", ru: "" },
  "auth.login.termsLink": { en: "Terms of Service", ru: "Условиями использования" },
  "auth.login.privacyLink": { en: "Privacy Policy", ru: "Политикой конфиденциальности" },
  "auth.login.orSeparator": { en: "or", ru: "или" },

  "auth.register.title": { en: "Create Account", ru: "Регистрация" },
  "auth.register.subtitle": { en: "Join us today", ru: "Присоединяйтесь к нам" },
  "auth.register.emailPlaceholder": { en: "Enter email", ru: "Введите почту" },
  "auth.register.usernamePlaceholder": { en: "Username", ru: "Имя пользователя" },
  "auth.register.passwordPlaceholder": { en: "Password", ru: "Пароль" },
  "auth.register.confirmPasswordPlaceholder": { en: "Confirm password", ru: "Подтвердите пароль" },
  "auth.register.codePlaceholder": { en: "Code", ru: "Код" },
  "auth.register.sendCode": { en: "Send code", ru: "Отправить код" },
  "auth.register.createAccount": { en: "Create Account", ru: "Создать аккаунт" },
  "auth.register.creatingAccount": { en: "Creating...", ru: "Создание..." },
  "auth.register.alreadyHaveAccount": { en: "Already have an account?", ru: "Уже есть аккаунт?" },
  "auth.register.loginCTA": { en: "Sign In", ru: "Войти" },
  "auth.register.passwordsNotMatch": { en: "Passwords do not match", ru: "Пароли не совпадают" },
  "auth.register.error": { en: "Registration failed", ru: "Ошибка регистрации" },
  "auth.register.legalDisclaimerPrefix": { en: "By registering, you agree to our", ru: "Регистрируясь, вы соглашаетесь с" },
  "auth.register.legalDisclaimerConnector": { en: "and", ru: "и" },
  "auth.register.legalDisclaimerSuffix": { en: "", ru: "" },
  "auth.register.termsLink": { en: "Terms of Service", ru: "Условиями использования" },
  "auth.register.privacyLink": { en: "Privacy Policy", ru: "Политикой конфиденциальности" },

  "auth.forgotPassword.title": { en: "Reset Password", ru: "Сброс пароля" },
  "auth.forgotPassword.subtitle": { en: "Enter your email to receive a reset code", ru: "Введите email для получения кода сброса" },
  "auth.forgotPassword.email": { en: "Email", ru: "Email" },
  "auth.forgotPassword.emailPlaceholder": { en: "your@email.com", ru: "ваш@email.com" },
  "auth.forgotPassword.sendLink": { en: "Send Code", ru: "Отправить код" },
  "auth.forgotPassword.backToLogin": { en: "Back to Sign In", ru: "Вернуться к входу" },
  "auth.forgotPassword.emailNotFound": { en: "Email not found", ru: "Email не найден" },
  "auth.forgotPassword.errorSending": { en: "Failed to send code", ru: "Не удалось отправить код" },
  "auth.forgotPassword.codeTitle": { en: "Enter Code", ru: "Введите код" },
  "auth.forgotPassword.codeDescription": { en: "We sent a code to {email}", ru: "Мы отправили код на {email}" },
  "auth.forgotPassword.codeLabel": { en: "Verification code", ru: "Код подтверждения" },
  "auth.forgotPassword.codePlaceholder": { en: "000000", ru: "000000" },
  "auth.forgotPassword.verifyCode": { en: "Verify Code", ru: "Подтвердить код" },
  "auth.forgotPassword.verifying": { en: "Verifying...", ru: "Проверка..." },
  "auth.forgotPassword.codeInvalid": { en: "Invalid code", ru: "Неверный код" },
  "auth.forgotPassword.codeExpired": { en: "Code expired", ru: "Код истёк" },
  "auth.forgotPassword.success": { en: "Code verified successfully", ru: "Код подтверждён" },
  "auth.forgotPassword.successResendQuestion": { en: "Didn't receive it?", ru: "Не получили?" },
  "auth.forgotPassword.successResendCta": { en: "Send again", ru: "Отправить снова" },

  "auth.resetPassword.title": { en: "New Password", ru: "Новый пароль" },
  "auth.resetPassword.subtitle": { en: "Create a strong password", ru: "Придумайте надёжный пароль" },
  "auth.resetPassword.newPassword": { en: "New password", ru: "Новый пароль" },
  "auth.resetPassword.confirmPassword": { en: "Confirm password", ru: "Подтвердите пароль" },
  "auth.resetPassword.submit": { en: "Save Password", ru: "Сохранить пароль" },
  "auth.resetPassword.success": { en: "Password updated successfully", ru: "Пароль успешно изменён" },

  // Health Card
  "healthCard.title": { en: "Medical Card", ru: "Медицинская карта" },
  "healthCard.subtitle": { en: "Your personal health profile", ru: "Ваш личный профиль здоровья" },
  "healthCard.completeness": { en: "Card completeness", ru: "Полнота карты" },
  "healthCard.profileComplete": { en: "Complete", ru: "Заполнено" },

  "healthCard.stage1": { en: "Basic block (required)", ru: "Базовый блок (обязательно)" },
  "healthCard.sex": { en: "Sex", ru: "Пол" },
  "healthCard.male": { en: "Male", ru: "Мужской" },
  "healthCard.female": { en: "Female", ru: "Женский" },
  "healthCard.birthDate": { en: "Date of birth", ru: "Дата рождения" },
  "healthCard.height": { en: "Height (cm)", ru: "Рост (см)" },
  "healthCard.weight": { en: "Weight (kg)", ru: "Вес (кг)" },
  "healthCard.bmi": { en: "BMI", ru: "ИМТ" },
  "healthCard.bloodType": { en: "Blood type", ru: "Группа крови" },
  "healthCard.rhFactor": { en: "Rh factor", ru: "Резус-фактор" },
  "healthCard.allergies": { en: "Allergies", ru: "Аллергии" },
  "healthCard.drugAllergies": { en: "Drug allergies", ru: "Лекарственные" },
  "healthCard.foodAllergies": { en: "Food allergies", ru: "Пищевые" },
  "healthCard.seasonalAllergies": { en: "Seasonal allergies", ru: "Сезонные (поллиноз)" },
  "healthCard.allergyPlaceholder": { en: "Add and press Enter", ru: "Введите и нажмите Enter" },

  "healthCard.stage2": { en: "Medical profile (chronicle)", ru: "Медицинский профиль (хроника)" },
  "healthCard.chronicDiseases": { en: "Chronic diseases", ru: "Хронические заболевания" },
  "healthCard.chronicPlaceholder": { en: "Search disease…", ru: "Поиск заболевания…" },
  "healthCard.medications": { en: "Medications (permanent)", ru: "Постоянные препараты" },
  "healthCard.medName": { en: "Drug name", ru: "Название препарата" },
  "healthCard.medDose": { en: "Dosage", ru: "Дозировка" },
  "healthCard.medFreq": { en: "Frequency", ru: "Частота" },
  "healthCard.addMed": { en: "+ Add medication", ru: "+ Добавить препарат" },
  "healthCard.surgeries": { en: "Surgeries & injuries", ru: "Операции и травмы" },
  "healthCard.surgeryDesc": { en: "Description", ru: "Описание" },
  "healthCard.surgeryYear": { en: "Year", ru: "Год" },
  "healthCard.addSurgery": { en: "+ Add surgery/injury", ru: "+ Добавить операцию/травму" },
  "healthCard.familyHistory": { en: "Family history", ru: "Наследственность" },
  "healthCard.familyCardio": { en: "Heart attack / stroke (parents)", ru: "Инфаркт / инсульт (у родителей)" },
  "healthCard.familyOncology": { en: "Oncology (parents)", ru: "Онкология (у родителей)" },
  "healthCard.familyDiabetes": { en: "Diabetes (parents)", ru: "Диабет (у родителей)" },
  "healthCard.familyHypertension": { en: "Hypertension (parents)", ru: "Гипертония (у родителей)" },

  "healthCard.stage3": { en: "Lifestyle (risk factors)", ru: "Образ жизни (факторы риска)" },
  "healthCard.smoking": { en: "Smoking", ru: "Курение" },
  "healthCard.smokingNo": { en: "Non-smoker", ru: "Не курю" },
  "healthCard.smokingYes": { en: "Smoker", ru: "Курю" },
  "healthCard.packYears": { en: "Pack-years", ru: "Пачка/лет" },
  "healthCard.alcohol": { en: "Alcohol", ru: "Алкоголь" },
  "healthCard.alcoholNone": { en: "None", ru: "Нет" },
  "healthCard.alcoholRare": { en: "Rarely", ru: "Редко" },
  "healthCard.alcoholRegular": { en: "Regularly", ru: "Регулярно" },
  "healthCard.activity": { en: "Physical activity", ru: "Физическая активность" },
  "healthCard.activitySedentary": { en: "Sedentary", ru: "Сидячий" },
  "healthCard.activityModerate": { en: "Moderate", ru: "Умеренная" },
  "healthCard.activityActive": { en: "Active sport", ru: "Активный спорт" },
  "healthCard.workConditions": { en: "Work conditions", ru: "Условия труда" },
  "healthCard.workOffice": { en: "Office", ru: "Офис" },
  "healthCard.workPhysical": { en: "Physical labor", ru: "Физический труд" },
  "healthCard.workHazardous": { en: "Hazardous production", ru: "Вредное производство" },
  "healthCard.workComputer": { en: "Computer work", ru: "Работа с компьютером" },

  "healthCard.stage4": { en: "Specific blocks (optional)", ru: "Специфические блоки (по желанию)" },
  "healthCard.optional": { en: "Optional", ru: "По желанию" },
  "healthCard.womenSection": { en: "For women", ru: "Для женщин" },
  "healthCard.pregnancy": { en: "Pregnancy (weeks)", ru: "Беременность (срок в неделях)" },
  "healthCard.lactation": { en: "Lactation", ru: "Лактация" },
  "healthCard.lastPeriod": { en: "Last menstrual period", ru: "Дата последних месячных" },
  "healthCard.vaccinations": { en: "Vaccinations", ru: "Вакцинация" },
  "healthCard.vaccName": { en: "Vaccine", ru: "Вакцина" },
  "healthCard.vaccDate": { en: "Date", ru: "Дата" },
  "healthCard.addVacc": { en: "+ Add vaccination", ru: "+ Добавить прививку" },
  "healthCard.wearableData": { en: "Wearable device data", ru: "Данные с носимых устройств" },
  "healthCard.heartRate": { en: "Resting heart rate (bpm)", ru: "Пульс в покое (уд/мин)" },
  "healthCard.bloodPressure": { en: "Blood pressure (mmHg)", ru: "Артериальное давление (мм рт.ст.)" },
  "healthCard.spo2": { en: "SpO₂ (%)", ru: "Сатурация SpO₂ (%)" },

  "healthCard.stage5": { en: "Today's dynamics", ru: "Динамика сегодня" },
  "healthCard.chiefComplaint": { en: "Chief complaint", ru: "Основная жалоба" },
  "healthCard.chiefPlaceholder": { en: "Describe what bothers you today…", ru: "Опишите, что беспокоит сегодня…" },
  "healthCard.vitalsToday": { en: "Vitals today", ru: "Витальные показатели сегодня" },
  "healthCard.temperature": { en: "Temperature (°C)", ru: "Температура (°C)" },
  "healthCard.pulse": { en: "Pulse (bpm)", ru: "Пульс (уд/мин)" },
  "healthCard.bpSystolic": { en: "Systolic", ru: "Систолическое" },
  "healthCard.bpDiastolic": { en: "Diastolic", ru: "Диастолическое" },

  "healthCard.save": { en: "Save", ru: "Сохранить" },
  "healthCard.cancel": { en: "Cancel", ru: "Отмена" },
  "healthCard.add": { en: "Add", ru: "Добавить" },
  "healthCard.remove": { en: "Remove", ru: "Удалить" },
  "healthCard.disclaimer": { en: "This service does not replace a doctor. Results are for reference only. In case of acute conditions — call emergency services.", ru: "Данный сервис не заменяет врача. Результаты носят справочный характер. При острых состояниях — вызывайте скорую помощь." },

  "errors.generic": { en: "An error occurred", ru: "Произошла ошибка" },
  "errors.invalidToken": { en: "Invalid or expired token", ru: "Неверный или истёкший токен" },
  "common.loading": { en: "Loading...", ru: "Загрузка..." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatDate: (date: Date | string, includeYear?: boolean) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  formatDate: () => "",
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  const formatDate = (date: Date | string, includeYear = false): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    const monthKeys = [
      "month.jan", "month.feb", "month.mar", "month.apr",
      "month.may", "month.jun", "month.jul", "month.aug",
      "month.sep", "month.oct", "month.nov", "month.dec"
    ];
    const monthName = t(monthKeys[d.getMonth()]);
    const day = d.getDate();
    const year = d.getFullYear();
    
    if (includeYear) {
      return `${monthName} ${day}, ${year}`;
    }
    return `${monthName} ${day}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatDate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
