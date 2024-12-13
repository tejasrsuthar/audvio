import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();

  const { currentAlbum, fetchAlbumById, isLoading } = useMusicStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  console.log(albumId, currentAlbum);

  if (isLoading) return null;

  return <div>{currentAlbum?.title}</div>;
};

export default AlbumPage;
