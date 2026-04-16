// Question bank with adaptive difficulty
// - OLD_QUESTIONS: original 1-per-level format (for not-yet-expanded subjects)
// - EXPANDED: new format with multiple questions per level band [level1Qs, level2Qs, ..., level6Qs]
// - generateQuestion picks from EXPANDED when available, falls back to OLD_QUESTIONS

export type Question = { q: string; options: string[]; answer: string };

import { EXPANDED_MATHS } from "./questions_maths";
import { EXPANDED_ENGLISH } from "./questions_english";

// Expanded subjects: each topic has 6 levels, each with 3-4 questions
export const EXPANDED: Record<string, Record<string, Question[][]>> = {
  maths: EXPANDED_MATHS,
  english: EXPANDED_ENGLISH,
};

// Original compact format (1 question per level) for subjects not yet expanded
export const OLD_QUESTIONS: Record<string, Record<string, Question[]>> = {
  science: {
    "Living Things": [
      { q: "What do plants need to grow?", options: ["Just water", "Water, light, air", "Only soil", "Nothing"], answer: "Water, light, air" },
      { q: "What is a 'habitat'?", options: ["A hat", "Where an animal lives", "Animal food", "A cage"], answer: "Where an animal lives" },
      { q: "What are the 5 kingdoms of life?", options: ["Animals only", "Animals, Plants, Fungi, Protists, Monera", "Land, Sea, Air", "Big and Small"], answer: "Animals, Plants, Fungi, Protists, Monera" },
      { q: "What is 'photosynthesis'?", options: ["Taking photos", "Plants making food from light", "Breathing", "Sleeping"], answer: "Plants making food from light" },
      { q: "What is 'natural selection'?", options: ["Choosing pets", "Survival of the fittest", "A TV show", "Growing food"], answer: "Survival of the fittest" },
      { q: "DNA stands for...", options: ["Do Not Ask", "Deoxyribonucleic Acid", "Daily Nature Activity", "Direct Nerve Action"], answer: "Deoxyribonucleic Acid" },
    ],
    "Materials": [
      { q: "Is wood natural or man-made?", options: ["Natural", "Man-made", "Both", "Neither"], answer: "Natural" },
      { q: "What happens to water when it freezes?", options: ["Shrinks", "Expands", "Stays same", "Disappears"], answer: "Expands" },
      { q: "What are the 3 states of matter?", options: ["Hot, cold, warm", "Solid, liquid, gas", "Big, medium, small", "Hard, soft, squishy"], answer: "Solid, liquid, gas" },
      { q: "What is an 'alloy'?", options: ["A type of food", "A mixture of metals", "A tool", "A chemical"], answer: "A mixture of metals" },
      { q: "What is a 'polymer'?", options: ["A type of rock", "Long chain molecule", "A metal", "A gas"], answer: "Long chain molecule" },
      { q: "What are 'nanoparticles'?", options: ["Tiny 1-100nm particles", "Large rocks", "Planets", "Atoms only"], answer: "Tiny 1-100nm particles" },
    ],
    "Forces": [
      { q: "What force pulls things down?", options: ["Magnetism", "Gravity", "Friction", "Wind"], answer: "Gravity" },
      { q: "What is friction?", options: ["A push", "A force that slows things down", "Gravity", "Speed"], answer: "A force that slows things down" },
      { q: "What unit measures force?", options: ["Metres", "Newtons", "Kilograms", "Watts"], answer: "Newtons" },
      { q: "Newton's 1st law says...", options: ["F=ma", "Objects stay still or move unless forced", "Every action has reaction", "Gravity exists"], answer: "Objects stay still or move unless forced" },
      { q: "What is 'terminal velocity'?", options: ["Top speed in a car", "Max falling speed", "Zero speed", "Speed of sound"], answer: "Max falling speed" },
      { q: "Pressure = Force ÷ ?", options: ["Mass", "Area", "Time", "Speed"], answer: "Area" },
    ],
    "Light & Sound": [
      { q: "What colours make up white light?", options: ["Red and blue", "Rainbow colours", "Black and white", "Just yellow"], answer: "Rainbow colours" },
      { q: "Sound travels fastest through...", options: ["Air", "Water", "Solids", "Space"], answer: "Solids" },
      { q: "What is 'reflection'?", options: ["Light bouncing off", "Light going through", "Light bending", "Light stopping"], answer: "Light bouncing off" },
      { q: "What is 'refraction'?", options: ["Light bouncing", "Light bending", "Light stopping", "Light disappearing"], answer: "Light bending" },
      { q: "The speed of light is about...", options: ["300 km/s", "300,000 km/s", "3,000 km/s", "30 km/s"], answer: "300,000 km/s" },
      { q: "What is 'frequency' of a wave?", options: ["Its colour", "Waves per second", "Its height", "Its speed"], answer: "Waves per second" },
    ],
    "Electricity": [
      { q: "What is a circuit?", options: ["A shape", "A loop for electricity", "A type of wire", "A battery"], answer: "A loop for electricity" },
      { q: "What does a switch do?", options: ["Makes light", "Breaks/completes circuit", "Stores energy", "Nothing"], answer: "Breaks/completes circuit" },
      { q: "What unit measures current?", options: ["Volts", "Amps", "Watts", "Ohms"], answer: "Amps" },
      { q: "V = I × R is called...", options: ["Newton's law", "Ohm's law", "Einstein's law", "Faraday's law"], answer: "Ohm's law" },
      { q: "In series circuits, current is...", options: ["Different everywhere", "Same everywhere", "Zero", "Infinite"], answer: "Same everywhere" },
      { q: "What is 'resistance' measured in?", options: ["Amps", "Volts", "Ohms", "Watts"], answer: "Ohms" },
    ],
    "Earth & Space": [
      { q: "How many planets in our solar system?", options: ["7", "8", "9", "10"], answer: "8" },
      { q: "What causes day and night?", options: ["Moon", "Earth spinning", "Sun moving", "Stars"], answer: "Earth spinning" },
      { q: "What causes the seasons?", options: ["Distance from sun", "Earth's tilted axis", "The moon", "Wind"], answer: "Earth's tilted axis" },
      { q: "What is a 'light year'?", options: ["A year of light", "Distance light travels in a year", "365 days", "A type of star"], answer: "Distance light travels in a year" },
      { q: "What is the Big Bang theory?", options: ["A TV show only", "How the universe began", "How Earth formed", "A type of star"], answer: "How the universe began" },
      { q: "What are tectonic plates?", options: ["Dinner plates", "Sections of Earth's crust", "Types of rock", "Ocean floors only"], answer: "Sections of Earth's crust" },
    ],
    "Human Body": [
      { q: "How many bones in the human body?", options: ["106", "156", "206", "256"], answer: "206" },
      { q: "What organ pumps blood?", options: ["Brain", "Lungs", "Heart", "Liver"], answer: "Heart" },
      { q: "What system fights disease?", options: ["Skeletal", "Immune", "Digestive", "Nervous"], answer: "Immune" },
      { q: "Where is food digested?", options: ["Heart", "Lungs", "Stomach & intestines", "Brain"], answer: "Stomach & intestines" },
      { q: "What do red blood cells carry?", options: ["Water", "Food", "Oxygen", "Germs"], answer: "Oxygen" },
      { q: "What is 'homeostasis'?", options: ["A disease", "Keeping internal conditions stable", "A body part", "Exercise"], answer: "Keeping internal conditions stable" },
    ],
    "Plants": [
      { q: "What part of a plant makes food?", options: ["Roots", "Stem", "Leaves", "Flowers"], answer: "Leaves" },
      { q: "What do roots do?", options: ["Make food", "Absorb water", "Make seeds", "Attract bees"], answer: "Absorb water" },
      { q: "What is 'pollination'?", options: ["Watering plants", "Pollen transfer for reproduction", "Cutting plants", "Planting seeds"], answer: "Pollen transfer for reproduction" },
      { q: "What gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: "Carbon dioxide" },
      { q: "What is 'transpiration'?", options: ["Plant breathing", "Water loss from leaves", "Root growth", "Seed spreading"], answer: "Water loss from leaves" },
      { q: "Xylem carries...", options: ["Food down", "Water up", "Oxygen out", "Pollen"], answer: "Water up" },
    ],
    "Chemical Reactions": [
      { q: "What is rusting?", options: ["Painting", "Iron reacting with oxygen & water", "Melting", "Freezing"], answer: "Iron reacting with oxygen & water" },
      { q: "Baking a cake is a...", options: ["Physical change", "Chemical change", "No change", "Magic"], answer: "Chemical change" },
      { q: "What is the pH of pure water?", options: ["0", "7", "14", "1"], answer: "7" },
      { q: "Acids have a pH of...", options: ["Above 7", "Below 7", "Exactly 7", "Above 14"], answer: "Below 7" },
      { q: "What is an 'exothermic' reaction?", options: ["Takes in heat", "Gives out heat", "No temperature change", "Very slow"], answer: "Gives out heat" },
      { q: "What is conservation of mass?", options: ["Mass is lost", "Mass is gained", "Mass stays the same", "Mass doubles"], answer: "Mass stays the same" },
    ],
    "Energy": [
      { q: "What type of energy does food give us?", options: ["Light", "Chemical", "Sound", "Electrical"], answer: "Chemical" },
      { q: "What is renewable energy?", options: ["Coal power", "Energy that won't run out", "Nuclear only", "Gas power"], answer: "Energy that won't run out" },
      { q: "What unit measures energy?", options: ["Newtons", "Joules", "Watts", "Amps"], answer: "Joules" },
      { q: "What is 'kinetic energy'?", options: ["Stored energy", "Energy of movement", "Heat energy", "Light energy"], answer: "Energy of movement" },
      { q: "Energy cannot be created or...", options: ["Moved", "Destroyed", "Changed", "Seen"], answer: "Destroyed" },
      { q: "Power = Energy ÷ ?", options: ["Mass", "Distance", "Time", "Force"], answer: "Time" },
    ],
  },
  history: {
    "Ancient Egypt": [
      { q: "What river was Ancient Egypt near?", options: ["Thames", "Nile", "Amazon", "Seine"], answer: "Nile" },
      { q: "What are pyramids?", options: ["Houses", "Tombs for pharaohs", "Schools", "Markets"], answer: "Tombs for pharaohs" },
      { q: "What is a 'pharaoh'?", options: ["A priest", "An Egyptian ruler", "A soldier", "A farmer"], answer: "An Egyptian ruler" },
      { q: "What writing did Egyptians use?", options: ["English", "Latin", "Hieroglyphics", "Chinese"], answer: "Hieroglyphics" },
      { q: "Who was Tutankhamun?", options: ["A god", "A young pharaoh", "A queen", "A builder"], answer: "A young pharaoh" },
      { q: "What was 'mummification'?", options: ["A dance", "Preserving dead bodies", "A festival", "A punishment"], answer: "Preserving dead bodies" },
    ],
    "Romans": [
      { q: "What did Romans build for water?", options: ["Wells", "Aqueducts", "Pools", "Rivers"], answer: "Aqueducts" },
      { q: "When did Romans invade Britain?", options: ["43 AD", "143 AD", "243 AD", "343 AD"], answer: "43 AD" },
      { q: "What was a Roman 'gladiator'?", options: ["A teacher", "A fighter", "A cook", "A builder"], answer: "A fighter" },
      { q: "Who founded Rome in legend?", options: ["Caesar", "Romulus and Remus", "Neptune", "Spartacus"], answer: "Romulus and Remus" },
      { q: "What was the Roman Senate?", options: ["A temple", "A governing council", "An army", "A market"], answer: "A governing council" },
      { q: "Why did the Roman Empire fall?", options: ["One reason", "Multiple factors", "A single battle", "Flooding"], answer: "Multiple factors" },
    ],
    "Vikings": [
      { q: "Where did Vikings come from?", options: ["Africa", "Scandinavia", "Asia", "America"], answer: "Scandinavia" },
      { q: "What were Viking ships called?", options: ["Galleons", "Longships", "Canoes", "Frigates"], answer: "Longships" },
      { q: "Vikings were known as...", options: ["Farmers only", "Explorers and raiders", "Just fishermen", "Builders"], answer: "Explorers and raiders" },
      { q: "What was the 'Danelaw'?", options: ["A Viking law book", "Viking-controlled England area", "A ship type", "A weapon"], answer: "Viking-controlled England area" },
      { q: "Who was a famous Viking explorer?", options: ["Columbus", "Leif Erikson", "Drake", "Cook"], answer: "Leif Erikson" },
      { q: "What religion did Vikings follow?", options: ["Christianity", "Norse mythology", "Buddhism", "Islam"], answer: "Norse mythology" },
    ],
    "Tudors": [
      { q: "Who was the first Tudor king?", options: ["Henry VIII", "Henry VII", "Edward VI", "Henry V"], answer: "Henry VII" },
      { q: "How many wives did Henry VIII have?", options: ["4", "5", "6", "7"], answer: "6" },
      { q: "Who was Elizabeth I's mother?", options: ["Catherine", "Jane", "Anne Boleyn", "Mary"], answer: "Anne Boleyn" },
      { q: "What did Henry VIII create?", options: ["Parliament", "Church of England", "The Navy", "Schools"], answer: "Church of England" },
      { q: "The Spanish Armada was defeated in...", options: ["1488", "1588", "1688", "1788"], answer: "1588" },
      { q: "What was the 'Elizabethan era' known for?", options: ["War only", "Culture, exploration, theatre", "Poverty", "Isolation"], answer: "Culture, exploration, theatre" },
    ],
    "Victorians": [
      { q: "When was the Victorian era?", options: ["1737-1801", "1837-1901", "1937-2001", "1637-1701"], answer: "1837-1901" },
      { q: "What was the Industrial Revolution?", options: ["A war", "Move to factory-based production", "A festival", "A famine"], answer: "Move to factory-based production" },
      { q: "Did children work in Victorian times?", options: ["Never", "Yes, even in mines", "Only at home", "Only at school"], answer: "Yes, even in mines" },
      { q: "What did Victorian railways allow?", options: ["Nothing new", "Mass travel and trade", "Flight", "Space travel"], answer: "Mass travel and trade" },
      { q: "Who was the Victorian monarch?", options: ["Elizabeth I", "Queen Victoria", "George III", "Edward VII"], answer: "Queen Victoria" },
      { q: "What was the 'British Empire'?", options: ["Just Britain", "Britain's global territories", "A small island", "A company"], answer: "Britain's global territories" },
    ],
    "World War I": [
      { q: "When did WWI start?", options: ["1904", "1914", "1924", "1934"], answer: "1914" },
      { q: "What were 'trenches'?", options: ["Ships", "Dug-out defensive positions", "Planes", "Tanks"], answer: "Dug-out defensive positions" },
      { q: "What event triggered WWI?", options: ["A flood", "Assassination of Archduke Franz Ferdinand", "An earthquake", "A famine"], answer: "Assassination of Archduke Franz Ferdinand" },
      { q: "When did WWI end?", options: ["1916", "1917", "1918", "1919"], answer: "1918" },
      { q: "What was 'no man's land'?", options: ["A country", "Land between enemy trenches", "A desert", "A city"], answer: "Land between enemy trenches" },
      { q: "What treaty ended WWI?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of London", "Treaty of Berlin"], answer: "Treaty of Versailles" },
    ],
    "World War II": [
      { q: "When did WWII start?", options: ["1935", "1937", "1939", "1941"], answer: "1939" },
      { q: "What was the 'Blitz'?", options: ["A game", "German bombing of British cities", "A dance", "A food"], answer: "German bombing of British cities" },
      { q: "What was 'evacuation'?", options: ["A holiday", "Moving children to safety", "A battle", "A celebration"], answer: "Moving children to safety" },
      { q: "When was D-Day?", options: ["6 June 1944", "6 June 1943", "6 June 1945", "6 June 1942"], answer: "6 June 1944" },
      { q: "What was the Holocaust?", options: ["A battle", "Genocide of Jews and others by Nazis", "A treaty", "A country"], answer: "Genocide of Jews and others by Nazis" },
      { q: "When did WWII end?", options: ["1943", "1944", "1945", "1946"], answer: "1945" },
    ],
    "Medieval Britain": [
      { q: "Who won the Battle of Hastings?", options: ["Harold", "William the Conqueror", "Alfred", "Richard"], answer: "William the Conqueror" },
      { q: "What was a 'castle' for?", options: ["Fun", "Defence and control", "Farming", "Trading"], answer: "Defence and control" },
      { q: "What was the 'feudal system'?", options: ["Banking", "Social hierarchy of land and service", "A sport", "A religion"], answer: "Social hierarchy of land and service" },
      { q: "What was the 'Black Death'?", options: ["A battle", "A plague/pandemic", "A king", "A castle"], answer: "A plague/pandemic" },
      { q: "What was the Magna Carta?", options: ["A ship", "A charter of rights (1215)", "A weapon", "A castle"], answer: "A charter of rights (1215)" },
      { q: "What were the Crusades?", options: ["Farming trips", "Religious wars for the Holy Land", "Trade routes", "Festivals"], answer: "Religious wars for the Holy Land" },
    ],
    "Ancient Greece": [
      { q: "What was Greek democracy?", options: ["Rule by one", "Rule by the people", "Rule by gods", "No government"], answer: "Rule by the people" },
      { q: "Where were the first Olympics?", options: ["Athens", "Olympia", "Sparta", "Rome"], answer: "Olympia" },
      { q: "Who was the Greek god of the sea?", options: ["Zeus", "Poseidon", "Hades", "Apollo"], answer: "Poseidon" },
      { q: "What was the 'Parthenon'?", options: ["A ship", "A temple in Athens", "A weapon", "A city"], answer: "A temple in Athens" },
      { q: "What were Greek 'city-states'?", options: ["Countries", "Independent cities with own governments", "Villages", "Markets"], answer: "Independent cities with own governments" },
      { q: "Who wrote 'The Odyssey'?", options: ["Plato", "Homer", "Aristotle", "Socrates"], answer: "Homer" },
    ],
    "Industrial Revolution": [
      { q: "When did the Industrial Revolution start?", options: ["About 1660", "About 1760", "About 1860", "About 1960"], answer: "About 1760" },
      { q: "What powered early factories?", options: ["Electricity", "Steam", "Wind only", "Solar"], answer: "Steam" },
      { q: "Where did it begin?", options: ["France", "Germany", "Britain", "USA"], answer: "Britain" },
      { q: "What was a 'workhouse'?", options: ["A mansion", "A place for poor people to work", "A factory", "A school"], answer: "A place for poor people to work" },
      { q: "Who invented the spinning jenny?", options: ["Watt", "Hargreaves", "Stephenson", "Brunel"], answer: "Hargreaves" },
      { q: "What impact did railways have?", options: ["None", "Transformed trade, travel & society", "Only for rich", "Just for coal"], answer: "Transformed trade, travel & society" },
    ],
  },
  geography: {
    "Continents": [
      { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
      { q: "Which is the largest continent?", options: ["Africa", "Asia", "Europe", "Americas"], answer: "Asia" },
      { q: "Which continent is the UK in?", options: ["Asia", "Africa", "Europe", "Americas"], answer: "Europe" },
      { q: "Which is the smallest continent?", options: ["Europe", "Antarctica", "Australia/Oceania", "South America"], answer: "Australia/Oceania" },
      { q: "What is the equator?", options: ["A country", "Imaginary line around Earth's middle", "A river", "A mountain"], answer: "Imaginary line around Earth's middle" },
      { q: "Name all 7 continents", options: ["Only 6 exist", "Asia, Africa, N/S America, Antarctica, Europe, Oceania", "There are 8", "There are 5"], answer: "Asia, Africa, N/S America, Antarctica, Europe, Oceania" },
    ],
    "Rivers": [
      { q: "What is the longest river in the UK?", options: ["Thames", "Severn", "Trent", "Mersey"], answer: "Severn" },
      { q: "Where does a river start?", options: ["The mouth", "The source", "The bank", "The bed"], answer: "The source" },
      { q: "What is a river's 'mouth'?", options: ["Where it starts", "Where it meets the sea", "A waterfall", "A bend"], answer: "Where it meets the sea" },
      { q: "What is 'erosion'?", options: ["Building up", "Wearing away land", "Flooding", "Freezing"], answer: "Wearing away land" },
      { q: "What is a 'meander'?", options: ["A straight river", "A river bend/curve", "A waterfall", "A lake"], answer: "A river bend/curve" },
      { q: "What is a 'flood plain'?", options: ["A mountain", "Flat area beside river that floods", "A desert", "An island"], answer: "Flat area beside river that floods" },
    ],
    "Mountains": [
      { q: "What is the tallest mountain?", options: ["K2", "Everest", "Kilimanjaro", "Snowdon"], answer: "Everest" },
      { q: "What is the tallest UK mountain?", options: ["Snowdon", "Ben Nevis", "Scafell Pike", "Helvellyn"], answer: "Ben Nevis" },
      { q: "How are mountains formed?", options: ["By rivers", "By tectonic plates", "By wind", "By rain"], answer: "By tectonic plates" },
      { q: "What is a 'volcano'?", options: ["A mountain with snow", "An opening where magma escapes", "A tall hill", "A cliff"], answer: "An opening where magma escapes" },
      { q: "What is the 'tree line'?", options: ["A queue of trees", "Altitude above which trees can't grow", "A forest edge", "A river"], answer: "Altitude above which trees can't grow" },
      { q: "What is 'glaciation'?", options: ["Ice shaping the landscape", "Flooding", "Erosion by wind", "Volcanic activity"], answer: "Ice shaping the landscape" },
    ],
    "Weather": [
      { q: "What makes rain?", options: ["Wind", "Clouds releasing water", "Sun", "Stars"], answer: "Clouds releasing water" },
      { q: "What instrument measures temperature?", options: ["Barometer", "Thermometer", "Anemometer", "Rain gauge"], answer: "Thermometer" },
      { q: "What is the 'water cycle'?", options: ["A bike in water", "Water moving between earth and atmosphere", "A river", "A puddle"], answer: "Water moving between earth and atmosphere" },
      { q: "What causes wind?", options: ["Trees", "Differences in air pressure", "The moon", "Rivers"], answer: "Differences in air pressure" },
      { q: "What is a 'depression' in weather?", options: ["Sadness", "An area of low pressure", "A mountain", "A flood"], answer: "An area of low pressure" },
      { q: "What is the Coriolis effect?", options: ["A disease", "Earth's rotation deflecting winds", "A type of cloud", "Ocean current"], answer: "Earth's rotation deflecting winds" },
    ],
    "Maps": [
      { q: "What is a 'key' on a map?", options: ["A lock opener", "Explains map symbols", "North arrow", "The title"], answer: "Explains map symbols" },
      { q: "What does a compass show?", options: ["Time", "Direction", "Temperature", "Height"], answer: "Direction" },
      { q: "What do contour lines show?", options: ["Rivers", "Roads", "Height of land", "Borders"], answer: "Height of land" },
      { q: "What is 'grid reference' used for?", options: ["Measuring distance", "Finding exact locations", "Showing height", "Predicting weather"], answer: "Finding exact locations" },
      { q: "What is a '6-figure grid reference'?", options: ["A phone number", "Precise location on OS map", "A postcode", "A road number"], answer: "Precise location on OS map" },
      { q: "What is 'GIS'?", options: ["A map type", "Geographic Information System", "A country", "A compass"], answer: "Geographic Information System" },
    ],
    "Volcanoes": [
      { q: "What comes out of a volcano?", options: ["Water", "Lava/magma", "Sand", "Ice"], answer: "Lava/magma" },
      { q: "Are all volcanoes dangerous?", options: ["Yes always", "No, some are dormant/extinct", "They don't exist", "Only in winter"], answer: "No, some are dormant/extinct" },
      { q: "What is the 'Ring of Fire'?", options: ["A song", "Area of volcanic activity around Pacific", "A circus act", "A planet"], answer: "Area of volcanic activity around Pacific" },
      { q: "What causes volcanic eruptions?", options: ["Wind", "Pressure from magma below", "Rain", "Earthquakes only"], answer: "Pressure from magma below" },
      { q: "What is a 'pyroclastic flow'?", options: ["A river", "Fast-moving hot gas and rock", "A lava type", "A tsunami"], answer: "Fast-moving hot gas and rock" },
      { q: "What are primary effects of eruptions?", options: ["Only ash", "Lava flows, ash, gases", "Just noise", "Earthquakes only"], answer: "Lava flows, ash, gases" },
    ],
    "Ecosystems": [
      { q: "What is an 'ecosystem'?", options: ["Just animals", "Community of living things & environment", "A forest only", "A zoo"], answer: "Community of living things & environment" },
      { q: "What is a 'food chain'?", options: ["A restaurant", "Who eats whom in nature", "A recipe", "A farm"], answer: "Who eats whom in nature" },
      { q: "What is a 'producer' in a food chain?", options: ["A factory", "A plant that makes food", "A predator", "A human"], answer: "A plant that makes food" },
      { q: "What is 'biodiversity'?", options: ["One species", "Variety of life in an area", "A zoo", "A type of plant"], answer: "Variety of life in an area" },
      { q: "What is 'deforestation'?", options: ["Planting trees", "Cutting down forests", "A type of tree", "Reforestation"], answer: "Cutting down forests" },
      { q: "What is a 'biome'?", options: ["A small pond", "A large ecosystem type", "A single tree", "A garden"], answer: "A large ecosystem type" },
    ],
    "Population": [
      { q: "About how many people live on Earth?", options: ["1 billion", "4 billion", "8 billion", "15 billion"], answer: "8 billion" },
      { q: "What is 'population density'?", options: ["How tall people are", "People per area of land", "Total population", "Birth rate"], answer: "People per area of land" },
      { q: "What is 'migration'?", options: ["Staying still", "Moving from one place to another", "A holiday", "Trading"], answer: "Moving from one place to another" },
      { q: "What is 'urbanisation'?", options: ["Moving to countryside", "Growth of towns and cities", "Farming", "Deforestation"], answer: "Growth of towns and cities" },
      { q: "What is a 'population pyramid'?", options: ["An Egyptian pyramid", "Graph showing age/gender distribution", "A tall building", "A mountain"], answer: "Graph showing age/gender distribution" },
      { q: "What is the 'demographic transition model'?", options: ["A car type", "Shows population change stages", "A map", "A census"], answer: "Shows population change stages" },
    ],
    "Resources": [
      { q: "What is a 'natural resource'?", options: ["A shop", "Something useful from nature", "A factory", "A computer"], answer: "Something useful from nature" },
      { q: "Is oil renewable or non-renewable?", options: ["Renewable", "Non-renewable", "Both", "Neither"], answer: "Non-renewable" },
      { q: "What is 'recycling'?", options: ["Throwing away", "Reusing materials", "Burning waste", "Ignoring waste"], answer: "Reusing materials" },
      { q: "What is 'sustainability'?", options: ["Using everything up", "Meeting needs without harming future", "Wasting resources", "Only farming"], answer: "Meeting needs without harming future" },
      { q: "What is 'food security'?", options: ["A locked fridge", "Access to sufficient nutritious food", "A farm", "A supermarket"], answer: "Access to sufficient nutritious food" },
      { q: "What is the 'water stress' concept?", options: ["Wet stress", "Demand exceeding available water", "Swimming", "Flooding"], answer: "Demand exceeding available water" },
    ],
    "Climate Change": [
      { q: "What is 'climate change'?", options: ["Daily weather", "Long-term change in weather patterns", "A season", "Just rain"], answer: "Long-term change in weather patterns" },
      { q: "What gas causes global warming?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"], answer: "Carbon dioxide" },
      { q: "What is the 'greenhouse effect'?", options: ["A garden", "Gases trapping heat in atmosphere", "A type of house", "Cooling"], answer: "Gases trapping heat in atmosphere" },
      { q: "What causes sea levels to rise?", options: ["Wind", "Ice melting & water expanding", "Rain only", "Tides"], answer: "Ice melting & water expanding" },
      { q: "What are 'fossil fuels'?", options: ["Dinosaur bones", "Coal, oil, gas from ancient organisms", "Rocks", "Minerals"], answer: "Coal, oil, gas from ancient organisms" },
      { q: "What is 'carbon footprint'?", options: ["A foot made of carbon", "Total greenhouse gases from activities", "A type of shoe", "A measurement"], answer: "Total greenhouse gases from activities" },
    ],
  },
  computing: {
    "Algorithms": [
      { q: "What is an algorithm?", options: ["A computer", "Step-by-step instructions", "A website", "A game"], answer: "Step-by-step instructions" },
      { q: "What is a 'sequence'?", options: ["Random steps", "Steps in order", "A loop", "A computer"], answer: "Steps in order" },
      { q: "What is a 'loop'?", options: ["A circle", "Repeating instructions", "An error", "A wire"], answer: "Repeating instructions" },
      { q: "What is 'selection' in computing?", options: ["Choosing a game", "Making decisions (if/else)", "A mouse click", "Typing"], answer: "Making decisions (if/else)" },
      { q: "What is 'decomposition'?", options: ["Rotting", "Breaking a problem into parts", "A loop type", "An algorithm"], answer: "Breaking a problem into parts" },
      { q: "What is 'abstraction'?", options: ["Art", "Removing unnecessary detail", "A data type", "An error"], answer: "Removing unnecessary detail" },
    ],
    "Coding Basics": [
      { q: "What is a 'variable'?", options: ["A fixed number", "A named storage for data", "A type of loop", "A website"], answer: "A named storage for data" },
      { q: "What is a 'bug' in code?", options: ["An insect", "A mistake/error", "A feature", "A file"], answer: "A mistake/error" },
      { q: "What does 'debug' mean?", options: ["Add bugs", "Fix errors", "Delete code", "Write code"], answer: "Fix errors" },
      { q: "What is a 'function'?", options: ["A maths sum", "A reusable block of code", "A variable", "A file type"], answer: "A reusable block of code" },
      { q: "What is an 'array'?", options: ["A single value", "An ordered list of values", "A function", "A loop"], answer: "An ordered list of values" },
      { q: "What is 'iteration'?", options: ["A mistake", "Repeating code (looping)", "A variable type", "A file"], answer: "Repeating code (looping)" },
    ],
    "Internet Safety": [
      { q: "Should you share passwords?", options: ["Yes, with friends", "Never", "Only online", "Sometimes"], answer: "Never" },
      { q: "What is 'cyberbullying'?", options: ["A game", "Being mean online", "A virus", "A website"], answer: "Being mean online" },
      { q: "What should you do if unsafe online?", options: ["Ignore it", "Tell a trusted adult", "Share it", "Delete everything"], answer: "Tell a trusted adult" },
      { q: "What is a 'phishing' email?", options: ["About fishing", "A fake email to steal information", "A newsletter", "A game invite"], answer: "A fake email to steal information" },
      { q: "What is 'two-factor authentication'?", options: ["Two passwords", "Extra verification step for login", "Two computers", "Two accounts"], answer: "Extra verification step for login" },
      { q: "What is a 'digital footprint'?", options: ["A footprint on a screen", "Trail of data you leave online", "A boot print", "A website"], answer: "Trail of data you leave online" },
    ],
    "Data": [
      { q: "What is 'data'?", options: ["A character", "Facts and information", "A game", "A computer"], answer: "Facts and information" },
      { q: "Which stores more: KB or MB?", options: ["KB", "MB", "Same", "Neither"], answer: "MB" },
      { q: "What is a 'database'?", options: ["A game", "Organised collection of data", "A website", "A file"], answer: "Organised collection of data" },
      { q: "What is a 'spreadsheet' used for?", options: ["Writing stories", "Organising and analysing data", "Drawing", "Playing games"], answer: "Organising and analysing data" },
      { q: "What is 'SQL'?", options: ["A game", "Language for managing databases", "A file type", "A website"], answer: "Language for managing databases" },
      { q: "What types of data exist?", options: ["Only numbers", "Integer, real, boolean, string, char", "Only text", "Only images"], answer: "Integer, real, boolean, string, char" },
    ],
    "Networks": [
      { q: "What is the 'internet'?", options: ["One computer", "A global network of computers", "A game", "A phone"], answer: "A global network of computers" },
      { q: "What does 'WiFi' let you do?", options: ["Cook food", "Connect wirelessly to internet", "Watch TV", "Make calls only"], answer: "Connect wirelessly to internet" },
      { q: "What is a 'server'?", options: ["A waiter", "A computer that provides services", "A phone", "A game"], answer: "A computer that provides services" },
      { q: "What is an 'IP address'?", options: ["A home address", "Unique computer identifier on network", "A password", "A website name"], answer: "Unique computer identifier on network" },
      { q: "What is a 'protocol'?", options: ["A rule book", "Rules for network communication", "A computer type", "A cable"], answer: "Rules for network communication" },
      { q: "What is 'TCP/IP'?", options: ["A computer brand", "Internet communication protocols", "A website", "A game"], answer: "Internet communication protocols" },
    ],
    "Binary": [
      { q: "Binary uses which digits?", options: ["0 to 9", "0 and 1", "A to Z", "1 to 10"], answer: "0 and 1" },
      { q: "What is 3 in binary?", options: ["10", "11", "100", "01"], answer: "11" },
      { q: "What is binary 101 in decimal?", options: ["3", "4", "5", "6"], answer: "5" },
      { q: "What is 8 in binary?", options: ["111", "1000", "1001", "110"], answer: "1000" },
      { q: "What is a 'byte'?", options: ["4 bits", "8 bits", "16 bits", "32 bits"], answer: "8 bits" },
      { q: "What is binary 11111111 in decimal?", options: ["128", "255", "256", "127"], answer: "255" },
    ],
    "Web Design": [
      { q: "What does HTML stand for?", options: ["How To Make Links", "HyperText Markup Language", "High Tech Modern Language", "Home Tool Making Language"], answer: "HyperText Markup Language" },
      { q: "What does CSS do?", options: ["Makes websites", "Styles/designs web pages", "Runs programs", "Stores data"], answer: "Styles/designs web pages" },
      { q: "What is a 'URL'?", options: ["A file type", "A web address", "A program", "An image"], answer: "A web address" },
      { q: "What does a web browser do?", options: ["Creates websites", "Displays web pages", "Writes code", "Stores files"], answer: "Displays web pages" },
      { q: "What is JavaScript for?", options: ["Coffee", "Making web pages interactive", "Styling pages", "Database management"], answer: "Making web pages interactive" },
      { q: "What is 'responsive design'?", options: ["Fast loading", "Works on all screen sizes", "Colourful design", "Simple design"], answer: "Works on all screen sizes" },
    ],
    "Spreadsheets": [
      { q: "What is a 'cell' in a spreadsheet?", options: ["A prison", "A box for data", "A formula", "A chart"], answer: "A box for data" },
      { q: "What does SUM do?", options: ["Subtracts", "Adds numbers together", "Multiplies", "Divides"], answer: "Adds numbers together" },
      { q: "What is a 'formula'?", options: ["A recipe", "A calculation in a cell", "A chart", "A colour"], answer: "A calculation in a cell" },
      { q: "What is a 'chart' used for?", options: ["Writing text", "Showing data visually", "Storing files", "Sending emails"], answer: "Showing data visually" },
      { q: "What does VLOOKUP do?", options: ["Looks up", "Searches for data in a table", "Creates charts", "Formats cells"], answer: "Searches for data in a table" },
      { q: "What is 'conditional formatting'?", options: ["Always the same", "Changes cell appearance based on rules", "A formula", "A chart type"], answer: "Changes cell appearance based on rules" },
    ],
    "Databases": [
      { q: "What is a 'record'?", options: ["A music disc", "A row of data in a database", "A file", "A computer"], answer: "A row of data in a database" },
      { q: "What is a 'field'?", options: ["A park", "A column/category in a database", "A record", "A table"], answer: "A column/category in a database" },
      { q: "What is 'sorting' data?", options: ["Deleting it", "Putting it in order", "Copying it", "Hiding it"], answer: "Putting it in order" },
      { q: "What is a 'query'?", options: ["A question", "A search/question to a database", "A record", "A field"], answer: "A search/question to a database" },
      { q: "What is a 'primary key'?", options: ["A door key", "Unique identifier for each record", "A password", "A field name"], answer: "Unique identifier for each record" },
      { q: "What is a 'relational database'?", options: ["A family tree", "Database with linked tables", "A single table", "A spreadsheet"], answer: "Database with linked tables" },
    ],
    "Programming": [
      { q: "What is 'Python'?", options: ["A snake only", "A programming language", "A game", "A computer"], answer: "A programming language" },
      { q: "What is 'Scratch'?", options: ["An itch", "A visual programming language", "A game", "A website"], answer: "A visual programming language" },
      { q: "What does 'print' do in code?", options: ["Prints paper", "Shows text on screen", "Saves a file", "Deletes text"], answer: "Shows text on screen" },
      { q: "What is an 'IF statement'?", options: ["A question", "Code that runs if condition is true", "A loop", "A variable"], answer: "Code that runs if condition is true" },
      { q: "What is 'pseudocode'?", options: ["Fake code", "Plain English description of algorithm", "A programming language", "An error"], answer: "Plain English description of algorithm" },
      { q: "What is 'object-oriented programming'?", options: ["Programming about objects", "Using classes and objects to structure code", "A game type", "A database method"], answer: "Using classes and objects to structure code" },
    ],
  },
  languages: {
    "French Greetings": [
      { q: "How do you say 'Hello' in French?", options: ["Hola", "Bonjour", "Ciao", "Guten Tag"], answer: "Bonjour" },
      { q: "How do you say 'Goodbye'?", options: ["Au revoir", "Merci", "Bonjour", "Oui"], answer: "Au revoir" },
      { q: "'Comment ça va?' means...", options: ["What's your name?", "How are you?", "Where are you?", "How old are you?"], answer: "How are you?" },
      { q: "'Je m'appelle' means...", options: ["I like", "My name is", "I live in", "I am"], answer: "My name is" },
      { q: "'Enchanté' means...", options: ["Pleased to meet you", "Goodbye", "Thank you", "Sorry"], answer: "Pleased to meet you" },
      { q: "'Parlez-vous anglais?' means...", options: ["Do you speak French?", "Do you speak English?", "Where are you from?", "How old are you?"], answer: "Do you speak English?" },
    ],
    "French Numbers": [
      { q: "What is 'trois' in English?", options: ["Two", "Three", "Four", "Five"], answer: "Three" },
      { q: "What is 'dix' in English?", options: ["Six", "Eight", "Ten", "Twelve"], answer: "Ten" },
      { q: "How do you say '20' in French?", options: ["Douze", "Quinze", "Vingt", "Trente"], answer: "Vingt" },
      { q: "What is 'cinquante' in English?", options: ["40", "50", "60", "70"], answer: "50" },
      { q: "How do you say '100' in French?", options: ["Cent", "Mille", "Dix", "Cinquante"], answer: "Cent" },
      { q: "What is 'soixante-dix'?", options: ["60", "70", "80", "90"], answer: "70" },
    ],
    "French Animals": [
      { q: "'Un chat' is...", options: ["A dog", "A cat", "A bird", "A fish"], answer: "A cat" },
      { q: "'Un chien' is...", options: ["A cat", "A dog", "A horse", "A rabbit"], answer: "A dog" },
      { q: "How do you say 'bird' in French?", options: ["Poisson", "Cheval", "Oiseau", "Lapin"], answer: "Oiseau" },
      { q: "'Un cheval' is...", options: ["A fish", "A bird", "A horse", "A snake"], answer: "A horse" },
      { q: "'Un papillon' is...", options: ["A spider", "A butterfly", "A bird", "A mouse"], answer: "A butterfly" },
      { q: "'Une tortue' is...", options: ["A turtle/tortoise", "A cat", "A dog", "A rabbit"], answer: "A turtle/tortoise" },
    ],
    "French Family": [
      { q: "'Mère' means...", options: ["Father", "Mother", "Sister", "Brother"], answer: "Mother" },
      { q: "'Père' means...", options: ["Mother", "Father", "Uncle", "Aunt"], answer: "Father" },
      { q: "'Frère' means...", options: ["Sister", "Brother", "Cousin", "Friend"], answer: "Brother" },
      { q: "'Soeur' means...", options: ["Brother", "Mother", "Sister", "Daughter"], answer: "Sister" },
      { q: "'Grand-mère' means...", options: ["Grandfather", "Grandmother", "Great aunt", "Mother"], answer: "Grandmother" },
      { q: "'Les parents' can mean...", options: ["Only parents", "Parents or relatives", "Only friends", "Teachers"], answer: "Parents or relatives" },
    ],
    "Spanish Greetings": [
      { q: "How do you say 'Hello' in Spanish?", options: ["Bonjour", "Hola", "Ciao", "Hello"], answer: "Hola" },
      { q: "'Adiós' means...", options: ["Hello", "Please", "Goodbye", "Thanks"], answer: "Goodbye" },
      { q: "'Gracias' means...", options: ["Please", "Sorry", "Hello", "Thank you"], answer: "Thank you" },
      { q: "'¿Cómo te llamas?' means...", options: ["How are you?", "What's your name?", "Where are you?", "How old are you?"], answer: "What's your name?" },
      { q: "'Buenos días' means...", options: ["Good night", "Good afternoon", "Good morning", "Goodbye"], answer: "Good morning" },
      { q: "'Mucho gusto' means...", options: ["Very good", "Nice to meet you", "A lot", "Goodbye"], answer: "Nice to meet you" },
    ],
    "Spanish Numbers": [
      { q: "What is 'uno' in English?", options: ["Two", "One", "Three", "Zero"], answer: "One" },
      { q: "What is 'cinco' in English?", options: ["Four", "Five", "Six", "Seven"], answer: "Five" },
      { q: "How do you say '10' in Spanish?", options: ["Ocho", "Nueve", "Diez", "Once"], answer: "Diez" },
      { q: "What is 'veinte' in English?", options: ["12", "15", "20", "25"], answer: "20" },
      { q: "How do you say '100' in Spanish?", options: ["Mil", "Cien", "Diez", "Cincuenta"], answer: "Cien" },
      { q: "'Treinta y tres' means...", options: ["23", "30", "33", "43"], answer: "33" },
    ],
    "Spanish Colours": [
      { q: "'Rojo' means...", options: ["Blue", "Red", "Green", "Yellow"], answer: "Red" },
      { q: "'Azul' means...", options: ["Red", "Green", "Blue", "White"], answer: "Blue" },
      { q: "How do you say 'green' in Spanish?", options: ["Rojo", "Azul", "Verde", "Amarillo"], answer: "Verde" },
      { q: "'Amarillo' means...", options: ["Red", "Blue", "Green", "Yellow"], answer: "Yellow" },
      { q: "'Blanco' means...", options: ["Black", "White", "Grey", "Brown"], answer: "White" },
      { q: "'Morado' means...", options: ["Brown", "Orange", "Purple", "Pink"], answer: "Purple" },
    ],
    "Sentence Building": [
      { q: "In French 'Je suis' means...", options: ["I have", "I am", "I want", "I go"], answer: "I am" },
      { q: "In Spanish 'Yo tengo' means...", options: ["I am", "I have", "I want", "I go"], answer: "I have" },
      { q: "'J'aime' means...", options: ["I hate", "I have", "I like/love", "I want"], answer: "I like/love" },
      { q: "Where do adjectives usually go in French?", options: ["Before noun", "After noun", "Both possible", "Never used"], answer: "After noun" },
      { q: "'Me gusta' means...", options: ["I hate it", "I like it", "I need it", "I have it"], answer: "I like it" },
      { q: "What is a 'conjugation'?", options: ["A disease", "Changing verb form for person/tense", "A type of noun", "A sentence"], answer: "Changing verb form for person/tense" },
    ],
    "Vocabulary Games": [
      { q: "'La maison' (French) means...", options: ["The car", "The house", "The school", "The dog"], answer: "The house" },
      { q: "'La escuela' (Spanish) means...", options: ["The house", "The car", "The school", "The park"], answer: "The school" },
      { q: "'Le livre' (French) means...", options: ["The book", "The table", "The pen", "The bag"], answer: "The book" },
      { q: "'El agua' (Spanish) means...", options: ["The fire", "The earth", "The water", "The air"], answer: "The water" },
      { q: "'La nourriture' (French) means...", options: ["Nature", "Food", "Night", "Furniture"], answer: "Food" },
      { q: "'El tiempo' (Spanish) can mean...", options: ["Temperature only", "Time or weather", "A timer", "Always"], answer: "Time or weather" },
    ],
    "Conversation": [
      { q: "'Où habites-tu?' means...", options: ["How old are you?", "Where do you live?", "What do you eat?", "Where do you work?"], answer: "Where do you live?" },
      { q: "'¿Cuántos años tienes?' means...", options: ["Where do you live?", "How old are you?", "What's your name?", "Do you have siblings?"], answer: "How old are you?" },
      { q: "'J'habite à Londres' means...", options: ["I love London", "I live in London", "I'm from London", "I visited London"], answer: "I live in London" },
      { q: "How do you say 'I don't understand' in French?", options: ["Je comprends", "Je ne comprends pas", "Je sais", "Je parle"], answer: "Je ne comprends pas" },
      { q: "'No entiendo' (Spanish) means...", options: ["I understand", "I don't understand", "I don't know", "I can't"], answer: "I don't understand" },
      { q: "'Il fait beau' (French) means...", options: ["It's cold", "The weather is nice", "It's raining", "It's dark"], answer: "The weather is nice" },
    ],
  },
  art: {
    "Colours": [
      { q: "What are the primary colours?", options: ["Red, green, blue", "Red, yellow, blue", "Red, orange, purple", "Pink, yellow, blue"], answer: "Red, yellow, blue" },
      { q: "Red + Blue = ?", options: ["Green", "Orange", "Purple", "Brown"], answer: "Purple" },
      { q: "What are 'warm' colours?", options: ["Blue, green, purple", "Red, orange, yellow", "Black, grey, white", "Pink, white, cream"], answer: "Red, orange, yellow" },
      { q: "What are complementary colours?", options: ["Same colours", "Opposite on colour wheel", "Next to each other", "Primary colours"], answer: "Opposite on colour wheel" },
      { q: "What is 'tint'?", options: ["Adding black", "Adding white", "Adding grey", "Adding water"], answer: "Adding white" },
      { q: "What is 'tone' in colour theory?", options: ["Adding white", "Adding black", "Adding grey", "Brightness"], answer: "Adding grey" },
    ],
    "Shapes": [
      { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
      { q: "What is a 3D circle called?", options: ["Cube", "Sphere", "Cylinder", "Cone"], answer: "Sphere" },
      { q: "What shape has 8 sides?", options: ["Hexagon", "Heptagon", "Octagon", "Pentagon"], answer: "Octagon" },
      { q: "What is 'symmetry'?", options: ["Being different", "Being the same on both sides", "Being colourful", "Being large"], answer: "Being the same on both sides" },
      { q: "What is an 'organic shape'?", options: ["A perfect circle", "A freeform natural shape", "A square", "A triangle"], answer: "A freeform natural shape" },
      { q: "What is 'perspective' in art?", options: ["Opinion", "Creating depth on a flat surface", "A type of paint", "A colour"], answer: "Creating depth on a flat surface" },
    ],
    "Famous Artists": [
      { q: "Who painted the Mona Lisa?", options: ["Picasso", "Da Vinci", "Van Gogh", "Monet"], answer: "Da Vinci" },
      { q: "Who painted Starry Night?", options: ["Monet", "Picasso", "Van Gogh", "Rembrandt"], answer: "Van Gogh" },
      { q: "What style is Picasso known for?", options: ["Realism", "Cubism", "Impressionism", "Pop Art"], answer: "Cubism" },
      { q: "Who created Campbell's Soup Cans art?", options: ["Banksy", "Warhol", "Hockney", "Hirst"], answer: "Warhol" },
      { q: "What movement was Monet part of?", options: ["Cubism", "Impressionism", "Surrealism", "Pop Art"], answer: "Impressionism" },
      { q: "What is 'Surrealism'?", options: ["Realistic art", "Dream-like, bizarre art", "Portrait art", "Landscape art"], answer: "Dream-like, bizarre art" },
    ],
    "Drawing": [
      { q: "What is 'shading' in drawing?", options: ["Colouring in", "Adding light and dark areas", "Erasing", "Tracing"], answer: "Adding light and dark areas" },
      { q: "A 'sketch' is a...", options: ["Finished painting", "Quick rough drawing", "Photograph", "Sculpture"], answer: "Quick rough drawing" },
      { q: "What is a 'still life'?", options: ["A live animal", "Drawing of arranged objects", "A landscape", "A portrait"], answer: "Drawing of arranged objects" },
      { q: "What is 'cross-hatching'?", options: ["A type of fabric", "Crossed lines for shading", "A drawing tool", "A colour technique"], answer: "Crossed lines for shading" },
      { q: "What is 'proportion' in drawing?", options: ["Colour mixing", "Correct size relationships", "Line thickness", "Paper size"], answer: "Correct size relationships" },
      { q: "What is 'chiaroscuro'?", options: ["A pasta", "Strong light-dark contrast", "A colour", "A brush type"], answer: "Strong light-dark contrast" },
    ],
    "Patterns": [
      { q: "What is a 'pattern'?", options: ["A random design", "A repeated design", "A single shape", "A colour"], answer: "A repeated design" },
      { q: "What is 'tessellation'?", options: ["A test", "Shapes fitting together with no gaps", "A colour type", "A tool"], answer: "Shapes fitting together with no gaps" },
      { q: "What is a 'motif'?", options: ["A motor", "A repeated design element", "A colour", "A texture"], answer: "A repeated design element" },
      { q: "What is 'radial' pattern?", options: ["Straight lines", "Design radiating from centre", "Random dots", "Zigzags only"], answer: "Design radiating from centre" },
      { q: "What culture is famous for geometric patterns?", options: ["Only European", "Islamic art", "Only Chinese", "None"], answer: "Islamic art" },
      { q: "What is a 'fractal' pattern?", options: ["A broken pattern", "Self-repeating at different scales", "A random pattern", "A straight line"], answer: "Self-repeating at different scales" },
    ],
    "Sculpture": [
      { q: "What is a 'sculpture'?", options: ["A painting", "3D art form", "A drawing", "A photograph"], answer: "3D art form" },
      { q: "What material is clay?", options: ["Metal", "Earth/soil-based", "Plastic", "Wood"], answer: "Earth/soil-based" },
      { q: "What is 'carving'?", options: ["Adding material", "Cutting away material", "Painting", "Drawing"], answer: "Cutting away material" },
      { q: "What is 'modelling' in sculpture?", options: ["Fashion modelling", "Building up material by hand", "Carving", "Painting"], answer: "Building up material by hand" },
      { q: "What is an 'installation'?", options: ["Putting in a toilet", "Large-scale 3D art in a space", "A painting", "A photograph"], answer: "Large-scale 3D art in a space" },
      { q: "What is 'assemblage'?", options: ["A meeting", "Sculpture from found objects", "A painting technique", "A drawing style"], answer: "Sculpture from found objects" },
    ],
    "Photography": [
      { q: "What does a camera capture?", options: ["Sound", "Light/images", "Taste", "Smell"], answer: "Light/images" },
      { q: "What is 'composition' in photography?", options: ["A song", "How elements are arranged in frame", "Camera type", "Film type"], answer: "How elements are arranged in frame" },
      { q: "What is the 'rule of thirds'?", options: ["Use 3 cameras", "Divide frame into 9 equal parts", "Take 3 photos", "Use 3 colours"], answer: "Divide frame into 9 equal parts" },
      { q: "What is 'depth of field'?", options: ["How deep a pool is", "Area of sharp focus in image", "Camera weight", "Lens size"], answer: "Area of sharp focus in image" },
      { q: "What is 'aperture'?", options: ["A door", "The opening in a lens", "A type of camera", "A filter"], answer: "The opening in a lens" },
      { q: "What is 'ISO' in photography?", options: ["A company", "Sensor's light sensitivity", "A file type", "A camera brand"], answer: "Sensor's light sensitivity" },
    ],
    "Printmaking": [
      { q: "What is 'printmaking'?", options: ["Using a printer", "Creating art by pressing/stamping", "Drawing", "Painting"], answer: "Creating art by pressing/stamping" },
      { q: "What is a 'lino print'?", options: ["A linen fabric", "Print from carved linoleum", "A digital print", "A photograph"], answer: "Print from carved linoleum" },
      { q: "What is 'mono-printing'?", options: ["One colour", "One unique print", "Monkey art", "Digital printing"], answer: "One unique print" },
      { q: "What is 'screen printing'?", options: ["TV screens", "Pushing ink through a mesh screen", "Computer art", "Photography"], answer: "Pushing ink through a mesh screen" },
      { q: "What is an 'edition' in printmaking?", options: ["A book version", "Set of identical prints", "A magazine", "One print only"], answer: "Set of identical prints" },
      { q: "What is 'etching'?", options: ["Scratching", "Using acid to create marks on metal", "Painting", "Drawing"], answer: "Using acid to create marks on metal" },
    ],
    "Textiles": [
      { q: "What are 'textiles'?", options: ["Books", "Fabrics and materials", "Paints", "Metals"], answer: "Fabrics and materials" },
      { q: "What is 'weaving'?", options: ["Swimming", "Interlacing threads", "Painting", "Drawing"], answer: "Interlacing threads" },
      { q: "What is 'tie-dye'?", options: ["A knot", "Dyeing tied fabric for patterns", "A type of paint", "A fabric type"], answer: "Dyeing tied fabric for patterns" },
      { q: "What is 'batik'?", options: ["A drum", "Wax-resist dyeing technique", "A type of cloth", "A sewing method"], answer: "Wax-resist dyeing technique" },
      { q: "What is 'embroidery'?", options: ["Printing on fabric", "Decorating fabric with needle and thread", "Weaving", "Knitting"], answer: "Decorating fabric with needle and thread" },
      { q: "What is 'appliqué'?", options: ["An app", "Attaching fabric pieces to a base", "A type of thread", "A sewing machine"], answer: "Attaching fabric pieces to a base" },
    ],
    "Art History": [
      { q: "Cave paintings are from...", options: ["100 years ago", "1,000 years ago", "Tens of thousands of years ago", "500 years ago"], answer: "Tens of thousands of years ago" },
      { q: "The Renaissance was a period of...", options: ["War", "Rebirth of art and learning", "Famine", "Sleep"], answer: "Rebirth of art and learning" },
      { q: "Where did the Renaissance begin?", options: ["England", "France", "Italy", "Spain"], answer: "Italy" },
      { q: "What is 'Pop Art'?", options: ["Music art", "Art based on popular culture", "Popping balloons", "Portrait art"], answer: "Art based on popular culture" },
      { q: "What is 'contemporary art'?", options: ["Ancient art", "Art made in our time", "Renaissance art", "Medieval art"], answer: "Art made in our time" },
      { q: "What is 'conceptual art'?", options: ["Beautiful paintings", "Art where the idea matters most", "Sculpture only", "Photography only"], answer: "Art where the idea matters most" },
    ],
  },
};

// ADAPTIVE DIFFICULTY: picks a question based on child level AND their recent performance on this topic.
// - recentAccuracy (0-1): rolling accuracy in this topic (defaults to 0.5 for first attempt)
// - attemptsOnTopic: total attempts on this topic ever (for deciding when to adapt)
// If >=3 attempts and >=75% accuracy: bump up a level. If <40%: step down.
export function generateQuestion(
  subject: string,
  topic: string,
  childLevel: number,
  recentAccuracy: number = 0.5,
  attemptsOnTopic: number = 0
): Question {
  // Try expanded bank first
  const expandedSubject = EXPANDED[subject];
  if (expandedSubject && expandedSubject[topic]) {
    const leveled = expandedSubject[topic];
    const maxLevel = leveled.length;
    let targetLevel = Math.min(childLevel, maxLevel);

    if (attemptsOnTopic >= 3) {
      if (recentAccuracy >= 0.75 && targetLevel < maxLevel) targetLevel++;
      else if (recentAccuracy < 0.4 && targetLevel > 1) targetLevel--;
    }

    const band = leveled[targetLevel - 1];
    if (band && band.length > 0) {
      return band[Math.floor(Math.random() * band.length)];
    }
  }

  // Fallback to old 1-per-level format
  const oldSubject = OLD_QUESTIONS[subject];
  if (oldSubject && oldSubject[topic]) {
    const flat = oldSubject[topic];
    const levelIndex = Math.min(childLevel - 1, flat.length - 1);
    return flat[levelIndex];
  }

  // Ultimate fallback
  return { q: `${topic}: What is 1 + 1?`, options: ["1", "2", "3", "4"], answer: "2" };
}

export const ENCOURAGEMENTS = [
  "Amazing job! 🌟", "You're a superstar! ⭐", "Brilliant work! 🎉",
  "Keep it up, champion! 🏆", "You're on fire! 🔥", "Fantastic! 🎊",
  "Way to go! 🚀", "You're crushing it! 💪", "Incredible! 🌈", "Wow, so smart! 🧠"
];

export const WRONG_ENCOURAGEMENTS = [
  "Almost! Try again next time! 💪", "Good try! You'll get it! 🌟",
  "Don't give up! You're learning! 📚", "That's okay! Every mistake helps you learn! 🧠",
  "Keep going! You're getting stronger! 💪"
];