import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { CrudContext } from "../context/CrudContext";

const useSearch = (data) => {
  const { filterText, filterTextModal, result, setResult } = useContext(CrudContext);

  useEffect(() => {
    if (filterText !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(filterText.toLowerCase());
      });
      setResult(filteredData);
    } else {
      setResult(data);
    }
  }, [filterText, data]);


  return { result };
};

export default useSearch;
