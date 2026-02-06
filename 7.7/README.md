# Проект автоматизации тестирования (Cypress)

Данный проект содержит автотесты для веб-интерфейса сервиса бронирования билетов и API тесты для Petstore.

## Тестируемые ресурсы
* **Клиентская часть:** [http://qamid.tmweb.ru/client/index.php](http://qamid.tmweb.ru/client/index.php)
* **Панель администратора:** [http://qamid.tmweb.ru/admin](http://qamid.tmweb.ru/admin)
  * **Логин:** `qamid@qamid.ru`
  * **Пароль:** `qamid`

## Стек технологий
* Cypress (v9.7.0)
* JavaScript

## Запуск тестов
1. Клонировать репозиторий.
2. Установить зависимости: `npm install`.
3. Запустить тесты в консоли (headless mode): `npx cypress run`.
4. Открыть интерактивный режим: `npx cypress open`.

## Отчеты
Результаты прогонов и видео тестов в Cypress Cloud:
* [Cypress Dashboard — Последний актуальный запуск](https://cloud.cypress.io/projects/1ufsid/runs/3)