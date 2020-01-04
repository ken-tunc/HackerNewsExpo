export interface HNStory {
  readonly id: number,
  readonly type: string,
  readonly by: string,
  readonly time: number,
  readonly kids: number[],
  readonly url: string,
  readonly score: number,
  readonly title: string,
  readonly descendants: number
}