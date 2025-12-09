# Система мониторинга ошибок Sentry

Sentry — это платформа для мониторинга ошибок в реальном времени, которая помогает разработчикам отслеживать, исправлять и оптимизировать производительность своих приложений.

## Текущая конфигурация Sentry

### 1. Конфигурация интеграции
- **Импорт SDK**: Используется пакет `@sentry/nextjs` (файл `src/hooks/useGlobalErrorHandler.ts`)
- **Функция отправки ошибок**: `sendErrorToMonitoring` (определена в `src/hooks/useGlobalErrorHandler.ts#L30-34`)
  - Отправляет ошибки в Sentry только в производственном окружении (`process.env.NODE_ENV === "production"`)
  - Принимает два параметра: `error` (неизвестный тип ошибки) и опциональный `context` (контекст Sentry)
  - Использует `Sentry.captureException` для передачи ошибок в платформу
- **Инициализация Sentry**: Интеграция работает через стандартные механизмы `@sentry/nextjs`.

### 2. Типы собираемых ошибок
Хук `useGlobalErrorHandler` (файл `src/hooks/useGlobalErrorHandler.ts`) настроен на сбор двух типов ошибок:
- **Необработанные синхронные ошибки**: Событие `window.error` (runtime-ошибки в скриптах, не обработанные `try-catch`)
- **Необработанные отклонения промисов**: Событие `unhandledrejection` (ошибки в асинхронных операциях без обработчика `catch()`)

### 3. Подключенные части приложения
- Хук `useGlobalErrorHandler` реализует сбор ошибок в приложении.
- Механизм отправки ошибок доступен через прямое вызов функции `sendErrorToMonitoring`

## Пример использования существующей функции sendErrorToMonitoring

Функцию `sendErrorToMonitoring` можно вызывать напрямую в компонентах или сервисах для отправки обработанных ошибок в Sentry. Ниже приведены практические примеры:

### Пример 1: Базовое использование (отправка ошибки)
```typescript
function processUserInput(input: string) {
  try {
    if (!input.trim()) {
      throw new Error('Пользовательский ввод не может быть пустым');
    }
  } catch (error) {
    sendErrorToMonitoring(error);
  }
}
```

### Пример 2: Использование с дополнительным контекстом
```typescript
async function fetchUserProfile(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      const error = new Error(`Не удалось получить профиль пользователя: ${response.status}`);
      sendErrorToMonitoring(error, {
        tags: { endpoint: `/api/users/${userId}` },
        extra: { userId, responseStatus: response.status }
      });
      throw error;
    }
    return response.json();
  } catch (error) {
    // Остальная обработка ошибок
  }
}
```

Примечание: Ошибки отправляются в Sentry только в production окружении. В разработке ошибки выводятся только в консоль.