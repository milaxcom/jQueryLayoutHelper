jQueryLayoutHelper (RUS Description)
============

Позволяет организовать навигацию по страницам HTML верстки, т. к. зачастую существует проблема перемещения м/у сверстанными 10-20 страницами. Модуль решает проблему. Скрипт тестировался на jQuery ```jQuery 1.11.0```.

Для реализации требуется 2 компонента:
- Подключение скрипта
- Создание карты helper.txt

Преимущества:
- Настройка прямо по ходу верстки.
- Навигация по файлам верстки используя значек в левой верхней части экрана.
- Возможность навигации по меню сайта, если указаны якаря в ссылках в виде ```#contacts```. Таким образом при изменении названия файла нет необходимости менять якорь.

Подключение скрипта, пример:
```html
<script type="text/javascript" src="/js/jquery.layouthelper.min.js"></script>
```

Карта сайта задается текстовым файлом helper.txt в корневой директории каталога. Пример содержания файла ниже.
Скачать пример: https://raw.githubusercontent.com/milaxcom/jQueryLayoutHelper/master/helper.txt.
```text
#main:index.html:Главная
#add:add.html:Дополнительная
#contacts:contacts.html:Контакты
#works:works.html:Портфолио
```
Каждый новый файл верстки описывается на новой строке. Пример на основе первой строки:
- #main — якорь для использования в ссылках верстки
- index.html — путь файла верстки
- Главная — название файла верстки

---

Пример использования в ссылках (применительно к карте выше):
```html
<a href="#contacts" class="par">Контактная информация</a>
```
В данном примере при клике на ссылку пользователь попадет на страницу ```contacts.html```.
