export const courses = [
  {
    _id: "65a8b6f0c9e77a001d4b1234",
    title: "Algebra Basics",
    description: "Learn the fundamentals of algebra, including variables, equations, and expressions.",
    category: "maths",
    image: "welcome-bg.png",
    difficulty: "beginner",
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png"
    },
    created_At: "2025-03-14T10:00:00Z",
    updated_At: "2025-03-14T10:00:00Z"
  },
  {
    _id: "65a8b6f0c9e77a001d4b5678",
    title: "Exploring the Solar System",
    image: "welcome-bg.png",
    description: "Discover planets, stars, and galaxies in this introductory course on astronomy.",
    category: "science",
    difficulty: "intermediate",
    whatyouwilllearn: [
      "Identify key components of our solar system",
      "Understand planetary movements",
      "Use telescopes for basic observation"
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png"
    },
    created_At: "2025-03-10T14:30:00Z",
    updated_At: "2025-03-12T09:45:00Z"
  },
  {
    _id: "65a8b6f0c9e77a001d4b9101",
    title: "World War II: A Deep Dive",
    image: "welcome-bg.png",
    description: "Analyze key events, figures, and consequences of World War II.",
    category: "history",
    difficulty: "advanced",
    whatyouwilllearn: [
      "Understand geopolitical causes of WWII",
      "Analyze key battles and their outcomes",
      "Evaluate the impact of war on civilian life"
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png"
    },
    created_At: "2025-02-20T08:15:00Z",
    updated_At: "2025-03-01T12:00:00Z"
  },
  {
    _id: "65a8b6f0c9e77a001d4b3456",
    title: "Creative Writing Essentials",
    image: "welcome-bg.png",
    description: "Enhance your storytelling skills with engaging writing techniques and exercises.",
    category: "english",
    difficulty: "beginner",
    whatyouwilllearn: [
      "Craft compelling characters",
      "Write immersive and vivid scenes",
      "Structure stories for maximum impact"
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png"
    },
    created_At: "2025-01-15T16:45:00Z",
    updated_At: "2025-02-10T11:20:00Z"
  },
  {
    _id: "65a8b6f0c9e77a001d4b7890",
    title: "Introduction to Coding",
    image: "welcome-bg.png",
    description: "Start your coding journey with basic programming concepts using JavaScript.",
    category: "technology",
    difficulty: "beginner",
    whatyouwilllearn: [
      "Understand coding fundamentals",
      "Write simple JavaScript programs",
      "Solve problems using logic and code"
    ],
    author: {
      authorName: "Angad",
      authorProficPic: "welcome-bg.png"
    },
    created_At: "2025-02-28T10:30:00Z",
    updated_At: "2025-03-05T13:15:00Z"
  }
];

