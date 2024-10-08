import baseUrl from "@/configs/Baseurl";

const difficulties = { easy: 0, intermediate: 1, hard: 2, expert: 3 };

export default function Parser(
  courseData: CourseType[],
  res: userCourseType[]
) {
  const completed = res
    .filter((r: userCourseType) => r.progress === "100")
    .map((r: userCourseType) => r.course_id);
  const incompleted = res
    .filter((r: userCourseType) => r.progress !== "100")
    .map((r: userCourseType) => r.course_id);
  courseData.map((course) => {
    if (completed.includes(course.course_id)) {
      course.status = "completed";
    }
  });
  courseData.map((course) => {
    if (incompleted.includes(course.course_id)) {
      course.status = "incompleted";
    }
  });

  const GraphicDesign = seperator(courseData, "Graphic Design");
  const MusicalInstrument = seperator(courseData, "Musical Instruments");
  const BusinessFinance = seperator(courseData, "Business Finance");
  const WebDevelopment = seperator(courseData, "Web Development");

  const GraphicDesignNode = helper(GraphicDesign, "Graphic Design");
  const MusicalInstrumentNode = helper(
    MusicalInstrument,
    "Musical Instruments"
  );
  const BusinessFinanceNode = helper(BusinessFinance, "Business Finance");
  const WebDevelopmentNode = helper(WebDevelopment, "Web Development");

  const root = createNode("JLEARN");

  root.children?.push(GraphicDesignNode);
  root.children?.push(MusicalInstrumentNode);
  root.children?.push(BusinessFinanceNode);
  root.children?.push(WebDevelopmentNode);
  console.log(root);
  return root;
}

function seperator(courseData: CourseType[], subject: string) {
  return courseData
    .filter((course) => course.subject === subject)
    .sort((a, b) => difficulties[a.level] - difficulties[b.level]);
}

function helper(courseCategory: CourseType[], catName: string) {
  var root = createNode(catName);

  Object.keys(difficulties).map((diff) => {
    var subNode = createNode(diff);
    courseCategory
      .filter((course) => course.level === diff)
      .map((course) =>
        subNode.children?.push(
          createLeafNode(
            course.course_title,
            {
              id: course.course_id,
              level: course.level,
              subject: course.subject,
            },
            course.status
          )
        )
      );
    root.children?.push(subNode);
  });

  return root;
}

function createNode(name: string, attributes?: any): FlowNode {
  return {
    name: name,
    collapsed: true,
    id: attributes?.id,
    children: [],
    status: attributes?.status,
  };
}

function createLeafNode(
  name: string,
  attributes?: any,
  status?: string
): FlowNode {
  return {
    name: name,
    collapsed: false,
    id: attributes.id,
    status: status,
  };
}

export function PathParser(
  res: userCourseType[],
  pred: CourseType[]
): FlowNode | null {
  if (res.length === 0) {
    return null;
  }
  const root = createNode(res[0].courses.course_title, {
    id: res[0].course_id,
    status: "completed",
  });
  var pointer = root;
  for (var i = 1; i < res.length; i++) {
    const child = createNode(res[i].courses.course_title, {
      id: res[i].course_id,
      status: "completed",
    });
    pointer.children?.push(child);
    pointer = child;
  }

  for (var i = 0; i < pred.length; i++) {
    pointer.children?.push(createNode(pred[i].course_title));
  }

  return root;
}
