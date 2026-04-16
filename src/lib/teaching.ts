// Worked examples shown when a child is struggling (below 40% accuracy)
// Each topic has a simple explanation + worked example per level

export interface TeachingExample {
    explanation: string;
    workedExample: string;
    tip: string;
  }
  
  // Returns a teaching example for the given subject, topic, and level
  // Falls back to a generic encouragement if no specific example exists
  export function getTeachingExample(subject: string, topic: string, level: number): TeachingExample {
    const key = `${subject}::${topic}`;
    const examples = TEACHING_EXAMPLES[key];
    if (examples) {
      const lvl = Math.min(level, examples.length) - 1;
      return examples[Math.max(0, lvl)];
    }
    return {
      explanation: `Let's review ${topic} together!`,
      workedExample: `Take your time and think step by step.`,
      tip: "It's okay to find things tricky — that's how we learn!",
    };
  }
  
  const TEACHING_EXAMPLES: Record<string, TeachingExample[]> = {
    "maths::Addition": [
      { explanation: "Adding means putting numbers together to get a bigger number.", workedExample: "2 + 3: Hold up 2 fingers, then 3 more. Count them all: 1, 2, 3, 4, 5. So 2 + 3 = 5!", tip: "Try using your fingers to count!" },
      { explanation: "When adding bigger numbers, start with the larger number and count up.", workedExample: "8 + 5: Start at 8, count up 5 more: 9, 10, 11, 12, 13. So 8 + 5 = 13!", tip: "Always start from the bigger number — it's quicker." },
      { explanation: "For 2-digit numbers, add the tens first, then the ones.", workedExample: "34 + 28: Add tens: 30+20=50. Add ones: 4+8=12. Then 50+12=62.", tip: "Split the numbers up — it makes them easier!" },
      { explanation: "Column addition: line up the numbers and add each column right to left.", workedExample: "  347\n+ 285\n-----\nOnes: 7+5=12, write 2 carry 1. Tens: 4+8+1=13, write 3 carry 1. Hundreds: 3+2+1=6. Answer: 632", tip: "Don't forget to carry!" },
      { explanation: "With big numbers, the same rules apply — just more columns.", workedExample: "2,459 + 3,782: Work right to left. 9+2=11 (carry 1). 5+8+1=14 (carry 1). 4+7+1=12 (carry 1). 2+3+1=6. Answer: 6,241", tip: "Take it one column at a time." },
      { explanation: "Multi-step problems need you to pick out the numbers and add them up.", workedExample: "Shop: £3,456 + £4,782 + £2,913. Add first two: 3,456+4,782=8,238. Then add third: 8,238+2,913=11,151.", tip: "Break big problems into smaller steps." },
    ],
    "maths::Subtraction": [
      { explanation: "Subtracting means taking away to get a smaller number.", workedExample: "5 - 2: Hold up 5 fingers, put 2 down. How many left? 3! So 5 - 2 = 3.", tip: "Taking away makes numbers smaller." },
      { explanation: "Count back from the bigger number.", workedExample: "15 - 8: Start at 15, count back 8: 14, 13, 12, 11, 10, 9, 8, 7. Answer: 7!", tip: "You can also count UP from 8 to 15 — that's 7 too!" },
      { explanation: "For 2-digit subtraction, sometimes you need to borrow.", workedExample: "83 - 47: Can't do 3-7, so borrow. 13-7=6 (ones). 7-4=3 (tens). Answer: 36.", tip: "Borrowing is like breaking a ten into ten ones." },
      { explanation: "Column subtraction works right to left, borrowing when needed.", workedExample: "500 - 237: Borrow from hundreds. 10-7=3. 9-3=6 (after borrowing). 4-2=2. Answer: 263.", tip: "Zeros are tricky — you may need to borrow across multiple columns." },
      { explanation: "With 4+ digits, same method — just more patience needed.", workedExample: "4,002 - 1,587: You'll need to borrow several times. Work carefully right to left. Answer: 2,415.", tip: "Write it out in columns and go slowly." },
      { explanation: "Real-world subtraction: find what's left or find the difference.", workedExample: "Temperature: 14°C to -8°C. The difference is 14+8=22°C (crossing zero means you add both distances).", tip: "When crossing zero, add both sides." },
    ],
    "maths::Multiplication": [
      { explanation: "Multiplying is the same as adding a number multiple times.", workedExample: "2 × 3 means 2 + 2 + 2 = 6. Or 3 groups of 2.", tip: "Think of it as groups: 3 groups of 2 sweets = 6 sweets!" },
      { explanation: "Times tables are patterns you can learn by heart.", workedExample: "5 × 4 = 20. The 5 times table always ends in 0 or 5: 5, 10, 15, 20, 25...", tip: "Practice times tables every day — they make everything easier." },
      { explanation: "For trickier tables, use tricks: 9× table digits always add to 9.", workedExample: "9 × 7: Start with 6 (one less than 7), then 63 (6+3=9). Answer: 63!", tip: "The 9× trick: the tens digit is always one less." },
      { explanation: "To multiply by a teen number, split it up.", workedExample: "12 × 8: That's (10×8) + (2×8) = 80 + 16 = 96.", tip: "Split numbers into tens and ones." },
      { explanation: "Long multiplication: multiply by each digit, then add.", workedExample: "23 × 15: 23×5=115, 23×10=230. Add: 115+230=345.", tip: "Remember to put a zero when multiplying by the tens digit." },
      { explanation: "Powers mean multiplying a number by itself.", workedExample: "27² = 27 × 27 = 729. Break it down: 27×27 = 27×20 + 27×7 = 540+189 = 729.", tip: "For squares, you can use (a+b)² = a² + 2ab + b². 27 = 25+2!" },
    ],
    "maths::Division": [
      { explanation: "Dividing means sharing equally.", workedExample: "6 ÷ 3: Share 6 sweets between 3 friends. Each gets 2!", tip: "Division is the opposite of multiplication." },
      { explanation: "Use your times tables backwards.", workedExample: "20 ÷ 4: What times 4 makes 20? 5 × 4 = 20. So 20 ÷ 4 = 5!", tip: "If you know your times tables, you know division too." },
      { explanation: "Bigger division uses the same idea.", workedExample: "56 ÷ 8: What × 8 = 56? 7 × 8 = 56. Answer: 7.", tip: "Ask yourself: what times the divider gives me this number?" },
      { explanation: "Short division (bus stop method) works digit by digit.", workedExample: "144 ÷ 12: 12 goes into 14 once (remainder 2). Bring down 4 = 24. 12 into 24 = 2. Answer: 12.", tip: "The bus stop method is your best friend for division." },
      { explanation: "Long division for bigger numbers — divide, multiply, subtract, bring down.", workedExample: "256 ÷ 16: 16 into 25 = 1 (rem 9). Bring down 6 = 96. 16 into 96 = 6. Answer: 16.", tip: "DMSB: Divide, Multiply, Subtract, Bring down. Repeat." },
      { explanation: "Division appears in real-world sharing and ratio problems.", workedExample: "£840 ÷ 24 people: 24 × 30 = 720. 840-720 = 120. 24 × 5 = 120. So 30+5 = £35 each.", tip: "Estimate first, then refine." },
    ],
    "maths::Fractions": [
      { explanation: "A fraction is a part of a whole. Half means 1 out of 2 equal pieces.", workedExample: "Cut a pizza in 2 equal slices. Each slice is ½ (one half).", tip: "The bottom number says how many equal pieces. The top says how many you have." },
      { explanation: "To find a fraction of a number, divide by the bottom number.", workedExample: "¼ of 20: Divide 20 by 4 = 5. So ¼ of 20 = 5.", tip: "Finding a fraction = dividing by the denominator." },
      { explanation: "Adding fractions with the same bottom: just add the tops.", workedExample: "½ + ¼: Make denominators same: ²⁄₄ + ¼ = ¾.", tip: "You can only add fractions when the bottoms match!" },
      { explanation: "Simplifying: divide top and bottom by the same number.", workedExample: "6/8: Both divide by 2 → 3/4. So 6/8 = ¾.", tip: "Find the biggest number that goes into both." },
      { explanation: "To multiply fractions, multiply tops together and bottoms together.", workedExample: "⅔ × ¾ = (2×3)/(3×4) = 6/12 = ½.", tip: "Multiply across, then simplify." },
      { explanation: "Fractions in equations: multiply both sides to clear the fraction.", workedExample: "⅔x = 8. Multiply both sides by 3: 2x = 24. Divide by 2: x = 12.", tip: "Get rid of fractions first — it makes life easier." },
    ],
    "maths::Percentages": [
      { explanation: "Percent means 'out of 100'. 50% means 50 out of 100 = half.", workedExample: "50% of a cake = half the cake!", tip: "50% = half, 25% = quarter, 100% = all of it." },
      { explanation: "To find 10%, divide by 10. To find 50%, divide by 2.", workedExample: "10% of 50: 50 ÷ 10 = 5. 50% of 30: 30 ÷ 2 = 15.", tip: "10% is always easy — just chop off the last digit." },
      { explanation: "For any percentage, find 10% first and multiply.", workedExample: "25% of 40: 10% = 4. 25% = 10% + 10% + 5% = 4+4+2 = 10.", tip: "Build up from 10% — it's the building block." },
      { explanation: "Percentage increase: find the %, then add it on.", workedExample: "Increase 50 by 20%: 20% of 50 = 10. New amount: 50+10 = 60.", tip: "Increase = original + the percentage amount." },
      { explanation: "Percentage change = (change ÷ original) × 100.", workedExample: "Price drops £80 to £60: Change = £20. (20÷80)×100 = 25% decrease.", tip: "Always divide by the ORIGINAL, not the new amount." },
      { explanation: "Compound interest means interest earns interest.", workedExample: "£1000 at 5% for 2 years: Year 1: 1000×1.05=£1050. Year 2: 1050×1.05=£1102.50.", tip: "Multiply by (1 + rate/100) for each year." },
    ],
    "maths::Geometry": [
      { explanation: "Shapes have sides and corners (vertices).", workedExample: "Triangle = 3 sides, 3 corners. Square = 4 sides, 4 corners. Pentagon = 5.", tip: "The name tells you the number: tri=3, quad=4, penta=5, hexa=6." },
      { explanation: "3D shapes have faces, edges, and vertices.", workedExample: "A cube has 6 faces, 12 edges, 8 corners (vertices).", tip: "A face is a flat surface. An edge is where two faces meet." },
      { explanation: "Area = length × width for rectangles.", workedExample: "Rectangle 4cm × 5cm: Area = 4 × 5 = 20 cm².", tip: "Area is measured in square units (cm², m²)." },
      { explanation: "Angles in a triangle always add up to 180°.", workedExample: "If two angles are 60° and 70°, the third = 180-60-70 = 50°.", tip: "180° for triangles, 360° for quadrilaterals." },
      { explanation: "Circle area = π × r². Circumference = 2 × π × r.", workedExample: "Radius 5: Area = π×25 ≈ 78.5 cm². Circumference = 2×π×5 ≈ 31.4 cm.", tip: "π ≈ 3.14. Radius is half the diameter." },
      { explanation: "Pythagoras: a² + b² = c² (for right-angled triangles).", workedExample: "Sides 3 and 4: 9+16=25. √25=5. Hypotenuse = 5.", tip: "Only works with right-angled triangles!" },
    ],
    "english::Spelling": [
      { explanation: "Sound out the word slowly, letter by letter.", workedExample: "C-A-T: say each sound /k/ /a/ /t/ → cat!", tip: "Break words into their sounds." },
      { explanation: "Some words don't follow the rules — you need to learn them.", workedExample: "'friend' — remember: fri-END. The word 'end' is inside 'friend'.", tip: "Look for little words inside big words." },
      { explanation: "Tricky spellings often have silent letters or unusual patterns.", workedExample: "'beautiful' — break it up: beau-ti-ful. Remember: Big Elephants Are Ugly.", tip: "Make up silly sentences to remember spellings!" },
      { explanation: "Common mistakes: separate, definitely, different.", workedExample: "'separate' has 'a rat' in the middle: sep-A-RAT-e.", tip: "Memory tricks are the best way to beat tricky words." },
      { explanation: "Double letters catch people out. Learn the patterns.", workedExample: "'necessary' — one Collar, two Socks: one C, two S's.", tip: "Say the word in a silly way to remember the doubles." },
      { explanation: "GCSE-level words: practise them in sentences, not isolation.", workedExample: "'accommodate' has double C and double M: ac-COM-mo-date.", tip: "Write the word 5 times in different sentences." },
    ],
    "english::Grammar": [
      { explanation: "A noun is a naming word (person, place, thing).", workedExample: "In 'The cat sat on the mat' — cat and mat are nouns.", tip: "If you can put 'the' in front of it, it's probably a noun." },
      { explanation: "Proper nouns start with capital letters — names of specific things.", workedExample: "London, Sam, Tuesday — all start with capitals because they're names.", tip: "Your name is a proper noun!" },
      { explanation: "Adjectives describe nouns. They tell you what something is like.", workedExample: "'The BIG, RED balloon' — big and red describe the balloon.", tip: "Ask: what kind? how many? which one?" },
      { explanation: "Adverbs describe verbs — they tell you HOW something is done.", workedExample: "'She ran QUICKLY' — quickly tells us how she ran.", tip: "Many adverbs end in -ly." },
      { explanation: "Their/there/they're: three different words!", workedExample: "Their = belongs to them. There = a place. They're = they are.", tip: "They're = they ARE. Test it: 'they are going home' → 'they're going home'." },
      { explanation: "Active voice: subject does the action. Passive: subject receives it.", workedExample: "Active: 'Sam ate the cake.' Passive: 'The cake was eaten by Sam.'", tip: "Passive often has 'was/were' + past participle." },
    ],
    "science::Forces": [
      { explanation: "A force is a push or pull that can change how things move.", workedExample: "Gravity pulls a ball down when you drop it. That's a force!", tip: "Forces are invisible but you can see what they do." },
      { explanation: "Friction is a force that slows things down when surfaces rub.", workedExample: "Sliding on ice is easy (low friction). Sliding on carpet is hard (high friction).", tip: "Smooth surfaces = less friction. Rough = more." },
      { explanation: "Force is measured in Newtons (N), named after Isaac Newton.", workedExample: "A bag of sugar weighs about 10N on Earth.", tip: "Weight is a force — it's gravity pulling you down." },
      { explanation: "Newton's first law: objects keep doing what they're doing unless a force acts.", workedExample: "A ball rolls forever on a perfect surface. It only stops because friction (a force) slows it.", tip: "No force = no change in motion." },
      { explanation: "Terminal velocity: when air resistance equals gravity, you stop accelerating.", workedExample: "A skydiver speeds up, but air resistance grows. When they balance, speed stays constant.", tip: "That's why parachutes work — they increase air resistance." },
      { explanation: "Pressure = Force ÷ Area. More area = less pressure.", workedExample: "50N on 10cm² = 5 N/cm². Same 50N on 2cm² = 25 N/cm². Smaller area = more pressure!", tip: "That's why stiletto heels sink into grass but flat shoes don't." },
    ],
  };