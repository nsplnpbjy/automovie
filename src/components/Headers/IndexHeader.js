/*eslint-disable*/
import React, {useState} from "react";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

// reactstrap components
import { Container } from "reactstrap";
import {Button} from "reactstrap";
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import axios from "axios";
import {FixedSizeList} from "react-window";
import copy from "copy-to-clipboard";
// core components

const baseUrl = "http://comradegenrr.top:8090";

function IndexHeader() {
  function Search(text){
    return axios.post(baseUrl+"/s",{searchText:text}).then((res)=>{console.log(res.data);setShowDataList(res.data.moviePojoList)});
  }

  function copyLink(link){
    copy(link);
    console.log(link);
    alert("下载链接已复制到剪贴板");
  }

  let pageHeader = React.createRef();
  const [searchText,setSearchText] = useState("");
  const [showDataList,setShowDataList] = useState([{}]);

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">Movie Hub</h1>
            <h3 color={"blue"}>Get film download links for free.</h3>
            <h6>
              Designed by{" "}
              <a href="http://invisionapp.com/?ref=creativetim" target="_blank">
                <img
                    alt="..."
                    className="invision-logo"
                    src={require("assets/img/invision-white-slim.png")}
                ></img>
              </a>
              . Coded by{" "}
              <a
                  href="https://github.com/nsplnpbjy?tab=repositories"
                  target="_blank"
              >
                ComradeGenrr
              </a>
              .
            </h6>
            <div>
              <input value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} style={{backgroundColor:"lightblue",width:"40%"}}/>
              <button onClick={()=>{Search(searchText)}}>Search</button>
            </div>
            <Divider></Divider>
            <Divider></Divider>
          </div>
        </Container>
      </div>
      <List height={400} width={300} itemSize={46} itemCount={200}>
        {
          showDataList.map((iterm)=>{
            return <Box sx={{ width: '100%',maxHeight:"inherit",color:"lightblue",backgroundColor:"black" }}>
              <ListItem width = "100%">
                <ListItemButton onClick={(e)=>{copyLink(iterm.movieUrl)}}>
                  <ListItemIcon>
                    <img style={{width:"20px"}} src={require("assets/img/cloud-computing.png")}/>
                  </ListItemIcon>
                  <ListItemText>
                    <h7>{iterm.movieTitle}</h7>
                    <p>{iterm.movieUrl}</p>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
            </Box>
          })
        }
      </List>
    </>
  );
}

export default IndexHeader;
