export default function RecipeVideo({video}: {video: string}) {
    
    return (
<div className="aspect-w-16 aspect-h-9 m-2">
  <iframe src={`http://www.youtube.com/embed/${video.slice(32)}`}  allowFullScreen></iframe>
</div>
    );
  }