function AboutEdu() {
    const eduConnect = [
      {
        title: "Gamified Learning Experience",
        description:
          "Edu Connect includes badges, points, and leaderboards to motivate users and promote active participation. This feature not only encourages quality answers but also makes learning engaging and rewarding. Progress tracking through gamification builds a sense of achievement among users."
      },
      {
        title: "Ask & Answer System",
        description:
          "Students can post subject-specific questions and receive answers from their peers. This feature fosters a collaborative learning environment where users can engage in discussions and share knowledge. A search bar and categories enhance accessibility, allowing quick navigation through relevant topics."
      },
      {
        title: "Adaptive Recommendations",
        description:
          "The platform offers personalized content suggestions based on users' activities, interests, and academic goals. Whether it's trending questions, study tips, or helpful resources, users receive tailored recommendations. This ensures that every learner gets the most relevant and valuable content."
      }
    ];
  
    // Group data into rows
    const rows = [
      [eduConnect[0]], // First row with 1 card
      [eduConnect[1], eduConnect[2]], // Second row with 2 cards
      [eduConnect[0]] // Last row with 1 card (repeated for demonstration)
    ];
  
    return (
      <div>
        <div>
          <h1 className="text-center text-3xl text-background font-bold mb-6">
            What is Edu Connect?
          </h1>
          <p className="text-center text-background">
            Edu Connect uses its Ask and Answer System together with other awesome <br /> features to give a unique learning experience.
          </p>
        </div>
  
        {/* Render rows */}
        <div className="space-y-6 m-20">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex ${row.length === 1 ? "justify-center" : "justify-between"} space-x-4`}
            >
              {row.map((item, index) => (
                <div
                  key={index}
                  className="border-solid border-2 border-primary bg-[#A1C7ED] p-4 rounded shadow-md w-80"
                >
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default AboutEdu;
  