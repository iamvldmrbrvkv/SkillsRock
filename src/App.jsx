import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [palindrome, setPalindrome] = useState(null);
  const [inputPalindrome, setInpuPalindrome] = useState('');
  const [fizzBuzz, setFizzBuzz] = useState('');
  const [chunkArray, setChunkArray] = useState([]);
  const [inputTodos, setInputTodos] = useState('');
  const [todos, setTodos] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [calcResult, setCalcResult] = useState(null);
  const [calcInput1, setCalcInput1] = useState(null);
  const [calcInput2, setCalcInput2] = useState(null);

  // Задание 1: Основные алгоритмические задачи (1 час)

  // 1. Проверка на палиндром
  function isPalindrome(str) {
    // очищаем строку от знаков знаков препинаний, пробелов и переводим в нижний регистр
    const cleanedStr = str.replace(/[\W_]+/g, '').toLowerCase();
    let reversedStr = '';
    // итерируемся по очищенной строке в обратном направлении и добавляем каждый символ в новую строку
    for (let i = cleanedStr.length - 1; i >= 0; i--) {
      reversedStr += cleanedStr[i];
    }
    return cleanedStr === reversedStr;
  }

  function handleCheckPalindrome() {
    setPalindrome(isPalindrome(inputPalindrome));
  }
  

  // 2. FizzBuzz
  function handleCheckFizzBuzz() {
    // генерируем случайное число от 1 до 100
    const nums = Math.floor(Math.random() * 100) + 1;
    if (nums % 3 === 0 && nums % 5 === 0) {
      setFizzBuzz('FizzBuzz');
    } else if (nums % 3 === 0) {
      setFizzBuzz('Fizz');
    } else if (nums % 5 === 0) {
      setFizzBuzz('Buzz');
    } else {
      setFizzBuzz(nums);
    }
  }

  // 3. Разбиение массива на части
  function chunkArrayFn(array, size) {
    const result = [];
    // итерируемя по массиву size раз
    for (let i = 0; i < array.length; i += size) {
      // режем массив на подмассивы и добавляем в новый массив, каждую следующую и терацию начано нарезки регулируется i += size
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  function handleChunkArray() {
    setChunkArray(chunkArrayFn([1, 2, 3, 4, 5, 6, 7, 8], 2));
  }

  // Задание 2: Манипуляции с DOM (1-1.5 часа)

  // 1. Приложение для списка дел
  function handleAddTodo() {
    if (inputTodos.length < 1) {
      return alert('Введите название задачи');
    }
    // создаем объект { text: inputTodos, completed: false } - completed для пометки завершено / не развершено
    setTodos((prev) => [...prev, { text: inputTodos, completed: false }]);
    setInputTodos('');
  }

  // переключение статуса задачи (завершена/незавершена)
  // по клику на задачу с пеняем статус !t.completed
  function toggleCompletion(index) {
    setTodos((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  }

  // удаление задачи по индексу
  function handleDeleteTodo(index) {
    setTodos((prev) => prev.filter((t, i) => i !== index));
  }

  // Задание 3: Асинхронный JavaScript (1.5 часа)

  // 1. Fetch API — Случайные пользователи
  const fetchRandomUsers = async () => {
    const endpoint = 'https://randomuser.me/api/?results=10';
    // пока у нас нет юзеров отображаем загрузку
    setIsLoading(true);
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const jsonResponse = await response.json();
        setRandomUsers(jsonResponse.results);
      } else {
        // поскольку fetch ловит только ошибки сети TypeError, если приходит что-то отличное от 200 то выбрасываем свою ошибку
        throw new Error('Request Failed!');
      }
    } catch (error) {
      // ловим ошибку и отображаем ее сообщение пользователю
      setErrorMessage(error.message)
      // когда получили пользователей убираем загрузку
    } finally {
      setIsLoading(false);
    }
  };

  function handleUsers() {
    fetchRandomUsers();
  }

  // 2. Карусель изображений
  useEffect(() => {
    // если массив юзеров пустой вызодим из useEffect
    if (randomUsers.length === 0) return;
    // устанавливаем интервал
    const intervalId = setInterval(() => {
      // по истечении 3 секунд увеличиваем индекс
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % randomUsers.length
      );
    }, 3000);
    // очищаем useEffect от интервала
    return () => clearInterval(intervalId);
    // если randomUsers изменится useEffect запускается снова
  }, [randomUsers]);

  // Обработка кнопок «Назад» и «Вперед»
  // именьшаем индекс картинки и отображаем предыдущую
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? randomUsers.length - 1 : prevIndex - 1
    );
  };
  // функция для кнопки вперед, увеличиваем индекс картинки и отображаем следующую
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % randomUsers.length
    );
  };

  // Задание 4: Объектно-ориентированный JavaScript (1-1.5 часа)

  // 1. Реализация простого калькулятора
  class Calculator {
    constructor() {}
    add(a, b) {
      return a + b;
    }
    subtract(a, b) {
      return a - b;
    }
    multiply(a, b) {
      return a * b;
    }
    divide(a, b) {
      if (b === 0) {
        throw new Error("На ноль не делим");
      }
      return a / b;
    }
  }
  
  let calculator = new Calculator();

  // функции для обработчика на кнопках калькулятора, ими обновляем стейты
  const handleAdd = () => {
    setCalcResult(calculator.add(Number(calcInput1), Number(calcInput2)));
  };

  const handleSubtract = () => {
    setCalcResult(calculator.subtract(Number(calcInput1), Number(calcInput2)));
  };

  const handleMultiply = () => {
    setCalcResult(calculator.multiply(Number(calcInput1), Number(calcInput2)));
  };

  const handleDivide = () => {
    try {
      setCalcResult(calculator.divide(Number(calcInput1), Number(calcInput2)));
    } catch (error) {
      alert(error.message);
    }
  };

  // 2. Система управления библиотекой
  class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.status = "доступна";
    }
  }
  
  class Library {
    constructor() {
      this.books = [];
    }
    addBook(book) {
      this.books.push(book);
    }
    borrowBook(isbn) {
      const book = this.books.find((b) => b.isbn === isbn);
      if (!book) {
        return alert("Книги с указанным isbn не найдено");
      }
      if (book.status === "доступна") {
        console.log(`Вы успешно взяли книгу "${book.title}"`);
        book.status = "взята";
      } else {
        console.log(`Книги "${book.title}" нет в наличии.`);
      }
    }
    returnBook(isbn) {
      const book = this.books.find((b) => b.isbn === isbn);
      if (!book) {
        return alert("Книги с указанным isbn не найдено");
      }
      if (book.status === "взята") {
        console.log(`Вы успешно вернули книгу "${book.title}"`);
        book.status = "доступна";
      }
    }
    listAvailableBooks() {
      const availableBooks = this.books.filter((b) => b.status === "доступна");
      if (availableBooks.length > 0) {
        console.log("Доступные книги:");
        availableBooks.forEach((b) => {
          console.log(`- ${b.title} (${b.author}, ISBN: ${b.isbn})`);
        });
      } else {
        console.log("Нет доступных книг.");
      }
    }
  }
  
  // пример использования
  const library = new Library();
  
  // добавление книг
  const book1 = new Book("Война и мир", "Лев Толстой", 12345);
  const book2 = new Book("Преступление и наказание", "Федор Достоевский", 67890);
  // методы
  library.addBook(book1);
  library.addBook(book2);
  library.borrowBook(12345);
  console.log(book1.status);
  library.borrowBook(12345);
  library.returnBook(12345);
  console.log(book1.status);
  library.listAvailableBooks();

  // Задание 5: Решение проблем и оптимизация (1 час)
  
  // 1. Функция debounce

  function debounce(func, delay) {
    let timer;
    return () => { // возвращаем функцию оболочку для колбека console.log('Вызвана функция с задержкой'), эта функция же будет сохранена в debouncedFunction, если в последствии он будет еще раз вызвана то таймер таймаута будет обнулен
      clearTimeout(timer); // очищаем таймер таймаута
      timer = setTimeout(() => func(), delay); // переменная таймер хранит в себе возвращенный timeoutID от вызова setTimeout(() => func(...args), delay), с помошью timeoutID очищаем clearTimeout(timer)
    };
  }

  // если повторно не вызвали debouncedFunction в течении delay то все хорошо и console.log('Вызвана функция с задержкой') выполнится
  // если debouncedFunction вызвали повторно до истечении delay то таймер будет очищен и отчет начнется снова по истечении которого console.log('Вызвана функция с задержкой') будет вызвана

  const debouncedFunction = debounce(() => {
    console.log('Вызвана функция с задержкой');
  }, 2000)

  debouncedFunction();
  debouncedFunction();

  // 2. Глубокое клонирование объекта

  function deepClone(obj) {
    // переводим данные оригинального объекта в строку JSON, и парсим обратно строку JSON в объект JavaScript, тем самым делаем новый независимый объект
    return JSON.parse(JSON.stringify(obj)); 
  }
  
  const original = {
    name: "John",
    address: {
      city: "New York",
      country: "USA",
    },
  };
  
  let copy = deepClone(original);
  
  console.log('copy', copy);
  
  copy.address.city = "SPB";
  
  console.log('copy', copy);
  console.log('original', original);

  return (
    <>
      <div className="tasks">
        <div className="task-1">
          <h2>Задание 1: Основные алгоритмические задачи (1 час)</h2>
          <p>1. Проверка на палиндром</p>
          <input
            type="text"
            placeholder="Проверьте палиндром"
            value={inputPalindrome}
            onChange={(e) => setInpuPalindrome(e.target.value)}
          />
          <button onClick={handleCheckPalindrome}>Проверить</button>
          <span>
            {palindrome !== null &&
              (palindrome ? 'Текст является палиндромом' : 'Текст не является палиндромом')}
          </span>
  
          <p>2. FizzBuzz</p>
          <button onClick={handleCheckFizzBuzz}>Проверить FizzBuzz</button>
          <span>{fizzBuzz}</span>
  
          <p>3. Разбиение массива на части</p>
          <button onClick={handleChunkArray}>Проверить chunkArray</button>
          <span>{JSON.stringify(chunkArray)}</span>
        </div>
  
        <div className="task-2">
          <h2>Задание 2: Манипуляции с DOM (1-1.5 часа)</h2>
          <p>1. Приложение для списка дел</p>
          <input
            type="text"
            placeholder="Добавьте задачу"
            value={inputTodos}
            onChange={(e) => setInputTodos(e.target.value)}
          />
          <button onClick={handleAddTodo}>Добавить задачу</button>
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li
                key={index}
                className={todo.completed ? 'completed' : ''}
                onClick={() => toggleCompletion(index)}
              >
                <span>{index + 1}.</span>
                <span>{todo.text}</span>
                <button onClick={(e) => handleDeleteTodo(index)}>-</button>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="task-3">
          <h2>Задание 3: Асинхронный JavaScript (1.5 часа)</h2>
          <p>1. Fetch API — Случайные пользователи</p>
          <button onClick={handleUsers}>Получить пользователей</button>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <div className="users">
              <ul>
                {randomUsers.map((user, i) => (
                  <li key={i}>
                    <div>
                      <span>{user.name.first} {user.name.last}</span>
                      <span>{user.email}</span>
                      <img
                        src={user.picture.large}
                        alt={user.name.first}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>2. Карусель изображений</p>
          <div className="galery">
            {randomUsers.length > 0 && (
              <>
                <button onClick={handlePrev}>Назад</button>
                <img
                  src={randomUsers[currentImageIndex].picture.large}
                  alt={randomUsers[currentImageIndex].name.first}
                  className="carousel-image"
                />
                <button onClick={handleNext}>Вперед</button>
              </>
            )}
          </div>
        </div>
  
        <div className="task-4">
          <h2>Задание 4: Объектно-ориентированный JavaScript (1-1.5 часа)</h2>
          <p>1. Реализация простого калькулятора</p>
          <input
            type="number"
            placeholder="Первое число"
            value={calcInput1}
            onChange={(e) => setCalcInput1(e.target.value)}
          />
          <input
            type="number"
            placeholder="Второе число"
            value={calcInput2}
            onChange={(e) => setCalcInput2(e.target.value)}
          />
          <div className="calculator-buttons">
            <button onClick={handleAdd}>Сложение</button>
            <button onClick={handleSubtract}>Вычитание</button>
            <button onClick={handleMultiply}>Умножение</button>
            <button onClick={handleDivide}>Деление</button>
          </div>
          <div className="calculator-result">
            <span>Результат: {calcResult !== null ? calcResult : "—"}</span>
          </div>
          <p>2. Система управления библиотекой</p>
          <p>Откройте консоль разработчика чтобы увидеть результаты</p>
        </div>
  
        <div className='task-5'>
          <h2>Задание 5: Решение проблем и оптимизация (1 час)</h2>
          <p>Откройте консоль разработчика чтобы увидеть результаты</p>
        </div>
      </div>
    </>
  );  
}

export default App;
