//Import modules
import "./form";
import "./submit";

// Import CSS Files
import "../css/index.css";

//Import imgs
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

//Import database initializer
import { initDb, getDb, postDb } from "./database";

//Import Bootstrap + Popper
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Add images onLoad
window.addEventListener("load", function () {
  initDb();
  getDb();
  postDb("dopecello", "blahblah@gmail.com", 3019999916, "Bear");
  getDb();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});
