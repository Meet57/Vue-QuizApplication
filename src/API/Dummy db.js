let submissions = [
    {
        name: "Bethanne Broseman",
        quiz: "Strange Bedfellows",
        score: 8,
    },
    {
        name: "Trudi Batterbee",
        quiz: "Hunger, The",
        score: 4,
    },
    {
        name: "Nappy Donaho",
        quiz: "Speedway",
        score: 1,
    },
    {
        name: "Valma Lotterington",
        quiz: "Strange Bedfellows",
        score: 8,
    },
    {
        name: "Karlyn Jobbins",
        quiz: "Love Walked In",
        score: 7,
    },
    {
        name: "Waldo Blundel",
        quiz: "Zeitgeist: Addendum",
        score: 10,
    },
    {
        name: "Link Hazlehurst",
        quiz: "Speedway",
        score: 8,
    },
    {
        name: "Rica Youtead",
        quiz: "Strange Bedfellows",
        score: 8,
    },
    {
        name: "Wernher McGuggy",
        quiz: "Away We Go",
        score: 6,
    },
    {
        name: "Clementia Leinthall",
        quiz: "Strange Bedfellows",
        score: 3,
    },
    {
        name: "Walden Burbage",
        quiz: "Speedway",
        score: 3,
    },
    {
        name: "Chelsea Bertholin",
        quiz: "Speedway",
        score: 2,
    },
    {
        name: "Darrin Wybern",
        quiz: "Strange Bedfellows",
        score: 10,
    },
    {
        name: "Hugibert Douthwaite",
        quiz: "Superbad",
        score: 5,
    },
    {
        name: "Sibylle Billam",
        quiz: "Crazy Love (a.k.a. Love Is a Dog from Hell)",
        score: 10,
    },
    {
        name: "Jaynell MacElroy",
        quiz: "Strange Bedfellows",
        score: 5,
    },
    {
        name: "Rosalyn Grent",
        quiz: "Crazies, The",
        score: 10,
    },
    {
        name: "Kathye Cleaton",
        quiz: "Strange Bedfellows",
        score: 6,
    },
    {
        name: "Christiana Lefeuvre",
        quiz: "Speedway",
        score: 7,
    },
    {
        name: "Renata Blunden",
        quiz: "Monsieur Hire",
        score: 1,
    },
    {
        name: "Aline Niemetz",
        quiz: "Strange Bedfellows",
        score: 8,
    },
    {
        name: "Lorrin Wareham",
        quiz: "Speedway",
        score: 10,
    },
    {
        name: "Viviyan Vedikhov",
        quiz: "Deceivers, The",
        score: 6,
    },
    {
        name: "Pia Bampfield",
        quiz: "Strange Bedfellows",
        score: 8,
    },
    {
        name: "Curr Weekes",
        quiz: "Carny",
        score: 1,
    },
    {
        name: "Sascha Skillitt",
        quiz: "Speedway",
        score: 3,
    },
    {
        name: "Leoine Peirone",
        quiz: "Slipping-Down Life, A",
        score: 7,
    },
    {
        name: "Arie Wallett",
        quiz: "Speedway",
        score: 8,
    },
    {
        name: "Annemarie Reynoldson",
        quiz: "Bigger, Stronger, Faster*",
        score: 5,
    },
    {
        name: "Jeth Leggott",
        quiz: "Speedway",
        score: 3,
    },
];

submissions.forEach((data) => {
    addDoc(collection(db, "submissions"), data).then((data) => {
        console.log("added", data.id);
    });
});
