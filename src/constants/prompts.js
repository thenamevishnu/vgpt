export const prompts = [
    "Write about a world where people can buy extra time.",
    "Describe a love story between a ghost and a time traveler.",
    "A city where dreams are taxed—what happens?",
    "The moon suddenly begins transmitting coded messages.",
    "A genie gives you 3 wishes, but there’s a hidden catch in each.",
    "A character wakes up to find gravity has stopped working.",
    "Write about someone who receives memories that aren’t theirs.",
    "Describe an alien's first impression of Earth.",
    "A letter is found in a bottle from 500 years in the future.",
    "A child's imaginary friend turns out to be real.",
    "What would you do if your thoughts were visible to others?",
    "If humanity had to leave Earth, who decides who goes?",
    "Would you choose to live forever if no one else could?",
    "Can true happiness exist without sadness?",
    "Is it better to know a painful truth or live a comforting lie?",
    "AI takes over governments to eliminate corruption—what happens?",
    "A robot falls in love with its user.",
    "Design a future where the internet is illegal.",
    "You’re the first person to download your mind into the cloud.",
    "The first AI president is elected—how does society react?",
    "A superhero whose only power is turning anything into toast.",
    "What if pets ran a podcast about their humans?",
    "Write a cooking show hosted by a vampire.",
    "A wizard who is terribly afraid of magic.",
    "Aliens land, but they're obsessed with human fast food.",
    "A dragon starts a travel blog.",
    "A cursed mirror shows you an alternate life you could’ve lived.",
    "A knight has to battle monsters using only dad jokes.",
    "Write a story about a magical bookstore that changes daily.",
    "A mermaid discovers the concept of Wi-Fi.",
    "You wake up in your house, but everything is backwards.",
    "A haunted app appears on everyone's phone overnight.",
    "A child’s drawing starts predicting future events.",
    "A voice in your head begins narrating your life... out loud.",
    "People begin to vanish one by one, and no one remembers them.",
    "Write about someone reuniting with an estranged sibling.",
    "A breakup told from the perspective of a pet.",
    "A small town with a big secret finally exposed.",
    "Describe a day where nothing goes as planned.",
    "Two strangers keep bumping into each other across the world.",
    "You receive a mysterious package with no return address.",
    "A journal is discovered containing someone’s future plans.",
    "A person finds a photo of themselves from 20 years ago—but they haven't aged.",
    "A stranger keeps calling claiming to be your future self.",
    "Each day, something in your house moves—slightly but noticeably.",
    "Bananas become the world’s main currency—how does it change society?",
    "Everyone gets a superpower at 21—yours is strangely underwhelming.",
    "A tree grows in your backyard overnight with glowing fruit.",
    "You’re stuck in a video game, and the NPCs are becoming self-aware.",
    "The sun doesn’t rise one day—and no one notices but you."
];
  
export const getThreePrompts = () => {
    let i = 3
    const arr = []
    while (i--) {
        const index = Math.floor(Math.random() * prompts.length);
        arr.push(...prompts.splice(index, 1))
    }
    return arr
}