export const lessons = [
  // Lessons for "Algebra Basics" (courseId: "65a8b6f0c9e77a001d4b1234")
  {
    id: "alg1", // Unique ID for this lesson
    courseId: "65a8b6f0c9e77a001d4b1234",
    title: "Introduction to Variables",
    unlocked: true,
    completed: false,
    duration: 10,
    quiz: [
      {
        question: "What is a variable in algebra?",
        options: ["A fixed number", "A symbol that represents a number", "A math operator", "An equation result"],
        answer: "A symbol that represents a number",
        score: 10
      }
    ]
  },
  {
    id: "alg2",
    courseId: "65a8b6f0c9e77a001d4b1234",
    title: "Solving Simple Equations",
    unlocked: false,
    completed: false,
    duration: 12,
    quiz: [
      {
        question: "What is the solution to the equation x + 5 = 12?",
        options: ["5", "7", "12", "17"],
        answer: "7",
        score: 10
      }
    ]
  },
  {
    id: "alg3",
    courseId: "65a8b6f0c9e77a001d4b1234",
    title: "Understanding Expressions",
    unlocked: false,
    completed: false,
    duration: 8,
    quiz: [
      {
        question: "Which of the following is an algebraic expression?",
        options: ["3 + 2", "x + 4", "7", "9 × 3"],
        answer: "x + 4",
        score: 10
      }
    ]
  },
  {
    id: "alg4",
    courseId: "65a8b6f0c9e77a001d4b1234",
    title: "Basic Graphing",
    unlocked: false,
    completed: false,
    duration: 14,
    quiz: [
      {
        question: "On a graph, what do the x and y axes represent?",
        options: ["Length and width", "Coordinates of a point", "Equation variables", "Graph title and labels"],
        answer: "Coordinates of a point",
        score: 10
      }
    ]
  },

  // Lessons for "Exploring the Solar System" (courseId: "65a8b6f0c9e77a001d4b5678")
  {
    id: "solar1",
    courseId: "65a8b6f0c9e77a001d4b5678",
    title: "The Sun and Its Role",
    unlocked: true,
    completed: false,
    duration: 9,
    quiz: [
      {
        question: "What type of star is the Sun?",
        options: ["Red giant", "White dwarf", "Main-sequence", "Neutron star"],
        answer: "Main-sequence"
      },
      {
        question: "What is Javascript?",
        options: ["English", "Physics", "Programming Language", "Balarama Character"],
        answer: "Programming Language"
      }
    ]
  },
  {
    id: "solar2",
    courseId: "65a8b6f0c9e77a001d4b5678",
    title: "Planets and Their Moons",
    unlocked: false,
    completed: false,
    duration: 13,
    quiz: [
      {
        question: "Which planet has the most moons?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Jupiter",
        score: 10
      }
    ]
  },
  {
    id: "solar3",
    courseId: "65a8b6f0c9e77a001d4b5678",
    title: "Asteroids and Comets",
    unlocked: false,
    completed: false,
    duration: 10,
    quiz: [
      {
        question: "Where is the asteroid belt located?",
        options: ["Between Earth and Mars", "Between Mars and Jupiter", "Beyond Neptune", "Between Saturn and Uranus"],
        answer: "Between Mars and Jupiter",
        score: 10
      }
    ]
  },
  {
    id: "solar4",
    courseId: "65a8b6f0c9e77a001d4b5678",
    title: "Basics of Telescopes",
    unlocked: false,
    completed: false,
    duration: 11,
    quiz: [
      {
        question: "Which type of telescope uses mirrors to collect light?",
        options: ["Refracting", "Reflecting", "Radio", "Infrared"],
        answer: "Reflecting",
        score: 10
      }
    ]
  },

  // Lessons for "World War II: A Deep Dive" (courseId: "65a8b6f0c9e77a001d4b9101")
  {
    id: "ww2-1",
    courseId: "65a8b6f0c9e77a001d4b9101",
    title: "Causes of World War II",
    unlocked: true,
    completed: false,
    duration: 12,
    quiz: [
      {
        question: "Which treaty is often cited as a cause of World War II?",
        options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Rome", "Treaty of Tordesillas"],
        answer: "Treaty of Versailles",
        score: 10
      }
    ]
  },
  {
    id: "ww2-2",
    courseId: "65a8b6f0c9e77a001d4b9101",
    title: "Major Battles and Strategies",
    unlocked: false,
    completed: false,
    duration: 15,
    quiz: [
      {
        question: "What was the codename for the Allied invasion of Normandy?",
        options: ["Operation Torch", "Operation Overlord", "Operation Barbarossa", "Operation Market Garden"],
        answer: "Operation Overlord",
        score: 10
      }
    ]
  },
  {
    id: "ww2-3",
    courseId: "65a8b6f0c9e77a001d4b9101",
    title: "The Home Front: Civilians & Economy",
    unlocked: false,
    completed: false,
    duration: 10,
    quiz: [
      {
        question: "What was rationing used for during WWII?",
        options: ["Controlling inflation", "Saving money", "Distributing scarce goods", "Training soldiers"],
        answer: "Distributing scarce goods",
        score: 10
      }
    ]
  },
  {
    id: "ww2-4",
    courseId: "65a8b6f0c9e77a001d4b9101",
    title: "Post-War Reconstruction",
    unlocked: false,
    completed: false,
    duration: 13,
    quiz: [
      {
        question: "Which plan helped rebuild Europe after WWII?",
        options: ["Marshall Plan", "New Deal", "Four-Year Plan", "Peace Plan"],
        answer: "Marshall Plan",
        score: 10
      }
    ]
  },

  // Lessons for "Creative Writing Essentials" (courseId: "65a8b6f0c9e77a001d4b3456")
  {
    id: "write1",
    courseId: "65a8b6f0c9e77a001d4b3456",
    title: "Building Strong Characters",
    unlocked: true,
    completed: false,
    duration: 8,
    quiz: [
      {
        question: "What makes a character compelling?",
        options: ["Perfect traits", "Mystery only", "Relatable flaws and growth", "Only action scenes"],
        answer: "Relatable flaws and growth",
        score: 10
      }
    ]
  },
  {
    id: "write2",
    courseId: "65a8b6f0c9e77a001d4b3456",
    title: "Writing Vivid Descriptions",
    unlocked: false,
    completed: false,
    duration: 10,
    quiz: [
      {
        question: "Which literary device enhances descriptions?",
        options: ["Metaphor", "Algebra", "Summary", "Argument"],
        answer: "Metaphor",
        score: 10
      }
    ]
  },
  {
    id: "write3",
    courseId: "65a8b6f0c9e77a001d4b3456",
    title: "Creating Engaging Plots",
    unlocked: false,
    completed: false,
    duration: 12,
    quiz: [
      {
        question: "Which part of a plot builds suspense?",
        options: ["Exposition", "Climax", "Rising action", "Resolution"],
        answer: "Rising action",
        score: 10
      }
    ]
  },
  {
    id: "write4",
    courseId: "65a8b6f0c9e77a001d4b3456",
    title: "Editing and Polishing Stories",
    unlocked: false,
    completed: false,
    duration: 9,
    quiz: [
      {
        question: "What is a common step in editing?",
        options: ["Adding more errors", "Ignoring feedback", "Proofreading", "Skipping drafts"],
        answer: "Proofreading",
        score: 10
      }
    ]
  },

  // Lessons for "Introduction to Coding" (courseId: "65a8b6f0c9e77a001d4b7890")
  {
    id: "code1",
    courseId: "65a8b6f0c9e77a001d4b7890",
    title: "What is Programming?",
    unlocked: true,
    completed: false,
    duration: 9,
    quiz: [
      {
        question: "What does a program do?",
        options: ["Watches movies", "Instructs computers to perform tasks", "Paints pictures", "Cooks food"],
        answer: "Instructs computers to perform tasks",
        score: 10
      }
    ]
  },
  {
    id: "code2",
    courseId: "65a8b6f0c9e77a001d4b7890",
    title: "Variables and Data Types",
    unlocked: false,
    completed: false,
    duration: 11,
    quiz: [
      {
        question: "Which of these is a valid JavaScript variable?",
        options: ["1var", "var name", "userName", "if"],
        answer: "userName",
        score: 10
      }
    ]
  },
  {
    id: "code3",
    courseId: "65a8b6f0c9e77a001d4b7890",
    title: "Conditional Statements",
    unlocked: false,
    completed: false,
    duration: 10,
    quiz: [
      {
        question: "What does an 'if' statement do?",
        options: ["Loops code", "Executes code conditionally", "Declares a function", "Defines a class"],
        answer: "Executes code conditionally",
        score: 10
      }
    ]
  },
  {
    id: "code4",
    courseId: "65a8b6f0c9e77a001d4b7890",
    title: "Loops and Functions",
    unlocked: false,
    completed: false,
    duration: 14,
    quiz: [
      {
        question: "Which loop repeats a block of code multiple times?",
        options: ["if", "while", "function", "const"],
        answer: "while",
        score: 10
      }
    ]
  }
];
