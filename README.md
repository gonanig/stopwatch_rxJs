Реализовать секундомер, который подсчитывает время в формате «HH: MM: SS»
Таймер должен иметь следующие кнопки:

- «Start / Stop» - запуск / остановка отсчета времени, останавливает и обнуляет значение таймера.
- «Wait» - работает на двойной клик (время между нажатиями не более 300 мс!) таймер должен прекратить отсчет времени; если после него нажать старт, то возобновляется отсчет.
- «Reset» - сброс таймера на 0. Обнуляет таймер и снова начинает отсчет.

Требования:

- используйте Observables в коде
- RxJS подход
- функциональный подход
- 300млс – это не DoubleClick
