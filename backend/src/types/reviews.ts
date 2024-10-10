export interface Review {
  readonly id: number;
  reviewer: number;
  reviewed: number;
  grade: number;
  content: string;
}
