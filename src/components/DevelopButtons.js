import React, { useState, useEffect } from "react";
import XMLConvert from "../components/helpers/XMLConvert";
import { batchSearch } from "../components/helpers/batchSearch";
import { ClientComponent } from "../components/helpers/sendData";
import Spotify from "../components/helpers/Spotify";

import { addToken, addUser, useStore } from "../store/store";

export default function DevelopButtons() {
  const store = useStore();

  return (
    <div>
      <Spotify />
      <button onClick={() => batchSearch(store.accessToken)}>Batch Search</button>
      <XMLConvert />
      <ClientComponent />
    </div>
  );
}
