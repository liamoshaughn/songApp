import React, { useState, useEffect } from "react";
import Spotify from "../components/helpers/Spotify";
import { ClientComponent } from "../components/helpers/sendData";

import { addToken, addUser, useStore } from "../store/store";

export default function DevelopButtons() {
  const store = useStore();

  return (
    <div>
      <Spotify />
      <ClientComponent />
    </div>
  );
}
