import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";

const FeaturedSection = () => {
  const { featuredSongs, error, isLoading } = useMusicStore();

  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

  return (
    <div className="grid grid-col sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-all group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
            alt={song.title}
          />
          <div className="flex-1 p-4">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        </div>

        // todo: add play button
      ))}
    </div>
  );
};

export default FeaturedSection;
