import type { Book, BoardRow, Challenge, HistoryItem, Participation } from "./types";
import { extraChapters } from "./extra-chapters";
import { quotedPrize } from "./settlement";

const hour = 3600000;

export const books: Book[] = [
  {
    id: "atomic",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    rating: 4.8,
    pages: 320,
    readTime: "6h 20m",
    difficulty: "Medium",
    description: "An easy and proven way to build good habits and break bad ones.",
    cover: "atomic",
    coverImage: "/covers/atomic.jpg",
    finalPrompt:
      "You have just finished Atomic Habits. You repeatedly tried to build a workout habit but failed after 7–10 days. Using at least two concepts from the book, design a practical system that would help you solve this problem.",
    chapters: [
      {
        id: "atomic-1",
        title: "Tiny gains, real systems",
        paragraphs: [
          "A habit rarely fails in a dramatic moment. It fails in the quiet decision to skip once, then again, until the old pattern is back in charge. The useful shift is to stop judging a day by whether it felt transformative and start judging the system that made the day likely.",
          "Getting one percent better is not inspiring on a Tuesday. The math only becomes visible after the repetitions have had time to stack. That is why people abandon a practice during the flat stretch, right before the results would have become obvious to anyone watching.",
          "Goals are fine as a direction. They are a poor operating system. A goal can be reached and then lost. A system keeps producing the behavior on ordinary days, including the days when motivation is absent and nobody is keeping score.",
        ],
        questions: [
          {
            kind: "Application",
            prompt:
              "A runner improves a little each week but quits in week three because the mirror looks the same. Which response best applies the idea in this chapter?",
            choices: [
              "Set a larger race goal so the effort feels more meaningful.",
              "Treat the flat stretch as part of compounding and protect the daily system.",
              "Switch programs every few days until one feels exciting.",
              "Wait for visible results before deciding the habit is worth keeping.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "Why does the chapter treat goals as a weak operating system?",
            choices: [
              "Goals are always too vague to measure.",
              "A reached goal does not keep producing the behavior that created it.",
              "Systems cannot be designed without a coach.",
              "Goals and systems are the same thing with different names.",
            ],
            answer: 1,
          },
          {
            kind: "Connection",
            prompt: "Which pair belongs together in the argument of this chapter?",
            choices: [
              "One dramatic effort, and a permanent new identity.",
              "Skipping once, and proof that the person lacks discipline.",
              "Ordinary repetitions, and results that show up late.",
              "A perfect week, and permission to rest for a month.",
            ],
            answer: 2,
          },
        ],
      },
      {
        id: "atomic-2",
        title: "Identity comes first",
        paragraphs: [
          "Most attempts at change start with an outcome: lose the weight, read more, become calm. A sturdier sequence starts with identity. Each small action is a vote for the kind of person you are becoming. One vote does not decide the election. A long run of votes does.",
          "The person who says “I want to read” is still negotiating. The person who says “I am a reader” looks for the next natural action of a reader, even if that action is ten quiet pages. The behavior is no longer a favor they are doing for a future self. It is evidence.",
          "This is also why a single miss should not be turned into a story about who you are. Missing once is an event. Missing twice is the start of a new vote. The repair is to return at the next chance and cast the vote you meant to cast.",
        ],
        questions: [
          {
            kind: "Application",
            prompt:
              "Leah wants to become someone who writes. She has thirty minutes before work. Which action best casts a vote for that identity?",
            choices: [
              "Spend the time researching the perfect writing course.",
              "Open the document and write a short, imperfect page.",
              "Wait for a morning when she feels like a real writer.",
              "Announce a book deal so the identity feels official.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "In this chapter, what is a single habit repetition?",
            choices: [
              "Proof that the identity is finished.",
              "A vote that matters in accumulation, not in isolation.",
              "A sign that outcomes no longer matter.",
              "A replacement for knowing why the habit exists.",
            ],
            answer: 1,
          },
          {
            kind: "Synthesis",
            prompt: "Someone misses a workout and decides “I always quit.” What does the chapter suggest instead?",
            choices: [
              "Treat the miss as an identity and stop making plans.",
              "Double the workout tomorrow to erase the mistake.",
              "See one miss as an event, and make the next session the next vote.",
              "Change the goal so the missed day no longer counts.",
            ],
            answer: 2,
          },
        ],
      },
      {
        id: "atomic-3",
        title: "Make the cue obvious",
        paragraphs: [
          "A habit runs through a simple loop: cue, craving, response, reward. Most people try to improve the loop by demanding a stronger response. It is usually easier to design a clearer cue. If the cue is vague, the day will fill with other demands and the habit will never start.",
          "Habit stacking uses a behavior that already happens as the cue for the one you want. “After I pour coffee, I will read two pages.” The existing action carries the new one. An implementation intention adds time and place, so the decision is made before the morning starts bargaining.",
          "The reward does not need to be large. It needs to teach the brain that the loop closed. A small, immediate sense of completion is often enough to make the next cue easier to notice.",
        ],
        questions: [
          {
            kind: "Application",
            prompt:
              "Sarah wants a daily reading habit and already drinks coffee every morning. Which approach best applies this chapter?",
            choices: [
              "Wait until evening and read if she still has energy.",
              "After she sits down with coffee, read two pages before opening anything else.",
              "Buy a large stack of books so the goal feels serious.",
              "Read only when a friend asks what she is reading.",
            ],
            answer: 1,
          },
          {
            kind: "Recall",
            prompt: "Which sequence names the habit loop in this chapter?",
            choices: [
              "Goal, motivation, result, identity.",
              "Cue, craving, response, reward.",
              "Plan, purchase, practice, praise.",
              "Time, place, talent, luck.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "Why does habit stacking work when motivation is low?",
            choices: [
              "It removes the need for a cue.",
              "It attaches the new behavior to a cue that already occurs.",
              "It guarantees the reward will be exciting.",
              "It makes the habit depend on how the person feels.",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "atomic-4",
        title: "Design the room",
        paragraphs: [
          "People like to believe they choose every action in the moment. Much of the choosing has already been done by the room. A guitar on a stand is a different life from a guitar in a closet. The visible object is a cue that does not require a speech.",
          "Reducing friction matters as much as adding inspiration. If the workout clothes are buried in a drawer, the habit starts with a search. If they are laid out, the habit starts with getting dressed. The two-minute version of a hard habit is not the whole practice. It is the entrance. “Put on the shoes” is small enough to survive a tired evening, and it often carries the person into the real session.",
          "Environment design is not a trick for people who lack character. It is an admission that attention is limited, and that a well-built setting spends less of it.",
        ],
        questions: [
          {
            kind: "Application",
            prompt:
              "Noah intends to train after work but often sits down and stays there. Which change best applies this chapter?",
            choices: [
              "Leave his shoes and clothes where he will see them before he sits.",
              "Rely on a longer motivational speech each evening.",
              "Hide the equipment so training feels like a special event.",
              "Wait until he feels spontaneous energy.",
            ],
            answer: 0,
          },
          {
            kind: "Comprehension",
            prompt: "What is the role of a two-minute version of a habit?",
            choices: [
              "It replaces the full practice forever.",
              "It is an entrance small enough to start when energy is low.",
              "It proves that difficult habits are unnecessary.",
              "It works only for creative hobbies.",
            ],
            answer: 1,
          },
          {
            kind: "Connection",
            prompt: "Which connection is most faithful to the chapter?",
            choices: [
              "A hidden guitar, and more daily playing.",
              "Lower friction, and fewer good intentions wasted on logistics.",
              "A cluttered room, and a stronger sense of discipline.",
              "More choices in the moment, and an easier habit.",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "deep",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Focus",
    rating: 4.7,
    pages: 296,
    readTime: "7h 10m",
    difficulty: "Hard",
    description: "A method for producing your best work in a distracted world.",
    cover: "deep",
    coverImage: "/covers/deep.jpg",
    finalPrompt:
      "Your best thinking keeps getting chopped into ten-minute fragments. Using at least two ideas from Deep Work, design a weekday system that would protect one serious block of focus.",
    chapters: [
      {
        id: "deep-1",
        title: "Deep and shallow",
        paragraphs: [
          "Deep work is the ability to focus without distraction on something cognitively demanding. Shallow work is the logistical layer around it: mail, status, small replies. Both exist. Only one produces the work that is hard to replace.",
          "The modern day rewards visible responsiveness, so shallow tasks expand until they occupy the hours that used to belong to thought. A person can finish the day exhausted and still have nothing that required their full mind.",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "What distinguishes deep work from shallow work in this chapter?",
            choices: [
              "Deep work is any task done at a desk.",
              "Deep work needs unbroken attention on something demanding.",
              "Shallow work is always a waste of time.",
              "Deep work can only happen before sunrise.",
            ],
            answer: 1,
          },
          {
            kind: "Application",
            prompt: "A designer spends the day in small replies and feels busy but empty. What does the chapter imply?",
            choices: [
              "The emptiness means the job is the wrong career.",
              "Busyness was mostly shallow work, so the demanding work never had a real block.",
              "More messages would make the day feel more substantial.",
              "Fatigue is proof that deep work already happened.",
            ],
            answer: 1,
          },
          {
            kind: "Connection",
            prompt: "Why does responsiveness crowd out thought?",
            choices: [
              "Thought requires more software.",
              "Visible quick replies are rewarded, so they expand into the hours meant for focus.",
              "People prefer difficult problems to easy messages.",
              "Shallow work is rarer than deep work.",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "deep-2",
        title: "Ritual and residue",
        paragraphs: [
          "Attention does not switch cleanly. A fragment of the previous task stays behind, which is why a “quick look” at a message can stain the next half hour. The practical response is a ritual: the same place, the same start, a clear shutdown so the mind knows the block has edges.",
          "A shutdown ritual is not a luxury. It tells open loops that they have been captured somewhere other than working memory. Without that edge, the evening continues to rehearse the day, and the next morning begins already scattered.",
        ],
        questions: [
          {
            kind: "Application",
            prompt: "Before a two-hour writing block, which start best matches this chapter?",
            choices: [
              "Check messages once more so nothing is pending.",
              "Begin in the same place, with the same first step, and leave messages outside the block.",
              "Keep chat open in case something important arrives.",
              "Change rooms and tools every session to stay stimulated.",
            ],
            answer: 1,
          },
          {
            kind: "Recall",
            prompt: "What is attention residue?",
            choices: [
              "The calm left after a finished task.",
              "A fragment of the previous task that stays and weakens the next one.",
              "A technique for remembering passwords.",
              "The reward for answering mail quickly.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "What is the point of a shutdown ritual?",
            choices: [
              "To make the workday longer.",
              "To close open loops so they are not carried into the evening and the next morning.",
              "To prove that rest must be earned by exhaustion.",
              "To replace the need for a focused block.",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "deep-3",
        title: "Protect the block",
        paragraphs: [
          "A focus block that depends on leftover time will lose to anything louder. The block has to be scheduled the way a meeting is scheduled, with a beginning that other people can see. Lead measures matter here: hours of undisturbed work, not the vague hope that the important project will somehow advance.",
          "Boredom is part of the training. If every dull moment is filled, the mind never practices staying with one problem. The phone is usually the cheapest escape, so distance from it is not a moral gesture. It is how the block survives the first restless minutes.",
        ],
        questions: [
          {
            kind: "Application",
            prompt: "Which plan most faithfully protects a deep-work block?",
            choices: [
              "Do the hard project after everything else is finished.",
              "Put a visible block on the calendar and keep the phone out of reach during it.",
              "Work with several feeds open so the mind stays alert.",
              "Measure the day by how many small tasks were cleared.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "Why does the chapter treat boredom as useful?",
            choices: [
              "Boredom means the work is finished.",
              "Staying with a dull stretch trains the mind not to flee the problem.",
              "Boredom should be removed with more stimulation.",
              "Only boring work counts as deep work.",
            ],
            answer: 1,
          },
          {
            kind: "Synthesis",
            prompt: "A lead measure for this chapter would most likely be:",
            choices: [
              "Number of unread messages at midnight.",
              "Hours spent in undisturbed work.",
              "How inspired the person felt at breakfast.",
              "How many tools were purchased.",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Money",
    rating: 4.8,
    pages: 256,
    readTime: "5h 40m",
    difficulty: "Easy",
    description: "Timeless lessons on wealth, greed, and the stories we tell about money.",
    cover: "money",
    coverImage: "/covers/money.jpg",
    finalPrompt:
      "A friend earns well but feels one surprise expense away from panic. Using at least two ideas from The Psychology of Money, outline a calmer way for them to handle money.",
    chapters: [
      {
        id: "money-1",
        title: "Behavior over math",
        paragraphs: [
          "Money decisions are rarely a math contest. Two people can hear the same facts and act differently because their lives taught them different fears. One learned that a dollar disappears. Another learned that a dollar grows if left alone. Both feel rational from the inside.",
          "That is why copying a tactic without the temperament behind it usually fails. The useful question is not only “what return is possible?” It is “what can I stick with when the story of the moment turns against me?”",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "Why can two reasonable people treat the same financial fact differently?",
            choices: [
              "One of them is always bad at arithmetic.",
              "Their histories taught them different fears, so the fact lands differently.",
              "Money decisions are random.",
              "Only professionals are allowed to disagree.",
            ],
            answer: 1,
          },
          {
            kind: "Application",
            prompt: "A person copies an aggressive strategy and abandons it at the first drop. What does the chapter suggest was missing?",
            choices: [
              "A louder tip.",
              "A temperament that could live with the strategy.",
              "A more complicated formula.",
              "Proof that patience is a mistake.",
            ],
            answer: 1,
          },
          {
            kind: "Connection",
            prompt: "Which question matches the chapter’s argument?",
            choices: [
              "How do I maximize every short-term swing?",
              "What can I stick with when the current story turns?",
              "Whose lifestyle should I imitate this month?",
              "How do I remove uncertainty entirely?",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "money-2",
        title: "Enough and compounding",
        paragraphs: [
          "“Enough” is a boundary that keeps a person from risking what they need for something they do not. Without it, the target moves every time someone nearby appears to have more. Compounding needs that boundary, because compounding is mostly time, and time is lost when a plan is abandoned for a more exciting one.",
          "The dull middle is the actual mechanism. Nothing looks heroic. The result appears because the person stayed in the game long enough for ordinary gains to stack.",
        ],
        questions: [
          {
            kind: "Application",
            prompt: "Which choice best protects compounding?",
            choices: [
              "Change plans whenever a neighbor’s return looks higher.",
              "Define enough, and stay with a plan long enough for time to work.",
              "Spend every raise so the numbers stay exciting.",
              "Measure success only against the richest person in sight.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "What does “enough” do in this chapter?",
            choices: [
              "It ends the possibility of saving.",
              "It sets a boundary so what you need is not risked for what you do not.",
              "It means ambition is a flaw.",
              "It replaces the need for any plan.",
            ],
            answer: 1,
          },
          {
            kind: "Synthesis",
            prompt: "Why is the dull middle described as the mechanism?",
            choices: [
              "Because excitement is what creates compound growth.",
              "Because staying in an ordinary plan is what gives time room to stack.",
              "Because results should be immediate to be trusted.",
              "Because boredom proves the plan has failed.",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "money-3",
        title: "Room for error",
        paragraphs: [
          "A plan that works only if every forecast is right is not a plan. It is a wish. Room for error is the space between what you expect and what you can survive. Savings, a wider timeline, a smaller fixed cost: these are not signs of pessimism. They are how a person stays in the game when a surprise arrives.",
          "The freedom money can buy is often control of time. A buffer that lets you choose tomorrow is worth more than a story in which every dollar is optimized and none of them can be touched.",
        ],
        questions: [
          {
            kind: "Application",
            prompt: "Which setup best shows room for error?",
            choices: [
              "Every dollar is committed, assuming income never dips.",
              "Spending leaves a buffer so a surprise does not break the plan.",
              "The entire plan depends on one perfect year.",
              "Cash is avoided because it looks unproductive.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "How does the chapter describe the freedom money can buy?",
            choices: [
              "A larger audience.",
              "More control over your time.",
              "Immunity from any mistake.",
              "The duty to take every risk.",
            ],
            answer: 1,
          },
          {
            kind: "Connection",
            prompt: "A forecast-perfect plan is called a wish because:",
            choices: [
              "Forecasts are entertaining.",
              "It collapses when reality misses the script.",
              "Wishes compound faster than savings.",
              "Survival is less important than elegance.",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    rating: 4.6,
    pages: 208,
    readTime: "4h 05m",
    difficulty: "Easy",
    description: "A fable about a shepherd who learns to listen for his own path.",
    cover: "alchemist",
    coverImage: "/covers/alchemist.jpg",
    finalPrompt:
      "A character is afraid to leave a safe routine for a calling they keep postponing. Using at least two ideas from The Alchemist, describe how they might begin without pretending the fear will vanish first.",
    chapters: [
      {
        id: "alchemist-1",
        title: "The personal legend",
        paragraphs: [
          "In the fable, a personal legend is the life a person is drawn to live, not the life they perform to stay unbothered. The shepherd knows the hills. The dream of the treasure asks him to leave what he already understands. Comfort is not presented as evil. It is simply incomplete.",
          "The story’s pressure comes from the cost of postponing. A person can be competent at a life that is slightly beside the one they meant to live, and the competence makes the postponement look responsible.",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "What is a personal legend in this chapter?",
            choices: [
              "A public reputation.",
              "The life a person is drawn to live, beyond the routine that merely keeps them safe.",
              "A treasure that requires no travel.",
              "A refusal to learn anything practical.",
            ],
            answer: 1,
          },
          {
            kind: "Application",
            prompt: "Someone is good at a job that sits beside the work they actually want. What would the chapter notice?",
            choices: [
              "Competence can disguise postponement.",
              "Skill proves the other calling was a mistake.",
              "Comfort and calling are always the same.",
              "Leaving is only valid if there is no fear.",
            ],
            answer: 0,
          },
          {
            kind: "Connection",
            prompt: "Why is comfort described as incomplete rather than evil?",
            choices: [
              "Because comfort has no value at all.",
              "Because it can be real and still fail to be the life they meant.",
              "Because the fable rejects ordinary work.",
              "Because treasure is a metaphor for money only.",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "alchemist-2",
        title: "Omens and fear",
        paragraphs: [
          "The boy is told to watch the world more carefully. Omens in the story are not magic shortcuts. They are moments of attention: a conversation, a repeated image, a reluctance that deserves a question. Missing them is easy if a person has decided, in advance, that nothing counts.",
          "Fear of suffering is treated as its own suffering. The imagined pain of beginning can last longer than the difficulty itself. The fable does not say the desert is kind. It says the refusal to enter can become the larger desert.",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "How should omens be read in this chapter?",
            choices: [
              "As a guarantee that nothing difficult will happen.",
              "As moments of attention, not as a trick that removes the journey.",
              "As proof that planning is useless.",
              "As instructions to ignore other people.",
            ],
            answer: 1,
          },
          {
            kind: "Application",
            prompt: "A person rehearses the pain of starting for months and never starts. Which reading fits?",
            choices: [
              "The rehearsal is wiser than any attempt.",
              "The fear of suffering has become its own longer suffering.",
              "Beginning is only meaningful if fear disappears first.",
              "Attention to the world is a distraction.",
            ],
            answer: 1,
          },
          {
            kind: "Synthesis",
            prompt: "Which action best honors both attention and courage in this chapter?",
            choices: [
              "Notice the repeated pull, and take a real first step while afraid.",
              "Wait until every sign is unambiguous and the fear is gone.",
              "Ignore the pull because comfort is safer.",
              "Treat every coincidence as an order to abandon responsibility.",
            ],
            answer: 0,
          },
        ],
      },
      {
        id: "alchemist-3",
        title: "The treasure and the return",
        paragraphs: [
          "The journey changes what the traveler can see. By the time the treasure matters, the person who can receive it is not the person who first dreamed it. The fable’s turn is that the wealth was never only at the destination. The capacity to recognize a life is built on the way there.",
          "Returning matters too. A calling that cannot be brought home, into ordinary days and ordinary duties, stays a fantasy. The legend becomes real when it changes how the person listens after the adventure.",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "What does the chapter claim about the treasure?",
            choices: [
              "The destination is the only thing that changes a person.",
              "The journey builds the capacity to recognize what matters.",
              "Treasure proves the start was a mistake.",
              "Returning home undoes the lesson.",
            ],
            answer: 1,
          },
          {
            kind: "Connection",
            prompt: "Why does the chapter insist on returning?",
            choices: [
              "So the story can dismiss ordinary life.",
              "So the calling has to survive contact with ordinary days.",
              "Because adventure should never end.",
              "Because home is a punishment.",
            ],
            answer: 1,
          },
          {
            kind: "Application",
            prompt: "After a meaningful trip, a person goes home unchanged and calls the trip the whole point. What is missing?",
            choices: [
              "A louder story.",
              "Letting the journey change how they listen in ordinary life.",
              "Proof that home was the obstacle.",
              "A reason to avoid another beginning.",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "thinking",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    rating: 4.7,
    pages: 499,
    readTime: "12h 40m",
    difficulty: "Hard",
    description: "Why the mind jumps to conclusions, and how a slower look can help.",
    cover: "thinking",
    coverImage: "/covers/thinking.jpg",
    finalPrompt:
      "You are about to make a costly decision based on a first impression and a single vivid story. Using at least two ideas from the book, describe a slower process that would test that impression before you commit.",
    chapters: [
      {
        id: "thinking-1",
        title: "Two speeds",
        paragraphs: [
          "One mode of mind is quick, associative, and always on. It finishes sentences, reads faces, and offers a feeling of certainty before you asked for one. Another mode is slower and reluctant. It compares, checks, and spends effort. The quick mode is not a villain. It is how a person gets through a street. It becomes a problem when a hard question is smuggled into an easy feeling.",
          "The slow mode tires. That is why a careful person can still make a sloppy choice at the end of a long day. The limitation is not hypocrisy. It is bandwidth.",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "When does the quick mode become a problem, according to this chapter?",
            choices: [
              "Whenever it helps someone cross a street.",
              "When a hard question is answered by an easy feeling.",
              "Only when a person is uneducated.",
              "Whenever any decision is made before noon.",
            ],
            answer: 1,
          },
          {
            kind: "Application",
            prompt: "At the end of an exhausting day, a careful person makes a sloppy choice. What does the chapter offer as the reason?",
            choices: [
              "Their values were fake.",
              "The slower mode was tired, so bandwidth was low.",
              "Quick thinking is always more accurate.",
              "Fatigue improves judgment.",
            ],
            answer: 1,
          },
          {
            kind: "Recall",
            prompt: "Which description fits the slower mode?",
            choices: [
              "It is effortful, comparative, and reluctant to spend itself.",
              "It is automatic and incapable of doubt.",
              "It never tires.",
              "It only works during emergencies.",
            ],
            answer: 0,
          },
        ],
      },
      {
        id: "thinking-2",
        title: "What you see is all there is",
        paragraphs: [
          "The mind builds the most coherent story it can from whatever is in front of it, then forgets how little that was. A vivid anecdote can outweigh a dull statistic because the anecdote arrives complete. The missing information does not announce itself.",
          "Anchors work the same way. A number offered early, even an irrelevant one, becomes a starting point the later judgment tugs against but rarely escapes. Knowing this does not make a person immune. It gives them a reason to ask what was left out, and which number arrived before the thinking did.",
        ],
        questions: [
          {
            kind: "Application",
            prompt: "A single dramatic story is driving a decision, and the broader numbers are dull. What should a slower process do?",
            choices: [
              "Trust the story because it feels complete.",
              "Ask what information is missing and give the dull evidence a real hearing.",
              "Find a more dramatic story on the same side.",
              "Ignore every number that is not emotional.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "What is an anchor in this chapter?",
            choices: [
              "A final conclusion reached after research.",
              "An early number that later judgment keeps orbiting.",
              "A statistic that people naturally prefer.",
              "A habit of listing alternative explanations.",
            ],
            answer: 1,
          },
          {
            kind: "Connection",
            prompt: "Why can a coherent story still be a weak one?",
            choices: [
              "Coherence means the evidence was complete.",
              "The mind can make a tidy story from too little, then forget the gaps.",
              "Dull facts are always wrong.",
              "Stories cannot contain numbers.",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "thinking-3",
        title: "Loss and the outside view",
        paragraphs: [
          "Losses sting more than equivalent gains please. That asymmetry makes people cling to a bad path because turning back would make the loss real. A calmer view separates “I dislike locking in a loss” from “this is still the best next step.”",
          "The outside view borrows other cases. Instead of asking how this particular plan feels, you ask how similar plans usually unfold. The inside view is full of detail and hope. The outside view is plainer, and often more accurate, because it remembers the base rate your story would rather ignore.",
        ],
        questions: [
          {
            kind: "Application",
            prompt: "A team refuses to stop a failing project because stopping would confirm the money already spent. Which distinction helps?",
            choices: [
              "Treat the pain of locking in a loss as if it were proof the project should continue.",
              "Separate the dislike of realizing a loss from the question of the best next step.",
              "Spend more so the earlier spend feels justified.",
              "Ignore every comparable project.",
            ],
            answer: 1,
          },
          {
            kind: "Comprehension",
            prompt: "What does the outside view use that the inside view tends to skip?",
            choices: [
              "How similar cases usually turn out.",
              "The team’s private optimism.",
              "The most vivid success story.",
              "A refusal to look at any data.",
            ],
            answer: 0,
          },
          {
            kind: "Synthesis",
            prompt: "Which process best combines this chapter’s ideas before a costly commitment?",
            choices: [
              "Notice loss aversion, then check the base rate of similar plans.",
              "Follow the first feeling, then collect stories that agree.",
              "Hide the early numbers so nobody is anchored.",
              "Decide faster so doubt cannot appear.",
            ],
            answer: 0,
          },
        ],
      },
    ],
  },
  {
    id: "power",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    category: "Strategy",
    rating: 4.6,
    pages: 452,
    readTime: "14h 10m",
    difficulty: "Hard",
    description: "A historical study of how power is displayed, guarded, and lost.",
    cover: "power",
    coverImage: "/covers/power.jpg",
    finalPrompt:
      "A new lead is tempted to show every advantage at once. Using at least two observations from the book, explain a more restrained approach and the risk of taking those observations too far.",
    chapters: [
      {
        id: "power-1",
        title: "Reputation and display",
        paragraphs: [
          "The book treats reputation as a kind of advance credit. People respond to the story they already hold about you, often before you act. That is why a single careless display can be expensive: it feeds a story that then interprets everything after it.",
          "Display is not the same as substance. Historical figures in these pages often gain by letting others reveal themselves first. The caution is obvious and easy to ignore: a tactic for court politics can rot ordinary trust if it becomes a personality.",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "How does this chapter describe reputation?",
            choices: [
              "As a private feeling with no consequences.",
              "As advance credit: a story people use before you act.",
              "As something that only matters after a final victory.",
              "As a substitute for any real skill.",
            ],
            answer: 1,
          },
          {
            kind: "Application",
            prompt: "Why might the chapter advise against showing every advantage immediately?",
            choices: [
              "Because advantages are embarrassing.",
              "Because an early display can feed a story that colors everything later.",
              "Because concealment is always morally required.",
              "Because other people should never learn your role.",
            ],
            answer: 1,
          },
          {
            kind: "Connection",
            prompt: "What risk does the chapter attach to turning these observations into a personality?",
            choices: [
              "They might make a person too trusting.",
              "Court tactics can corrode ordinary trust.",
              "Reputation stops mattering.",
              "Substance becomes more visible than display.",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "power-2",
        title: "Conceal the intention",
        paragraphs: [
          "Several of the laws circle one observation: people guard themselves when they know what you want. Indirection, in the historical episodes, is a way of lowering that guard. The book is descriptive about this more often than it is comfortable. Reading it well means seeing the mechanism without adopting cruelty as a style.",
          "Silence is one of the tools. A person who narrates every move gives others time to prepare. A person who never speaks at all creates a different suspicion. The useful middle is restraint: say less than your anxiety wants to say, and do not confuse mystery with deceit.",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "Why, in these episodes, do people hide an intention?",
            choices: [
              "Because stated wants often make others raise their guard.",
              "Because silence is always kind.",
              "Because goals should never be chosen.",
              "Because deception has no cost.",
            ],
            answer: 0,
          },
          {
            kind: "Synthesis",
            prompt: "Which reading keeps the observation without turning it into a license to harm?",
            choices: [
              "Use restraint in what you reveal, and refuse cruelty as a personal style.",
              "Hide every truth so nobody can trust you.",
              "Announce every desire so the law cannot apply.",
              "Treat other people as obstacles by default.",
            ],
            answer: 0,
          },
          {
            kind: "Application",
            prompt: "A lead narrates every unfinished idea and then wonders why the room resists. What would the chapter notice?",
            choices: [
              "The narration gave people time to prepare and defend.",
              "The room failed because it heard too little.",
              "Mystery would have required lying.",
              "Resistance proves the idea was bad.",
            ],
            answer: 0,
          },
        ],
      },
      {
        id: "power-3",
        title: "Dependence and limits",
        paragraphs: [
          "Power, in this framing, grows when others need what you can do, and it collapses when that need is abused. Making yourself necessary is different from making yourself impossible to leave. The second creates enemies who are waiting for a chance.",
          "The histories are full of people who won the room and lost the ending because they could not stop. A limit is part of the strategy: know which advantage you are using, what it costs the people around you, and when a further move would turn dependence into revolt.",
        ],
        questions: [
          {
            kind: "Comprehension",
            prompt: "What distinction does the chapter draw around dependence?",
            choices: [
              "Being necessary is the same as being impossible to leave.",
              "Being needed can create influence; trapping people creates enemies.",
              "Dependence is always generous.",
              "Limits make strategy impossible.",
            ],
            answer: 1,
          },
          {
            kind: "Application",
            prompt: "A person keeps pressing an advantage after they have already won cooperation. What ending does the chapter predict?",
            choices: [
              "Permanent loyalty.",
              "A later revolt from people who feel trapped.",
              "The cost of the advantage disappears.",
              "History stops applying.",
            ],
            answer: 1,
          },
          {
            kind: "Synthesis",
            prompt: "Which approach best includes the chapter’s limit?",
            choices: [
              "Use a real advantage, watch its cost, and stop before dependence turns sour.",
              "Remove every limit so momentum can continue.",
              "Avoid being useful so nobody depends on you.",
              "Win the room and ignore the ending.",
            ],
            answer: 0,
          },
        ],
      },
    ],
  },
];

for (const book of books) {
  const more = extraChapters[book.id];
  if (!more) continue;
  book.chapters.push(...more);
  book.pages += 42;
}

const now = Date.now();

function challenge(
  partial: Omit<Challenge, "pool" | "rivals" | "durationMs"> & {
    durationMs: number;
    rivals?: number[];
    pool?: number;
  },
): Challenge {
  const rivals =
    partial.rivals ??
    Array.from({ length: Math.max(0, partial.players) }, (_, index) => 15 + ((index * 17) % 70));
  return {
    ...partial,
    rivals: rivals.slice(0, partial.players),
    pool: partial.pool ?? partial.entryFee * partial.players,
    durationMs: partial.durationMs,
  };
}

const atomicFillPlayers = [8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6];
const atomicFees = [5, 10, 25];

const atomicFill: Challenge[] = atomicFillPlayers.map((players, index) => {
  const entryFee = atomicFees[index % atomicFees.length];
  const maxPlayers = players + 3 + (index % 2);
  const durationMs = [5 * hour + 20 * 60000, 9 * hour, 16 * hour, 30 * hour, 6 * hour][index % 5];
  return challenge({
    id: `atomic-fill-${index}`,
    number: 2420 + index,
    bookId: "atomic",
    entryFee,
    players,
    maxPlayers,
    endsAt: now + durationMs,
    durationMs,
    minKnowledge: 80,
  });
});

export function createChallenges(origin = now): Challenge[] {
  const featured: Challenge[] = [
    challenge({
      id: "c1842",
      number: 1842,
      bookId: "atomic",
      entryFee: 10,
      players: 17,
      maxPlayers: 20,
      endsAt: origin + 12 * hour + 42 * 60000,
      durationMs: 12 * hour + 42 * 60000,
      minKnowledge: 80,
      featured: true,
      rivals: [22, 31, 44, 15, 63, 28, 51, 37, 19, 72, 41, 33, 58, 12, 47, 26, 68],
    }),
    challenge({
      id: "c1931",
      number: 1931,
      bookId: "atomic",
      entryFee: 5,
      players: 8,
      maxPlayers: 10,
      endsAt: origin + 5 * hour + 20 * 60000,
      durationMs: 5 * hour + 20 * 60000,
      minKnowledge: 75,
      featured: true,
    }),
    challenge({
      id: "c2012",
      number: 2012,
      bookId: "atomic",
      entryFee: 25,
      players: 4,
      maxPlayers: 5,
      endsAt: origin + 28 * hour,
      durationMs: 28 * hour,
      minKnowledge: 85,
      featured: true,
    }),
    challenge({
      id: "c1760",
      number: 1760,
      bookId: "atomic",
      entryFee: 10,
      players: 15,
      maxPlayers: 15,
      endsAt: origin + 8 * hour,
      durationMs: 8 * hour,
      minKnowledge: 80,
    }),
    challenge({
      id: "c1502",
      number: 1502,
      bookId: "atomic",
      entryFee: 10,
      players: 12,
      maxPlayers: 20,
      endsAt: origin - 2 * hour,
      durationMs: 12 * hour,
      minKnowledge: 80,
      seededExpired: true,
    }),
    challenge({
      id: "c1888",
      number: 1888,
      bookId: "deep",
      entryFee: 25,
      players: 9,
      maxPlayers: 12,
      endsAt: origin + 18 * hour,
      durationMs: 18 * hour,
      minKnowledge: 80,
      featured: true,
      rivals: [20, 55, 61, 33, 48, 70, 15, 39],
    }),
    challenge({
      id: "c2104",
      number: 2104,
      bookId: "deep",
      entryFee: 10,
      players: 6,
      maxPlayers: 10,
      endsAt: origin + 8 * hour,
      durationMs: 8 * hour,
      minKnowledge: 75,
    }),
    challenge({
      id: "c1744",
      number: 1744,
      bookId: "money",
      entryFee: 10,
      players: 11,
      maxPlayers: 14,
      endsAt: origin + 20 * hour,
      durationMs: 20 * hour,
      minKnowledge: 80,
      featured: true,
      rivals: [30, 44, 22, 51, 18, 36, 27, 40, 16, 33],
    }),
    challenge({
      id: "c1994",
      number: 1994,
      bookId: "money",
      entryFee: 5,
      players: 7,
      maxPlayers: 12,
      endsAt: origin + 6 * hour,
      durationMs: 6 * hour,
      minKnowledge: 70,
    }),
    challenge({
      id: "c1601",
      number: 1601,
      bookId: "alchemist",
      entryFee: 5,
      players: 14,
      maxPlayers: 20,
      endsAt: origin + 26 * hour,
      durationMs: 26 * hour,
      minKnowledge: 75,
      featured: true,
    }),
    challenge({
      id: "c2055",
      number: 2055,
      bookId: "thinking",
      entryFee: 15,
      players: 6,
      maxPlayers: 8,
      endsAt: origin + 36 * hour,
      durationMs: 36 * hour,
      minKnowledge: 80,
      featured: true,
    }),
    challenge({
      id: "c2119",
      number: 2119,
      bookId: "power",
      entryFee: 10,
      players: 5,
      maxPlayers: 10,
      endsAt: origin + 14 * hour,
      durationMs: 14 * hour,
      minKnowledge: 80,
      featured: true,
    }),
    challenge({
      id: "c2301",
      number: 2301,
      bookId: "power",
      entryFee: 250,
      players: 2,
      maxPlayers: 6,
      endsAt: origin + 40 * hour,
      durationMs: 40 * hour,
      minKnowledge: 85,
    }),
  ];

  return [...featured, ...atomicFill.map((item) => ({ ...item, endsAt: origin + item.durationMs }))];
}

export function bookStats(bookId: string, challenges: Challenge[], nowMs: number) {
  const active = challenges.filter((item) => item.bookId === bookId && item.endsAt > nowMs);
  const readers = active.reduce((sum, item) => sum + item.players, 0);
  const starting = active.reduce((min, item) => Math.min(min, item.entryFee), active[0]?.entryFee ?? 0);
  return {
    challenges: active.length,
    readers,
    starting,
  };
}

export const npcBoards: Record<"week" | "month" | "all", BoardRow[]> = {
  week: [
    { id: "nora", name: "Nora", books: 3, wins: 2, knowledge: 93, usdc: 140 },
    { id: "elias", name: "Elias", books: 2, wins: 1, knowledge: 90, usdc: 96 },
    { id: "priya", name: "Priya", books: 2, wins: 0, knowledge: 88, usdc: 22 },
    { id: "kenji", name: "Kenji", books: 1, wins: 1, knowledge: 95, usdc: 40 },
    { id: "leah", name: "Leah", books: 1, wins: 0, knowledge: 84, usdc: 0 },
  ],
  month: [
    { id: "samira", name: "Samira", books: 6, wins: 3, knowledge: 94, usdc: 260 },
    { id: "nora", name: "Nora", books: 5, wins: 2, knowledge: 92, usdc: 188 },
    { id: "mateo", name: "Mateo", books: 4, wins: 1, knowledge: 86, usdc: 70 },
    { id: "hana", name: "Hana", books: 3, wins: 1, knowledge: 91, usdc: 54 },
    { id: "elias", name: "Elias", books: 3, wins: 0, knowledge: 89, usdc: 18 },
  ],
  all: [
    { id: "jordan", name: "Jordan", books: 28, wins: 11, knowledge: 93, usdc: 840 },
    { id: "samira", name: "Samira", books: 21, wins: 8, knowledge: 95, usdc: 610 },
    { id: "mina", name: "Mina", books: 16, wins: 6, knowledge: 91, usdc: 402 },
    { id: "nora", name: "Nora", books: 14, wins: 5, knowledge: 90, usdc: 188 },
    { id: "kenji", name: "Kenji", books: 11, wins: 4, knowledge: 92, usdc: 150 },
    { id: "leah", name: "Leah", books: 9, wins: 2, knowledge: 87, usdc: 96 },
  ],
};

export const initialHistory: HistoryItem[] = [
  {
    id: "h1",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverImage: "/covers/sapiens.jpg",
    kicker: "History",
    bg: "#E6D3B8",
    fg: "#2A2118",
    accent: "#8C6239",
    date: "Mar 12",
    knowledge: 91,
    result: "Won",
    prize: 120,
  },
  {
    id: "h2",
    title: "Educated",
    author: "Tara Westover",
    coverImage: "/covers/educated.jpg",
    kicker: "Memoir",
    bg: "#1C2430",
    fg: "#F4F0E8",
    accent: "#C6A36A",
    date: "Feb 2",
    knowledge: 93,
    result: "Won",
    prize: 64,
  },
  {
    id: "h3",
    title: "Meditations",
    author: "Marcus Aurelius",
    coverImage: "/covers/meditations.jpg",
    kicker: "Philosophy",
    bg: "#E7E1D6",
    fg: "#1A1A1A",
    accent: "#A88856",
    date: "Jan 18",
    knowledge: 90,
    result: "Won",
    prize: 30,
  },
  {
    id: "h4",
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    coverImage: "/covers/meaning.jpg",
    kicker: "Psychology",
    bg: "#F1E7D6",
    fg: "#241C16",
    accent: "#7A5A3A",
    date: "Dec 9",
    knowledge: 88,
    result: "3rd",
    prize: 0,
  },
  {
    id: "h5",
    title: "Start With Why",
    author: "Simon Sinek",
    coverImage: "/covers/why.jpg",
    kicker: "Leadership",
    bg: "#141414",
    fg: "#F6F1E8",
    accent: "#C6A36A",
    date: "Nov 21",
    knowledge: 86,
    result: "4th",
    prize: 0,
  },
  {
    id: "h6",
    title: "Can't Hurt Me",
    author: "David Goggins",
    coverImage: "/covers/hurt.jpg",
    kicker: "Memoir",
    bg: "#2A2420",
    fg: "#F3EEE6",
    accent: "#E0C396",
    date: "Oct 30",
    knowledge: 85,
    result: "Verified",
    prize: 0,
  },
  {
    id: "h7",
    title: "Show Your Work",
    author: "Austin Kleon",
    coverImage: "/covers/show.jpg",
    kicker: "Creativity",
    bg: "#F7F1E6",
    fg: "#1B1B1B",
    accent: "#111111",
    date: "Oct 4",
    knowledge: 89,
    result: "2nd",
    prize: 0,
  },
  {
    id: "h8",
    title: "The Subtle Art",
    author: "Mark Manson",
    coverImage: "/covers/subtle.jpg",
    kicker: "Essays",
    bg: "#101010",
    fg: "#F2EFEA",
    accent: "#C6A36A",
    date: "Sep 14",
    knowledge: 84,
    result: "5th",
    prize: 0,
  },
];

export function createInitialParticipations(origin = now): Participation[] {
  return [
    {
      challengeId: "c1888",
      bookId: "deep",
      entryFee: 25,
      quotedPrize: quotedPrize(200),
      status: "active",
      chaptersRead: 1,
      checkpointScores: [81, null, null],
      knowledgeScore: 81,
      joinedAt: origin - 5 * 86400000,
      bookmark: 1,
    },
    {
      challengeId: "c1744",
      bookId: "money",
      entryFee: 10,
      quotedPrize: quotedPrize(100),
      status: "active",
      chaptersRead: 1,
      checkpointScores: [76, null, null],
      knowledgeScore: 76,
      joinedAt: origin - 2 * 86400000,
    },
  ];
}

export function getBook(bookId: string) {
  return books.find((book) => book.id === bookId);
}

export const ERROR_COPY = {
  insufficient_funds: "Not enough demo USDC",
  challenge_full: "This challenge is already full.",
  challenge_expired: "This challenge has ended.",
  failed: "Something went wrong. Try again.",
  checkpoint: "Knowledge score too low. Try again.",
  final: "You need 7/10 to complete this challenge.",
} as const;
