import { Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import About from "./About";
import home from "./Home";
// import Profile  from './Profile';
import Profiles from "./Profiles";
import Arrays from "./Arrays";
import MDEditor from "./md/MDEditor";
import Redux from "./redux/Redux";
import Grid from "./exam/Grid";
import Menu from "./exam/Menu";
import Exam from "./exam/Exam";
import SpanningTable from "./exam/SpanningTable";
import PersistentDrawerLeft from "./drawer/PersistentDrawerLeft";
import DragDrop from "./drag/DragDrop";
import ExReducer from "./exuse/ExReducer";

// import logo from './logo.svg';
// import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margins: {
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
  left: {
    width: "10%",
    // width: '100%',
    textAlign: "left",
    display: "inline-block",
    float: "left",
  },
  right: {
    width: "90%",
    textAlign: "right",
    minHeight: "28px",
    display: "inline-block",
    float: "right",
    overFlow: "hidden",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.left}>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about?conditon=9&lang=core">소개</Link>
          </li>
          <li>
            <Link to="/profiles">Profile 목록</Link>
          </li>
          <li>
            <Link to="/array">Array </Link>
          </li>
          <li>
            <Link to="/markdown">Mark Down </Link>
          </li>
          <li>
            <Link to="/exam">Exam </Link>
          </li>
          <li>
            <Link to="/redux">Redux </Link>
          </li>
          <li>
            <Link to="/grid">Grid </Link>
          </li>
          <li>
            <Link to="/menu">Menu </Link>
          </li>
          <li>
            <Link to="/SpanningTable">SpanningTable </Link>
          </li>
          <li>
            <Link to="/draw">Drawer </Link>
          </li>
          <li>
            <Link to="/drag">Drag & Drop </Link>
          </li>
          <li>
            <Link to="/reducer">useXXX </Link>
          </li>
        </ul>
      </div>
      <div className={classes.rigth}>
        <Route path="/" exact={true} component={home} />
        <Route path="/about" component={About} />
        {/* <Route path="/profiles/:username" component={Profile} /> */}
        <Route path="/profiles" component={Profiles} />
        <Route path="/array" component={Arrays} />
        <Route path="/markdown" component={MDEditor} />
        <Route path="/exam" component={Exam} />
        <Route path="/redux" component={Redux} />
        <Route path="/grid" component={Grid} />
        <Route path="/menu" component={Menu} />
        <Route path="/SpanningTable" component={SpanningTable} />
        <Route path="/draw" component={PersistentDrawerLeft} />
        <Route path="/drag" component={DragDrop} />
        <Route path="/reducer" component={ExReducer} />
      </div>
    </>
  );
}

export default App;
