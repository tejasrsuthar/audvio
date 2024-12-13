export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  releaseYear: number;
  imageUrl: string;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}