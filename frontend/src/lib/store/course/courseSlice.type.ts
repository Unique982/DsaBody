import { Status } from "../../types/types";

export interface ILesson {
  title: string;
  content?: string;
  duration?: number;
}

export interface ICourse {
  id?: string;
  title: string;
  description: string;
  price: number;
  tags?: string[];
  thumbnail?: string;
  lessons?: ILesson[];
  mentorId?: string;
}

export interface ICourseInitialState {
  courses: ICourse[];
  singleCourse: ICourse | null;
  status: Status;
}
