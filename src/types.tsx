type CourseType = {
  course_id: number;
  course_title: string;
  num_subscribers: number;
  num_reviews: number;
  num_lectures: number;
  level: "easy" | "intermediate" | "hard" | "expert";
  content_duration: number;
  published_timestamp: string;
  subject: string;
  status?: string; //Only for flow logix
};

type userCourseType = {
  user_course_id: number;
  user_id: number;
  course_id: number;
  status: string;
  progress: string;
  enrolled_at: string;
  completed_at: string | null;
  courses: CourseType;
  score: string;
};

type modalDataType = {
  title: string;
  content: string;
  onClickAction: () => void;
};

type userType = {
  UserID: number;
  UserName: string;
  FullName: string;
  Email: string;
  Role: string;
  RegisteredAt: string;
  user_courses: [userCourseType] | null;
};

type FlowNode = {
  name: string;
  collapsed?: boolean;
  id?: number;
  children?: FlowNode[];
  status?: string;
};
