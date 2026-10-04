import type { Chapter, Question } from "./types";

function q(
  kind: Question["kind"],
  prompt: string,
  choices: [string, string, string, string],
  answer: Question["answer"],
): Question {
  return { kind, prompt, choices, answer };
}

function chapter(
  id: string,
  title: string,
  paragraphs: [string, string, string],
  questions: [Question, Question, Question],
): Chapter {
  return { id, title, paragraphs, questions };
}

export const extraChapters: Record<string, Chapter[]> = {
  atomic: [
    chapter(
      "atomic-5",
      "Never miss twice",
      [
        "A missed day is an event. The story people tell themselves the next morning is what turns one miss into a new identity. The useful rule is small: never miss twice. The repair matters more than the perfect streak.",
        "Returning quickly keeps the vote with the person you meant to be. Waiting for a fresh Monday hands the streak to the old pattern. The second miss is the one that teaches the habit to disappear.",
        "This is not a demand for harshness. It is a plan for the ordinary failure. Decide the return before the miss happens, so the morning after does not require a speech.",
      ],
      [
        q("Application", "Sam skips a writing morning and feels the week is already ruined. Which response best fits this chapter?", [
          "Wait until next Monday so the streak can look clean.",
          "Write the next morning, and treat the miss as one event.",
          "Double the goal so the missed day is erased.",
          "Decide the habit was never realistic.",
        ], 1),
        q("Comprehension", "Why does the chapter treat the second miss as more important than the first?", [
          "The first miss is always a moral failure.",
          "The second miss starts a new pattern, while the first is still an event.",
          "Two misses prove the system was too easy.",
          "Only a long streak counts as a real habit.",
        ], 1),
        q("Connection", "Which pair belongs together here?", [
          "A planned return, and a miss that stays a single event.",
          "A ruined week, and a stronger identity.",
          "Waiting for Monday, and a protected streak.",
          "Harsh punishment, and an easier habit.",
        ], 0),
      ],
    ),
    chapter(
      "atomic-6",
      "Count the votes",
      [
        "Identity changes when the evidence changes. A single session is a vote, and the count is what you can actually see. People abandon a habit because they remember the feeling and forget the tally.",
        "A simple record, a mark on a card or a line in a notebook, makes the votes visible. The point is not to worship the streak. The point is to notice that the person who keeps returning already exists in the record.",
        "The count should stay honest. A day you skipped is a blank, not a lie. Honesty keeps the next vote available. A fake perfect record teaches you to hide from the practice.",
      ],
      [
        q("Application", "Leah wants to believe she is becoming a reader. Which practice best uses this chapter?", [
          "Announce the identity and wait to feel it.",
          "Keep an honest mark for each day she actually reads.",
          "Count only the days that felt inspiring.",
          "Hide the blank days so the card looks finished.",
        ], 1),
        q("Comprehension", "What is the record for, in this chapter?", [
          "To prove the streak was never broken.",
          "To make the votes visible without pretending the blanks did not happen.",
          "To replace the habit with a score.",
          "To impress someone else with a perfect card.",
        ], 1),
        q("Synthesis", "Someone fills in a skipped day so the chain looks unbroken. What does the chapter suggest they lose?", [
          "The chance to see the real pattern and cast the next true vote.",
          "The right to rest.",
          "The goal they started with.",
          "Nothing, because the feeling of progress is what matters.",
        ], 0),
      ],
    ),
    chapter(
      "atomic-7",
      "Make the start smaller",
      [
        "Most habits fail at the entrance, not at the peak. The session people imagine is too large for a tired evening, so they never begin. A smaller start is not a lesser ambition. It is the door.",
        "Two minutes of the real practice beats a plan for an hour that never arrives. Once the door is open, the longer session can happen. If it does not, the vote was still cast.",
        "Shrink the start until it is almost difficult to refuse. Lay out the shoes. Open the document. Read one page. The standard can rise later. It cannot rise on a day that never began.",
      ],
      [
        q("Application", "Noah keeps planning a full workout and then skipping it. Which change best applies this chapter?", [
          "Promise a longer workout so the goal feels serious.",
          "Make the first action small enough that a tired evening can still begin.",
          "Wait for a day with more energy.",
          "Remove the habit until life is calmer.",
        ], 1),
        q("Comprehension", "What is a smaller start, according to this chapter?", [
          "A way to abandon the real practice.",
          "The door into the practice, not the whole session.",
          "Proof that hard habits are unnecessary.",
          "A reward for finishing a perfect week.",
        ], 1),
        q("Connection", "Which connection fits the chapter?", [
          "A huge planned session, and a day that still begins.",
          "An easy entrance, and a vote that can be cast when energy is low.",
          "Waiting for motivation, and a stronger system.",
          "Raising the standard first, and starting later.",
        ], 1),
      ],
    ),
  ],
  deep: [
    chapter(
      "deep-4",
      "Leave the shallow pile",
      [
        "Shallow work expands to fill the day if it is allowed to sit at the front of the queue. Mail, messages, and small requests feel urgent because they end quickly. They also spend the hours that depth needed.",
        "A useful order is the reverse. The deep block comes first, while attention is still intact. The shallow pile is a later appointment, with a limit, not the climate of the whole day.",
        "This is a scheduling decision, not a personality. People who answer everything first are not more responsible. They have let the easiest tasks choose the shape of the day.",
      ],
      [
        q("Application", "A writer answers messages until noon and then says there is no time for the real chapter. Which change fits?", [
          "Keep the inbox first so nothing feels unfinished.",
          "Put the deep block before the shallow pile, and give the pile a later limit.",
          "Stay available all day so depth can happen between replies.",
          "Drop the chapter until the inbox is empty.",
        ], 1),
        q("Comprehension", "Why does the chapter refuse to treat quick tasks as the start of the day?", [
          "Quick tasks are always unimportant.",
          "They spend the attention that the deep block needed.",
          "Messages should never be answered.",
          "Depth only works at night.",
        ], 1),
        q("Connection", "Which pair matches the argument?", [
          "Answering first, and a day still shaped by the important work.",
          "Depth first, and shallow work kept inside a later limit.",
          "A full inbox, and a protected morning.",
          "Constant availability, and deeper focus.",
        ], 1),
      ],
    ),
    chapter(
      "deep-5",
      "Close the day",
      [
        "Work that has no ending keeps running in the evening. The mind rehearses open loops because nothing told it the day was finished. A closing ritual is a short, repeatable end: note what is done, name the next step, and leave the desk.",
        "The ritual does not finish the project. It finishes the day. Tomorrow’s first action is written down so the evening does not have to hold it. The shutdown is a boundary, not a reward you earn only when the work is complete.",
        "Without that boundary, rest becomes another kind of work. You are away from the desk and still in the problem. Depth the next morning starts worse, because the night never cleared.",
      ],
      [
        q("Application", "Priya keeps thinking about an unfinished draft after dinner. Which practice best uses this chapter?", [
          "Stay at the desk until the draft feels complete.",
          "Write the next step, close the day, and leave the problem until morning.",
          "Check the draft once more from bed.",
          "Avoid planning so the evening stays spontaneous.",
        ], 1),
        q("Comprehension", "What does a closing ritual finish?", [
          "The whole project.",
          "The day, by naming the next step and setting a boundary.",
          "The need for rest.",
          "Only the tasks that were easy.",
        ], 1),
        q("Synthesis", "Someone says they will rest after the work is finally done. What problem does the chapter see?", [
          "The day never ends, so the night keeps rehearsing open loops.",
          "Rest becomes too long.",
          "The next step gets written too clearly.",
          "The morning starts with too much energy.",
        ], 0),
      ],
    ),
    chapter(
      "deep-6",
      "Practice being bored",
      [
        "Attention that is rescued every time it itches never learns to stay. The phone in the pocket is a permanent exit from boredom. Depth asks for the opposite skill: remaining with a problem after the first urge to leave.",
        "Boredom is not the enemy of the work. It is the hallway you cross to reach the useful part. If every dull minute is filled, the mind gets faster at escaping and slower at staying.",
        "The practice can be small. Walk without a podcast. Wait without a screen. Sit with the paragraph for one more minute after you want to check something. The point is to teach attention that an itch is not an order.",
      ],
      [
        q("Application", "Kenji reaches for his phone whenever a problem gets dull. Which practice best fits?", [
          "Fill every pause so the day feels productive.",
          "Stay with the dull stretch a little longer before leaving it.",
          "Switch tasks at the first itch so energy stays high.",
          "Keep a podcast on during the deep block.",
        ], 1),
        q("Comprehension", "How does this chapter treat boredom?", [
          "As proof the work is wrong.",
          "As a hallway you cross on the way to depth.",
          "As something a good system removes completely.",
          "As a sign to open a new tab.",
        ], 1),
        q("Connection", "Which connection is most faithful?", [
          "A constant exit, and a stronger ability to stay.",
          "An unfilled pause, and attention that learns an itch is not an order.",
          "More stimulation, and a quieter mind.",
          "Leaving at the first dull minute, and deeper work.",
        ], 1),
      ],
    ),
  ],
  money: [
    chapter(
      "money-4",
      "Keep the gap",
      [
        "Wealth is the gap between what comes in and what goes out, held for a long time. A raise that is spent as it arrives does not become wealth. It becomes a more expensive life.",
        "The gap is quiet. It does not look like a purchase. People underestimate it because spending is visible and saving is the absence of a gesture. The absence is the asset.",
        "A practical version is decided in advance. A portion leaves before the month can bargain with it. The point is not austerity. The point is that the gap survives an ordinary impulse.",
      ],
      [
        q("Application", "A raise arrives and the household spends it within a month. Which response fits this chapter?", [
          "Treat the higher spending as the reward the raise was for.",
          "Move a portion aside before the new income can be absorbed.",
          "Wait for a larger raise before saving.",
          "Spend it once, then start the gap next year.",
        ], 1),
        q("Comprehension", "What is wealth, in this chapter?", [
          "A visible purchase that proves success.",
          "The gap between income and spending, kept over time.",
          "The size of the latest raise.",
          "A budget that is rewritten every evening.",
        ], 1),
        q("Connection", "Which pair belongs together?", [
          "Spending the raise, and a wider gap.",
          "An automatic portion set aside, and a gap that survives an ordinary month.",
          "A more expensive life, and greater wealth.",
          "A visible purchase, and money that compounds.",
        ], 1),
      ],
    ),
    chapter(
      "money-5",
      "Name enough",
      [
        "Without a number for enough, every gain moves the finish line. The comparison is endless because someone nearby always has more. Enough is a decision you write down, not a feeling that arrives when the account looks impressive.",
        "The number can include safety, a way of living, and people you refuse to neglect. It does not need to impress a stranger. Once it is named, later money has a job. Before it is named, later money only has an appetite.",
        "Enough is not the same as stopping. You can keep building after the number. The difference is that building is a choice, not a chase you cannot describe.",
      ],
      [
        q("Application", "Mateo earns more each year and still feels behind. Which step best applies this chapter?", [
          "Find a richer comparison so the target is clearer.",
          "Write down what enough includes, so later money has a job.",
          "Refuse to name a number until the feeling arrives.",
          "Spend up to the new income so life matches the raise.",
        ], 1),
        q("Comprehension", "Why does the chapter want enough written down?", [
          "A written number ends all future work.",
          "Without it, every gain moves the finish line.",
          "Feelings are always more accurate than plans.",
          "Strangers should be able to check the number.",
        ], 1),
        q("Synthesis", "Someone keeps building after they have named enough. Does the chapter forbid that?", [
          "No. Building can continue as a choice instead of an unnamed chase.",
          "Yes. Any money past the number is a mistake.",
          "Yes. Enough means the work must stop.",
          "No, because the number should rise every month.",
        ], 0),
      ],
    ),
    chapter(
      "money-6",
      "Separate luck from skill",
      [
        "A good outcome is a poor teacher when luck did part of the work. People copy the visible risk and miss the hidden survival. The story sounds like skill because the person who failed the same bet is not in the room.",
        "The correction is modest. Ask what would still be wise if the lucky part had gone the other way. Room for error is how you respect the luck you cannot see in someone else’s result.",
        "This does not mean skill is fake. It means a result is not a full explanation. Repeat what you can control. Do not copy the part that only worked because the year was kind.",
      ],
      [
        q("Application", "Hana wants to copy a friend’s concentrated bet because it paid off. Which question fits this chapter?", [
          "How can I take the same risk before the window closes?",
          "What part of that result would still be wise if the lucky year had gone the other way?",
          "How do I hide a margin so the bet looks bold?",
          "Which story about the win is most exciting?",
        ], 1),
        q("Comprehension", "Why is a good outcome a poor teacher here?", [
          "Outcomes never contain skill.",
          "Luck can be invisible, and the people who lost the same bet are absent.",
          "Only failures are worth studying.",
          "Skill disappears after one good year.",
        ], 1),
        q("Connection", "Which pair matches the chapter?", [
          "Copying the visible win, and respecting unseen luck.",
          "Room for error, and a result you do not treat as a full explanation.",
          "A kind year, and a strategy that must be repeated exactly.",
          "Someone else’s story, and proof your own risk is safe.",
        ], 1),
      ],
    ),
  ],
  alchemist: [
    chapter(
      "alchemist-4",
      "Listen for the next sign",
      [
        "A calling rarely arrives as a complete map. It arrives as a next sign: a repeated pull, a sentence you cannot ignore, a small opening that fits the thing you already know you want. The work is to notice it before you explain it away.",
        "People miss signs because they ask them to be louder than ordinary life. A sign can be quiet and still be real. The test is not drama. The test is whether it points back to the path you keep postponing.",
        "Listening is not the same as waiting forever. You hear the sign, then you take the step it makes possible. A sign you only collect becomes a story about a life you did not start.",
      ],
      [
        q("Application", "A shepherd keeps noticing the same wish and calling it impractical. Which response fits?", [
          "Wait for a sign that removes every risk.",
          "Treat the repeated pull as a sign, and take the step it makes possible.",
          "Collect the feeling and leave the path for later.",
          "Ask the wish to arrive as a complete map.",
        ], 1),
        q("Comprehension", "What makes a quiet sign real, in this chapter?", [
          "It is dramatic enough to impress other people.",
          "It points back to the path that keeps being postponed.",
          "It arrives only once.",
          "It explains the entire journey in advance.",
        ], 1),
        q("Connection", "Which pair belongs together?", [
          "Noticing a sign, and never taking the step.",
          "A quiet pull, and a life that still begins.",
          "A complete map, and the only kind of calling that counts.",
          "Waiting forever, and a journey already underway.",
        ], 1),
      ],
    ),
    chapter(
      "alchemist-5",
      "Fear before the first step",
      [
        "The fear of starting often pretends to be wisdom. It lists every reason the journey might fail, and it sounds careful. The chapter’s distinction is simple: fear that helps you pack is useful. Fear that keeps you from the road is the thing you have to walk through.",
        "You do not need to feel brave to begin. You need a first step small enough to take while the fear is still talking. Courage here is not the absence of the voice. It is moving anyway.",
        "People suffer twice when they obey that voice completely. Once in the imagination, and again by living the life that never left. Beginning spends the fear on a real day instead of a rehearsal.",
      ],
      [
        q("Application", "Someone has planned the journey for a year and still will not leave. Which action fits?", [
          "Wait until the fear goes quiet.",
          "Take a first step while the fear is still talking.",
          "Treat every doubt as proof the path is wrong.",
          "Imagine the failure in more detail before deciding.",
        ], 1),
        q("Comprehension", "Which fear does the chapter call useful?", [
          "Fear that stops the journey before it starts.",
          "Fear that helps you prepare, and does not keep you home.",
          "Fear that sounds the most careful.",
          "Fear that other people approve of.",
        ], 1),
        q("Synthesis", "What does beginning change, according to this chapter?", [
          "It spends the fear on a real day instead of a rehearsal.",
          "It removes every risk from the road.",
          "It proves the fear was foolish.",
          "It guarantees the treasure.",
        ], 0),
      ],
    ),
    chapter(
      "alchemist-6",
      "The long way back",
      [
        "The thing you went looking for is often bound up with the road that changed you. Arriving is not the only treasure. The return matters because you bring back a way of seeing that the old life can actually use.",
        "People spoil the ending when they treat the journey as a detour from the real plan. The delays, the teachers, and the wrong turns were not waste if they taught you how to recognize what you wanted.",
        "Coming home is part of the story. You do not have to stay on the road to prove it was real. You have to live as someone who took it.",
      ],
      [
        q("Comprehension", "What does the return carry, in this chapter?", [
          "Proof that the journey was a detour.",
          "A way of seeing that the old life can use.",
          "A reason to never go home.",
          "Only the object you set out to find.",
        ], 1),
        q("Application", "A traveler calls every delay a waste once the goal is in sight. Which view fits the chapter?", [
          "The delays can be part of how they learned to recognize the goal.",
          "Only the arrival counts, so the road should be forgotten.",
          "Going home cancels the journey.",
          "Wrong turns mean the calling was false.",
        ], 0),
        q("Connection", "Which pair is most faithful?", [
          "A long road, and a treasure that includes who you became.",
          "Coming home, and proof the journey failed.",
          "A wrong turn, and a story with no value.",
          "Staying away forever, and the only honest ending.",
        ], 0),
      ],
    ),
  ],
  thinking: [
    chapter(
      "thinking-4",
      "Use the outside view",
      [
        "The inside view is the story of this case: your details, your effort, your reasons it will be different. The outside view is the class of similar cases and how they usually end. Plans get kinder when they only listen to the inside view.",
        "Before you trust a timeline, ask what happened to people who started from a similar place. That number will feel unfair. It is still information. Your specifics can adjust it. They should not replace it.",
        "The outside view is a brake, not a verdict. It keeps a hopeful plan from ignoring the base rate. A project that cannot survive that comparison needs a smaller promise or a larger margin.",
      ],
      [
        q("Application", "A team believes their launch will be faster than every similar launch. Which step fits?", [
          "Trust the inside story because this team is motivated.",
          "Start from how similar launches usually go, then adjust for what is truly different.",
          "Ignore other cases so the plan stays inspiring.",
          "Double the promise to make the effort feel worthy.",
        ], 1),
        q("Comprehension", "What is the outside view?", [
          "The most optimistic version of your own story.",
          "How similar cases usually end.",
          "A verdict that your specifics never matter.",
          "A reason to avoid planning.",
        ], 1),
        q("Connection", "Which pair matches the chapter?", [
          "Inside view only, and a timeline that stays honest.",
          "A base rate, and a plan that still has room for what is different.",
          "A hopeful story, and a margin you no longer need.",
          "Other people’s results, and proof your case cannot succeed.",
        ], 1),
      ],
    ),
    chapter(
      "thinking-5",
      "Look for the missing cases",
      [
        "What you see is not the whole set. The books that get finished, the businesses that survive, and the habits that look easy are the ones still visible. The abandoned versions are quieter, so the sample smiles.",
        "A fair judgment asks who is missing. If you only study the people who remained, you will think the path is smoother than it is. The missing cases are part of the evidence.",
        "This is a habit of looking. When a result seems common, ask what happened to the attempts you cannot see. The answer does not forbid the attempt. It stops you from planning as if failure left no trace.",
      ],
      [
        q("Application", "Every founder Sam meets seems to have succeeded. Which question fits this chapter?", [
          "How can I copy the visible winners faster?",
          "What happened to the attempts that are no longer in the room?",
          "Which success story is the most exciting?",
          "How do I ignore the failures so the plan stays clean?",
        ], 1),
        q("Comprehension", "Why does the visible sample smile?", [
          "Because abandoned cases are quieter and drop out of view.",
          "Because failure never happens.",
          "Because winners exaggerate less than everyone else.",
          "Because the full set is always on display.",
        ], 0),
        q("Synthesis", "What should the missing cases change?", [
          "They should stop the attempt automatically.",
          "They should keep the plan from pretending failure left no trace.",
          "They should replace every specific detail.",
          "They should be ignored once a winner is found.",
        ], 1),
      ],
    ),
    chapter(
      "thinking-6",
      "Pause when the stake is high",
      [
        "Fast judgment is a gift on a familiar road and a risk when the cost of being wrong is large. The chapter’s rule is narrow: if the decision is hard to undo, slow the part of the mind that wants to finish it now.",
        "A pause is not a delay for its own sake. It is time to ask what you are assuming, what you have not seen, and what the outside view would say. Then you can still decide quickly. You just do not decide at the speed of the first impulse.",
        "Small choices can stay fast. The mistake is using the same speed for a contract, a public promise, or a risk you cannot walk back. Match the pace to the stake.",
      ],
      [
        q("Application", "An offer feels exciting and expires tonight. The terms are hard to undo. Which response fits?", [
          "Decide at the speed of the excitement so the chance is not lost.",
          "Pause long enough to check the assumptions and the cost of being wrong.",
          "Treat every decision as if it were irreversible.",
          "Refuse all fast choices, including small ones.",
        ], 1),
        q("Comprehension", "When does the chapter ask you to slow down?", [
          "On every familiar task.",
          "When the decision is costly to undo.",
          "Only when you already feel certain.",
          "Whenever a choice takes more than a minute.",
        ], 1),
        q("Connection", "Which pair is most faithful?", [
          "A high stake, and the same speed as a small errand.",
          "A pause, and a decision that is no longer ruled by the first impulse.",
          "More time, and a guarantee the choice is right.",
          "A familiar road, and a rule against quick judgment.",
        ], 1),
      ],
    ),
  ],
  power: [
    chapter(
      "power-4",
      "Speak after you know",
      [
        "Early speech spends information you may still need. A person who announces every intention teaches the room how to prepare for them, resist them, or take the idea as their own. Silence, used briefly, keeps the move unfinished in public.",
        "This is not a costume of mystery. It is timing. Say enough to do the work. Save the explanation until the action can stand without a preview. A plan narrated too early becomes a negotiation you did not mean to open.",
        "The limit matters. Silence that hides the work forever is just absence. The chapter wants a delay, not a disappearance. Speak when the words can no longer cheapen the move.",
      ],
      [
        q("Application", "A strategist explains a plan in detail before they have started it. Which risk does the chapter see?", [
          "The room may prepare, resist, or claim the idea.",
          "The plan becomes too quiet to succeed.",
          "Silence will make the work impossible.",
          "An early explanation always builds trust.",
        ], 0),
        q("Comprehension", "What kind of silence does the chapter recommend?", [
          "Permanent absence.",
          "A delay until the words no longer cheapen the move.",
          "Refusing to do the work.",
          "Mystery as a costume.",
        ], 1),
        q("Connection", "Which pair fits?", [
          "An early full announcement, and a move that stays yours.",
          "Saying enough to work, and saving the preview.",
          "Never speaking, and a stronger result.",
          "Narrating every intention, and fewer opponents.",
        ], 1),
      ],
    ),
    chapter(
      "power-5",
      "Be useful without being trapped",
      [
        "Dependence is a tool and a trap. If people need what you do, you have weight in the room. If they cannot leave, the weight turns into resentment. The skill is to be needed and still leave them a dignified way to choose you.",
        "A person who makes others helpless may win the week and lose the longer game. Trapped people look for the exit, and they remember who built it. Usefulness that includes a choice is harder to rebel against.",
        "Keep the advantage tied to the quality of the work, not to a lock on the door. The room should need you because the work is good, not because every alternative was removed.",
      ],
      [
        q("Application", "A leader removes every alternative so the team must stay. What does the chapter predict?", [
          "Lasting loyalty.",
          "A later search for the exit, and resentment toward the person who built it.",
          "A safer kind of usefulness.",
          "No cost, because dependence is always stable.",
        ], 1),
        q("Comprehension", "When does dependence become a trap?", [
          "When people need good work and can still choose it.",
          "When people cannot leave, and the need is a lock rather than a choice.",
          "Whenever anyone relies on you.",
          "Only when the work is poor.",
        ], 1),
        q("Synthesis", "Which approach keeps the advantage without the trap?", [
          "Be needed because the work is good, and leave a dignified choice.",
          "Remove alternatives so the week is easier.",
          "Avoid being useful so nobody depends on you.",
          "Win cooperation and then tighten the lock.",
        ], 0),
      ],
    ),
    chapter(
      "power-6",
      "Price the move",
      [
        "Every advantage has a cost that arrives later if you refuse to name it now. A public slight, a borrowed loyalty, a risk taken to look decisive: each one can work today and invoice you after the room has moved on.",
        "Before the move, write the price in plain language. Who pays, when, and what you will do if the price is higher than the gain. A move you cannot price is a move you do not understand yet.",
        "History is full of wins that were too expensive to keep. The chapter is not against action. It is against action that treats the later bill as a surprise.",
      ],
      [
        q("Application", "Someone wants to humiliate a rival because it will win today’s meeting. Which step fits?", [
          "Take the win and let the later cost explain itself.",
          "Name who pays later, and compare that price with today’s gain.",
          "Assume a public slight has no invoice.",
          "Repeat the move until it feels normal.",
        ], 1),
        q("Comprehension", "What is the chapter against?", [
          "Action itself.",
          "A move whose later bill is treated as a surprise.",
          "Writing anything down.",
          "Wins that were inexpensive.",
        ], 1),
        q("Connection", "Which pair is most faithful?", [
          "An unpriced risk, and a result you fully understand.",
          "A named cost, and a move you can still decline.",
          "Today’s applause, and a bill that will not come.",
          "A decisive look, and a cheaper future.",
        ], 1),
      ],
    ),
  ],
};
