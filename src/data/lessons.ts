export interface Task {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'spot-the-catch' | 'compare' | 'password-tester';
  question: string;
  options?: string[];
  correctAnswer?: string | boolean | number;
  explanation: string;
  image?: string;
  content?: any; // for specific types like 'compare'
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  tasks: Task[];
}

export const LESSONS: Lesson[] = [
  {
    id: 'passwords',
    title: 'Bezpieczne Hasła',
    description: 'Naucz się tworzyć hasła, których nikt nie zgadnie.',
    icon: 'key',
    tasks: [
      {
        id: 'p1',
        type: 'true-false',
        question: 'Czy hasło "123456" jest bezpieczne?',
        correctAnswer: false,
        explanation: 'To jedno z najczęściej używanych haseł na świecie. Hakerzy zgadną je w ułamku sekundy!',
      },
      {
        id: 'p2',
        type: 'multiple-choice',
        question: 'Które z tych haseł jest najsilniejsze?',
        options: ['admin1', 'moje-wnuki-2023', 'Koń-Biega-Szybko-!2'],
        correctAnswer: 'Koń-Biega-Szybko-!2',
        explanation: 'Długie hasła składające się z kilku przypadkowych słów i znaków specjalnych są bardzo trudne do złamania.',
      },
      {
        id: 'p3',
        type: 'password-tester',
        question: 'Wpisz hasło i sprawdź jego siłę.',
        explanation: 'Pamiętaj: używaj dużych liter, cyfr i znaków specjalnych.',
      }
    ]
  },
  {
    id: 'phishing',
    title: 'Podejrzane Wiadomości',
    description: 'Jak rozpoznać oszustwo w SMS i e-mailu.',
    icon: 'mail',
    tasks: [
      {
        id: 'ph1',
        type: 'spot-the-catch',
        question: 'Czy ten SMS od "Banku" jest prawdziwy?',
        content: {
          sender: 'InfoBank',
          message: 'Twoje konto zostalo zablokowane. Zaloguj sie tutaj: http://bank-bezpieczny-login.pl aby odblokowac dostep.'
        },
        correctAnswer: 'false',
        explanation: 'Banki nigdy nie wysyłają linków do logowania w SMS-ach. Adres strony wygląda podejrzanie!',
      },
      {
        id: 'ph2',
        type: 'compare',
        question: 'Która wiadomość jest bezpieczna?',
        content: {
          a: 'Paczka czeka na odbiór. Dopłać 1.50 PLN: http://bit.ly/paczka-123',
          b: 'Twoje zamówienie nr 456 zostało wysłane. Możesz je śledzić w oficjalnej aplikacji InPost.'
        },
        correctAnswer: 'b',
        explanation: 'Wiadomość B nie zawiera podejrzanych linków i zachęca do korzystania z oficjalnej aplikacji.',
      },
      {
        id: 'ph3',
        type: 'spot-the-catch',
        question: 'Czy ten e-mail od "Allegro" jest bezpieczny?',
        content: {
          type: 'email',
          sender: 'allegro-sklep@super-okazja.pl',
          subject: 'Twoje konto zostanie zawieszone!',
          message: 'Wykryto nieautoryzowaną próbę logowania. Kliknij tutaj, aby potwierdzić swoją tożsamość: http://allegro.weryfikacja.pl/login'
        },
        correctAnswer: false,
        explanation: 'Zwróć uwagę na adres e-mail nadawcy (super-okazja.pl) oraz link, który nie prowadzi do oficjalnej strony allegro.pl.',
      }
    ]
  },
  {
    id: 'scams',
    title: 'Oszustwa "Na wnuczka"',
    description: 'Nie daj się nabrać na pilne prośby o pieniądze.',
    icon: 'phone',
    tasks: [
      {
        id: 's1',
        type: 'multiple-choice',
        question: 'Dzwoni osoba podająca się za wnuczka i mówi, że miała wypadek i potrzebuje pieniędzy. Co robisz?',
        options: ['Natychmiast idę do banku', 'Rozłączam się i dzwonię do wnuczka na jego znany numer', 'Podaję swój adres'],
        correctAnswer: 'Rozłączam się i dzwonię do wnuczka na jego znany numer',
        explanation: 'Zawsze weryfikuj takie prośby, dzwoniąc bezpośrednio do rodziny lub na Policję.',
      },
      {
        id: 's2',
        type: 'true-false',
        question: 'Czy Policja może prosić Cię o przekazanie pieniędzy w celu "bezpiecznego ich przechowania" podczas akcji?',
        correctAnswer: false,
        explanation: 'Policja NIGDY nie prosi o przekazywanie pieniędzy ani kosztowności osobom trzecim lub pozostawianie ich w umówionych miejscach.',
      }
    ]
  }
];
