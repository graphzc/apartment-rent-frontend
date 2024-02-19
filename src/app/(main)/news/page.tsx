import NewsList from "@/components/news/NewsList";

export default function News() {
  return (
    <>
      <div className="w-100 relative text-center">
        <img
          src="/homeAsset/promotion.jpg"
          className="object-cover h-96 w-screen"
        />
        <div className="h-full w-full top-1/2 absolute -translate-y-1/2 p-8 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/0 text-center ">
          <div className="text-5xl font-bold text-white mt-36">ข่าวสาร</div></div>
      </div>
      <div className="container mx-auto mb-44 sm:px-3">
        <NewsList />
      </div>
    </>
  );
}
