import Header from '../components/header';

export default function Home() {
  return (
    <>
      <div className="bg-background-under p-2">
        <div className="container mx-auto h-screen">
          <div className="border-2 border-focus">
            <Header />
          </div>
          <div className="bg-background-fore border-2 border-focus">
            <div className="font-bold text-textcolor m-2">
              Homepage
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
