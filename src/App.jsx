import { Suspense, useState } from "react";
import Nav from "./components/Home/Nav/Nav";
import PokeCardList from "./components/Home/PokeCardList/PokeCardList";
import Loading from "./components/Loading";

function App() {
  const [searchValue, setSearchValue] = useState("");
  function handleReset() {
    setSearchValue("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchValue(`${e.target[1].value}`);
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Nav handleReset={handleReset} handleSubmit={handleSubmit} />
        <PokeCardList searchValue={searchValue} />
      </Suspense>
    </>
  );
}

export default App;
