function chartDataParser(data: any) {
  const difficultyWiseUserCountGraph = difficultyWiseUserCountFunc(
    data.difficultyWiseUserCount
  );
  const subjectWiseUserCount = subjectWiseUserCountFunc(
    data.subjectWiseUserCount
  );

  const topAssignedCoursesGraph = AssignedCoursesFunc(data.topAssignedCourses);
  const leastAssignedCoursesGraph = AssignedCoursesFunc(
    data.leastAssignedCourses
  );

  const leastUndertakenCoursesGraph = UndertakenCoursesFunc(
    data.leastUndertakenCourses
  );
  const topUndertakenCoursesGraph = UndertakenCoursesFunc(
    data.topUndertakenCourses
  );

  const leastUsersWithAvgScoreGraph = UsersWithAvgScoreFunc(
    data.leastUsersWithAvgScore
  );
  const topUsersWithAvgScoreGraph = UsersWithAvgScoreFunc(
    data.topUsersWithAvgScore
  );

  const topUsersWithCourseCompletedGraph = topUsersWithCourseCompleted(
    data.topUsersWithCourseCompleted
  );

  return {
    difficultyWiseUserCountGraph,
    subjectWiseUserCount,
    topAssignedCoursesGraph,
    leastAssignedCoursesGraph,
    leastUndertakenCoursesGraph,
    topUndertakenCoursesGraph,
    leastUsersWithAvgScoreGraph,
    topUsersWithAvgScoreGraph,
    topUsersWithCourseCompletedGraph,
  };
}

function difficultyWiseUserCountFunc(data: any) {
  var labels = [];
  var seriesData = [];
  for (var i = 0; i < data.length; i++) {
    labels.push(data[i].level);
    seriesData.push(data[i].total_users);
  }
  return { labels, seriesData };
}

function subjectWiseUserCountFunc(data: any) {
  var labels = [];
  var seriesData = [];
  for (var i = 0; i < data.length; i++) {
    labels.push(data[i].subject);
    seriesData.push(data[i].total_users);
  }
  return { labels, seriesData };
}

function AssignedCoursesFunc(data: any) {
  var labels = [];
  var seriesData = [];
  for (var i = 0; i < data.length; i++) {
    labels.push(data[i].course_title);
    seriesData.push(data[i].total_assigned);
  }
  return { labels, seriesData };
}

function UndertakenCoursesFunc(data: any) {
  var labels = [];
  var seriesData = [];
  for (var i = 0; i < data.length; i++) {
    labels.push(data[i].course_title);
    seriesData.push(data[i].total_undertaken);
  }
  return { labels, seriesData };
}

function UsersWithAvgScoreFunc(data: any) {
  var labels = [];
  var seriesData = [];
  for (var i = 0; i < data.length; i++) {
    labels.push(data[i].UserName);
    seriesData.push(data[i].avg_score);
  }
  return { labels, seriesData };
}

function topUsersWithCourseCompleted(data: any) {
  var labels = [];
  var seriesData = [];
  for (var i = 0; i < data.length; i++) {
    labels.push(data[i].UserName);
    seriesData.push(data[i].courses_completed);
  }
  return { labels, seriesData };
}

export default chartDataParser;

// export const colors = ["#DEACF5", "#9754CB", "#6237A0", "#28104E"];
export const colors = ["#3282b8", "#0f4c75", "#bbe1fa", "#0f4c75"];
