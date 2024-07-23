import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List/List";
import {
  GET_SAVED_SEARCH,
  SAVE_SEARCH,
  SEARCH,
  StoredRecordType,
} from "./endpoints/Search.endpoints";
import { extractGifRequiredData, GifCardType } from "./helpers/gif.translator";
import Paginator from "./components/Paginator/Paginator";

function App() {
  const [records, setRecords] = useState<StoredRecordType[]>([]);
  const [data, setData] = useState<GifCardType[]>();
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const getRecords = async () => {
    const ans: { data: StoredRecordType[] } = await GET_SAVED_SEARCH();
    setRecords(ans?.data);
  };

  const fetchGifs = async () => {
    if (search) {
      const ans: any = await SEARCH(search, offset);
      await SAVE_SEARCH(search);
      const count = ans?.pagination?.count;
      const page = ans?.pagination?.offset;
      const total = ans?.pagination?.total_count;
      const parsedAns = extractGifRequiredData(ans?.data);
      setData(parsedAns);
      const math = page / count;
      setCurrentPage(page === 0 ? 1 : math + 1);
      setTotalPages(Math.ceil(total / count));
      console.log(parsedAns);
      getRecords();
    }
  };

  useEffect(() => {
    if (offset || (offset >= 0 && search)) {
      fetchGifs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    getRecords();
  }, []);

  const incrementOrDecrementPage = (prev?: boolean) => () => {
    if (!prev) {
      setOffset((prev) => Number(prev + 50));
    } else {
      setOffset((prev) => prev - 50);
    }
  };

  return (
    <div className="App">
      <h1>Giphy search</h1>
      <div>
        <input
          value={search}
          onChange={(e: any) => {
            setSearch(e?.target.value);
          }}
        />
        <button onClick={fetchGifs}>Search</button>
      </div>
      <div>
        {records?.map(
          ({ search }) =>
            search && (
              <label key={search} style={{ marginRight: "1rem" }}>
                {search}
              </label>
            )
        )}
      </div>
      <Paginator
        prev={incrementOrDecrementPage(true)}
        next={incrementOrDecrementPage(false)}
        total={totalPages}
        current={currentPage}
      />
      <List data={data} />
    </div>
  );
}

export default App;
