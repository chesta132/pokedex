import { Suspense, useState } from "react";
import Nav from "./components/Home/Nav/Nav";
import PokeCardList from "./components/Home/PokeCardList/PokeCardList";
import PokeLoading from "./components/PokeLoading";

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
      <Suspense fallback={<PokeLoading />}>
        <Nav handleReset={handleReset} handleSubmit={handleSubmit} />
        <PokeCardList searchValue={searchValue} />
      </Suspense>
    </>
  );
}

export default App;
