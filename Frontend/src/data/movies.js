export const movies = [
  {
    id: 1,
    title: "Клинок рассекающий демонов",
    poster: "/posters/DemonSlayer.webp",
    type: "series", // сериал — будет EpisodeList
    episodes: [
      { id: 1, title: "1 серия" },
      { id: 2, title: "2 серия" },
      { id: 3, title: "3 серия" },
      { id: 4, title: "4 серия" },
      { id: 5, title: "5 серия" },
      { id: 6, title: "6 серия" },
      { id: 7, title: "7 серия" },
      { id: 8, title: "8 серия" },
    ]
  },

  {
    id: 2,
    title: "Твоё имя",
    poster: "/posters/2.jpg",
    type: "movie", // фильм — сразу Player
    videoUrl: "/videos/movie.mp4"
  },


  {
    id: 3,
    title: "Твоё имz",
    poster: "/posters/2.jpg",
    type: "movie", // фильм — сразу Player
    videoUrl: "/videos/movie.mp4"
  }
];