import MapChart from "./components/Map"

function App() {
  return (
    <>
      <div className="mx-auto px-8 py-6 w-full flex flex-row justify-around gap-10 bg-[#002146]">
        <h1 className="w-100 font-extrabold text-3xl">Clean Water and Sanitation</h1>
        <ul className="text-base flex flex-row justify-center items-center gap-10">
          <li className="hover:opacity-90"><a href="/">Map</a></li>
          <li className="hover:opacity-90"><a href="/">Information</a></li>
          <li className="hover:opacity-90"><a href="/">Resources</a></li>
        </ul>
      </div>
      <hr className="border-0 w-full h-2 bg-slate-300" />
      <MapChart />
    </>
  )
}

export default App
