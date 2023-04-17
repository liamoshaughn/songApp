import React, { useState, useEffect } from "react";
import Spotify from "../components/helpers/Spotify";

import { addToken, addUser, useStore } from "../store/store";

export default function DevelopButtons() {
  const store = useStore();

  return (
    <div>
      <Spotify />
    </div>
  );
}
