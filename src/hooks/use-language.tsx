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
  "profile.subscription": { en: "Subscription", ru: "Подписка" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
