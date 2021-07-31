import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className={"home bg-black h-screen w-screen flex flex-col justify-center align-center"}>
      <h1 className={"text-white mx-auto mt-24 text-6xl text-shadow"}>Sauti Marketplace</h1>
      <h3 className={"text-white my-8 mx-auto text-2xl text-shadow"}>Shopping has never been easier</h3>
      <Link className={"text-yellow-500 my-8 mx-auto text-2xl"} to={"marketplace"}><h2 className="text-shadow">Begin Shopping</h2></Link>
      {/* <p className={"text-gray-500 my-8 mx-auto text-2xl"}>Powered by Spoonacular</p> */}
    </div>
  );
}
