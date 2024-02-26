export default function NoFile() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-24 w-24 p-2 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-sapphire-400 font-bold mb-5 text-xl">
          No Videos found!
        </p>
      </div>
    </>
  );
}
